
// Utility function to fetch products from the API

/**
 * Fetches product data from the remote API
 * @returns Array of product items with id and name
 */
export async function fetchProductsFromAPI(): Promise<{ id: string; name: string }[]> {
  try {
    console.log('Fetching products from API endpoint...');
    
    // Try with different approaches to handle potential CORS issues
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors' as RequestMode
    };
    
    const response = await fetch('https://cors-anywhere.herokuapp.com/http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/mat', fetchOptions)
      .catch(() => fetch('https://api.allorigins.win/raw?url=http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/mat'))
      .catch(() => fetch('http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/mat', { mode: 'no-cors' }));

    // For no-cors mode, we won't be able to parse the response, so throw an error to use fallback
    if (response.type === 'opaque') {
      throw new Error('CORS issue detected, using fallback data');
    }
    
    const data = await response.json();
    console.log('API response received:', data);
    
    // Check if the data has the expected structure
    if (data && Array.isArray(data.items)) {
      return data.items.map((item: any) => ({
        id: item.mat_id?.toString() || "",
        name: item.mat_name || ""
      }));
    }
    
    console.warn('API response does not have the expected format:', data);
    return [];
  } catch (error) {
    console.error('Error fetching products from API:', error);
    return [];
  }
}
