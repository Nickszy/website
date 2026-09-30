export interface AppItem {
  slug: string;
  title: string;
  description: string;
  icon: string;
  url: string; // 外部线上地址；为空字符串时详情页显示"地址整理中"
  tags: string[];
  status: "live" | "beta" | "coming-soon";
  pricing?: "Free" | "Paid" | "Freemium";
  projectType?: "Web App" | "GitHub" | "AI Skill" | "Other";
  date?: string; // 上线/更新日期
  featured?: boolean; // 是否在首页"AI 工具矩阵"精选展示
}

export const apps: AppItem[] = [
  {
    slug: "kol-tracker",
    title: "KOL追踪",
    description: "KOL 观点追踪与智能投研平台：实时追踪大 V 观点、板块情绪与热门股票。",
    icon: "📡",
    url: "https://kol.nickszy.com",
    tags: ["AI", "KOL", "投研"],
    status: "live",
    pricing: "Free",
    projectType: "Web App",
    featured: true,
  },
  {
    slug: "fund-screener",
    title: "基金筛选",
    description: "基金研究工作台：按类型、公司、规模、收益、回撤等多维度筛选基金。",
    icon: "🧮",
    url: "https://fund.nickszy.com",
    tags: ["基金", "投研", "筛选"],
    status: "live",
    pricing: "Free",
    projectType: "Web App",
    featured: true,
  },
  {
    slug: "wangcai",
    title: "旺财 Buddy",
    description: "你的 AI 管钱搭子：支付宝、微信账单一键导入，自动解析分类，AI 协助记账与结余测算。",
    icon: "🐶",
    url: "https://wangcai.nickszy.com",
    tags: ["AI", "记账", "个人财务"],
    status: "live",
    pricing: "Freemium",
    projectType: "Web App",
    featured: true,
  },
  {
    slug: "huixiang",
    title: "回响",
    description: "AI 记录伙伴：语音、文字、链接随手记，自动整理归档，让灵感在需要时回响。",
    url: "",
    icon: "🎙️",
    tags: ["AI", "记录", "知识管理"],
    status: "coming-soon",
    projectType: "Web App",
    featured: true,
  },
  {
    slug: "portfolio-tracker",
    title: "开源组合追踪工具",
    description: "完全开源的投资组合追踪器，数据掌握在自己手里，支持多券商账户同步。",
    url: "",
    icon: "📈",
    tags: ["开源", "投资", "追踪"],
    status: "beta",
    projectType: "GitHub",
  },
  {
    slug: "ai-research",
    title: "AI 投研助手",
    description: "丢给它一份几百页的年报 PDF，几秒钟提取核心财务指标、管理层预期与风险。",
    url: "",
    icon: "📑",
    tags: ["AI", "投研", "GPTs"],
    status: "coming-soon",
    projectType: "AI Skill",
  },
  {
    slug: "catalyst-calendar",
    title: "催化剂日历",
    description: "财报、审批、宏观数据等市场催化事件的日历视图，不再错过任何一个投资窗口。",
    url: "",
    icon: "📅",
    tags: ["投资", "日历", "事件驱动"],
    status: "coming-soon",
    projectType: "Web App",
  },
];
