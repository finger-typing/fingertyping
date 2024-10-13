// File: app/sitemap.xml.js

export async function GET() {
  // Define the list of URLs you want to include in your sitemap
  const pages = [
    {
      url: "https://fingertyping.com/",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://fingertyping.com/about",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://fingertyping.com/learn",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://fingertyping.com/contact",
      lastModified: new Date().toISOString(),
    },
    // Add other pages as needed, like blogs, FAQs, etc.
    {
      url: "https://fingertyping.com/blog",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://fingertyping.com/privacy",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://fingertyping.com/terms",
      lastModified: new Date().toISOString(),
    },
  ];

  // Generate XML content for the sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map((page) => {
        return `
          <url>
            <loc>${page.url}</loc>
            <lastmod>${page.lastModified}</lastmod>
          </url>
        `;
      })
      .join("")}
  </urlset>`;

  // Return the sitemap with appropriate headers
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
