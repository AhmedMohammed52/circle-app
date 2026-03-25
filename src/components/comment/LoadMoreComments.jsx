import { Link } from "react-router-dom";

export default function LoadMoreComments({ postId }) {
  return (
    <div className="w-full mt-2">
      <Link
        to={"/posts/" + postId}
        className="flex items-center justify-center py-2 w-full 
          text-[15px] font-semibold text-gray-500 
        hover:text-[#0866FF] 
          hover:bg-gray-100 
          rounded-lg 
          transition-all"
      >
        <i className="fa-regular fa-comment me-1"></i>
        <span>Load more comments</span>
      </Link>
    </div>
  );
}
