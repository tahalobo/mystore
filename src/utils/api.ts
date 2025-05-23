
// Utility function to fetch products from the API with pagination

/**
 * Fetches product data from the remote API with pagination support
 * @returns Array of product items with id and name
 */
export async function fetchProductsFromAPI(): Promise<{ id: string; name: string }[]> {
  try {
    console.log('Fetching products from API endpoint...');
    
    let allProducts: { id: string; name: string }[] = [];
    let nextUrl = 'http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/mat';
    let pageCounter = 1;
    
    while (nextUrl) {
      try {
        console.log(`Fetching page ${pageCounter} from URL:`, nextUrl);
        
        // Create a consistent approach to fetching data with error handling
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(nextUrl)}`, {
          cache: 'no-store' // Ensure we don't use cached responses
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

        if (!response.ok && response.status !== 0) { // status 0 can happen with no-cors mode
          console.warn(`API request failed with status: ${response.status}`);
          break;
        }

        let data;
        
        // Handle different response formats from CORS proxies
        if (response.url.includes('allorigins.win')) {
          const proxyResponse = await response.json();
          data = JSON.parse(proxyResponse.contents);
        } else {
          try {
            data = await response.json();
          } catch (e) {
            console.error("Could not parse JSON response:", e);
            break;
          }
        }
        
        console.log(`Page ${pageCounter} response received with ${data?.items?.length || 0} items`);
        
        // Extract products from the current page
        if (data && Array.isArray(data.items)) {
          const pageProducts = data.items
            .filter((item: any) => item.ma_namear && item.ma_sequ)
            .map((item: any) => ({
              id: item.ma_sequ?.toString() || "",
              name: item.ma_namear || ""
            }));
          
          allProducts = [...allProducts, ...pageProducts];
          console.log(`Added ${pageProducts.length} products from page ${pageCounter}. Total: ${allProducts.length}`);
        } else {
          console.warn("Invalid data format received:", data);
          break;
        }
        
        // Check for next page
        nextUrl = null;
        if (data && Array.isArray(data.links)) {
          const nextLink = data.links.find((link: any) => link.rel === 'next');
          if (nextLink && nextLink.href) {
            nextUrl = nextLink.href;
            pageCounter++;
            console.log('Found next page URL:', nextUrl);
          } else {
            console.log('No more pages found, completed fetching all products');
          }
        }
        
        // Add a small delay between requests to be respectful to the API
        if (nextUrl) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
      } catch (pageError) {
        console.error('Error fetching page:', pageError);
        break;
      }
    }
    
    console.log(`Total products fetched: ${allProducts.length}`);
    // Store the products in localStorage to avoid re-fetching on every page load
    if (allProducts.length > 0) {
      localStorage.setItem('cached_products', JSON.stringify(allProducts));
      localStorage.setItem('products_fetch_time', Date.now().toString());
    }
    
    return allProducts;
    
  } catch (error) {
    console.error('Error fetching products from API:', error);
    return [];
  }
}

// Function to get products - either from cache or from API
export async function getProducts(): Promise<{ id: string; name: string }[]> {
  // Check if we have cached products that are less than 1 hour old
  const cachedProducts = localStorage.getItem('cached_products');
  const fetchTime = localStorage.getItem('products_fetch_time');
  
  // Cache validity - 1 hour (3600000 ms)
  const cacheValidity = 3600000;
  
  if (cachedProducts && fetchTime && (Date.now() - parseInt(fetchTime)) < cacheValidity) {
    console.log('Using cached products data');
    return JSON.parse(cachedProducts);
  }
  
  // If no cache or cache expired, fetch from API
  console.log('Cache expired or not found, fetching fresh data from API');
  return fetchProductsFromAPI();
}
