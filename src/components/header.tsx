"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="text-accent">扑克牌冷藏室</span>
          <span className="hidden text-muted sm:inline">· 投资实战 & AI 效率</span>
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

          <Link
            href="/updates"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/updates"
                ? "bg-accent/10 text-accent"
                : "text-muted hover:bg-card-hover hover:text-foreground"
            }`}
          >
            动态
          </Link>

          <Link
            href="/blog"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/blog" || pathname.startsWith("/blog/")
                ? "bg-accent/10 text-accent font-semibold"
                : "text-muted hover:bg-card-hover hover:text-foreground"
            }`}
          >
            博客
          </Link>

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
          <Link
            href="/updates"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-card-hover hover:text-foreground"
          >
            动态
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-card-hover hover:text-foreground"
          >
            博客
          </Link>
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
