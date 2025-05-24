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
    // Initialize with the first page URL
    let currentUrl = 'http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/fclass';
    let pageCounter = 1;
    
    // Loop until there's no next page URL
    while (currentUrl) {
      try {
        console.log(`Fetching categories page ${pageCounter} from URL:`, currentUrl);
        
        // Attempt to fetch through multiple proxies with fallbacks
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
        
        // Parse response based on the proxy used
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
        if (data && Array.isArray(data.items) {
          const pageCategories = data.items
            .filter((item: any) => item.fc_namear && item.fc_sequ)
            .map((item: any) => ({
              id: item.fc_sequ?.toString() || "",
              name: item.fc_namear || "",
              code: item.fc_code || ""
            }));
          
          allCategories = [...allCategories, ...pageCategories];
          console.log(`Added ${pageCategories.length} categories from page ${pageCounter}. Total: ${allCategories.length}`);
          
          // Calculate next page URL
          let nextUrl = null;
          if (data.links && Array.isArray(data.links)) {
            const nextLink = data.links.find((link: any) => link.rel === 'next');
            if (nextLink && nextLink.href) {
              // Resolve relative URLs against the current URL
              nextUrl = new URL(nextLink.href, currentUrl).href;
              console.log('Resolved next page URL:', nextUrl);
            }
          }
          
          // Prepare for next iteration or exit loop
          if (nextUrl) {
            currentUrl = nextUrl;
            pageCounter++;
            // Add delay to be API-friendly
            await new Promise(resolve => setTimeout(resolve, 500));
          } else {
            console.log('No more pages available - pagination complete');
            currentUrl = ''; // Exit loop
          }
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

// Cache handling remains the same
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
