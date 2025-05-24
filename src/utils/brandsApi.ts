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
    let offset = 0;
    let hasMore = true;
    let pageCounter = 1;
    const visitedUrls = new Set<string>();

    while (hasMore) {
      try {
        // Construct URL with offset (only add parameter if offset > 0)
        const url = offset === 0 
          ? baseUrl 
          : `${baseUrl}?offset=${offset}`;

        if (visitedUrls.has(url)) {
          console.warn(`Duplicate URL detected: ${url} - stopping pagination`);
          break;
        }
        visitedUrls.add(url);

        console.log(`Fetching brands page ${pageCounter} [offset: ${offset}]`);

        // Rotating proxy endpoints with fallback
        const proxies = [
          `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
          `https://corsproxy.io/?${encodeURIComponent(url)}`,
          url // Direct attempt
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
          offset: data?.offset
        });

        // Process items regardless of count
        if (data?.items) {
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
          }
        }

        // Update pagination control
        hasMore = data?.hasMore === true;
        
        // Explicitly set next offset (ignore any offset value from response)
        if (hasMore) {
          offset += 25; // Always increment by 25 for next page
          pageCounter++;
        }

        // Rate limiting delay
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (pageError) {
        console.error(`Brands page ${pageCounter} error:`, pageError);
        // Retry current page after delay
        await new Promise(resolve => setTimeout(resolve, 2000));
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
