// Utility functions to fetch categories from the API with pagination

export interface ApiCategory {
  id: string;
  name: string;
  code?: string;
}

/**
 * Fetches category data from the remote API with pagination support using next links
 * @returns Array of category items with id and name
 */
export async function fetchCategoriesFromAPI(): Promise<ApiCategory[]> {
  try {
    console.log('Initializing category data fetch from API...');
    
    let allCategories: ApiCategory[] = [];
    let currentUrl = 'http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/fclass';
    let pageCounter = 1;
    
    while (currentUrl) {
      try {
        console.log(`Processing page ${pageCounter} - URL: ${currentUrl}`);
        
        // Attempt multiple proxy strategies with fallback
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(currentUrl)}`, {
          cache: 'no-store'
        }).catch(async (error) => {
          console.error("AllOrigins proxy failed, trying CORS Anywhere:", error);
          return fetch(`https://cors-anywhere.herokuapp.com/${currentUrl}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            cache: 'no-store'
          });
        }).catch(async (error) => {
          console.error("All proxies failed, attempting direct connection:", error);
          return fetch(currentUrl, { 
            method: 'GET',
            mode: 'no-cors',
            cache: 'no-store'
          });
        });

        // Handle non-200 responses
        if (!response.ok && response.status !== 0) {
          console.warn(`API request failed with HTTP status: ${response.status}`);
          break;
        }

        // Parse response data based on proxy used
        let data: any;
        if (response.url.includes('allorigins.win')) {
          const proxyResponse = await response.json();
          data = JSON.parse(proxyResponse.contents);
        } else {
          try {
            data = await response.json();
          } catch (e) {
            console.error("JSON parsing failed:", e);
            break;
          }
        }
        
        console.log(`Page ${pageCounter} received - Items: ${data?.items?.length || 0}`);

        // Process items regardless of count (including empty pages)
        if (data?.items && Array.isArray(data.items)) {
          const filteredCategories = data.items
            .filter((item: any) => item.fc_namear?.trim() && item.fc_sequ?.toString())
            .map((item: any) => ({
              id: item.fc_sequ.toString(),
              name: item.fc_namear.trim(),
              code: item.fc_code?.toString()
            }));
          
          allCategories = [...allCategories, ...filteredCategories];
          console.log(`Added ${filteredCategories.length} items from page ${pageCounter}. Total: ${allCategories.length}`);
        }

        // Find next page link (case-insensitive check)
        let nextUrl = null;
        if (data?.links?.length) {
          const nextLink = data.links.find((link: any) => 
            link.rel?.toLowerCase() === 'next' && link.href
          );
          
          if (nextLink) {
            // Handle relative URLs using current page as base
            nextUrl = new URL(nextLink.href, currentUrl).href;
            console.log(`Discovered next page URL: ${nextUrl}`);
          }
        }

        // Update pagination control
        if (nextUrl) {
          currentUrl = nextUrl;
          pageCounter++;
          
          // Rate limiting protection
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          console.log('Termination condition met: No more pages found');
          currentUrl = '';
        }
        
      } catch (pageError) {
        console.error('Page processing error:', pageError);
        currentUrl = '';
      }
    }
    
    console.log(`Final category count: ${allCategories.length}`);
    
    // Update local cache
    if (allCategories.length > 0) {
      localStorage.setItem('cached_categories', JSON.stringify(allCategories));
      localStorage.setItem('categories_fetch_time', Date.now().toString());
    }
    
    return allCategories;
    
  } catch (error) {
    console.error('Critical fetch error:', error);
    return [];
  }
}

/**
 * Retrieves categories using cache-first strategy
 * @returns Promise containing array of categories
 */
export async function getCategories(): Promise<ApiCategory[]> {
  const CACHE_VALIDITY_MS = 3600000; // 1 hour cache
  
  try {
    const cachedData = localStorage.getItem('cached_categories');
    const lastFetch = localStorage.getItem('categories_fetch_time');
    
    if (cachedData && lastFetch) {
      const cacheAge = Date.now() - parseInt(lastFetch);
      
      if (cacheAge < CACHE_VALIDITY_MS) {
        console.log('Returning valid cached categories');
        return JSON.parse(cachedData);
      }
    }
    
    console.log('Cache invalid/missing - performing fresh API fetch');
    return await fetchCategoriesFromAPI();
    
  } catch (cacheError) {
    console.warn('Cache read failed:', cacheError);
    return fetchCategoriesFromAPI();
  }
}
