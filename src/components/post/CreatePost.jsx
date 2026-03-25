import { useContext, useState, useRef } from "react";
import userAvatar from "../../assets/user avatar.jpg";
import { authContext } from "../../contexts/authContext";
import { apiServices } from "../../services/api";
import { successToast } from "../ui/toast";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";

export default function CreatePost() {
  const { userData } = useContext(authContext);

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const imageInput = useRef();

  const { mutate, isPending } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      removeImage();
      setCaption("");
      queryClient.invalidateQueries(["posts"]);
      successToast("Your Post Created Successfully");
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    if (caption) formData.set("body", caption);
    if (image) formData.set("image", image);

    await apiServices.createPost(formData);
  }

  function handleImageChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  function removeImage() {
    setImage(null);
    setImagePreview(null);
    imageInput.current.value = null;
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={userData?.photo || userAvatar}
          onError={(e) => {
            e.target.src = userAvatar;
          }}
          className="w-10 h-10 rounded-full"
          alt={userData?.name}
        />

        <div>
          <h3 className="font-semibold text-sm">{userData?.name || "You"}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
            <i className="fa-solid fa-earth-africa"></i>
            <span>Public</span>
            <i className="fa-solid fa-chevron-down text-[10px]"></i>
          </div>
        </div>
      </div>

      <form onSubmit={mutate} className="space-y-3">
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder={`What's on your mind, ${userData?.name?.split(" ")[0] || " "}?`}
          className="w-full outline-gray-100 bg-gray-100 rounded-xl p-3 text-sm min-h-25 focus:bg-white focus:outline-1 focus:outline-primary transition-all"
        />

        {imagePreview && (
          <div className="relative">
            <img
              src={imagePreview}
              className="w-full max-h-72 object-cover rounded-xl"
            />

            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-gray-200 w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className=" text-gray-600 text-sm">
            <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100">
              <i className="fa-regular fa-image text-green-600"></i>
              Photo/video
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
            disabled={isPending || (caption.trim() === "" && image == null)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 disabled:opacity-50"
          >
            {isPending && <i className="fa-solid fa-spinner fa-spin"></i>}
            {isPending ? "Posting..." : "Post"}
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
