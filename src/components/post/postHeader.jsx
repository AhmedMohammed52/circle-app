import { useContext } from "react";
import userAvatar from "../../assets/user avatar.jpg";
import { authContext } from "../../contexts/authContext";
import ThreeDotsMenu from "../ui/ThreeDotsMenu";
import { useDisclosure } from "@heroui/react";
import DeleteModal from "../ui/DeleteModal";
import { Link } from "react-router-dom";
import { getRelativeTime } from "../ui/Time";

export default function PostHeader({
  userName,
  userPhoto,
  createTime,
  creatorId,
  deletePost,
  updatePost,
}) {
  const { userData } = useContext(authContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link
          to={`/profile/${creatorId}`}
          className="relative p-0.5 border-2 border-[#0866FF] rounded-full cursor-pointer"
        >
          <img
            src={userPhoto}
            onError={(e) => {
              e.target.src = userAvatar;
            }}
            alt={userName}
            className="w-12 h-12 rounded-full object-cover border border-gray-100"
          />
        </Link>

        <div>
          <Link to={`/profile/${creatorId}`}>
            <h5 className="font-bold text-gray-900 leading-tight flex items-center gap-1 hover:underline cursor-pointer ">
              {userName}
            </h5>
          </Link>

          <span className="text-gray-400 font-normal">
            • {getRelativeTime(createTime)}
          </span>
        </div>
      </div>

      {creatorId == userData?._id && (
        <ThreeDotsMenu deleteFunction={onOpen} updateFunction={updatePost} />
      )}

      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={deletePost}
        title="Delete Post"
        message="Permanently delete this Post?"
      />
    </div>
  );
}
