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
    console.log('Fetching categories from API endpoint...');
    
    let allCategories: ApiCategory[] = [];
    let currentUrl = 'http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/fclass';
    let pageCounter = 1;
    let hasMorePages = true;
    
    // Continue fetching until there are no more pages
    while (hasMorePages) {
      try {
        console.log(`Fetching categories page ${pageCounter} from URL:`, currentUrl);
        
        // Try multiple proxy endpoints with fallbacks
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

        // Parse response data
        let data: any;
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
        if (data && Array.isArray(data.items) && data.items.length > 0) {
          const pageCategories = data.items
            .filter((item: any) => item.fc_namear && item.fc_sequ)
            .map((item: any) => ({
              id: item.fc_sequ?.toString() || "",
              name: item.fc_namear || "",
              code: item.fc_code || ""
            }));
          
          allCategories = [...allCategories, ...pageCategories];
          console.log(`Added ${pageCategories.length} categories from page ${pageCounter}. Total: ${allCategories.length}`);
          
          // Find next page link using proper URL resolution
          let nextUrl = null;
          if (data.links && Array.isArray(data.links)) {
            const nextLink = data.links.find((link: any) => link.rel === 'next');
            if (nextLink?.href) {
              // Resolve relative URLs using current URL as base
              nextUrl = new URL(nextLink.href, currentUrl).href;
              console.log('Resolved next page URL:', nextUrl);
            }
          }

          // Update for next iteration
          if (nextUrl) {
            currentUrl = nextUrl;
            pageCounter++;
            
            // Add delay to be API-friendly (500ms between requests)
            await new Promise(resolve => setTimeout(resolve, 500));
          } else {
            console.log('No next link found - reached the end of categories');
            hasMorePages = false;
          }
        } else {
          console.log('No items found in response - stopping pagination');
          hasMorePages = false;
        }
        
      } catch (pageError) {
        console.error('Error fetching categories page:', pageError);
        hasMorePages = false;
      }
    }
    
    console.log(`Total categories fetched: ${allCategories.length}`);
    
    // Update cache if we got results
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
