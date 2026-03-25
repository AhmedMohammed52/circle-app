import { regex } from "./regex";
import { calculateAge } from "../helpers/date";

export function getFormValidation(Watch) {
  return {
    name: {
      required: { value: true, message: "Name is require" },
      minLength: {
        value: 2,
        message: "Min Lenght must be at least 2 Characters",
      },
      maxLength: {
        value: 50,
        message: "Max Lenght must be at most 50 Characters",
      },
    },

    email: {
      required: { value: true, message: "Email is require" },
      pattern: { value: regex.email, message: "Enter valid Email" },
    },

    password: {
      required: { value: true, message: "Enter valid password" },
      pattern: {
        value: regex.password,
        message:
          "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      },
    },

    rePassword: {
      required: { value: true, message: "Confirm password is required" },
      validate: (rePassword) =>
        rePassword == Watch("password") || "Does not match the Password",
    },

    dateOfBirth: {
      required: { value: true, message: "Date is required" },
      validate: (date) => {
        return (
          calculateAge(date) >= 18 || "Age must be more than or equal to 18"
        );
      },
    },

    gender: {
      required: { value: true, message: "Gender is require" },
      validate: (gender) =>
        gender == "male" ||
        gender == "female" ||
        "Gender must be one of ( Male or Female )",
    },
  };
}
