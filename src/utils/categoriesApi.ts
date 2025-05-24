// Utility functions to fetch categories from the API with pagination

export interface ApiCategory {
  id: string;
  name: string;
  code?: string;
}

/**
 * Fetches category data from the remote API with exhaustive pagination support
 * @returns Array of category items with id and name
 */
export async function fetchCategoriesFromAPI(): Promise<ApiCategory[]> {
  try {
    console.log('Initiating comprehensive category data fetch...');
    
    let allCategories: ApiCategory[] = [];
    let currentUrl: string | null = 'http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/fclass';
    let pageCounter = 1;
    const visitedUrls = new Set<string>();
    const maxConsecutiveEmptyPages = 3;
    let emptyPageCount = 0;

    while (currentUrl && !visitedUrls.has(currentUrl)) {
      try {
        console.log(`Processing page ${pageCounter}: ${currentUrl}`);
        visitedUrls.add(currentUrl);

        // Enhanced proxy handling with rotating endpoints
        const proxyUrls = [
          `https://api.allorigins.win/get?url=${encodeURIComponent(currentUrl)}`,
          `https://corsproxy.io/?${encodeURIComponent(currentUrl)}`,
          `https://cors-anywhere.herokuapp.com/${currentUrl}`
        ];

        let response: Response | null = null;
        for (const proxyUrl of proxyUrls) {
          try {
            response = await fetch(proxyUrl, {
              cache: 'no-store',
              headers: proxyUrl.includes('corsproxy.io') ? {
                'X-Requested-With': 'XMLHttpRequest'
              } : {}
            });
            if (response.ok) break;
          } catch (error) {
            console.warn(`Proxy ${proxyUrl} failed, trying next...`);
          }
        }

        if (!response || !response.ok) {
          console.error('All proxy attempts failed');
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

        console.log(`Page ${pageCounter} response analysis:`, {
          items: data?.items?.length,
          hasMore: data?.hasMore,
          limit: data?.limit,
          offset: data?.offset
        });

        // Process items regardless of count
        if (data?.items && Array.isArray(data.items)) {
          const validItems = data.items.filter((item: any) => 
            item.fc_namear?.trim() && item.fc_sequ?.toString()
          );

          if (validItems.length > 0) {
            allCategories.push(...validItems.map((item: any) => ({
              id: item.fc_sequ.toString(),
              name: item.fc_namear.trim(),
              code: item.fc_code?.toString()
            })));
            console.log(`Added ${validItems.length} valid items from page ${pageCounter}`);
            emptyPageCount = 0; // Reset empty page counter
          } else {
            emptyPageCount++;
            console.warn(`Page ${pageCounter} contained no valid items`);
          }
        } else {
          emptyPageCount++;
          console.warn(`Page ${pageCounter} had invalid items structure`);
        }

        // Safety check against infinite loops
        if (emptyPageCount >= maxConsecutiveEmptyPages) {
          console.error(`Stopping due to ${maxConsecutiveEmptyPages} consecutive empty pages`);
          break;
        }

        // Multi-strategy next page detection
        let nextUrl: string | null = null;
        const currentOffset = parseInt(new URL(currentUrl).searchParams.get('offset') || '0') || 0;
        const limit = data.limit || 25;

        // Strategy 1: Explicit next link
        if (data?.links) {
          const nextLink = data.links.find((link: any) => 
            link.rel?.toLowerCase() === 'next' && link.href
          );
          if (nextLink) {
            nextUrl = new URL(nextLink.href, currentUrl).href;
          }
        }

        // Strategy 2: hasMore flag with offset calculation
        if (!nextUrl && data?.hasMore) {
          const nextOffset = currentOffset + limit;
          const nextUrlObj = new URL(currentUrl);
          nextUrlObj.searchParams.set('offset', nextOffset.toString());
          nextUrl = nextUrlObj.href;
        }

        // Strategy 3: Item count-based pagination
        if (!nextUrl && data?.items) {
          const nextOffset = currentOffset + limit;
          const nextUrlObj = new URL(currentUrl);
          
          // Continue if either:
          // - Current page has full item count
          // - We're not at the first page and have some items
          if (data.items.length >= limit || (pageCounter > 1 && data.items.length > 0)) {
            nextUrlObj.searchParams.set('offset', nextOffset.toString());
            nextUrl = nextUrlObj.href;
          }
        }

        // Final fallback: Offset progression
        if (!nextUrl) {
          const nextOffset = currentOffset + limit;
          const nextUrlObj = new URL(currentUrl);
          nextUrlObj.searchParams.set('offset', nextOffset.toString());
          nextUrl = nextUrlObj.href;
        }

        // Verify next URL hasn't been visited
        currentUrl = nextUrl && !visitedUrls.has(nextUrl) ? nextUrl : null;

        if (currentUrl) {
          pageCounter++;
          // Rate limiting protection
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

      } catch (pageError) {
        console.error(`Critical error processing page ${pageCounter}:`, pageError);
        currentUrl = null;
      }
    }

    console.log(`Final category collection: ${allCategories.length} items`);
    
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
 * Retrieves categories using cache-first strategy with enhanced validation
 * @returns Promise containing array of categories
 */
export async function getCategories(): Promise<ApiCategory[]> {
  const CACHE_DURATION = 3600000; // 1 hour cache

  try {
    const cachedData = localStorage.getItem('cached_categories');
    const lastFetch = localStorage.getItem('categories_fetch_time');

    // Validate cache existence and freshness
    if (cachedData && lastFetch) {
      const cacheValid = (Date.now() - parseInt(lastFetch)) < CACHE_DURATION;
      const parsedData = JSON.parse(cachedData);
      
      // Basic cache integrity check
      if (cacheValid && Array.isArray(parsedData) && parsedData.length > 0) {
        console.log('Returning valid cached categories');
        return parsedData;
      }
    }

    console.log('Initiating fresh API fetch due to invalid/missing cache');
    return await fetchCategoriesFromAPI();

  } catch (error) {
    console.error('Cache read error:', error);
    return fetchCategoriesFromAPI();
  }
}
