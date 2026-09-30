export const revalidate = 300; // revalidate every 5 minutes

import type { Metadata } from "next";
import { LatestUpdates } from "@/components/latest-updates";

export const metadata: Metadata = {
  title: "最新动态",
  description: "博客文章、应用更新、YouTube 视频的最新动态时间线",
};

export default function UpdatesPage() {
  return (
    <div className="flex flex-col">
      <div className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <h1 className="text-xl font-bold">最新动态</h1>
          <p className="mt-1 text-sm text-muted">
            博客、应用、YouTube 的所有更新都在这里
          </p>
        </div>
      </div>
      <LatestUpdates />
    </div>
  );
}
