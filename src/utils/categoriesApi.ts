// Utility functions to fetch categories from the API with pagination

export interface ApiCategory {
  id: string;
  name: string;
  code?: string;
}

/**
 * Fetches category data from the remote API with pagination support
 * Handles both link-based and offset-based pagination
 * @returns Array of category items with id and name
 */
export async function fetchCategoriesFromAPI(): Promise<ApiCategory[]> {
  try {
    console.log('Fetching categories from API endpoint...');
    
    let allCategories: ApiCategory[] = [];
    let currentUrl = 'http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/fclass';
    let pageCounter = 1;
    let hasMore = true;
    
    while (currentUrl && hasMore) {
      try {
        console.log(`Fetching categories page ${pageCounter} from URL:`, currentUrl);
        
        // Three-stage fetch attempt with different proxies
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
          console.error("All proxies failed, attempting direct request:", error);
          return fetch(currentUrl, { 
            method: 'GET',
            mode: 'no-cors',
            cache: 'no-store'
          });
        });

        // Handle response status
        if (!response.ok && response.status !== 0) {
          console.warn(`Categories API request failed with status: ${response.status}`);
          break;
        }

        let data;
        
        // Parse response based on proxy used
        if (response.url.includes('allorigins.win')) {
          const proxyResponse = await response.json();
          data = JSON.parse(proxyResponse.contents);
        } else {
          try {
            data = await response.json();
          } catch (e) {
            console.error("Could not parse categories JSON response:", e);
            break;
          }
        }
        
        console.log(`Categories page ${pageCounter} response received with ${data?.items?.length || 0} items`);
        
        // Process items if available
        if (data && Array.isArray(data.items)) {
          const pageCategories = data.items
            .filter((item: any) => item.fc_namear && item.fc_sequ)
            .map((item: any) => ({
              id: item.fc_sequ?.toString() || "",
              name: item.fc_namear || "",
              code: item.fc_code || ""
            }));
          
          // Stop if we get an empty page
          if (pageCategories.length === 0) {
            console.log('Empty page received - stopping pagination');
            break;
          }
          
          allCategories = [...allCategories, ...pageCategories];
          console.log(`Added ${pageCategories.length} categories from page ${pageCounter}. Total: ${allCategories.length}`);
          
          // 1. Check for explicit next link
          let nextUrl = null;
          if (data.links && Array.isArray(data.links)) {
            const nextLink = data.links.find((link: any) => link.rel === 'next');
            if (nextLink?.href) {
              nextUrl = new URL(nextLink.href, currentUrl).href;
              console.log('Using explicit next link:', nextUrl);
            }
          }

          // 2. If no link but API says hasMore, calculate next offset
          if (!nextUrl && data.hasMore) {
            const currentOffset = data.offset || 0;
            const limit = data.limit || 25;
            const urlObj = new URL(currentUrl);
            urlObj.searchParams.set('offset', (currentOffset + limit).toString());
            nextUrl = urlObj.href;
            console.log('Calculated next offset URL:', nextUrl);
          }

          // 3. Update pagination state
          hasMore = Boolean(data.hasMore);
          currentUrl = nextUrl || '';
          pageCounter++;

          // Add rate limiting delay
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          console.log('Invalid data format - stopping pagination');
          break;
        }
      } catch (pageError) {
        console.error('Error fetching categories page:', pageError);
        break;
      }
    }
    
    console.log(`Total categories fetched: ${allCategories.length}`);
    
    // Update cache
    if (allCategories.length > 0) {
      localStorage.setItem('cached_categories', JSON.stringify(allCategories));
      localStorage.setItem('categories_fetch_time', Date.now().toString());
    }
    
    return allCategories;
    
  } catch (error) {
    console.error('Error fetching categories from API:', error);
    return [];
  }
}

// Cache handling function remains unchanged
export async function getCategories(): Promise<ApiCategory[]> {
  const cachedCategories = localStorage.getItem('cached_categories');
  const fetchTime = localStorage.getItem('categories_fetch_time');
  
  const cacheValidity = 3600000; // 1 hour
  
  if (cachedCategories && fetchTime && (Date.now() - parseInt(fetchTime)) < cacheValidity) {
    console.log('Using cached categories data');
    return JSON.parse(cachedCategories);
  }
  
  console.log('Cache expired or not found, fetching fresh categories data from API');
  return fetchCategoriesFromAPI();
}
