import { User } from "src/entities/User";
import { UpdateUser } from "../types/updateUser";
import argon2 from "argon2";

export const validateUpdateUser = async (data: UpdateUser, user: User) => {
  // Password

  if (typeof data.password !== "undefined") {
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
    if (data.password.length <= 5) {
      return {
        errors: [
          {
            field: "password",
            message: "Password needs to be greater than 5",
          },
        ],
      };
    }

    const hash = await argon2.hash(data.password);
    user.password = hash;
  }

  // Username
  if (typeof data.username !== "undefined") {
    if (data.username === "") {
      return {
        errors: [
          {
            field: "username",
            message: "Invalid username",
          },
        ],
      };
    }
    user.username = data.username;
  }

  // Email
  if (typeof data.email !== "undefined") {
    if (!data.email.includes("@")) {
      return {
        errors: [{ field: "email", message: "Invalid email!" }],
      };
    }
    user.email = data.email;
  }
  return { user };
};
