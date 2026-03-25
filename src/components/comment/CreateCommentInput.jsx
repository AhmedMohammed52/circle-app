import { useContext, useState, useEffect, useRef } from "react";
import { authContext } from "../../contexts/authContext";

export default function CreateCommentInput({ addComment }) {
  const { userData } = useContext(authContext);
  const [commentContent, setCommentContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleCreateComment() {
    if (!commentContent.trim() && !image) return;
    const finalContent =
      !commentContent.trim() && image ? "  " : commentContent;

    const formData = new FormData();
    formData.set("content", finalContent);

    if (image) {
      formData.set("image", image);
    }

    await addComment(formData);

    setCommentContent("");
    setImage(null);
    setImagePreview(null);
  }

  return (
    <div className="px-2 mt-4 mb-2 space-y-2 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-1">
          <img
            src={userData?.photo || "https://via.placeholder.com/40"}
            className="w-9 h-9 rounded-full object-cover shadow-sm ring-1 ring-gray-100"
            alt="current-user"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center bg-[#F0F2F5] rounded-2xl px-4 py-2 border border-transparent focus-within:border-gray-200 focus-within:bg-white focus-within:shadow-sm transition-all duration-200">
            <input
              ref={inputRef}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              type="text"
              placeholder="Write a comment..."
              className="bg-transparent text-[14px] w-full outline-none text-gray-700 placeholder-gray-500 py-1"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition mx-1"
              title="Attach a photo"
            >
              <i className="fa-regular fa-image text-[18px]"></i>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setImage(e.target.files[0]);
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />

            <button
              className="group disabled:opacity-30 disabled:cursor-not-allowed ml-1 p-1.5 rounded-full hover:bg-gray-200 transition"
              onClick={handleCreateComment}
              disabled={!commentContent.trim() && !image}
            >
              <i className="fa-solid fa-paper-plane text-[16px] text-[#0866FF] group-disabled:text-gray-400"></i>
            </button>
          </div>

          {imagePreview && (
            <div className="relative mt-2 w-24 h-24 group">
              <img
                src={imagePreview}
                className="w-full h-full object-cover rounded-xl border border-gray-200 shadow-sm"
                alt="preview"
              />
              <button
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
                className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] hover:bg-red-500 transition shadow-md"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
