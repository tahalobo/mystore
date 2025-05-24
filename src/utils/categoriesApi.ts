// Utility functions to fetch categories from the API with pagination

export interface ApiCategory {
  id: string;
  name: string;
  code?: string;
}

/**
 * Fetches category data from the remote API with pagination support
 * @returns Array of category items with id and name
 */
export async function fetchCategoriesFromAPI(): Promise<ApiCategory[]> {
  try {
    console.log('Starting category data fetch operation...');
    
    let allCategories: ApiCategory[] = [];
    let currentUrl = 'http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/fclass';
    let pageCounter = 1;
    let retryCount = 0;
    const maxRetries = 3;

    while (currentUrl) {
      try {
        console.log(`Processing page ${pageCounter} [${currentUrl}]`);
        
        // Enhanced proxy handling with retry logic
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(currentUrl)}`, {
          cache: 'no-store'
        }).catch(async (error) => {
          console.error("Primary proxy failed, trying secondary:", error);
          return fetch(`https://corsproxy.io/?${encodeURIComponent(currentUrl)}`, {
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            cache: 'no-store'
          });
        });

        if (!response.ok) {
          console.warn(`Page ${pageCounter} fetch failed: ${response.status}`);
          if (retryCount++ < maxRetries) {
            console.log(`Retrying page ${pageCounter} (attempt ${retryCount})`);
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
            continue;
          }
          throw new Error(`Failed after ${maxRetries} retries`);
        }

        // Parse response data
        let data: any;
        if (response.url.includes('allorigins.win')) {
          const proxyResponse = await response.json();
          data = JSON.parse(proxyResponse.contents);
        } else {
          data = await response.json();
        }

        console.log(`Page ${pageCounter} received ${data?.items?.length || 0} items`);

        // Process items regardless of count
        if (data?.items) {
          const pageItems = data.items
            .filter((item: any) => item.fc_namear?.trim() && item.fc_sequ)
            .map((item: any) => ({
              id: item.fc_sequ.toString(),
              name: item.fc_namear.trim(),
              code: item.fc_code?.toString()
            }));

          if (pageItems.length > 0) {
            allCategories = [...allCategories, ...pageItems];
            console.log(`Added ${pageItems.length} items from page ${pageCounter}`);
          }
        }

        // Determine next page URL using multiple indicators
        let nextUrl = null;
        
        // 1. Check explicit next link
        if (data?.links) {
          const nextLink = data.links.find((link: any) => 
            link.rel?.toLowerCase() === 'next' && link.href
          );
          if (nextLink) {
            nextUrl = new URL(nextLink.href, currentUrl).href;
          }
        }

        // 2. Check hasMore flag with offset calculation
        if (!nextUrl && data?.hasMore) {
          const currentOffset = parseInt(new URL(currentUrl).searchParams.get('offset') || '0');
          const limit = data.limit || 25;
          nextUrl = new URL(currentUrl);
          nextUrl.searchParams.set('offset', (currentOffset + limit).toString());
        }

        // 3. Final fallback check item count
        if (!nextUrl && data?.items?.length >= (data.limit || 25)) {
          const urlObj = new URL(currentUrl);
          const currentOffset = parseInt(urlObj.searchParams.get('offset') || '0');
          const limit = data.limit || 25;
          urlObj.searchParams.set('offset', (currentOffset + limit).toString());
          nextUrl = urlObj.href;
        }

        // Update tracking variables
        if (nextUrl) {
          currentUrl = nextUrl;
          pageCounter++;
          retryCount = 0;
          console.log(`Next page detected: ${currentUrl}`);
          
          // Rate limiting protection
          await new Promise(resolve => setTimeout(resolve, 750));
        } else {
          console.log('No more pages detected - ending pagination');
          currentUrl = '';
        }

      } catch (pageError) {
        console.error(`Page ${pageCounter} processing failed:`, pageError);
        if (retryCount++ < maxRetries) {
          console.log(`Retrying page ${pageCounter} (attempt ${retryCount})`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          console.error(`Aborting after ${maxRetries} retries`);
          currentUrl = '';
        }
      }
    }

    console.log(`Total categories collected: ${allCategories.length}`);
    
    // Update local cache
    if (allCategories.length > 0) {
      localStorage.setItem('cached_categories', JSON.stringify(allCategories));
      localStorage.setItem('categories_fetch_time', Date.now().toString());
    }

    return allCategories;

  } catch (error) {
    console.error('Critical error in fetch operation:', error);
    return [];
  }
}

/**
 * Retrieves categories using cache-first strategy
 * @returns Promise containing array of categories
 */
export async function getCategories(): Promise<ApiCategory[]> {
  const CACHE_TTL = 3600000; // 1 hour cache validity

  try {
    const [cachedData, lastFetch] = [
      localStorage.getItem('cached_categories'),
      localStorage.getItem('categories_fetch_time')
    ];

    if (cachedData && lastFetch) {
      const age = Date.now() - parseInt(lastFetch);
      if (age < CACHE_TTL) {
        console.log('Returning valid cached data');
        return JSON.parse(cachedData);
      }
      console.log('Cache expired - age:', age);
    }

    console.log('Initiating fresh API fetch');
    return await fetchCategoriesFromAPI();

  } catch (cacheError) {
    console.warn('Cache read error:', cacheError);
    return fetchCategoriesFromAPI();
  }
}
