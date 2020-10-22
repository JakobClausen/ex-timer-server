import { RegistrationData } from "../types/userTypes";

export const validateRegistration = (data: RegistrationData) => {
  if (!data.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email!",
      },
    ];
  }

  if (data.username === "" || data.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Must provide a username!",
      },
    ];
  }

  if (data.password.length <= 5) {
    return [
      {
        field: "password",
        message: "Length must be greater than 5",
      },
    ];
  }
  return null;
};
