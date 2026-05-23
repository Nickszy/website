import { apps } from "@/lib/apps";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "我的应用",
  description: "我开发的工具和应用",
};

export default function AppsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <h1 className="text-3xl font-bold sm:text-4xl">我的应用</h1>
        <p className="mt-3 text-muted">
          我开发的一些工具和应用，希望能帮到你。
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {apps.map((app) => (
          <Link
            key={app.slug}
            href={`/apps/${app.slug}`}
            className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-3xl">
                {app.icon}
              </div>
              <div className="flex gap-2">
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
            <h2 className="text-xl font-semibold group-hover:text-accent">
              {app.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {app.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {app.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-accent/10 px-2 py-0.5 text-xs text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ExternalLink
                size={16}
                className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
