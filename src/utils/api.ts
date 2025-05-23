
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
    
    while (nextUrl) {
      try {
        console.log('Fetching from URL:', nextUrl);
        
        // Try different CORS proxy approaches
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(nextUrl)}`)
          .catch(() => fetch(`https://cors-anywhere.herokuapp.com/${nextUrl}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }))
          .catch(() => fetch(nextUrl, { 
            method: 'GET',
            mode: 'no-cors'
          }));

        if (!response.ok) {
          console.warn(`API request failed with status: ${response.status}`);
          break;
        }

        let data;
        
        // Handle different response formats from CORS proxies
        if (response.url.includes('allorigins.win')) {
          const proxyResponse = await response.json();
          data = JSON.parse(proxyResponse.contents);
        } else {
          data = await response.json();
        }
        
        console.log('API response received:', data);
        
        // Extract products from the current page
        if (data && Array.isArray(data.items)) {
          const pageProducts = data.items
            .filter((item: any) => item.ma_namear && item.ma_sequ)
            .map((item: any) => ({
              id: item.ma_sequ?.toString() || "",
              name: item.ma_namear || ""
            }));
          
          allProducts = [...allProducts, ...pageProducts];
          console.log(`Added ${pageProducts.length} products from current page. Total: ${allProducts.length}`);
        }
        
        // Check for next page
        nextUrl = null;
        if (data && Array.isArray(data.links)) {
          const nextLink = data.links.find((link: any) => link.rel === 'next');
          if (nextLink && nextLink.href) {
            nextUrl = nextLink.href;
            console.log('Found next page URL:', nextUrl);
          } else {
            console.log('No more pages found');
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
    return allProducts;
    
  } catch (error) {
    console.error('Error fetching products from API:', error);
    return [];
  }
}
