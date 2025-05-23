
// Utility functions to fetch brands from the API with pagination

export interface ApiBrand {
  id: string;
  name: string;
  code?: string;
}

/**
 * Fetches brand data from the remote API with pagination support
 * @returns Array of brand items with id and name
 */
export async function fetchBrandsFromAPI(): Promise<ApiBrand[]> {
  try {
    console.log('Fetching brands from API endpoint...');
    
    let allBrands: ApiBrand[] = [];
    let nextUrl = 'http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/matkcode';
    let pageCounter = 1;
    
    while (nextUrl) {
      try {
        console.log(`Fetching brands page ${pageCounter} from URL:`, nextUrl);
        
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(nextUrl)}`, {
          cache: 'no-store'
        }).catch(async (error) => {
          console.error("AllOrigins proxy failed, trying CORS Anywhere:", error);
          return fetch(`https://cors-anywhere.herokuapp.com/${nextUrl}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            cache: 'no-store'
          });
        }).catch(async (error) => {
          console.error("All proxies failed, attempting direct request:", error);
          return fetch(nextUrl, { 
            method: 'GET',
            mode: 'no-cors',
            cache: 'no-store'
          });
        });

        if (!response.ok && response.status !== 0) {
          console.warn(`Brands API request failed with status: ${response.status}`);
          break;
        }

        let data;
        
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
        
        if (data && Array.isArray(data.items)) {
          const pageBrands = data.items
            .filter((item: any) => item.mak_namear && item.mak_code)
            .map((item: any) => ({
              id: item.mak_code?.toString() || "",
              name: item.mak_namear || "",
              code: item.mak_code || ""
            }));
          
          allBrands = [...allBrands, ...pageBrands];
          console.log(`Added ${pageBrands.length} brands from page ${pageCounter}. Total: ${allBrands.length}`);
        } else {
          console.warn("Invalid brands data format received:", data);
          break;
        }
        
        // Check for next page
        nextUrl = null;
        if (data && Array.isArray(data.links)) {
          const nextLink = data.links.find((link: any) => link.rel === 'next');
          if (nextLink && nextLink.href) {
            nextUrl = nextLink.href;
            pageCounter++;
            console.log('Found next brands page URL:', nextUrl);
          } else {
            console.log('No more brands pages found, completed fetching all brands');
          }
        }
        
        if (nextUrl) {
          await new Promise(resolve => setTimeout(resolve, 500));
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
