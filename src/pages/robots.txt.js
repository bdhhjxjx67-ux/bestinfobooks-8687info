export const prerender = true;

export const GET = () => {
  const baseUrl = "https://bestinfobooks.info";

  const body = `
User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
  `;

  return new Response(body.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};