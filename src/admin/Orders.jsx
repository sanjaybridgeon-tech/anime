import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/order/all`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">📦 Orders Management</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">No orders found</p>
      ) : (
        <div className="space-y-6">

          {orders.map(order => (
            <div
              key={order.id}
              className="bg-[#1a1a1a] p-5 rounded-xl shadow-lg border border-gray-700"
            >
              {/* 🔝 Order Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order #{order.id}
                  </h2>
                  <p className="text-sm text-gray-400">
                    ₹{order.amount}
                  </p>
                </div>

                {/* 🔥 Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "PENDING"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* 📍 Address */}
              <div className="text-sm text-gray-400 mb-3">
                <p>{order.address?.street}</p>
                <p>{order.address?.city}</p>
              </div>

              {/* 🛒 Items */}
              <div className="border-t border-gray-700 pt-3">
                <h3 className="mb-2 font-medium">Items:</h3>

                <div className="space-y-2">
                  {order.items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm bg-[#111] p-2 rounded"
                    >
                      <span>{item.productName}</span>
                      <span>
                        {item.quantity} × ₹{item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Orders;