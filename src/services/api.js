const API = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  const res = await fetch(`${API}/products`);
  return res.json();
};