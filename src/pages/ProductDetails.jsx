import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
function ProductDetails() {
  const API = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cartItem, setCartItem] = useState(null);
  const { userId } = useContext(AuthContext);


  // 🔄 Load product
  useEffect(() => {
  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      console.error(err);
    }
  };

  loadProduct();
}, [id]);

  // 🔄 Load cart item for this product
 useEffect(() => {
  if (!userId) return;

  fetch(`${API}/cart/${userId}`)
    .then(res => res.json())
    .then(data => {
      const item = data.find(i => i.productId == id);
      setCartItem(item || null);
    });
}, [id, userId]);

  // ➕ ADD TO CART
  const addToCart = async () => {
  if (!userId) {
    alert("Please login first ⚠️");
    return;
  }

  await fetch(`${API}/cart/add`, {   // ✅ FIXED HERE
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

  // 🔄 Reload cart
 const loadCart = async () => {
  const res = await fetch(`${API}/cart/${userId}`);
  const data = await res.json();
  const item = data.find(i => i.productId == id);
  setCartItem(item || null);
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

  if (!product) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

        {/* 🖼 IMAGE */}
        <img
  src={`${product.imageUrl}`}
  alt={product.name}
  className="w-full rounded-xl"
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

          {/* 🔥 CART SECTION */}
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