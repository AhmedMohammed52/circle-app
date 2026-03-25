import ProfileCardSkelton from "./ProfileCardSkelton";
import PostSkeleton from "./PostSkeleton";
import SuggestionsSkelton from "./SuggestionsSkelton";

export default function FeedPageSkeleton() {
  return (
    <div className="bg-[#F0F2F5] min-h-screen pt-6 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-12 gap-8">
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 h-fit">
          <ProfileCardSkelton />
        </aside>

        {/* المنتصف - منطقة البوستات */}
        <main className="col-span-12 md:col-span-7 lg:col-span-6 space-y-6">
          {/* ملحوظة: مش هنحط سكلتون للـ CreatePost هنا 
             لأننا هنخليه يظهر الحقيقي في ملف Feed.jsx 
          */}

          <div className="space-y-6">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        </main>

        <aside className="hidden md:block md:col-span-5 lg:col-span-3 sticky top-24 h-fit">
          <SuggestionsSkelton />
        </aside>
      </div>
    </div>
  );
}
