import { Alert, Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../validation/registerSchema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiServices } from "../services/api";
import { successToast } from "../components/ui/toast";

export default function SignUp() {
  const [isLoading, setisLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function signUp(registerData) {
    setisLoading(true);
    setErrMsg("");
    try {
      await apiServices.signUp(registerData);
      successToast("Your Account Created Successfully");
      navigate("/signin");
    } catch (error) {
      setErrMsg(error.response?.data.errors || error.message);
    } finally {
      setisLoading(false);
    }
  }

  const inputClassNames = {
    label: "hidden",
    inputWrapper: [
      "bg-[#F0F2F5]",
      "border-1",
      "border-transparent",
      "hover:bg-[#E4E6E9]",
      "group-data-[focus=true]:bg-white",
      "group-data-[focus=true]:border-[#00358E]",
      "group-data-[focus=true]:ring-0",
      "rounded-xl",
      "h-14",
      "transition-all duration-200",
    ],
    input: "text-base placeholder:text-gray-500",
  };

  return (
    <div className="w-full max-w-112.5 mx-auto">
      <div className="mb-6">
        <h2 className="text-[28px] font-bold text-[#1c1e21] mb-1">
          Create a new account
        </h2>
        <p className="text-[#606770] text-[15px]">It is quick and easy.</p>
      </div>

      <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-3">
        <Input
          {...register("name")}
          placeholder="Full name"
          startContent={<i className="fa-regular fa-user text-gray-400"></i>}
          classNames={inputClassNames}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />

        <Input
          {...register("email")}
          placeholder="Email address"
          startContent={
            <i className="fa-regular fa-envelope text-gray-400"></i>
          }
          classNames={inputClassNames}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />

        <Select
          {...register("gender")}
          placeholder="Select gender"
          startContent={
            <i className="fa-solid fa-person-half-dress text-gray-400"></i>
          }
          classNames={{
            trigger: inputClassNames.inputWrapper,
            value: "text-gray-500",
          }}
          isInvalid={!!errors.gender}
          errorMessage={errors.gender?.message}
        >
          <SelectItem key="male">Male</SelectItem>
          <SelectItem key="female">Female</SelectItem>
        </Select>

        <Input
          {...register("dateOfBirth")}
          type="date"
          placeholder="Birth Date"
          startContent={
            <i className="fa-regular fa-calendar text-gray-400"></i>
          }
          classNames={inputClassNames}
          isInvalid={!!errors.dateOfBirth}
          errorMessage={errors.dateOfBirth?.message}
        />

        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
          startContent={<i className="fa-solid fa-key text-gray-400"></i>}
          classNames={inputClassNames}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
        />

        <Input
          {...register("rePassword")}
          type="password"
          placeholder="Confirm password"
          startContent={<i className="fa-solid fa-lock text-gray-400"></i>}
          classNames={inputClassNames}
          isInvalid={!!errors.rePassword}
          errorMessage={errors.rePassword?.message}
        />

        <Button
          isLoading={isLoading}
          type="submit"
          className="bg-[#00358E] text-white font-bold h-12 rounded-xl text-lg mt-4"
        >
          Create New Account
        </Button>

        {errMsg && (
          <Alert
            color="danger"
            title={errMsg}
            variant="flat"
            className="mt-2"
          />
        )}
      </form>
    </div>
  );
}
