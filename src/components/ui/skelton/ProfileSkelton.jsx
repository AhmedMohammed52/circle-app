import { Card, Skeleton } from "@heroui/react";
import PostSkeleton from "../skelton/PostSkeleton";

export default function ProfileSkeleton() {
  return (
    <div className="bg-[#F0F2F5] min-h-screen mt-20 pb-20 font-sans">
      {/* Container مطابق تماماً لـ Profile.jsx والـ Navbar */}
      <div className="max-w-7xl mx-auto pt-6 px-4 md:px-6">
        {/* هيدر البروفايل سكلتون */}
        <section className="mb-8 w-full">
          <Card className="rounded-4xl p-0 overflow-hidden border-none shadow-sm bg-white">
            {/* مكان صورة الكفر */}
            <Skeleton className="h-48 md:h-64 w-full" />

            <div className="px-8 pb-8 relative">
              <div className="flex flex-col md:flex-row items-end gap-6 -mt-16">
                {/* مكان الصورة الشخصية */}
                <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-md shrink-0" />

                {/* مكان الاسم واليوزر نيم */}
                <div className="flex-1 pb-4 space-y-3">
                  <Skeleton className="h-8 w-64 rounded-xl" />
                  <Skeleton className="h-4 w-40 rounded-lg opacity-60" />
                </div>

                {/* مكان إحصائيات البوستات والـ Followers */}
                <div className="flex gap-8 pb-4 pr-4">
                  <div className="space-y-2 flex flex-col items-center">
                    <Skeleton className="h-6 w-10 rounded-lg" />
                    <Skeleton className="h-3 w-16 rounded-lg opacity-50" />
                  </div>
                  <div className="space-y-2 flex flex-col items-center">
                    <Skeleton className="h-6 w-10 rounded-lg" />
                    <Skeleton className="h-3 w-16 rounded-lg opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* الجريد السفلي سكلتون */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* العمود الأيسر (About Skeleton) */}
          <aside className="lg:col-span-4 space-y-6">
            <Card className="p-6 rounded-4xl space-y-8 bg-white border-none shadow-sm">
              <Skeleton className="h-6 w-32 rounded-lg" />

              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="w-10 h-10 rounded-2xl shrink-0 opacity-70" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-2 w-20 rounded-lg opacity-40" />
                      <Skeleton className="h-3 w-full rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </aside>

          {/* العمود الأيمن (Posts Skeleton) */}
          <main className="lg:col-span-8 space-y-8">
            <PostSkeleton />
            <PostSkeleton />
          </main>
        </div>
      </div>
    </div>
  );
}
