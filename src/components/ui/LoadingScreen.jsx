import { Spinner } from "@heroui/react";

export default function LoadingScreen() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner color="primary" />
    </div>
  );
}
