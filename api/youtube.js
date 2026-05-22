export default async function handler(req, res) {
  const { channelId, maxResults = 8, order = "date", type = "video" } = req.query;

  if (!channelId) {
    return res.status(400).json({ error: "channelId is required" });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "YouTube API key not configured" });
  }

  const params = new URLSearchParams({ key: apiKey, channelId, part: "snippet", order, type, maxResults });
  const upstream = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
  const data = await upstream.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(upstream.status).json(data);
}
