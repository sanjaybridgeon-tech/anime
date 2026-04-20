const API = import.meta.env.VITE_API_URL;

// ✅ GET PRODUCTS
export const getProducts = async () => {
  const res = await fetch(`${API}/products`);
  return res.json();
};

// REGISTER
export const registerUser = async (data) => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// LOGIN
export const loginUser = async (data) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.text();
};