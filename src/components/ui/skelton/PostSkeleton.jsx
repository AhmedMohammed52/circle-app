import { Card, Skeleton } from "@heroui/react";

export default function PostSkeleton() {
  return (
    <Card className="w-full p-4 space-y-5 rounded-[30px] shadow-sm bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-3">
        <Skeleton className="flex rounded-full w-12 h-12" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24 rounded-lg" />
          <Skeleton className="h-2 w-16 rounded-lg" />
        </div>
      </div>

      <div className="space-y-3">
        <Skeleton className="w-full rounded-lg">
          <div className="h-3 w-full rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>

      <Skeleton className="rounded-2xl">
        <div className="h-64 rounded-2xl bg-default-300"></div>
      </Skeleton>

      <div className="flex justify-between items-center pt-2">
        <div className="flex gap-4">
          <Skeleton className="w-16 h-8 rounded-full" />
          <Skeleton className="w-16 h-8 rounded-full" />
        </div>
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </Card>
  );
}
