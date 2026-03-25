import { useRef, useState } from "react";
import userAvatar from "../../assets/user avatar.jpg";
import { apiServices } from "../../services/api";
import { queryClient } from "../../App";
import { successToast } from "../../components/ui/toast";

export default function ProfileHeader({ user, myPosts }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.set("photo", file);

    try {
      setIsUploading(true);
      await apiServices.uploadProfilePhoto(formData);

      await queryClient.invalidateQueries(["userProfile"]);
      await queryClient.invalidateQueries(["loggedUser"]);
      await queryClient.invalidateQueries(["posts"]);
      await queryClient.invalidateQueries(["allPosts"]);

      successToast("Profile picture updated successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
      e.target.value = null;
    }
  };

  return (
    <div className="bg-white rounded-[35px] shadow-sm overflow-hidden border border-slate-100 mb-8">
      <div className="relative h-48 md:h-56 bg-slate-200">
        <img
          src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1350&q=80"
          className="w-full h-full object-cover brightness-90"
          alt="cover"
        />
      </div>

      <div className="px-6 md:px-10 pb-10">
        <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20 gap-6 relative z-10">
          <div
            className={`relative group cursor-pointer ${isUploading ? "pointer-events-none" : ""}`}
            onClick={() => fileInputRef.current.click()}
          >
            <div className="p-1 bg-white rounded-full shadow-md relative overflow-hidden">
              <img
                src={user?.photo || userAvatar}
                onError={(e) => {
                  e.target.src = userAvatar;
                }}
                alt="avatar"
                className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover transition duration-300 ${
                  isUploading ? "brightness-50" : "group-hover:brightness-50"
                }`}
              />

              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {!isUploading && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="fa-solid fa-camera text-white text-3xl"></i>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-2 text-center md:text-left flex-1">
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-none">
              {user?.name}
            </h1>

            <p className="text-slate-400 font-bold mt-2">
              @{user?.name?.split(" ").join("").toLowerCase()}
            </p>
          </div>

          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase">
                Posts
              </p>
              <p className="text-xl font-black text-slate-800">
                {myPosts?.length || 0}
              </p>
            </div>

            <div className="w-px h-8 bg-slate-100 self-center"></div>

            <div className="text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase">
                Followers
              </p>
              <p className="text-xl font-black text-slate-800">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
