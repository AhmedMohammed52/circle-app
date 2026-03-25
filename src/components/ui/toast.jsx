import { addToast } from "@heroui/react";

export const successToast = (message) => {
  addToast({
    title: "Success",
    description: message,
    color: "success",
  });
};
