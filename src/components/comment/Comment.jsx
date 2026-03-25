import { Link } from "react-router-dom";
import userAvatar from "../../assets/user avatar.jpg";
import { useContext, useState, useRef } from "react";
import { authContext } from "../../contexts/authContext";
import ThreeDotsMenu from "../ui/ThreeDotsMenu";
import { Button, Input, useDisclosure } from "@heroui/react";
import { apiServices } from "../../services/api";
import DeleteBtn from "../ui/DeleteBtn";
import DeleteModal from "../ui/DeleteModal";
import { successToast } from "../ui/toast";
import { queryClient } from "../../App";
import { getRelativeTime } from "../ui/Time";

export default function Comment({ comment, deleteComment, postOwnerId }) {
  const { userData } = useContext(authContext);
  const [isInEditeMode, setIsInEditeMode] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const [isUpdating, setIsUpdating] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commentImage, setCommentImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(comment.image || null);
  const imageInputRef = useRef(null);

  async function updateFunction() {
    setIsUpdating(true);

    const formData = new FormData();
    formData.set("content", commentContent);

    if (commentImage) {
      formData.set("image", commentImage);
    }

    try {
      await apiServices.updateComment(comment.post, comment._id, formData);
      await queryClient.invalidateQueries(["posts"]);

      setIsInEditeMode(false);
      setCommentImage(null);
      successToast("Your Comment Updated Successfully");
    } finally {
      setIsUpdating(false);
    }
  }

  function handleCancel() {
    setIsInEditeMode(false);
    setCommentContent(comment.content);
    setCommentImage(null);
    setImagePreview(comment.image || null);
  }

  return (
    <div className="flex gap-3 items-start group mt-2">
      <Link className="p-[1.5px] border border-[#9d9fa1] rounded-full shrink-0">
        <img
          src={comment.commentCreator?.photo || userAvatar}
          onError={(e) => {
            e.target.src = userAvatar;
          }}
          className="w-8 h-8 rounded-full border border-white object-cover"
          alt="User"
        />
      </Link>

      <div className="flex-1">
        <div className="bg-[#F0F2F5] rounded-2xl rounded-tl-none px-4 py-2 shadow-sm w-full relative">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <h6 className="font-bold text-xs text-gray-900">
                {comment.commentCreator?.name}
              </h6>
              <span className="text-[10px] text-gray-500 font-normal">
                {getRelativeTime(comment.createdAt)}
              </span>
            </div>

            {comment.commentCreator?._id === userData?._id && (
              <ThreeDotsMenu
                deleteFunction={onOpen}
                updateFunction={() => setIsInEditeMode(true)}
              />
            )}

            {postOwnerId === userData?._id &&
              comment.commentCreator?._id !== userData?._id && (
                <DeleteBtn deleteComment={onOpen} />
              )}
          </div>

          <DeleteModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={() => deleteComment(comment._id)}
            title="Delete Comment"
            message="Permanently delete this comment?"
          />

          {isInEditeMode ? (
            <div className="space-y-3">
              <Input
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                size="sm"
                variant="bordered"
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => imageInputRef.current.click()}
                  className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition text-[12px]"
                >
                  <i className="fa-regular fa-image text-lg"></i>
                  <span>Change Photo</span>
                </button>
                <input
                  type="file"
                  ref={imageInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setCommentImage(e.target.files[0]);
                      setImagePreview(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
              </div>

              {/* معاينة الصورة في وضع التعديل */}
              {imagePreview && (
                <div className="relative w-20 h-20 border rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                  <button
                    onClick={() => {
                      setCommentImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 flex items-center justify-center text-[10px]"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-2">
                <Button
                  size="sm"
                  isLoading={isUpdating}
                  onPress={updateFunction}
                  color="primary"
                  className="rounded-xl"
                >
                  Update
                </Button>
                <button
                  onClick={handleCancel}
                  className="text-xs hover:text-red-500 transition-all font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {comment.content && (
                <p className="text-gray-700 text-[14px] leading-snug">
                  {comment.content}
                </p>
              )}
              {/* عرض الصورة المخزنة في الكومنت */}
              {comment.image && (
                <div className="mt-2 rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={comment.image}
                    alt="Comment attachment"
                    className="w-full max-h-64 object-cover"
                  />
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-4 mt-1 ml-2 text-[12px] font-semibold text-gray-500">
          <button className="hover:text-blue-600 transition cursor-pointer">
            Like ({comment.likes?.length || 0})
          </button>
          <span className="text-gray-300">•</span>
          <button className="hover:text-blue-600 transition cursor-pointer">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
