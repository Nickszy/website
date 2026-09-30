import Link from "next/link";
import { ArrowRight, BookOpen, Wrench, Play, FileText, Layers, Clock } from "lucide-react";
import { getAllPosts, getAllSeries } from "@/lib/blog";
import { apps } from "@/lib/apps";
import { getLatestVideos } from "@/lib/youtube";

type ActivityItem =
  | { type: "blog"; date: string; title: string; description: string; href: string; tags: string[]; readingTime: string }
  | { type: "app"; date: string; title: string; description: string; href: string; icon: string; status: string }
  | { type: "youtube"; date: string; title: string; description: string; href: string; thumbnail: string };

const typeConfig = {
  blog: { label: "博客", icon: BookOpen, color: "text-accent", bg: "bg-accent/10" },
  app: { label: "应用", icon: Wrench, color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10" },
  youtube: { label: "视频", icon: Play, color: "text-red-500", bg: "bg-red-500/10" },
};

function daysAgo(dateStr: string): number {
  const d = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

export async function LatestUpdates() {
  const [allPosts, allSeries, videos] = await Promise.all([
    Promise.resolve(getAllPosts()),
    Promise.resolve(getAllSeries()),
    getLatestVideos("UCMKkkfwy86g71cJAiMM2YOQ", 15),
  ]);

  const activities: ActivityItem[] = [
    ...allPosts.map((p) => ({
      type: "blog" as const,
      date: p.date,
      title: p.title,
      description: p.description,
      href: `/blog/${p.slug}`,
      tags: p.tags,
      readingTime: p.readingTime,
    })),
    ...apps
      .filter((a) => a.date)
      .map((a) => ({
        type: "app" as const,
        date: a.date!,
        title: a.title,
        description: a.description,
        href: `/apps/${a.slug}`,
        icon: a.icon,
        status: a.status,
      })),
    ...videos.map((v) => ({
      type: "youtube" as const,
      date: v.published,
      title: v.title,
      description: v.description,
      href: v.link,
      thumbnail: v.thumbnail,
    })),
  ];

  activities.sort((a, b) => (a.date > b.date ? -1 : 1));
  const recent = activities.slice(0, 15);

  const lastUpdate = recent.length > 0 ? recent[0].date : null;
  const lastUpdateDays = lastUpdate ? daysAgo(lastUpdate) : null;
  const totalPosts = allPosts.length;
  const totalSeries = allSeries.length;
  const totalApps = apps.filter((a) => a.status === "live").length;

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      {/* Stats Grid */}
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="flex items-center gap-1.5 text-[11px] text-muted">
            <FileText size={12} className="text-accent" />
            文章
          </div>
          <div className="mt-1 text-xl font-bold">{totalPosts}</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="flex items-center gap-1.5 text-[11px] text-muted">
            <Layers size={12} className="text-accent" />
            系列
          </div>
          <div className="mt-1 text-xl font-bold">{totalSeries}</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="flex items-center gap-1.5 text-[11px] text-muted">
            <Wrench size={12} className="text-green-600 dark:text-green-400" />
            工具
          </div>
          <div className="mt-1 text-xl font-bold">{totalApps}</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="flex items-center gap-1.5 text-[11px] text-muted">
            <Clock size={12} className="text-muted" />
            最近更新
          </div>
          <div className="mt-1 text-xl font-bold">
            {lastUpdateDays !== null ? (
              lastUpdateDays === 0 ? "今天" : `${lastUpdateDays} 天前`
            ) : "—"}
          </div>
        </div>
      </div>

      {/* Timeline header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">动态时间线</h2>
        <div className="flex items-center gap-3">
          <a
            href="https://www.youtube.com/@snowmoney888"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-400"
          >
            <Play size={12} />
            YouTube
          </a>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-light"
          >
            查看全部
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Timeline */}
      {recent.length > 0 ? (
        <div className="relative space-y-0">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border sm:left-[19px]" />

          {recent.map((item, i) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;
            const hasThumb = item.type === "youtube" && "thumbnail" in item;

            return (
              <Link
                key={`${item.type}-${item.date}-${i}`}
                href={item.href}
                {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative flex items-start gap-3 rounded-lg p-2.5 pl-9 transition-colors hover:bg-card sm:pl-10"
              >
                <div className={`absolute left-[9px] top-4 flex h-[13px] w-[13px] items-center justify-center rounded-full ${config.bg} sm:left-[13px]`}>
                  <Icon size={9} className={config.color} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${config.bg} ${config.color}`}>
                      {config.label}
                    </span>
                    <time className="text-[11px] text-muted">
                      {new Date(item.date).toLocaleDateString("zh-CN")}
                    </time>
                    {item.type === "blog" && "readingTime" in item && (
                      <span className="text-[11px] text-muted">· {item.readingTime}</span>
                    )}
                    {item.type === "app" && "status" in item && (
                      <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                        item.status === "live"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }`}>
                        {item.status === "live" ? "已上线" : "即将推出"}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-0.5 text-sm font-semibold group-hover:text-accent line-clamp-1">
                    {item.type === "app" && "icon" in item && (
                      <span className="mr-1">{item.icon}</span>
                    )}
                    {item.title}
                  </h3>
                  <p className="line-clamp-1 text-xs text-muted">
                    {item.description}
                  </p>
                  {item.type === "blog" && "tags" in item && item.tags.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded bg-accent/10 px-1.5 py-0.5 text-[10px] text-accent">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* YouTube thumbnail */}
                {hasThumb && (
                  <div className="hidden shrink-0 overflow-hidden rounded-md sm:block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={(item as { thumbnail: string }).thumbnail}
                      alt={item.title}
                      width={120}
                      height={68}
                      className="rounded-md object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <BookOpen size={32} className="mx-auto mb-3 text-muted" />
          <p className="text-sm text-muted">还没有动态，即将更新...</p>
        </div>
      )}
    </section>
  );
}
