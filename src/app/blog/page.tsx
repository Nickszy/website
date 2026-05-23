import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "博客",
  description: "投资理财思考、AI工具实践、效率方法论",
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  let posts = getAllPosts();
  if (category) {
    posts = posts.filter(post => post.tags.includes(category));
  }
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <h1 className="text-3xl font-bold sm:text-4xl">
          {category ? `${category}` : "博客"}
        </h1>
        <p className="mt-3 text-muted">
          投资理财思考、AI工具实践、效率方法论
        </p>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?category=${tag}`}
              className={`rounded-lg border px-3 py-1 text-sm transition-colors ${
                category === tag
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-card text-muted hover:border-accent/30 hover:text-accent"
              }`}
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      {/* Posts */}
      {posts.length > 0 ? (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-md"
            >
              <div className="mb-2 flex items-center gap-2 text-xs text-muted">
                <time>{new Date(post.date).toLocaleDateString("zh-CN")}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="text-lg font-semibold group-hover:text-accent sm:text-xl">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {post.description}
              </p>
              {post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
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
        <div className="rounded-xl border border-dashed border-border p-16 text-center">
          <BookOpen size={48} className="mx-auto mb-4 text-muted" />
          <h3 className="text-lg font-semibold">还没有文章</h3>
          <p className="mt-2 text-muted">文章正在路上，请稍后再来看看。</p>
        </div>
      )}
    </div>
  );
}
