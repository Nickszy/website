import { notFound } from "next/navigation";
import { apps } from "@/lib/apps";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { remark } from "remark";
import html from "remark-html";
import fs from "fs";
import path from "path";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);
  if (!app) return { title: "Not Found" };
  return { title: app.title, description: app.description };
}

export default async function AppDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);

  if (!app) {
    notFound();
  }

  let markdownContent = "暂无详细介绍。";
  try {
    const filePath = path.join(process.cwd(), "content/apps", `${slug}.md`);
    if (fs.existsSync(filePath)) {
      markdownContent = fs.readFileSync(filePath, "utf8");
    }
  } catch (e) {
    console.error(e);
  }

  const processedContent = await remark()
    .use(html)
    .process(markdownContent);
  const contentHtml = processedContent.toString();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/apps"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft size={16} />
        返回应用列表
      </Link>

      <div className="mb-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-4xl sm:h-20 sm:w-20">
              {app.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{app.title}</h1>
              <p className="mt-2 text-muted">{app.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {app.projectType && (
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {app.projectType}
                  </span>
                )}
                {app.pricing && (
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    app.pricing === "Free" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                    app.pricing === "Paid" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" :
                    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                  }`}>
                    {app.pricing}
                  </span>
                )}
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    app.status === "live"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
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
            </div>
          </div>
          
          <div className="shrink-0">
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-light sm:w-auto"
            >
              {app.projectType === "GitHub" ? "前往 GitHub" : 
               app.projectType === "AI Skill" ? "开始对话" : "访问体验"}
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>

      <div 
        className="prose prose-zinc dark:prose-invert max-w-none 
          [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 
          [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-4 
          [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-muted-foreground
          [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2 [&>ul>li]:text-muted-foreground
          [&>blockquote]:border-l-4 [&>blockquote]:border-accent/50 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
