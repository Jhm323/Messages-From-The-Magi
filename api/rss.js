export default async function handler(req, res) {
  const feed = await fetch("https://starofthemagi.substack.com/feed");
  const text = await feed.text();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(text);
}
