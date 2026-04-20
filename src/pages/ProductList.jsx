import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { useNavigate } from "react-router-dom";


function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();


  const userId = localStorage.getItem("userId"); // 🔥 dynamic user

  // 🔄 Load products
  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  // 🔄 Load cart from backend
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8080/cart/${userId}`)
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
      alert("Please login first ⚠️");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/cart/add", {
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
      const updatedCart = await fetch(`http://localhost:8080/cart/${userId}`);
      const data = await updatedCart.json();
      setCart(data);

    } catch (error) {
      console.error(error);
      alert("Error adding to cart ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] via-[#020617] to-black text-white p-6">

      {/* 🔥 HEADING */}
      <h1 className="text-4xl md:text-5xl text-center font-bold text-yellow-400 mb-16">
        Anime Books
      </h1>

      {/* ❌ No products */}
      {products.length === 0 ? (
        <p className="text-center text-gray-400">No products found</p>
      ) : (

        /* 📚 GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {products.map(product => {

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
                <div className="overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-60 object-cover hover:scale-110 transition duration-500"
                  />
                </div>

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