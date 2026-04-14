const BASE_URL = "http://localhost:8080";

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
};