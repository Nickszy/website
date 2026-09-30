import Link from "next/link";
import { Code, MessageCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:items-start">
          {/* Brand */}
          <div className="max-w-md">
            <div className="mb-3 text-lg font-bold">
              <span className="text-accent">探长</span> · 投资实战 & AI 效率
            </div>
            <p className="text-sm leading-relaxed text-muted">
              港美股 ETF 投资笔记、AI 工具开发与全球套利的实战记录。
            </p>
          </div>

          {/* Social */}
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted sm:text-right">
              联系
            </div>
            <div className="flex gap-3 sm:justify-end">
              <a
                href="https://www.youtube.com/@snowmoney888"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-muted hover:bg-card-hover hover:text-foreground"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
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
          <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
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

