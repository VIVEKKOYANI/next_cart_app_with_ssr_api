const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function fetchAllProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error("Error fetching all products:", error);
      reject(error);
    }
  });
}

export function fetchProductsByFilter(filter) {
  let queryString = "";

  for (let key in filter) {
    if (filter[key].length > 0) {
      filter[key].forEach((value) => {
        queryString += `${key}=${value}&`;
      });
    }
  }

  // Remove the trailing '&' if it exists
  queryString = queryString.slice(0, -1);

  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `${API_URL}/products?` + queryString
      );
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      resolve([]);
    }
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error("Error fetching all products:", error);
      reject(error);
    }
  });
}

export function fetchProductBySearch(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8080/products/search?q=${JSON.stringify({ title_like: search })}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error("Error fetching all products:", error);
      reject(error);
    }
  });
}