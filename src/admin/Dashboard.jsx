const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard 🚀</h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-gray-500">Users</h2>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-2xl font-bold">45</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-2xl font-bold">₹25,000</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;