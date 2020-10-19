export const validateChangePassword = (password: string) => {
  if (password.length <= 5) {
    return [
      {
        field: "password",
        message: "Length must be greater than 5",
      },
    ];
  }

  return null;
};
