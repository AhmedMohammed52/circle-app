import { Skeleton } from "@heroui/react";

export default function ProfileCardSkelton() {
  return (
    // مجرد div أبيض بيمثل الكارت، بدون aside برا
    <div className="bg-white rounded-4xl overflow-hidden shadow-sm border border-slate-50 w-full">
      <Skeleton className="h-20 w-full" />
      <div className="px-5 pb-6">
        <div className="relative -mt-10 mb-3 flex justify-center lg:justify-start">
          <Skeleton className="w-20 h-20 rounded-[22px] border-4 border-white" />
        </div>
        <div className="space-y-3">
          <Skeleton className="w-3/4 h-4 rounded-lg" />
          <Skeleton className="w-1/2 h-3 rounded-lg opacity-50" />
        </div>
      </div>
    </div>
  );
}
