import { Alert, Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../validation/loginSchema";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import { apiServices } from "../services/api";

export default function SignIn() {
  const [isLoading, setisLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { setUserToken } = useContext(authContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function signIn(loginData) {
    setisLoading(true);
    setErrMsg("");

    try {
      const data = await apiServices.signIn(loginData);
      localStorage.setItem("token", data.data.token);
      setUserToken(data.data.token);
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
      "rounded-xl",
      "h-14",
      "transition-all duration-200",
    ],
    input: "text-base placeholder:text-gray-500",
  };

  return (
    <div className="w-full max-w-112.5س mx-auto">
      <div className="mb-6 text-left">
        <h2 className="text-[28px] font-bold text-[#1c1e21] mb-1">
          Log in to Circle Posts
        </h2>
        <p className="text-[#606770] text-[15px]">
          Log in and continue your social journey.
        </p>
      </div>

      <form onSubmit={handleSubmit(signIn)} className="flex flex-col gap-4">
        <Input
          {...register("email")}
          placeholder="Email or username"
          startContent={<i className="fa-regular fa-user text-gray-400"></i>}
          classNames={inputClassNames}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
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

        <Button
          isLoading={isLoading}
          type="submit"
          className="bg-[#00358E] text-white font-bold h-12 rounded-xl text-lg mt-2"
        >
          Log In
        </Button>

        <div className="text-center mt-2">
          <Link
            to="/forgot-password"
            size="sm"
            className="text-[#00358E] hover:underline font-medium text-sm"
          >
            Forgot password?
          </Link>
        </div>

        {errMsg && (
          <Alert
            hideIcon
            color="danger"
            title={errMsg}
            className="rounded-xl border-none bg-red-50 text-red-600 font-medium py-2"
          />
        )}
      </form>
    </div>
  );
}
