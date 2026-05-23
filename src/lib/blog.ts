import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  series?: string;
  draft?: boolean;
  content: string;
  readingTime: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  let posts = mdxFiles.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const fullPath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const wordCount = content.replace(/\s+/g, "").length;
    const readingTime = `${Math.max(1, Math.ceil(wordCount / 500))} 分钟`;

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      description: data.description || "",
      category: data.category || "随笔",
      tags: data.tags || [],
      series: data.series,
      draft: data.draft || false,
      content,
      readingTime,
    };
  });

  posts = posts.filter((post) => !post.draft);

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const decodedSlug = decodeURIComponent(slug);
  const posts = getAllPosts();
  return posts.find((post) => post.slug === decodedSlug);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export type BlogMetadata = {
  series: Record<string, number>;
  tags: Record<string, number>;
  totalPosts: number;
};

export function getBlogMetadata(): BlogMetadata {
  const posts = getAllPosts();
  const series: Record<string, number> = {};
  const tags: Record<string, number> = {};
  
  posts.forEach((post) => {
    if (post.series) {
      series[post.series] = (series[post.series] || 0) + 1;
    }
    post.tags.forEach((tag) => {
      tags[tag] = (tags[tag] || 0) + 1;
    });
  });

  // Sort by count descending
  const sortedSeries = Object.fromEntries(
    Object.entries(series).sort(([, a], [, b]) => b - a)
  );
  const sortedTags = Object.fromEntries(
    Object.entries(tags).sort(([, a], [, b]) => b - a)
  );

  return {
    series: sortedSeries,
    tags: sortedTags,
    totalPosts: posts.length,
  };
}
