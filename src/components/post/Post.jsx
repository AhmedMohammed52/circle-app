import PostHeader from "./postHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import LoadMoreComments from "../comment/LoadMoreComments";
import CreateCommentInput from "../comment/CreateCommentInput";
import Comment from "../comment/Comment";
import { apiServices } from "../../services/api";
import { successToast } from "../ui/toast";
import { useState } from "react";
import { queryClient } from "../../App";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Post({ post, comments }) {
  const [isEditing, setIsEditing] = useState(false);
  const [caption, setCaption] = useState(post.body);
  const [showCommentInput, setShowCommentInput] = useState(false);

  const navigate = useNavigate();

  const { data: loggedUser } = useQuery({
    queryKey: ["loggedUser"],
    queryFn: apiServices.getMyProfile,
  });

  const currentUserId = loggedUser?._id;

  async function addComment(formData) {
    const response = await apiServices.createComment(post._id, formData);
    if (response.success) {
      // getPosts();
      queryClient.invalidateQueries(["posts"]);

      successToast("Your Comment Added Sucessfuly");
    }
  }

  async function deletePost() {
    await apiServices.deletePost(post._id);

    if (comments) {
      navigate("/");
    } else {
      // getPosts();
      queryClient.invalidateQueries(["posts"]);
      successToast("Your Post Deleted Sucessfuly");
    }
  }

  async function deleteComment(commentId) {
    const response = await apiServices.deleteComment(post._id, commentId);
    if (response.success) {
      // getPosts();
      queryClient.invalidateQueries(["posts"]);

      successToast("Your Comment Deleted Sucessfuly");
    }
  }

  async function updatePost() {
    const formData = new FormData();
    formData.append("body", caption);

    const response = await apiServices.updatePost(post._id, formData);

    if (response.success) {
      setIsEditing(false);
      // getPosts();
      queryClient.invalidateQueries(["posts"]);

      successToast("Post Updated Successfully");
    }
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-visible relative">
      <PostHeader
        userName={post.user.name}
        userPhoto={post.user.photo}
        createTime={post.createdAt}
        creatorId={post.user._id}
        deletePost={deletePost}
        updatePost={() => setIsEditing(true)}
      />
      <PostBody
        caption={caption}
        image={post.image}
        isEditing={isEditing}
        setCaption={setCaption}
        onUpdate={updatePost}
        onCancel={() => setIsEditing(false)}
      />

      <div className="p-3 border-t border-gray-50">
        <PostFooter
          postId={post._id}
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          sharesCount={post.sharesCount}
          onCommentClick={() => setShowCommentInput(!showCommentInput)}
          isLikedInitially={post.likes?.some(
            (user) => user._id === currentUserId,
          )}
        />

        {showCommentInput && (
          <CreateCommentInput
            userPhoto={post.user.photo}
            addComment={addComment}
          />
        )}

        <div className="px-2 space-y-4">
          {comments
            ? comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  deleteComment={deleteComment}
                  postOwnerId={post.user._id}
                />
              ))
            : post.topComment && (
                <Comment
                  comment={post.topComment}
                  deleteComment={deleteComment}
                  key={post.topComment._id}
                  postOwnerId={post.user._id}
                />
              )}
        </div>

        {post.commentsCount > 1 && !comments && (
          <LoadMoreComments postId={post._id} />
        )}
      </div>
    </div>
  );
}
