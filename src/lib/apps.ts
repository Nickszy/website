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
    url: "https://app.nickszy.com",
    tags: ["AI", "大模型", "数据分析"],
    status: "live",
    pricing: "Free",
    projectType: "Web App"
  }
];
