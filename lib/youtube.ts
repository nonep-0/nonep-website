export function extractYouTubeVideoId(value?: string | null) {
  if (!value) return null;

  const trimmed = value.trim();

  if (!trimmed) return null;

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);

    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "").trim();
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }

    if (url.hostname.includes("youtube.com")) {
      const watchId = url.searchParams.get("v");

      if (watchId && /^[a-zA-Z0-9_-]{11}$/.test(watchId)) {
        return watchId;
      }

      const shortsMatch = url.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
      if (shortsMatch?.[1]) return shortsMatch[1];

      const embedMatch = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embedMatch?.[1]) return embedMatch[1];
    }

    return null;
  } catch {
    return null;
  }
}

export async function getYouTubeViewCount(videoId?: string | null) {
  if (!videoId) return null;

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.log("YOUTUBE_API_KEY is missing.");
    return null;
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "statistics");
  url.searchParams.set("id", videoId);
  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url.toString(), {
      next: {
        revalidate: 60 * 30,
      },
    });

    if (!response.ok) {
      console.log("YouTube API Error:", response.status, response.statusText);
      return null;
    }

    const json = await response.json();

    const viewCount = json?.items?.[0]?.statistics?.viewCount;

    if (!viewCount) {
      return null;
    }

    return Number(viewCount);
  } catch (error) {
    console.log("YouTube view count fetch failed:", error);
    return null;
  }
}