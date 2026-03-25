import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiServices } from "../../services/api";
import { queryClient } from "../../App";

export default function PostFooter({
  postId,
  likesCount,
  commentsCount,
  sharesCount,
  onCommentClick,
  isLikedInitially,
}) {
  const [liked, setLiked] = useState(isLikedInitially || false);
  const [likes, setLikes] = useState(likesCount || 0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLiked(isLikedInitially);
  }, [isLikedInitially]);

  useEffect(() => {
    setLikes(likesCount);
  }, [likesCount]);

  async function handleLike() {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await apiServices.getPostLikes(postId);

      if (response.success) {
        setLiked((prevLiked) => {
          setLikes((prevLikes) => (prevLiked ? prevLikes - 1 : prevLikes + 1));
          return !prevLiked;
        });

        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["myPosts"]);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-2! sm:px-4 py-2 sm:py-3 border-b border-gray-100 text-slate-500!">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#1877F2] rounded-full flex items-center justify-center shadow-sm shrink-0">
            <i className="fa-solid fa-thumbs-up text-white text-[8px] sm:text-[10px]"></i>
          </div>
          <span className="text-[#65676B] text-[12px] sm:text-sm font-normal">
            {likes} likes
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[#65676B] text-xs sm:text-sm font-normal">
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-arrows-rotate text-[10px] sm:text-xs opacity-70"></i>
            <span>{sharesCount || 0} shares</span>
          </div>

          <div className="flex items-center gap-1">
            <span>{commentsCount || 0} comments</span>
          </div>

          <Link
            className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]"
            to={"/posts/" + postId}
          >
            View details
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-around py-0.5 sm:py-1 px-1 sm:px-2">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 rounded-md transition-all ${
            liked
              ? "text-[#1877F2] bg-blue-50/50"
              : "text-[#65676B] hover:bg-gray-100"
          }`}
        >
          <i
            className={`${liked ? "fa-solid" : "fa-regular"} fa-thumbs-up text-[16px] sm:text-lg`}
          ></i>
          <span className="font-semibold text-[13px] sm:text-[15px]">Like</span>
        </button>

        <button
          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 text-[#65676B] hover:bg-gray-100 rounded-md transition-all"
          onClick={onCommentClick}
        >
          <i className="fa-regular fa-comment text-[16px] sm:text-lg"></i>
          <span className="font-semibold text-[13px] sm:text-[15px]">
            Comment
          </span>
        </button>

        <button className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 text-[#65676B] hover:bg-gray-100 rounded-md transition-all">
          <i className="fa-solid fa-share text-[16px] sm:text-lg opacity-80"></i>
          <span className="font-semibold text-[13px] sm:text-[15px]">
            Share
          </span>
        </button>
      </div>
    </div>
  );
}
