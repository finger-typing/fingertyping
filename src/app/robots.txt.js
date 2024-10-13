// File: app/robots.txt.js

export async function GET() {
  const content = `
    # robots.txt for https://fingertyping.com

    # Allow all crawlers full access to public pages
    User-agent: *
    Allow: /

    # Disallow access to Next.js API routes, admin, and other private sections
    Disallow: /api/
    Disallow: /admin/
    Disallow: /login/
    Disallow: /register/
    Disallow: /dashboard/

    # Disallow access to search result pages or dynamically generated content (if any)
    Disallow: /search/
    Disallow: /user-profile/

    # Block query parameters for better crawl efficiency
    Disallow: /*?*

    # Specify the location of the sitemap
    Sitemap: https://fingertyping.com/sitemap.xml
  `;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
