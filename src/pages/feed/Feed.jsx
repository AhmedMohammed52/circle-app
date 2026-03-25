import { useContext } from "react";
import { authContext } from "../../contexts/authContext";
import { useQuery } from "@tanstack/react-query";
import { apiServices } from "../../services/api";

import ProfileCard from "./ProfileCard";
import Suggestions from "./Suggestions";
import CreatePost from "../../components/post/CreatePost";
import Post from "../../components/post/Post";

import ProfileCardSkelton from "../../components/ui/skelton/ProfileCardSkelton";
import PostSkeleton from "../../components/ui/skelton/PostSkeleton";
import SuggestionsSkelton from "../../components/ui/skelton/SuggestionsSkelton";
import { Spinner } from "@heroui/react";

export default function Feed() {
  const { userData } = useContext(authContext);

  const {
    data: posts = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiServices.getPosts(),
    select: (data) => data.data.posts,
  });

  return (
    <div className="bg-[#F0F2F5] min-h-screen pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-12 gap-8">
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 h-fit">
          {isLoading ? <ProfileCardSkelton /> : <ProfileCard user={userData} />}
        </aside>

        <main className="col-span-12 md:col-span-7 lg:col-span-6 space-y-6 relative">
          {isFetching && !isLoading && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-white p-2 rounded-full shadow-md border border-slate-100 z-50">
              <Spinner size="sm" color="primary" />
            </div>
          )}

          <CreatePost />

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          ) : (
            posts.map((post) => <Post post={post} key={post._id} />)
          )}
        </main>

        {/* العمود الأيمن */}
        <aside className="hidden md:block md:col-span-5 lg:col-span-3 sticky top-24 h-fit">
          {isLoading ? <SuggestionsSkelton /> : <Suggestions />}
        </aside>
      </div>
    </div>
  );
}
