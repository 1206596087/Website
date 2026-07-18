export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: https://nameapp.uk/sitemap.xml
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
