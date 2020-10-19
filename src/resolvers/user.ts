import { User } from "../entities/User";
import { MyContext } from "src/types";
import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../config/config";
import { RegistrationData } from "./types/inputType";
import { UpdateUser } from "./types/updateUser";
import { validateRegistration } from "./validation/validateRegistration";
import { validateUpdateUser } from "./validation/validateUpdateUser";
import { sendEmail } from "../utils/sendEmails";
import { v4 } from "uuid";
import { validateChangePassword } from "./validation/validateChangePassword";

@InputType()
class LoginData {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis }: MyContext
  ): Promise<UserResponse> {
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "Something went wrong!",
          },
        ],
      };
    }
    const errors = validateChangePassword(newPassword);
    if (errors) {
      return { errors };
    }
    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "Something went wrong!",
          },
        ],
      };
    }

    await User.update(
      { id: userIdNum },
      { password: await argon2.hash(newPassword) }
    );
    await redis.del(key);
    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }

    const token = v4();

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    );

    const link = `<a href="http://localhost:3000/reset-password/${token}">Reset Password</a>`;
    await sendEmail(email, link);

    return true;
  }

  // Gets all the users
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);
  }

  // Register user
  @Mutation(() => UserResponse)
  async register(
    @Arg("data") data: RegistrationData,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegistration(data);
    if (errors) {
      return { errors };
    }
    const hash = await argon2.hash(data.password);

    // creating the user
    let user;
    try {
      user = await User.create({
        email: data.email,
        password: hash,
        username: data.username,
      }).save();
      req.session.userId = user.id;
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [{ field: "email", message: "Email already exists" }],
        };
      }
    }

    return { user };
  }

  // login user
  @Mutation(() => UserResponse)
  async login(
    @Arg("data") data: LoginData,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "User not found!",
          },
        ],
      };
    }
    const validate = await argon2.verify(user.password, data.password);
    if (!validate) {
      return {
        errors: [
          {
            field: "password",
            message: "Invalid password!",
          },
        ],
      };
    }

    // Set a user id session
    // set a cookie for the user
    // keep user login
    req.session.userId = user.id;

    return { user };
  }

  // Logout
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  // Update a user
  @Mutation(() => UserResponse, { nullable: true })
  async updateUser(
    @Arg("data") data: UpdateUser
  ): Promise<UserResponse | null> {
    const user = await User.findOne(data.id);
    if (!user) {
      return { errors: [{ field: "id", message: "User not found" }] };
    }
    // Update user validation
    const updatedUser = validateUpdateUser(data, user);
    // await em.nativeUpdate(User, where: id: user.id, data:{updatedUser})
    return updatedUser;
  }
}
