import { Link } from "react-router-dom";
import userAvatar from "../../assets/user avatar.jpg";
import { useContext } from "react";
import { authContext } from "../../contexts/authContext";
import { useQuery } from "@tanstack/react-query";
import { apiServices } from "../../services/api";

export default function ProfileCard() {
  const { userData } = useContext(authContext);

  const { data: myPosts = [] } = useQuery({
    queryKey: ["userPosts", userData?._id],
    queryFn: () => apiServices.getUserPosts(userData?._id),
    enabled: !!userData?._id,
    retry: 1,
  });

  return (
    <div className="bg-white rounded-4xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 transition-all hover:shadow-md">
      <div className="h-20 bg-linear-to-br from-blue-500 to-indigo-600 relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="px-5 pb-6">
        <div className="relative -mt-10 mb-3 flex justify-center lg:justify-start">
          <img
            src={userData?.photo || userAvatar}
            className="w-20 h-20 rounded-[22px] border-4 border-white object-cover shadow-sm bg-white"
            alt={userData?.name || "User Name"}
          />
        </div>

        <div className="text-center lg:text-left mb-5">
          <h4 className="font-black text-slate-800 text-base truncate leading-tight">
            {userData?.name || "User Name"}
          </h4>
          <p className="text-[11px] text-slate-400 font-bold mt-1">
            @{userData?.name?.split(" ").join("").toLowerCase() || "user"}
          </p>
        </div>

        <div className="h-px bg-slate-50 mb-5"></div>

        <div className="flex items-center justify-around lg:justify-between mb-6 px-2">
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
              Posts
            </p>
            <p className="text-sm font-black text-slate-700">
              {myPosts.length}
            </p>
          </div>
          <div className="w-px h-6 bg-slate-100 hidden lg:block"></div>
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
              Followers
            </p>
            <p className="text-sm font-black text-slate-700">
              {userData?.followers?.length || userData?.followersCount || 0}
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          <Link
            to="/"
            className="flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs transition-all hover:bg-blue-600 hover:text-white group"
          >
            <i className="fa-solid fa-house group-hover:scale-110 transition"></i>
            Home Feed
          </Link>
          <Link
            to={`/profile/${userData?._id}`}
            className="flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl text-slate-500 font-bold text-xs transition-all hover:bg-slate-50 hover:text-slate-800"
          >
            <i className="fa-solid fa-circle-user"></i>
            My Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
