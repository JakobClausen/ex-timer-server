import { User } from "../entities/User";
import { MyContext } from "src/types";
import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { COOKIE_NAME } from "../config/config";
import { RegistrationData } from "./types/inputType";
import { UpdateUser } from "./types/updateUser";
import { validateRegistration } from "./validation/validateUserInput";

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
  // Gets all the users
  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }
    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  // Register user
  @Mutation(() => UserResponse)
  async register(
    @Arg("data") data: RegistrationData,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegistration(data);
    if (errors) {
      return { errors };
    }
    const hash = await argon2.hash(data.password);
    const user = em.create(User, {
      email: data.email,
      password: hash,
      username: data.username,
    });

    // creating the user
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [{ field: "email", message: "Email already exists" }],
        };
      }
    }

    req.session.userId = user.id;

    return { user };
  }

  // login user
  @Mutation(() => UserResponse)
  async login(
    @Arg("data") data: LoginData,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { email: data.email });
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

  // Gets all the users
  @Query(() => [User])
  users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {});
  }

  // Gets user by id
  @Query(() => User, { nullable: true })
  user(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    return em.findOne(User, { id });
  }

  // Update a user
  @Mutation(() => UserResponse, { nullable: true })
  async updateUser(
    @Arg("data") data: UpdateUser,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse | null> {
    const user = await em.findOne(User, { id: data.id });
    if (!user) {
      return null;
    }
    if (
      typeof data.password !== "undefined" ||
      typeof data.email !== "undefined" ||
      typeof data.username !== "undefined"
    ) {
      const errors = validateRegistration(data);
      if (errors) {
        return { errors };
      }
      user.email = data.email;
      user.password = data.password;
      user.username = data.username;
      await em.persistAndFlush(user);
      return { user };
    }
    if (typeof data.username !== "undefined") {
      const errors = validateRegistration(data);
      if (errors) {
        return { errors };
      }
      user.username = data.username;
      await em.persistAndFlush(user);
      return { user };
    }
    if (typeof data.password !== "undefined") {
      const errors = validateRegistration(data);
      if (errors) {
        return { errors };
      }
      user.password = data.password;
      await em.persistAndFlush(user);
      return { user };
    }
    if (typeof data.email !== "undefined") {
      const errors = validateRegistration(data);
      if (errors) {
        return { errors };
      }
      user.email = data.email;
      await em.persistAndFlush(user);
      return { user };
    }
    return null;
  }
}
