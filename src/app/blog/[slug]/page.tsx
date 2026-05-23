import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "文章未找到" };
  return {
    title: post.title,
    description: post.description,
  };
}

function renderMarkdown(content: string) {
  // Simple markdown-to-HTML for static rendering
  let html = content
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Headers
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Blockquotes
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    // Horizontal rules
    .replace(/^---$/gm, "<hr />")
    // Unordered lists
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Paragraphs
    .replace(/\n\n/g, "</p><p>");

  // Wrap loose li in ul
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>");
  html = html.replace(/<\/ul>\s*<ul>/g, "");

  return html;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = renderMarkdown(post.content);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted hover:text-accent"
      >
        <ArrowLeft size={14} />
        返回博客
      </Link>

      <header className="mb-10">
        <div className="mb-3 flex items-center gap-2 text-sm text-muted">
          <time>{new Date(post.date).toLocaleDateString("zh-CN")}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
          {post.draft && <span className="text-yellow-600 mr-2">[草稿]</span>}
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-4 text-lg text-muted">{post.description}</p>
        )}
        
        <div className="mt-4 flex flex-wrap gap-1.5 items-center">
          {post.series && (
            <span className="rounded-md border border-accent/20 bg-accent/5 px-2 py-0.5 text-xs text-accent font-medium">
              📚 系列：{post.series}
            </span>
          )}
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted/10 px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
