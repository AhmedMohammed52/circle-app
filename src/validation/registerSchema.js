import * as zod from "zod";
import { regex } from "./regex";
import { calculateAge } from "../helpers/date";

export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is require")
      .min(2, "Min Lenght must be at least 2 Characters")
      .max(50, "Max Lenght must be at most 50 Characters"),

    email: zod
      .string()
      .nonempty("Email is require")
      .regex(regex.email, "Enter valid Email"),

    password: zod
      .string()
      .nonempty("Enter valid password")
      .regex(
        regex.password,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      ),

    rePassword: zod.string().nonempty("Confirm password is required"),

    dateOfBirth: zod
      .string()
      .nonempty("Date is required")
      .refine(
        (date) => calculateAge(date) >= 18,
        "Age must be more than or equal to 18",
      ),

    gender: zod
      .string()
      .nonempty("Gender is require")
      .regex(/^(male|female)$/, "Gender must be one of ( Male or Female )"),
  })
  .refine((data) => data.password == data.rePassword, {
    message: "Does not match the Password",
    path: ["rePassword"],
  });
