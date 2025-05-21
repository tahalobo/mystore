
// Utility function to fetch products from the API

/**
 * Fetches product data from the remote API
 * @returns Array of product items with id and name
 */
export async function fetchProductsFromAPI(): Promise<{ id: string; name: string }[]> {
  try {
    const response = await fetch('http://rah.samaursoft.net:1987/ords/zmcphone/zmcmat/mat');
    const data = await response.json();
    
    // Check if the data has the expected structure
    if (data && Array.isArray(data.items)) {
      return data.items.map((item: any) => ({
        id: item.mat_id?.toString() || "",
        name: item.mat_name || ""
      }));
    }
    
    console.error('API response does not have the expected format:', data);
    return [];
  } catch (error) {
    console.error('Error fetching products from API:', error);
    return [];
  }
}
