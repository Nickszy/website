import Link from "next/link";
import { getAllPosts, getBlogMetadata } from "@/lib/blog";
import { BookOpen, Tag, Search, FileText, Layers, Hash } from "lucide-react";
import { BlogSearchInput } from "@/components/blog-search-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const metadata = {
  title: "博客",
  description: "投资理财思考、AI工具实践、效率方法论",
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string, series?: string, q?: string }> }) {
  const { category, series, q } = await searchParams;
  let posts = getAllPosts();

  // Apply filters
  if (category) {
    posts = posts.filter(post => post.tags.includes(category));
  }
  if (series) {
    posts = posts.filter(post => post.series === series);
  }
  if (q) {
    const query = q.toLowerCase().trim();
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.description.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  const { series: seriesData, tags: tagsData, totalPosts } = getBlogMetadata();
  const allSeries = Object.keys(seriesData);
  const tagEntries = Object.entries(tagsData);

  const hasActiveFilters = !!(series || category || q);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <h1 className="text-3xl font-bold sm:text-4xl">
          {category ? `#${category}` : series ? `📚 ${series}` : "博客"}
        </h1>
        <p className="mt-3 text-muted">
          投资理财思考、AI工具实践、效率方法论
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Main Column: Series Filter & Posts List */}
        <div className="space-y-6 lg:col-span-3">
          {/* Series Filters */}
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/blog${category ? `?category=${encodeURIComponent(category)}` : ""}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className={`rounded-lg border px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                !series
                  ? "border-accent bg-accent/10 text-accent font-semibold"
                  : "border-border bg-card text-muted hover:border-accent/30 hover:text-accent"
              }`}
            >
              全部系列
            </Link>
            {allSeries.map((s) => (
              <Link
                key={s}
                href={`/blog?series=${encodeURIComponent(s)}${category ? `&category=${encodeURIComponent(category)}` : ""}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                className={`rounded-lg border px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  series === s
                    ? "border-accent bg-accent/10 text-accent font-semibold"
                    : "border-border bg-card text-muted hover:border-accent/30 hover:text-accent"
                }`}
              >
                {s} <span className="opacity-60 text-xs font-normal">({seriesData[s]})</span>
              </Link>
            ))}
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted">当前筛选：</span>
                {series && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-accent/10 border border-accent/20 px-2 py-0.5 text-xs text-accent font-medium">
                    📚 系列: {series}
                    <Link
                      href={`/blog?${new URLSearchParams({
                        ...(category ? { category } : {}),
                        ...(q ? { q } : {}),
                      }).toString()}`}
                      className="ml-1 text-accent/60 hover:text-accent font-bold text-sm"
                    >
                      ×
                    </Link>
                  </span>
                )}
                {category && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-accent/10 border border-accent/20 px-2 py-0.5 text-xs text-accent font-medium">
                    🏷️ 标签: {category}
                    <Link
                      href={`/blog?${new URLSearchParams({
                        ...(series ? { series } : {}),
                        ...(q ? { q } : {}),
                      }).toString()}`}
                      className="ml-1 text-accent/60 hover:text-accent font-bold text-sm"
                    >
                      ×
                    </Link>
                  </span>
                )}
                {q && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-accent/10 border border-accent/20 px-2 py-0.5 text-xs text-accent font-medium">
                    🔍 搜索: &quot;{q}&quot;
                    <Link
                      href={`/blog?${new URLSearchParams({
                        ...(series ? { series } : {}),
                        ...(category ? { category } : {}),
                      }).toString()}`}
                      className="ml-1 text-accent/60 hover:text-accent font-bold text-sm"
                    >
                      ×
                    </Link>
                  </span>
                )}
              </div>
              <Link
                href="/blog"
                className="text-xs text-muted hover:text-accent transition-colors"
              >
                清除全部
              </Link>
            </div>
          )}

          {/* Posts List */}
          {posts.length > 0 ? (
            <div className="flex flex-col gap-6">
              {posts.map((post) => (
                <div
                  key={post.slug}
                  className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-xs text-muted">
                      <time>{new Date(post.date).toLocaleDateString("zh-CN")}</time>
                      <span>·</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h2 className="text-lg font-semibold sm:text-xl">
                      <Link href={`/blog/${post.slug}`} className="hover:text-accent group-hover:text-accent transition-colors">
                        {post.draft && <span className="text-yellow-600 mr-2">[草稿]</span>}
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {post.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-1.5 items-center border-t border-border/40 pt-3">
                    {post.series && (
                      <Link
                        href={`/blog?series=${encodeURIComponent(post.series)}${category ? `&category=${encodeURIComponent(category)}` : ""}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                        className="rounded-md border border-accent/20 bg-accent/5 px-2 py-0.5 text-xs text-accent font-medium transition-colors hover:bg-accent/15"
                      >
                        📚 系列：{post.series}
                      </Link>
                    )}
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?category=${encodeURIComponent(tag)}${series ? `&series=${encodeURIComponent(series)}` : ""}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                        className={`rounded-md border px-2 py-0.5 text-xs transition-colors ${
                          category === tag
                            ? "border-accent/30 bg-accent/10 text-accent font-medium"
                            : "border-transparent bg-muted/10 text-muted hover:border-border hover:bg-muted/20 hover:text-foreground"
                        }`}
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-16 text-center">
              <BookOpen size={48} className="mx-auto mb-4 text-muted animate-pulse" />
              <h3 className="text-lg font-semibold">没有找到匹配的文章</h3>
              <p className="mt-2 text-muted text-sm">尝试调整搜索词或过滤器，或者点击下方按钮清除全部筛选。</p>
              <Link
                href="/blog"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-light transition-colors"
              >
                清除所有筛选
              </Link>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4 lg:col-span-1 lg:sticky lg:top-24 h-fit">
          {/* Profile Card */}
          <Card>
            <CardContent className="pt-0 pb-0 px-0">
              {/* Gradient banner */}
              <div className="h-16 bg-gradient-to-br from-accent/90 via-accent to-blue-500 relative">
                <div className="absolute -bottom-5 left-4">
                  <Avatar size="lg" className="border-3 border-card shadow-md">
                    <AvatarFallback className="bg-accent text-primary-foreground font-bold text-base">
                      探
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="pt-7 px-4 pb-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">探长 · AI 实践</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">用代码构建被动收入，用 AI 提升决策</p>
                </div>
                <Separator className="my-3" />
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex items-center gap-1 text-accent font-bold text-sm">
                      <FileText size={13} />
                      {totalPosts}
                    </div>
                    <span className="text-[11px] text-muted-foreground">文章</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex items-center gap-1 text-accent font-bold text-sm">
                      <Layers size={13} />
                      {allSeries.length}
                    </div>
                    <span className="text-[11px] text-muted-foreground">系列</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex items-center gap-1 text-accent font-bold text-sm">
                      <Hash size={13} />
                      {tagEntries.length}
                    </div>
                    <span className="text-[11px] text-muted-foreground">标签</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search Card */}
          <Card size="sm">
            <CardContent>
              <BlogSearchInput />
            </CardContent>
          </Card>

          {/* Tags Cloud Card */}
          <Card size="sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  <Tag size={13} className="text-accent" />
                  标签
                </span>
                {category && (
                  <Link
                    href={`/blog?${new URLSearchParams({
                      ...(series ? { series } : {}),
                      ...(q ? { q } : {}),
                    }).toString()}`}
                    className="text-[11px] text-accent hover:text-accent-light font-normal normal-case tracking-normal"
                  >
                    清除
                  </Link>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {tagEntries.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {tagEntries.map(([name, count]) => {
                    const isActive = category === name;
                    return (
                      <Link
                        key={name}
                        href={
                          isActive
                            ? `/blog?${new URLSearchParams({
                                ...(series ? { series } : {}),
                                ...(q ? { q } : {}),
                              }).toString()}`
                            : `/blog?category=${encodeURIComponent(name)}${series ? `&series=${encodeURIComponent(series)}` : ""}${q ? `&q=${encodeURIComponent(q)}` : ""}`
                        }
                      >
                        <Badge
                          variant={isActive ? "default" : "secondary"}
                          className={`cursor-pointer gap-1 ${
                            isActive
                              ? ""
                              : "hover:bg-accent/10 hover:text-accent"
                          }`}
                        >
                          {name}
                          <span className={`ml-0.5 inline-flex items-center justify-center rounded-full px-1 text-[10px] leading-none ${
                            isActive
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "text-muted-foreground"
                          }`}>
                            {count}
                          </span>
                        </Badge>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">暂无标签</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

