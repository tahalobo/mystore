// Utility functions to fetch brands from the API with pagination

export interface ApiBrand {
  id: string;
  name: string;
  code?: string;
}

/**
 * Fetches brand data from the remote API with guaranteed pagination
 * @returns Array of brand items with id and name
 */
export async function fetchBrandsFromAPI(): Promise<ApiBrand[]> {
  try {
    console.log('Initiating brand data fetch with robust pagination...');
    
    let allBrands: ApiBrand[] = [];
    let baseUrl = 'http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/matkcode';
    let limit = 25;
    let offset = 0;
    let hasMore = true;
    let pageCounter = 1;
    const maxEmptyPages = 3;
    let emptyPagesCount = 0;
    const visitedUrls = new Set<string>();

    while (hasMore && emptyPagesCount < maxEmptyPages) {
      try {
        const url = new URL(baseUrl);
        url.searchParams.set('offset', offset.toString());
        url.searchParams.set('limit', limit.toString());
        const currentUrl = url.href;

        if (visitedUrls.has(currentUrl)) {
          console.warn(`Duplicate URL detected: ${currentUrl} - stopping pagination`);
          break;
        }
        visitedUrls.add(currentUrl);

        console.log(`Fetching brands page ${pageCounter} [offset: ${offset}, limit: ${limit}]`);

        // Rotating proxy endpoints with fallback
        const proxies = [
          `https://api.allorigins.win/get?url=${encodeURIComponent(currentUrl)}`,
          `https://corsproxy.io/?${encodeURIComponent(currentUrl)}`,
          currentUrl // Direct attempt
        ];

        let response: Response | null = null;
        for (const proxy of proxies) {
          try {
            response = await fetch(proxy, {
              cache: 'no-store',
              headers: proxy.includes('corsproxy.io') ? {
                'X-Requested-With': 'XMLHttpRequest'
              } : {}
            });
            if (response.ok) break;
          } catch (error) {
            console.warn(`Proxy ${proxy} failed, trying next...`);
          }
        }

        if (!response?.ok) {
          console.error('All brand fetch attempts failed');
          break;
        }

        // Parse response data
        let data: any;
        if (response.url.includes('allorigins.win')) {
          const proxyResponse = await response.json();
          data = JSON.parse(proxyResponse.contents);
        } else {
          data = await response.json();
        }

        console.log(`Brands page ${pageCounter} response:`, {
          items: data?.items?.length,
          hasMore: data?.hasMore,
          offset: data?.offset,
          limit: data?.limit
        });

        // Update pagination parameters from response
        limit = data?.limit || limit;
        const receivedOffset = data?.offset || offset;

        // Process items regardless of count
        if (data?.items?.length > 0) {
          const validBrands = data.items
            .filter((item: any) => item.mak_namear?.trim() && item.mak_sequ)
            .map((item: any) => ({
              id: item.mak_sequ.toString(),
              name: item.mak_namear.trim(),
              code: item.mak_code?.toString()
            }));

          if (validBrands.length > 0) {
            allBrands = [...allBrands, ...validBrands];
            console.log(`Added ${validBrands.length} brands from page ${pageCounter}`);
            emptyPagesCount = 0;
          }
        } else {
          emptyPagesCount++;
          console.warn(`Empty brands page ${pageCounter} detected`);
        }

        // Multi-strategy pagination detection
        let nextUrl: string | null = null;
        
        // 1. Check explicit next link
        if (data?.links) {
          const nextLink = data.links.find((link: any) => 
            link.rel?.toLowerCase() === 'next' && link.href
          );
          if (nextLink) {
            nextUrl = new URL(nextLink.href, currentUrl).href;
          }
        }

        // 2. Use hasMore flag with offset calculation
        if (!nextUrl && data?.hasMore) {
          const nextOffset = receivedOffset + (data.items?.length || limit);
          const nextUrlObj = new URL(currentUrl);
          nextUrlObj.searchParams.set('offset', nextOffset.toString());
          nextUrl = nextUrlObj.href;
        }

        // 3. Item count-based progression
        if (!nextUrl && data?.items) {
          const expectedItems = data.limit || limit;
          if (data.items.length >= expectedItems) {
            const nextOffset = receivedOffset + expectedItems;
            const nextUrlObj = new URL(currentUrl);
            nextUrlObj.searchParams.set('offset', nextOffset.toString());
            nextUrl = nextUrlObj.href;
          }
        }

        // Update offset for next iteration
        if (nextUrl) {
          const newOffset = parseInt(new URL(nextUrl).searchParams.get('offset') || offset + limit;
          offset = Math.max(newOffset, receivedOffset + (data.items?.length || 0));
          hasMore = true;
        } else {
          hasMore = false;
        }

        pageCounter++;

        // Rate limiting delay
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (pageError) {
        console.error(`Brands page ${pageCounter} error:`, pageError);
        emptyPagesCount++;
        if (emptyPagesCount >= maxEmptyPages) break;
      }
    }

    console.log(`Total brands fetched: ${allBrands.length}`);
    
    // Update local cache
    if (allBrands.length > 0) {
      localStorage.setItem('cached_brands', JSON.stringify(allBrands));
      localStorage.setItem('brands_fetch_time', Date.now().toString());
    }

    return allBrands;

  } catch (error) {
    console.error('Global brands fetch error:', error);
    return [];
  }
}

/**
 * Retrieves brands using cache-first strategy
 * @returns Promise containing array of brands
 */
export async function getBrands(): Promise<ApiBrand[]> {
  const CACHE_TTL = 3600000; // 1 hour cache

  try {
    const cachedData = localStorage.getItem('cached_brands');
    const lastFetch = localStorage.getItem('brands_fetch_time');

    // Validate cache existence and freshness
    if (cachedData && lastFetch) {
      const cacheValid = (Date.now() - parseInt(lastFetch)) < CACHE_TTL;
      const parsedData = JSON.parse(cachedData);
      
      if (cacheValid && Array.isArray(parsedData) {
        console.log('Returning valid cached brands');
        return parsedData;
      }
    }

    console.log('Cache invalid/missing - fetching fresh brands');
    return await fetchBrandsFromAPI();

  } catch (error) {
    console.error('Brands cache read error:', error);
    return fetchBrandsFromAPI();
  }
}
