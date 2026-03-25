import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    if (location.pathname === "/signup") {
      setActiveTab("register");
    } else {
      setActiveTab("login");
    }
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(tab === "login" ? "/signin" : "/signup");
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col justify-center items-center p-6 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="hidden lg:block space-y-8 pr-10">
          <h1 className="text-7xl font-black text-[#00358E] tracking-tighter">
            Circle
          </h1>
          <p className="text-3xl text-slate-600 font-semibold leading-snug">
            Connect with friends and the world around you on Circle.
          </p>
          <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100 max-w-sm">
            <p className="text-blue-800 font-medium">
              Join 40K+ graduates in the most active social network for
              developers.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-white w-full">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
            <button
              onClick={() => handleTabChange("login")}
              className={`flex-1 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                activeTab === "login"
                  ? "bg-white text-blue-700 shadow-md"
                  : "text-slate-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => handleTabChange("register")}
              className={`flex-1 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                activeTab === "register"
                  ? "bg-white text-blue-700 shadow-md"
                  : "text-slate-400"
              }`}
            >
              Register
            </button>
          </div>

          <div className="transition-opacity duration-500 overflow-hidden">
            {activeTab === "login" ? <SignIn /> : <SignUp />}
          </div>
        </div>
      </div>
    </div>
  );
}
