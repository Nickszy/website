"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

type BlogMetadata = {
  series: Record<string, number>;
  tags: Record<string, number>;
  totalPosts: number;
};

export function Header({ blogMetadata }: { blogMetadata?: BlogMetadata }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const seriesEntries = blogMetadata ? Object.entries(blogMetadata.series) : [];
  const tagEntries = blogMetadata ? Object.entries(blogMetadata.tags) : [];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="text-accent">探长</span>
          <span className="hidden text-muted sm:inline">· AI 实践主页</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          <Link
            href="/"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-accent/10 text-accent"
                : "text-muted hover:bg-card-hover hover:text-foreground"
            }`}
          >
            首页
          </Link>

          <div className="group relative">
            <Link
              href="/blog"
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === "/blog" || pathname.startsWith("/blog/")
                  ? "text-accent bg-accent/10"
                  : "text-muted hover:bg-card-hover hover:text-foreground"
              }`}
            >
              博客
              <ChevronDown
                size={14}
                className="transition-transform group-hover:rotate-180"
              />
            </Link>
            <div className="absolute left-0 top-full mt-1 hidden w-[420px] grid-cols-2 gap-4 rounded-xl border border-border bg-card p-4 shadow-lg group-hover:grid">
              {/* Column 1: Series */}
              <div className="flex flex-col gap-1">
                <Link
                  href="/blog"
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                >
                  全部文章 <span className="opacity-50 font-normal">({blogMetadata?.totalPosts || 0})</span>
                </Link>
                {seriesEntries.length > 0 && (
                  <>
                    <div className="mt-3 px-3 py-1 text-xs font-semibold text-foreground/40 uppercase tracking-wider">
                      系列
                    </div>
                    {seriesEntries.map(([name, count]) => (
                      <Link
                        key={name}
                        href={`/blog?series=${encodeURIComponent(name)}`}
                        className="rounded-md px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-accent/10 hover:text-accent"
                      >
                        {name} <span className="opacity-50 font-normal text-xs">({count})</span>
                      </Link>
                    ))}
                  </>
                )}
              </div>

              {/* Column 2: Tags */}
              <div className="flex flex-col gap-1">
                {tagEntries.length > 0 && (
                  <>
                    <div className="px-3 py-1 text-xs font-semibold text-foreground/40 uppercase tracking-wider">
                      标签
                    </div>
                    <div className="flex flex-wrap gap-1 px-3">
                      {tagEntries.map(([name, count]) => (
                        <Link
                          key={name}
                          href={`/blog?category=${encodeURIComponent(name)}`}
                          className="rounded-md bg-muted/10 border border-border px-2 py-1 text-xs font-medium text-muted transition-colors hover:border-accent/30 hover:text-accent"
                        >
                          {name} <span className="opacity-50">({count})</span>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <Link
            href="/apps"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/apps"
                ? "bg-accent/10 text-accent"
                : "text-muted hover:bg-card-hover hover:text-foreground"
            }`}
          >
            应用
          </Link>
          <Link
            href="/about"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/about"
                ? "bg-accent/10 text-accent"
                : "text-muted hover:bg-card-hover hover:text-foreground"
            }`}
          >
            关于
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-muted hover:bg-card-hover sm:hidden"
          aria-label="菜单"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 pb-4 pt-2 sm:hidden">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-card-hover hover:text-foreground"
          >
            首页
          </Link>
          <div className="flex flex-col">
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-card-hover hover:text-foreground"
            >
              博客
            </Link>
            <div className="ml-4 flex flex-col gap-1 border-l border-border pl-2 pb-2">
              {seriesEntries.map(([name, count]) => (
                <Link
                  key={name}
                  href={`/blog?series=${encodeURIComponent(name)}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-card-hover hover:text-foreground"
                >
                  {name} <span className="opacity-50 text-xs">({count})</span>
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/apps"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-card-hover hover:text-foreground"
          >
            应用
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-card-hover hover:text-foreground"
          >
            关于
          </Link>
        </nav>
      )}
    </header>
  );
}
