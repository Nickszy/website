import { Mail, MapPin, Coffee } from "lucide-react";

export const metadata = {
  title: "关于",
  description: "关于探长",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">关于我</h1>

      <div className="mt-8 flex flex-col gap-8">
        {/* Intro */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/10 text-2xl font-bold text-accent">
              探
            </div>
            <div>
              <h2 className="text-xl font-semibold">探长</h2>
              <p className="mt-1 text-sm text-muted">独立开发者 / 投资爱好者</p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted">
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> 中国
                </span>
                <span className="flex items-center gap-1">
                  <Mail size={14} /> hi@nickszy.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-4 text-base leading-relaxed text-muted">
          <p>
            你好，我是探长。一个对投资理财、AI
            技术和效率工具有着浓厚兴趣的独立开发者。
          </p>
          <p>
            我相信好的工具和正确的方法论可以极大提升个人效率。这个网站记录了我在投资理财上的思考和实践中开发的各种工具。
          </p>
          <p>
            我关注的主要领域包括：价值投资、量化分析、AI 应用开发、以及如何用技术手段解决实际问题。
          </p>
        </div>

        {/* What I do */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              📈
            </div>
            <h3 className="font-semibold">投资理财</h3>
            <p className="mt-1 text-sm text-muted">
              分享投资思考、市场分析和理财方法论。
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
              🛠️
            </div>
            <h3 className="font-semibold">工具开发</h3>
            <p className="mt-1 text-sm text-muted">
              开发实用的分析工具和效率应用，解决实际问题。
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
              <Coffee size={20} />
            </div>
            <h3 className="font-semibold">独立思考</h3>
            <p className="mt-1 text-sm text-muted">
              保持独立思考，不随波逐流，记录真实想法。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
