// Utility functions to fetch brands from the API with pagination

export interface ApiBrand {
  id: string;
  name: string;
  code?: string;
}

/**
 * Fetches brand data from the remote API with pagination support
 * Handles both link-based and offset-based pagination
 * @returns Array of brand items with id and name
 */
export async function fetchBrandsFromAPI(): Promise<ApiBrand[]> {
  try {
    console.log('Fetching brands from API endpoint...');
    
    let allBrands: ApiBrand[] = [];
    let currentUrl = 'http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/matkcode';
    let pageCounter = 1;
    let hasMore = true;
    
    while (currentUrl && hasMore) {
      try {
        console.log(`Fetching brands page ${pageCounter} from URL:`, currentUrl);
        
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
          console.warn(`Brands API request failed with status: ${response.status}`);
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
            console.error("Could not parse brands JSON response:", e);
            break;
          }
        }
        
        console.log(`Brands page ${pageCounter} response received with ${data?.items?.length || 0} items`);
        
        // Process items if available
        if (data && Array.isArray(data.items)) {
          const pageBrands = data.items
            .filter((item: any) => item.mak_namear && item.mak_sequ)
            .map((item: any) => ({
              id: item.mak_sequ?.toString() || "",  // Swapped code/sequ based on typical patterns
              name: item.mak_namear || "",
              code: item.mak_code || ""
            }));

          // Stop if we get an empty page
          if (pageBrands.length === 0) {
            console.log('Empty brands page received - stopping pagination');
            break;
          }
          
          allBrands = [...allBrands, ...pageBrands];
          console.log(`Added ${pageBrands.length} brands from page ${pageCounter}. Total: ${allBrands.length}`);
          
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
          console.log('Invalid brands data format - stopping pagination');
          break;
        }
      } catch (pageError) {
        console.error('Error fetching brands page:', pageError);
        break;
      }
    }
    
    console.log(`Total brands fetched: ${allBrands.length}`);
    
    if (allBrands.length > 0) {
      localStorage.setItem('cached_brands', JSON.stringify(allBrands));
      localStorage.setItem('brands_fetch_time', Date.now().toString());
    }
    
    return allBrands;
    
  } catch (error) {
    console.error('Error fetching brands from API:', error);
    return [];
  }
}

export async function getBrands(): Promise<ApiBrand[]> {
  const cachedBrands = localStorage.getItem('cached_brands');
  const fetchTime = localStorage.getItem('brands_fetch_time');
  
  const cacheValidity = 3600000; // 1 hour
  
  if (cachedBrands && fetchTime && (Date.now() - parseInt(fetchTime)) < cacheValidity) {
    console.log('Using cached brands data');
    return JSON.parse(cachedBrands);
  }
  
  console.log('Cache expired or not found, fetching fresh brands data from API');
  return fetchBrandsFromAPI();
}
