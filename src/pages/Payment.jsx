import { useEffect, useState } from "react";

function Payment() {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);

  // ✅ Address as OBJECT (IMPORTANT)
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    house: "",
    area: "",
    type: "HOME"
  });

  const userId = localStorage.getItem("userId");

  // 🔄 Load cart
  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await fetch(`http://localhost:8080/cart/${userId}`);
        const data = await res.json();

        setCart(data);

        const total = data.reduce((sum, item) => {
          return sum + item.price * item.quantity;
        }, 0);

        setAmount(total);
      } catch (err) {
        console.error(err);
      }
    };

    loadCart();
  }, [userId]);

  // 💳 PAYMENT
  const handlePayment = async () => {
    try {
      // ✅ Validation
      if (!address.name || !address.phone || !address.pincode || !address.city) {
        alert("Please fill all required address fields");
        return;
      }

      const res = await fetch(
        `http://localhost:8080/payment/create?amount=${amount}`,
        { method: "POST" }
      );

      const data = await res.json();

      const options = {
        key: "rzp_test_SesjTQpgudThrq",
        amount: data.amount,
        currency: data.currency,
        name: "Anime Store",
        description: "Order Payment",
        order_id: data.id,

        handler: async function (response) {
          alert("Payment Successful 🎉");

          // 🔥 SEND STRUCTURED ADDRESS
          await fetch("http://localhost:8080/order/place", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              amount,
              paymentId: response.razorpay_payment_id,
              address: address   // ✅ FULL OBJECT
            }),
          });
        },

        theme: {
          color: "#facc15",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl text-yellow-400 text-center mb-10">
        Checkout 🧾
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">

        {/* 🛒 Cart */}
        <div className="bg-[#111827] p-4 rounded-xl">
          <h2 className="text-xl mb-4 text-yellow-300">Order Summary</h2>

          {cart.map(item => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        {/* 📍 Address Form */}
        <div className="bg-[#111827] p-6 rounded-xl space-y-4">
          <h2 className="text-xl text-yellow-300">Delivery Address</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Full Name"
              className="p-2 rounded text-black"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
            />

            <input
              placeholder="Phone Number"
              className="p-2 rounded text-black"
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Pincode"
              className="p-2 rounded text-black"
              value={address.pincode}
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
            />

            <input
              placeholder="State"
              className="p-2 rounded text-black"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
            />
          </div>

          <input
            placeholder="City"
            className="w-full p-2 rounded text-black"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />

          <input
            placeholder="House No / Building"
            className="w-full p-2 rounded text-black"
            value={address.house}
            onChange={(e) => setAddress({ ...address, house: e.target.value })}
          />

          <input
            placeholder="Area / Street"
            className="w-full p-2 rounded text-black"
            value={address.area}
            onChange={(e) => setAddress({ ...address, area: e.target.value })}
          />

          <div className="flex gap-4">
            <button
              onClick={() => setAddress({ ...address, type: "HOME" })}
              className={`px-4 py-1 rounded ${
                address.type === "HOME" ? "bg-yellow-400 text-black" : "bg-gray-700"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setAddress({ ...address, type: "WORK" })}
              className={`px-4 py-1 rounded ${
                address.type === "WORK" ? "bg-yellow-400 text-black" : "bg-gray-700"
              }`}
            >
              Work
            </button>
          </div>
        </div>

        {/* 💰 Total */}
        <div className="text-right text-2xl text-yellow-400 font-bold">
          Total: ₹{amount}
        </div>

        {/* 💳 Pay */}
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 py-3 rounded text-lg font-bold"
        >
          Pay Now 💳
        </button>

      </div>
    </div>
  );
}

export default Payment;