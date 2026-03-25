import { Skeleton } from "@heroui/react";

export default function SuggestionsSkelton() {
  return (
    <div className="bg-white rounded-4xl p-6 shadow-sm border border-slate-50 w-full">
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <Skeleton className="w-1/2 h-4 rounded-lg" />
      </div>

      <div className="space-y-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="w-11 h-11 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-3/4 h-3 rounded-lg" />
              <Skeleton className="w-1/2 h-2 rounded-lg" />
            </div>
            <Skeleton className="w-12 h-8 rounded-lg" />
          </div>
        ))}
      </div>

      {/* زرار "عرض الكل" تحت */}
      <Skeleton className="w-full h-10 rounded-xl mt-6" />
    </div>
  );
}
