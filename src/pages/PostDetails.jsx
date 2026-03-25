import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/post/Post";
import LoadingScreen from "../components/ui/LoadingScreen";
import { apiServices } from "../services/api";

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  let { postId } = useParams();

  async function getPostDetails() {
    const { data } = await apiServices.getPostDetails(postId);
    setPost(data.post);
  }

  async function getPostComments() {
    const { data } = await apiServices.getPostComments(postId);
    setComments(data.comments);
  }

  function getPostDetailsAndComments() {
    getPostDetails();
    getPostComments();
  }

  useEffect(() => {
    getPostDetailsAndComments();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-14 py-10">
      {post == null ? (
        <LoadingScreen />
      ) : (
        <Post
          post={post}
          comments={comments}
          getPosts={getPostDetailsAndComments}
        />
      )}
    </div>
  );
}
