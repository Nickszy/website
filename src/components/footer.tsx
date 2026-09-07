import Link from "next/link";
import { Code, MessageCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-3 text-lg font-bold">
              <span className="text-accent">探长</span> · 理财笔记
            </div>
            <p className="text-sm leading-relaxed text-muted">
              独立开发者，关注投资理财、AI应用与效率工具。
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
              导航
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-foreground hover:text-accent">
                首页
              </Link>
              <Link href="/blog" className="text-sm text-foreground hover:text-accent">
                博客
              </Link>
              <Link href="/apps" className="text-sm text-foreground hover:text-accent">
                应用
              </Link>
              <Link href="/about" className="text-sm text-foreground hover:text-accent">
                关于
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
              联系
            </div>
            <div className="flex gap-3">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-muted hover:bg-card-hover hover:text-foreground"
                aria-label="GitHub"
              >
                <Code size={20} />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-muted hover:bg-card-hover hover:text-foreground"
                aria-label="Twitter"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="mailto:hi@nickszy.com"
                className="rounded-lg p-2 text-muted hover:bg-card-hover hover:text-foreground"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted">
          <p>© {new Date().getFullYear()} 探长 · nickszy.com · All rights reserved.</p>
          <p className="mt-2">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              浙ICP备2022032808号-1
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
