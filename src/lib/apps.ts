export interface AppItem {
  slug: string;
  title: string;
  description: string;
  icon: string;
  url: string; // The external URL to the actual project
  tags: string[];
  status: "live" | "beta" | "coming-soon";
  pricing?: "Free" | "Paid" | "Freemium";
  projectType?: "Web App" | "GitHub" | "AI Skill" | "Other";
}

export const apps: AppItem[] = [
  {
    slug: "kol-llm-wiki",
    title: "KOL LLM Wiki 分析",
    description: "基于大语言模型（LLM）的 KOL 影响力百科库与深度分析工具。",
    icon: "🧠",
    url: "https://app.nicksyz.com",
    tags: ["AI", "大模型", "数据分析"],
    status: "live",
    pricing: "Free",
    projectType: "Web App"
  },
  {
    slug: "catalyst-calendar",
    title: "催化剂日历",
    description: "投资事件日历，追踪可能影响市场的重要事件与催化剂。",
    icon: "📅",
    url: "https://example.com",
    tags: ["投资", "日历"],
    status: "live",
    pricing: "Free",
    projectType: "Web App"
  },
  {
    slug: "portfolio-tracker",
    title: "组合追踪",
    description: "个人投资组合追踪与管理工具，实时查看资产配置。",
    icon: "💼",
    url: "https://github.com/yourusername/portfolio-tracker",
    tags: ["投资", "工具"],
    status: "beta",
    pricing: "Freemium",
    projectType: "GitHub"
  },
  {
    slug: "ai-research",
    title: "AI 投研助手",
    description: "基于 AI 的投资研究辅助工具，快速分析财报与研报。",
    icon: "🤖",
    url: "https://chatgpt.com/g/g-xxxxxx",
    tags: ["AI", "投研"],
    status: "coming-soon",
    pricing: "Free",
    projectType: "AI Skill"
  },
];
