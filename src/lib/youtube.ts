export interface YouTubeVideo {
  id: string;
  title: string;
  link: string;
  published: string;
  thumbnail: string;
  description: string;
}

export async function getLatestVideos(channelId: string = "UCMKkkfwy86g71cJAiMM2YOQ", limit: number = 3): Promise<YouTubeVideo[]> {
  try {
    // The user's custom RSS feed proxy URL
    const url = "https://rss.nickszy.com/youtube/f8ef7f0e-00c9-4256-b1ff-21e196678732";
    
    // Fetch YouTube RSS feed with a 1-hour cache revalidation
    const res = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch YouTube feed: ${res.status}`);
    }

    const xml = await res.text();
    
    // Match each <entry> (Atom) or <item> (RSS 2.0) block
    const entryRegex = /<(entry|item)>([\s\S]*?)<\/\1>/g;
    const entries: string[] = [];
    let match;
    while ((match = entryRegex.exec(xml)) !== null) {
      entries.push(match[2]);
    }

    const videos: YouTubeVideo[] = entries.slice(0, limit).map((entry) => {
      // 1. Extract Video ID (support yt:videoId, guid, or parse from link)
      const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/) ||
                      entry.match(/<guid[^>]*>(.*?)<\/guid>/) ||
                      entry.match(/watch\?v=([a-zA-Z0-9_-]{11})/);
      let id = "";
      if (idMatch) {
        const rawId = idMatch[1];
        const ytMatch = rawId.match(/v=([a-zA-Z0-9_-]{11})/) || rawId.match(/embed\/([a-zA-Z0-9_-]{11})/);
        id = ytMatch ? ytMatch[1] : rawId.replace(/yt:video:/, "");
      }

      // 2. Extract Title
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      let title = titleMatch ? titleMatch[1] : "";
      title = decodeXmlEntities(title);
      
      // 3. Extract Link (href or tag content)
      let link = "";
      const linkHrefMatch = entry.match(/<link[^>]*href="([^"]+)"/) || entry.match(/<link>(.*?)<\/link>/);
      if (linkHrefMatch) {
        link = linkHrefMatch[1];
      } else {
        link = id ? `https://www.youtube.com/watch?v=${id}` : "";
      }
      
      // 4. Extract Date (prioritize original YouTube Published date from content:encoded if using proxy, fallback to standard tags)
      let published = "";
      const contentEncodedMatch = entry.match(/<(content:encoded|content)>([\s\S]*?)<\/\1>/);
      if (contentEncodedMatch) {
        const publishedDateMatch = contentEncodedMatch[2].match(/Published:\s*([^\r\n]+)/);
        if (publishedDateMatch) {
          published = publishedDateMatch[1].trim();
        }
      }
      
      if (!published) {
        const dateMatch = entry.match(/<(published|pubDate)>(.*?)<\/\1>/);
        published = dateMatch ? dateMatch[2] : new Date().toISOString();
      }
      
      // 5. Extract Thumbnail (media:thumbnail, enclosure, or media:content)
      const thumbnailMatch = entry.match(/<media:thumbnail[^>]*url="([^"]+)"/) ||
                             entry.match(/<enclosure[^>]*url="([^"]+)"/) ||
                             entry.match(/<media:content[^>]*url="([^"]+)"/);
      let thumbnail = "";
      if (thumbnailMatch) {
        thumbnail = thumbnailMatch[1];
      } else if (id) {
        thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      } else {
        thumbnail = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=640&q=80";
      }

      // 6. Extract Description (media:description or standard description)
      const descriptionMatch = entry.match(/<(media:description|description)>([\s\S]*?)<\/\1>/);
      let description = descriptionMatch ? descriptionMatch[2] : "";
      description = decodeXmlEntities(description)
        .replace(/<[^>]*>/g, "") // Strip any HTML tags
        .trim();

      return { id, title, link, published, thumbnail, description };
    });

    return videos;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}

// Simple XML entity decoder
function decodeXmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1"); // Handle CDATA if any
}
