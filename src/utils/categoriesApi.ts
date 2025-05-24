// Utility functions to fetch categories from the API with pagination

export interface ApiCategory {
  id: string;
  name: string;
  code?: string;
}

/**
 * Fetches category data from the remote API with guaranteed pagination
 * @returns Array of category items with id and name
 */
export async function fetchCategoriesFromAPI(): Promise<ApiCategory[]> {
  try {
    console.log('Starting guaranteed pagination fetch...');
    
    let allCategories: ApiCategory[] = [];
    let baseUrl = 'http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/fclass';
    let limit = 25;
    let offset = 0;
    let hasMore = true;
    let pageCounter = 1;
    const maxEmptyPages = 3;
    let emptyPagesCount = 0;

    while (hasMore && emptyPagesCount < maxEmptyPages) {
      try {
        const url = new URL(baseUrl);
        url.searchParams.set('offset', offset.toString());
        url.searchParams.set('limit', limit.toString());
        
        console.log(`Fetching page ${pageCounter} [offset: ${offset}, limit: ${limit}]`);

        // Rotating proxy endpoints
        const proxies = [
          `https://api.allorigins.win/get?url=${encodeURIComponent(url.href)}`,
          `https://corsproxy.io/?${encodeURIComponent(url.href)}`,
          url.href // Direct attempt
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
          console.error('All fetch attempts failed');
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

        console.log(`Page ${pageCounter} response:`, {
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
          const validItems = data.items
            .filter((item: any) => item.fc_namear?.trim() && item.fc_sequ)
            .map((item: any) => ({
              id: item.fc_sequ.toString(),
              name: item.fc_namear.trim(),
              code: item.fc_code?.toString()
            }));

          if (validItems.length > 0) {
            allCategories = [...allCategories, ...validItems];
            console.log(`Added ${validItems.length} items from page ${pageCounter}`);
            emptyPagesCount = 0; // Reset empty counter
          }
        } else {
          emptyPagesCount++;
          console.warn(`Empty page ${pageCounter} detected`);
        }

        // Calculate next offset
        const expectedNextOffset = offset + limit;
        const actualOffset = data?.offset || offset;
        
        // Determine if we should continue
        hasMore = data?.hasMore ?? (data?.items?.length === limit);
        
        // Always progress offset (critical fix)
        if (actualOffset >= offset) { // Ensure forward movement
          offset = actualOffset + (data?.items?.length || 0);
        } else {
          offset = expectedNextOffset;
        }

        // Final hasMore check for APIs that don't report it
        if (!hasMore && data?.items?.length > 0) {
          hasMore = true;
        }

        pageCounter++;

        // Rate limiting protection
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (pageError) {
        console.error(`Page ${pageCounter} error:`, pageError);
        emptyPagesCount++;
        if (emptyPagesCount >= maxEmptyPages) break;
      }
    }

    console.log(`Total categories fetched: ${allCategories.length}`);
    
    // Update local cache
    if (allCategories.length > 0) {
      localStorage.setItem('cached_categories', JSON.stringify(allCategories));
      localStorage.setItem('categories_fetch_time', Date.now().toString());
    }

    return allCategories;

  } catch (error) {
    console.error('Global fetch error:', error);
    return [];
  }
}

/**
 * Retrieves categories using cache-first strategy
 * @returns Promise containing array of categories
 */
export async function getCategories(): Promise<ApiCategory[]> {
  const CACHE_TTL = 3600000; // 1 hour cache

  try {
    const cachedData = localStorage.getItem('cached_categories');
    const lastFetch = localStorage.getItem('categories_fetch_time');

    // Validate cache
    if (cachedData && lastFetch) {
      const cacheAge = Date.now() - parseInt(lastFetch);
      const parsedData = JSON.parse(cachedData);
      
      if (cacheAge < CACHE_TTL && parsedData.length > 0) {
        console.log('Returning valid cached categories');
        return parsedData;
      }
    }

    console.log('Cache invalid/expired - fetching fresh data');
    return await fetchCategoriesFromAPI();

  } catch (error) {
    console.error('Cache read error:', error);
    return fetchCategoriesFromAPI();
  }
}
