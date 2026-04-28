import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "sonner";


function ProductList() {
  const API = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);

const { userId } = useContext(AuthContext);
  // 🔄 Load products
  useEffect(() => {
  const timer = setTimeout(() => {
    fetchProducts();
  }, 300); // debounce

  return () => clearTimeout(timer);
}, [search]);

  // 🔄 Load cart from backend
  useEffect(() => {
  if (!userId) return;

  fetch(`${API}/cart/${userId}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json();
    })
    .then(data => setCart(Array.isArray(data) ? data : []))
    .catch(err => {
      console.error(err);
      setCart([]);
    });
}, [userId]);

  // 🛒 Add to cart (backend)
  const addToCart = async (product) => {
    if (!userId) {
      toast.info("Please login first ⚠️");
      return;
    }

    try {
      const res = await fetch(`${API}/cart/add`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: userId,
    productId: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
  }),
});

      if (!res.ok) throw new Error("Add to cart failed");

      // 🔥 Refresh cart after add
     const updatedCart = await fetch(`${API}/cart/${userId}`);
      const data = await updatedCart.json();
      setCart(data);

    } catch (error) {
      console.error(error);
      toast.error("Error adding to cart ❌")
    }
  };
  const fetchProducts = async () => {
  try {
    setLoading(true);

    const start = Date.now(); // ⏱ start time

    let url = `${API}/products`;
    if (search.trim() !== "") {
      url += `?search=${search}`;
    }

    const res = await fetch(url);
    const data = await res.json();

setProducts(Array.isArray(data?.content) ? data.content : []);    // 🔥 Minimum skeleton time (500ms)
    const elapsed = Date.now() - start;
    if (elapsed < 500) {
      await new Promise(r => setTimeout(r, 500 - elapsed));
    }

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-[#111827] rounded-2xl p-5">
      <div className="bg-gray-700 h-48 w-full rounded-xl mb-4"></div>
      <div className="bg-gray-700 h-4 w-3/4 mb-2"></div>
      <div className="bg-gray-700 h-4 w-1/2 mb-2"></div>
      <div className="bg-gray-700 h-4 w-1/4 mb-4"></div>
      <div className="bg-gray-700 h-10 w-full rounded-lg"></div>
    </div>
  );
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] via-[#020617] to-black text-white p-6">

      {/* 🔥 HEADING */}
      <h1 className="text-4xl md:text-5xl text-center font-bold text-yellow-400 mb-16">
        Anime Books
      </h1>
      <div className="flex justify-center mb-10">
  <div className="flex items-center border-b border-gray-500 focus-within:border-yellow-400">
    <span className="text-gray-400 mr-2"></span>
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="bg-transparent text-white px-1 py-1 focus:outline-none placeholder-gray-400"
    />
  </div>
</div>
      {/* ❌ No products */}
      {loading ? (
  // 🔥 SHOW SKELETON
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {Array(6).fill(0).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>

) : !Array.isArray(products) || products.length === 0 ?(
  // ❌ NO PRODUCTS
  <p className="text-center text-gray-400">No products found</p>

) : (

        /* 📚 GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {Array.isArray(products) && products.map(product => {

            // 🔍 find matching cart item
            const cartItem = cart.find(
              item => item.productId === product.id
            );

            return (
             <div
  key={product.id}
  onClick={() => navigate(`/product/${product.id}`)}   // 🔥 ADD THIS
  className="cursor-pointer bg-[#111827] rounded-2xl overflow-hidden shadow-xl 
  hover:scale-105 hover:shadow-[0_0_20px_rgba(255,200,0,0.3)] 
  transition duration-300"
>

                {/* 🖼 IMAGE */}
               <img
  src={`${product.imageUrl}`}
  alt={product.name}
  className="w-full rounded-xl"
/>

                {/* 📦 CONTENT */}
                <div className="p-5">

                  <h2 className="text-lg font-semibold text-yellow-300">
                    {product.name}
                  </h2>

                  <p className="text-gray-400 text-sm mt-2">
                    {product.description}
                  </p>

                  <p className="text-red-400 font-semibold mt-3">
                    ₹{product.price}
                  </p>

                  {/* ✅ SHOW QUANTITY */}
                  {cartItem && (
                    <p className="text-green-400 mt-2 font-semibold">
                      In Cart: {cartItem.quantity}
                    </p>
                  )}
                  

                  {/* 🛒 BUTTON */}
                  <button
  onClick={(e) => {
    e.stopPropagation(); // 🔥 VERY IMPORTANT
    addToCart(product);
  }}
  className="mt-4 w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
>
  Add to Cart 🛒
</button>
                  
                  
                  

                </div>

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}

export default ProductList;