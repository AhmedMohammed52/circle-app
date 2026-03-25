import CreatePost from "../../components//post/CreatePost";
import Post from "../../components/post/Post";

export default function MainProfileSection({ myPosts, isMyProfile }) {
  return (
    <main className="lg:col-span-8 space-y-8">
      {isMyProfile && <CreatePost />}

      <div className="space-y-6">
        {myPosts && myPosts.length > 0 ? (
          myPosts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <div className="text-center py-20 bg-white rounded-[30px] border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold">
              {isMyProfile
                ? "You haven't posted anything yet."
                : "This user hasn't posted anything yet."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
