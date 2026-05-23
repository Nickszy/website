import Link from "next/link";
import { ArrowRight, TrendingUp, Sparkles, BookOpen } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { apps } from "@/lib/apps";

export default function Home() {
  const posts = getAllPosts().slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted">
              <Sparkles size={14} className="text-accent" />
              AI 开发者 · 全球套利 · 生产力黑客
            </div>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              探长的
              <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                AI 实践主页
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              用代码构建被动收入，用 AI 提升决策胜率。这里是我的数字试验田与公开构建记录。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-light"
              >
                <BookOpen size={16} />
                阅读博客
              </Link>
              <Link
                href="/apps"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card-hover"
              >
                <TrendingUp size={16} />
                我的工具
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">最新文章</h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-light"
          >
            查看全部
            <ArrowRight size={14} />
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-md"
              >
                <div className="mb-2 flex items-center gap-2 text-xs text-muted">
                  <time>{new Date(post.date).toLocaleDateString("zh-CN")}</time>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="mb-2 text-base font-semibold group-hover:text-accent sm:text-lg">
                  {post.title}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted">
                  {post.description}
                </p>
                {post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-accent/10 px-2 py-0.5 text-xs text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <BookOpen size={40} className="mx-auto mb-4 text-muted" />
            <p className="text-muted">还没有文章，即将更新...</p>
          </div>
        )}
      </section>

      {/* App Showcase */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">我的应用</h2>
            <Link
              href="/apps"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-light"
            >
              查看全部
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {apps.slice(0, 4).map((app) => (
              <Link
                key={app.slug}
                href={`/apps/${app.slug}`}
                className="group flex items-start gap-4 rounded-xl border border-border bg-background p-5 transition-all hover:border-accent/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-2xl">
                  {app.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold group-hover:text-accent">
                      {app.title}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        app.status === "live"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : app.status === "beta"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {app.status === "live"
                        ? "已上线"
                        : app.status === "beta"
                          ? "测试中"
                          : "即将推出"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{app.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold">保持关注</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            订阅获取最新的投资思考、工具推荐和开发动态。
          </p>
          <div className="mx-auto mt-6 flex max-w-sm gap-2">
            <input
              type="email"
              placeholder="输入你的邮箱"
              className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-accent"
            />
            <button className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-light">
              订阅
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
