import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  readingTime: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts = mdxFiles.map((file) => {
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
      tags: data.tags || [],
      content,
      readingTime,
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}
