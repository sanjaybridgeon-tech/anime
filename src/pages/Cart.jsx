import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate=useNavigate();

  // 🔄 Load cart from backend
  const loadCart = async () => {
    try {
      const res = await fetch(`http://localhost:8080/cart/${userId}`);
      const data = await res.json();
      setCart(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setCart([]);
    }
  };

  useEffect(() => {
    if (userId) {
      loadCart();
    }
  }, [userId]);

  // ➕ Increase quantity (BACKEND CONTROL)
  const increaseQty = async (id) => {
    try {
      await fetch(`http://localhost:8080/cart/increase/${id}`, {
        method: "POST",
      });

      loadCart();
    } catch (err) {
      console.error(err);
    }
  };

  // ➖ Decrease quantity (BACKEND CONTROL)
  const decreaseQty = async (id) => {
    try {
      await fetch(`http://localhost:8080/cart/decrease/${id}`, {
        method: "POST",
      });

      loadCart();
    } catch (err) {
      console.error(err);
    }
  };

  // ❌ Remove item
  const removeItem = async (id) => {
    try {
      await fetch(`http://localhost:8080/cart/${id}`, {
        method: "DELETE",
      });

      loadCart();
    } catch (err) {
      console.error(err);
    }
  };

  // 💰 Total (UI logic stays frontend)
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      <h1 className="text-4xl text-center text-yellow-400 mb-10">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400">Cart is empty</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">

          {cart.map(item => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-[#111827] p-4 rounded-xl"
            >
              {/* 🖼 Image */}
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              {/* 📦 Info */}
              <div className="flex-1">
                <h2 className="text-lg text-yellow-300 font-semibold">
                  {item.name}
                </h2>
                <p className="text-gray-400">₹{item.price}</p>
              </div>

              {/* ➖➕ Controls */}
              <div className="flex items-center gap-2">

                <button
                  onClick={() => decreaseQty(item.id)}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  -
                </button>

                <span className="text-lg font-bold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
                >
                  +
                </button>

              </div>

              {/* ❌ Remove */}
              <button
                onClick={() => removeItem(item.id)}
                className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
              >
                Remove
              </button>
            </div>
          ))}

          {/* 💰 Total */}
          <div className="text-right text-2xl text-yellow-400 font-bold">
            Total: ₹{total}
          </div>
          <button
 onClick={() => navigate("/payment", { state: { total } })}
  className="mt-4 bg-green-500 px-6 py-2 rounded"
>
  Checkout 💳
</button>

        </div>
      )}
    </div>
  );
}

export default Cart;