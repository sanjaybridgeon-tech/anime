import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import { AuthContext } from "../Context/AuthContext";

function ProductDetails() {
  const API = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [cartItem, setCartItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userId } = useContext(AuthContext);

  // 🔄 Load product
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // 🔄 Load cart item
  useEffect(() => {
    if (!userId) return;

    fetch(`${API}/cart/${userId}`)
      .then(res => res.json())
      .then(data => {
        const item = data.find(i => i.productId == id);
        setCartItem(item || null);
      });
  }, [id, userId]);

  // 🔄 Reload cart
  const loadCart = async () => {
    const res = await fetch(`${API}/cart/${userId}`);
    const data = await res.json();
    const item = data.find(i => i.productId == id);
    setCartItem(item || null);
  };

  // ➕ ADD TO CART
  const addToCart = async () => {
    if (!userId) {
      alert("Please login first ⚠️");
      return;
    }

    await fetch(`${API}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      }),
    });

    loadCart();
  };

  // ➕ INCREASE
  const increaseQty = async () => {
    await fetch(`${API}/cart/increase/${cartItem.id}`, {
      method: "POST",
    });
    loadCart();
  };

  // ➖ DECREASE
  const decreaseQty = async () => {
    await fetch(`${API}/cart/decrease/${cartItem.id}`, {
      method: "POST",
    });
    loadCart();
  };

  // 🟡 SKELETON UI
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white">
        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 animate-pulse">
          
          <div className="bg-gray-700 h-[400px] rounded-xl"></div>

          <div className="space-y-4">
            <div className="bg-gray-700 h-8 w-1/2 rounded"></div>
            <div className="bg-gray-700 h-6 w-full rounded"></div>
            <div className="bg-gray-700 h-6 w-3/4 rounded"></div>
            <div className="bg-gray-700 h-6 w-1/3 rounded"></div>
          </div>

        </div>
      </div>
    );
  }

  // ❌ Safety fallback
  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Failed to load product ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      {/* 🎯 CENTERED CARD WITH ANIMATION */}
      <div className={`max-w-5xl w-full grid md:grid-cols-2 gap-10 bg-gray-900 p-6 rounded-2xl shadow-lg ${!loading ? "animate-fadeIn" : ""}`}>

        {/* 🖼 IMAGE */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded-xl"
        />

        {/* 📦 DETAILS */}
        <div>
          <h1 className="text-3xl text-yellow-400 mb-4">
            {product.name}
          </h1>

          <p className="text-gray-300 mb-4">
            {product.description}
          </p>

          <p className="text-xl mb-2">
            Price: ₹{product.price}
          </p>

          <p className="text-lg mb-4">
            Stock: {product.stock > 0 ? "Available ✅" : "Out of Stock ❌"}
          </p>

          {!cartItem ? (
            <button
              onClick={addToCart}
              className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-500"
            >
              Add to Cart 🛒
            </button>
          ) : (
            <div className="flex items-center gap-4 mt-4">

              <button
                onClick={decreaseQty}
                className="bg-red-500 px-4 py-2 rounded text-white"
              >
                -
              </button>

              <span className="text-xl font-bold">
                {cartItem.quantity}
              </span>

              <button
                onClick={increaseQty}
                className="bg-green-500 px-4 py-2 rounded text-white"
              >
                +
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;