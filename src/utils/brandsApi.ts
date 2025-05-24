// Utility functions to fetch brands from the API with pagination

export interface ApiBrand {
  id: string;
  name: string;
  code?: string;
}

/**
 * Fetches brand data from the remote API using explicit offset pagination
 * @returns Array of brand items with id and name
 */
export async function fetchBrandsFromAPI(): Promise<ApiBrand[]> {
  try {
    console.log('Initiating brand data fetch with explicit offset pagination...');
    
    let allBrands: ApiBrand[] = [];
    const baseUrl = 'http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/matkcode';
    let nextUrl: string | null = baseUrl;
    let pageCounter = 1;
    const maxRetries = 3;
    const visitedUrls = new Set<string>();

    while (nextUrl) {
      let retries = 0;
      let success = false;
      
      while (retries < maxRetries && !success) {
        try {
          if (visitedUrls.has(nextUrl)) {
            console.warn(`Duplicate URL detected: ${nextUrl} - stopping pagination`);
            nextUrl = null;
            break;
          }
          visitedUrls.add(nextUrl);

          console.log(`Fetching brands page ${pageCounter}: ${nextUrl}`);

          // Rotating proxy endpoints with fallback
          const proxies = [
            `https://api.allorigins.win/get?url=${encodeURIComponent(nextUrl)}`,
            `https://corsproxy.io/?${encodeURIComponent(nextUrl)}`,
            nextUrl // Direct attempt
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
            console.error(`Page ${pageCounter} fetch failed after ${retries + 1} attempts`);
            retries++;
            await new Promise(resolve => setTimeout(resolve, 2000 * retries));
            continue;
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
            nextLink: data?.links?.find((l: any) => l.rel === 'next')?.href
          });

          // Process items
          if (data?.items?.length > 0) {
            const validBrands = data.items
              .filter((item: any) => item.mak_namear?.trim() && item.mak_sequ)
              .map((item: any) => ({
                id: item.mak_sequ.toString(),
                name: item.mak_namear.trim(),
                code: item.mak_code?.toString()
              }));

            allBrands = [...allBrands, ...validBrands];
            console.log(`Added ${validBrands.length} brands from page ${pageCounter}`);
          }

          // Determine next URL
          const nextLink = data?.links?.find((link: any) => 
            link.rel?.toLowerCase() === 'next' && link.href
          );
          
          // Update next URL using either the link or offset calculation
          nextUrl = nextLink?.href 
            ? new URL(nextLink.href, baseUrl).href
            : data?.hasMore
              ? `${baseUrl}?offset=${(data.offset || 0) + (data.items?.length || 25)}`
              : null;

          pageCounter++;
          success = true;
          await new Promise(resolve => setTimeout(resolve, 500));

        } catch (pageError) {
          console.error(`Brands page ${pageCounter} error (attempt ${retries + 1}):`, pageError);
          retries++;
          await new Promise(resolve => setTimeout(resolve, 2000 * retries));
        }
      }

      if (!success) {
        console.error(`Failed to fetch page ${pageCounter} after ${maxRetries} attempts`);
        break;
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
      
      if (cacheValid && Array.isArray(parsedData)) {
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
