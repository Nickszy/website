"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

type NavLink = {
  href?: string;
  label: string;
  subLinks?: { href: string; label: string }[];
};

const navLinks: NavLink[] = [
  { href: "/", label: "首页" },
  {
    label: "投资",
    subLinks: [
      { href: "/blog?category=基金", label: "基金" },
      { href: "/blog?category=港美股", label: "港美股" },
      { href: "/blog?category=行业分析", label: "行业分析" },
    ],
  },
  {
    label: "AI 实践",
    subLinks: [
      { href: "/blog?category=AI工具", label: "AI 工具" },
      { href: "/blog?category=大模型", label: "大模型" },
    ],
  },
  { href: "/blog", label: "博客" },
  { href: "/apps", label: "应用" },
  { href: "/about", label: "关于" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="text-accent">探长</span>
          <span className="hidden text-muted sm:inline">· AI 实践主页</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) =>
            link.subLinks ? (
              <div key={link.label} className="group relative">
                <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-card-hover hover:text-foreground">
                  {link.label}
                  <ChevronDown
                    size={14}
                    className="transition-transform group-hover:rotate-180"
                  />
                </button>
                <div className="absolute left-0 top-full mt-1 hidden w-40 flex-col rounded-xl border border-border bg-card p-2 shadow-lg group-hover:flex">
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-card-hover hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
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
          {navLinks.map((link) =>
            link.subLinks ? (
              <div key={link.label} className="flex flex-col">
                <div className="px-3 py-2 text-sm font-medium text-foreground">
                  {link.label}
                </div>
                <div className="ml-4 flex flex-col gap-1 border-l border-border pl-2">
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-card-hover hover:text-foreground"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-card-hover hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}
