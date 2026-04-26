// src/pages/AdminProducts.jsx
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: ""
  });
  const [search, setSearch] = useState("");

  const role = localStorage.getItem("role");

  // 🚫 Block non-admin
  if (role !== "ADMIN") {
    return <h2>Access Denied 🚫</h2>;
  }

  // 📦 Fetch products
  const fetchProducts = async (query = "") => {
    const res = await fetch(`${API}/products${query ? `?search=${query}` : ""}`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✍️ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ Add product
  const handleAdd = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Error adding product");
      return;
    }

    alert("Product added ✅");

    setForm({ name: "", description: "", price: "", imageUrl: "" });
    fetchProducts();
  };

  // ❌ Delete product
  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    const res = await fetch(`${API}/products/${id}`, {
      method: "DELETE"
    });

    const text = await res.text();

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    alert(text); // "Product deleted successfully"
    fetchProducts();
  };

  // 🔍 Search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(search);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛠 Admin Product Panel</h2>

      {/* 🔍 Search */}
      <form onSubmit={handleSearch}>
        <input
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </form>

      <hr />

      {/* ➕ Add Product */}
      <form onSubmit={handleAdd}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />

        <button>Add Product</button>
      </form>

      <hr />

      {/* 📦 Product List */}
      <div>
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>₹{p.price}</p>
            <img src={p.imageUrl} alt="" width="100" />

            <br />
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;