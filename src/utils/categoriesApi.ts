// Utility functions to fetch categories from the API with robust, exhaustive pagination

export interface ApiCategory {
  id: string;
  name: string;
  code?: string;
}

/**
 * Fetches category data from the remote API with unlimited, fail-safe pagination.
 * Continues until no “next” link (or hasMore flag) remains.
 */
export async function fetchCategoriesFromAPI(): Promise<ApiCategory[]> {
  const BASE_URL = 'http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/fclass';

  const proxyTemplates = [
    (u: string) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
    (u: string) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
    (u: string) => `https://cors-anywhere.herokuapp.com/${u}`
  ];

  const allCategories: ApiCategory[] = [];
  const visited = new Set<string>();

  let currentUrl: string | null = BASE_URL;

  while (currentUrl && !visited.has(currentUrl)) {
    visited.add(currentUrl);

    // ---------- Fetch with proxy fail-over ----------
    let response: Response | null = null;
    for (const buildProxyUrl of proxyTemplates) {
      try {
        const proxyUrl = buildProxyUrl(currentUrl);
        response = await fetch(proxyUrl, { cache: 'no-store' });
        if (response.ok) break;
      } catch {
        /* try next proxy */
      }
    }
    if (!response || !response.ok) break;

    // ---------- Unwrap proxy (if needed) ----------
    let data: any;
    if (response.url.includes('allorigins.win')) {
      const wrapper = await response.json();
      data = JSON.parse(wrapper.contents);
    } else {
      data = await response.json();
    }

    // ---------- Extract items ----------
    if (Array.isArray(data.items)) {
      allCategories.push(
        ...data.items
          .filter(
            (item: any) =>
              item.fc_namear?.trim() &&
              typeof item.fc_sequ !== 'undefined' &&
              item.fc_sequ !== null
          )
          .map((item: any) => ({
            id: String(item.fc_sequ),
            name: item.fc_namear.trim(),
            code: item.fc_code ? String(item.fc_code) : undefined
          }))
      );
    }

    // ---------- Determine next URL ----------
    let nextUrl: string | undefined;

    // 1) explicit “next” link
    if (Array.isArray(data.links)) {
      const n = data.links.find(
        (l: any) => l.rel?.toLowerCase() === 'next' && l.href
      );
      if (n) nextUrl = n.href;
    }

    // 2) hasMore flag
    if (!nextUrl && data.hasMore) {
      const limit = data.limit ?? 25;
      const curOffset =
        Number(new URL(currentUrl).searchParams.get('offset') ?? '0') || 0;
      const nextOffset = curOffset + limit;
      const u = new URL(currentUrl);
      u.searchParams.set('offset', String(nextOffset));
      nextUrl = u.href;
    }

    // 3) fallback: stop when neither link nor hasMore
    currentUrl = nextUrl && !visited.has(nextUrl) ? nextUrl : null;
  }

  // ---------- Cache ----------
  localStorage.setItem('cached_categories', JSON.stringify(allCategories));
  localStorage.setItem('categories_fetch_time', Date.now().toString());

  return allCategories;
}

/**
 * Cache-first accessor with 1-hour TTL
 */
export async function getCategories(): Promise<ApiCategory[]> {
  const CACHE_MS = 3_600_000; // 1 hour

  try {
    const cached = localStorage.getItem('cached_categories');
    const ts = Number(localStorage.getItem('categories_fetch_time'));

    if (cached && ts && Date.now() - ts < CACHE_MS) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {
    /* ignore cache errors */
  }

  return fetchCategoriesFromAPI();
}
