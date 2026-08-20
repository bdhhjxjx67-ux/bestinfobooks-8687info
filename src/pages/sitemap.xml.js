import slugify from "../utils/slugify";

export const prerender = false;

export const GET = async () => {
  const BASE_URL = "https://mycracksofts.info";

  const API_URL =
    "https://opensheet.elk.sh/1gHshryM9mQFVYC2AeSj6bhcKW8_g69EBbMPI0F8s53Y/1";

  const now = new Date().toISOString();

  const staticPages = [
    {
      loc: "",
      priority: 1.0,
    },
  ];

  let dynamicPages = [];

  try {
    const res = await fetch(API_URL);
    const matches = await res.json();

    const validMatches = matches.filter(
      (match) =>
        match.MatchID &&
        match.Team1 &&
        match.Team2 &&
        match.League
    );

    dynamicPages = validMatches.map((match) => ({
      loc: `${slugify(match.League)}/${slugify(
        `${match.Team1}-vs-${match.Team2}`
      )}/${match.MatchID}`,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Sitemap Error:", error);
  }

  const urls = [...staticPages, ...dynamicPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls
  .map(
    (url) => `
  <url>
    <loc>${BASE_URL}/${url.loc}</loc>
    <lastmod>${now}</lastmod>
<changefreq>${
  url.loc.match(/\d+$/) ? "hourly" : "daily"
}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("")}

</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};