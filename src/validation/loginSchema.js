import * as zod from "zod";
import { regex } from "./regex";

export const schema = zod.object({
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
});
