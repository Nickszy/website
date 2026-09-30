import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  TrendingUp,
  Sparkles,
  Play,
  Layers,
  Zap,
  FileText,
  Wrench,
} from "lucide-react";
import { getAllPosts, getAllSeries } from "@/lib/blog";
import { apps, type AppItem } from "@/lib/apps";
import { getLatestVideos } from "@/lib/youtube";

function statusLabel(status: AppItem["status"]) {
  return status === "live" ? "已上线" : status === "beta" ? "测试中" : "即将推出";
}

function statusClasses(status: AppItem["status"]) {
  return status === "live"
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
    : status === "beta"
      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400";
}

export default async function Home() {
  const allPosts = getAllPosts();
  const series = getAllSeries();
  const totalPosts = allPosts.length;
  const totalSeries = series.length;
  const totalApps = apps.length;
  const featuredPosts = allPosts.slice(0, 2);
  const featuredApps = apps.filter((a) => a.featured);

  // Fetch latest YouTube videos
  let videos = await getLatestVideos("UCMKkkfwy86g71cJAiMM2YOQ", 3);
  if (videos.length === 0) {
    // Beautiful high-quality fallbacks in case of build-time network offline issues
    videos = [
      {
        id: "fallback-1",
        title: "港美股开户与出入金保姆级实操：新手如何跑通全球套利闭环？",
        link: "https://www.youtube.com/@snowmoney888",
        published: new Date().toISOString(),
        thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=640&q=80",
        description: "从开户到出入金的完整实操演示，帮新手少走弯路。",
      },
      {
        id: "fallback-2",
        title: "全球资产配置实战：如何用低门槛 ETF 配比和期权对冲策略穿越牛熊？",
        link: "https://www.youtube.com/@snowmoney888",
        published: new Date().toISOString(),
        thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=640&q=80",
        description: "低门槛的 ETF 配比思路与期权对冲实操。",
      },
      {
        id: "fallback-3",
        title: "AI 时代独立开发者效率方法论：基于 Obsidian + Claudian 的双脑流写作工具",
        link: "https://www.youtube.com/@snowmoney888",
        published: new Date().toISOString(),
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=640&q=80",
        description: "分享我的 AI 写作工作流：人负责思考，AI 负责加速。",
      }
    ];
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
              <Sparkles size={12} className="text-accent" />
              探长 · AI 效率工具达人
            </div>

            <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              用投资换自由
              <br />
              <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                用 AI 换时间
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              一个持续造工具的独立开发者：KOL追踪、基金筛选、旺财 Buddy、回响等 AI 效率工具都诞生在这里，
              港美股投资笔记与一人公司实战同步公开。
            </p>

            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {["AI 工具开发", "KOL 追踪", "基金研究", "港美股", "独立开发"].map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-accent/10 px-2 py-0.5 text-[11px] text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Link
                href="/apps"
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-light"
              >
                <TrendingUp size={14} />
                我的 AI 工具
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card-hover"
              >
                <BookOpen size={14} />
                阅读博客
              </Link>
              <a
                href="https://www.youtube.com/@snowmoney888"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card-hover"
              >
                <Play size={14} className="text-red-500" />
                YouTube
              </a>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs text-muted sm:gap-6">
              <span className="flex items-center gap-1">
                <Wrench size={12} className="text-accent" />
                <strong className="text-foreground">{totalApps}</strong> 款工具
              </span>
              <span className="flex items-center gap-1">
                <FileText size={12} className="text-accent" />
                <strong className="text-foreground">{totalPosts}</strong> 文章
              </span>
              <span className="flex items-center gap-1">
                <Layers size={12} className="text-accent" />
                <strong className="text-foreground">{totalSeries}</strong> 系列
              </span>
              <span className="flex items-center gap-1">
                <Play size={12} className="text-red-500" />
                YouTube 投资频道
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Showcase */}
      {featuredApps.length > 0 && (
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Wrench size={16} className="text-accent" />
                  <h2 className="text-lg font-bold">AI 工具矩阵</h2>
                </div>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  从 KOL 分析到日常记录，我构建的 AI 效率工具都在这里持续进化
                </p>
              </div>
              <Link
                href="/apps"
                className="flex shrink-0 items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent-light"
              >
                全部应用
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredApps.map((app) => (
                <Link
                  key={app.slug}
                  href={`/apps/${app.slug}`}
                  className="group relative flex flex-col rounded-xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-2xl">
                      {app.icon}
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusClasses(app.status)}`}
                    >
                      {statusLabel(app.status)}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold group-hover:text-accent">
                    {app.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-muted">
                    {app.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {app.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-accent/10 px-1.5 py-0.5 text-[11px] text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center gap-1 text-xs font-medium text-accent">
                    {app.url && app.status === "live" ? "立即体验" : "了解详情"}
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                </Link>
              ))}

              {/* Identity card */}
              <div className="flex flex-col rounded-xl border border-dashed border-accent/40 bg-accent/5 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10">
                  <Sparkles size={20} className="text-accent" />
                </div>
                <h3 className="mt-3 text-base font-semibold">不止于此</h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted">
                  更多工具正在孵化中：投研助手、催化剂日历、开源组合追踪……
                  新想法落地后会第一时间出现在这里。
                </p>
                <div className="mt-3">
                  <Link
                    href="/apps"
                    className="flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-light"
                  >
                    查看全部 {totalApps} 款工具
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Content */}
      {featuredPosts.length > 0 && (
        <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
          <div className="mb-3 flex items-center gap-2">
            <Zap size={16} className="text-accent" />
            <h2 className="text-lg font-bold">精选内容</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all hover:border-accent/30 hover:shadow-md"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-1 text-[11px] font-medium text-accent">
                    精选推荐
                  </div>
                  <h3 className="mb-1 text-sm font-semibold leading-snug group-hover:text-accent sm:text-base">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-muted">
                    {post.description}
                  </p>
                  <div className="mt-2 text-[11px] text-muted">
                    {new Date(post.date).toLocaleDateString("zh-CN")} · {post.readingTime}
                  </div>
                </div>
              </Link>
            ))}

            <a
              href="https://www.youtube.com/@snowmoney888"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all hover:border-red-300 hover:shadow-md dark:hover:border-red-800"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-1 text-[11px] font-medium text-red-500">
                  🎬 YouTube 频道
                </div>
                <h3 className="mb-1 text-sm font-semibold leading-snug group-hover:text-red-500 sm:text-base">
                  Snow Money 投资频道
                </h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted">
                  港美股投资实战分享，ETF 策略与全球套利思路
                </p>
                <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-red-500">
                  前往频道
                  <ArrowRight size={10} />
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Blog Series */}
      {series.length > 0 && (
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
            <div className="mb-3 flex items-center gap-2">
              <Layers size={16} className="text-accent" />
              <h2 className="text-lg font-bold">博客系列</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {series.map((s) => (
                <Link
                  key={s.name}
                  href={`/blog?series=${encodeURIComponent(s.name)}`}
                  className="group rounded-lg border border-border bg-background p-4 transition-all hover:border-accent/30 hover:shadow-sm"
                >
                  <h3 className="text-sm font-semibold group-hover:text-accent">
                    {s.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted">
                    {s.count} 篇文章
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-accent">
                    查看系列
                    <ArrowRight size={10} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Videos Section */}
      {videos.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play size={18} className="text-red-500 fill-red-500" />
                <h2 className="text-xl font-bold tracking-tight">最新视频实践</h2>
              </div>
              <a
                href="https://www.youtube.com/@snowmoney888"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:text-accent-light font-medium flex items-center gap-1 transition-colors"
              >
                前往 YouTube 频道
                <ArrowRight size={12} />
              </a>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {videos.map((video) => (
                <a
                  key={video.id}
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-accent/40 hover:shadow-lg"
                >
                  {/* Thumbnail Wrapper */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      {/* Play button micro-animation */}
                      <div className="w-12 h-12 bg-red-600/90 text-white rounded-full flex items-center justify-center shadow-lg transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                        <Play size={18} className="fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-accent transition-colors mb-2">
                        {video.title}
                      </h3>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
                      <span>{new Date(video.published).toLocaleDateString("zh-CN")}</span>
                      <span className="flex items-center gap-0.5 text-red-500 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                        🎬 立即播放
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center sm:px-6">
          <h2 className="text-lg font-bold">保持关注</h2>
          <p className="mx-auto mt-1.5 max-w-sm text-xs text-muted">
            订阅获取最新的投资思考、工具推荐和开发动态。
          </p>
          <div className="mx-auto mt-4 flex max-w-sm gap-2">
            <input
              type="email"
              placeholder="输入你的邮箱"
              className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <button className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-light">
              订阅
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
