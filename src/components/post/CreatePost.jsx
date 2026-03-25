import { useContext, useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import userAvatar from "../../assets/user avatar.jpg";
import { authContext } from "../../contexts/authContext";
import { apiServices } from "../../services/api";
import { queryClient } from "../../App";
import { successToast } from "../ui/toast";

export default function CreatePost() {
  const { userData, getLoggedUserData } = useContext(authContext);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageInput = useRef();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => apiServices.createPost(formData),
    onSuccess: async () => {
      removeImage();
      setCaption("");
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["loggedUser"]);

      await getLoggedUserData();

      successToast("Your Post Created Successfully");
    },
  });

  function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    if (caption.trim()) formData.set("body", caption);
    if (image) formData.set("image", image);
    mutate(formData);
  }

  function handleImageChange(e) {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function removeImage() {
    setImage(null);
    setImagePreview(null);
    if (imageInput.current) {
      imageInput.current.value = null;
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full max-w-4xl mx-auto border border-slate-50">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={userData?.photo || userAvatar}
          onError={(e) => {
            e.target.src = userAvatar;
          }}
          className="w-10 h-10 rounded-full object-cover border border-slate-100"
          alt={userData?.name}
        />
        <div>
          <h3 className="font-bold text-sm text-slate-800">
            {userData?.name || "You"}
          </h3>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <i className="fa-solid fa-earth-africa"></i>
            <span>Public</span>
            <i className="fa-solid fa-chevron-down text-[8px]"></i>
          </div>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-3">
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder={`What's on your mind, ${userData?.name?.split(" ")[0] || " "}?`}
          className="w-full outline-none bg-slate-50 rounded-2xl p-4 text-sm min-h-25 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all border border-transparent focus:border-blue-200 resize-none"
        />

        {imagePreview && (
          <div className="relative group">
            <img
              src={imagePreview}
              className="w-full max-h-80 object-cover rounded-2xl border border-slate-100"
              alt="preview"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-3 right-3 bg-white/80 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <div className="flex gap-1">
            <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors text-slate-600 font-bold text-xs">
              <i className="fa-regular fa-image text-green-500 text-lg"></i>
              <span>Photo/Video</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                ref={imageInput}
                disabled={isPending}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isPending || (!caption.trim() && !image)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:grayscale transition-all font-bold text-xs shadow-lg shadow-blue-100"
          >
            {isPending ? (
              <i className="fa-solid fa-circle-notch fa-spin"></i>
            ) : (
              <i className="fa-solid fa-paper-plane"></i>
            )}
            {isPending ? "Posting..." : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
