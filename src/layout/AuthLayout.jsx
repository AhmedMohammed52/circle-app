import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
        <Outlet />
      </div>
    </>
  );
}
