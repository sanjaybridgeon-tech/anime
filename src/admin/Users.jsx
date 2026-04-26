import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  // 📦 Load users
  useEffect(() => {
    fetch("http://localhost:8080/auth/all")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  // ❌ Delete user
  const deleteUser = async (id) => {
    const role = localStorage.getItem("role");

    if (!window.confirm("Delete this user?")) return;

    try {
      const res = await fetch(
        `http://localhost:8080/auth/${id}?role=${role}`,
        { method: "DELETE" }
      );

      const msg = await res.text();

      if (res.ok) {
        alert("Deleted ✅");
        setUsers(users.filter((u) => u.id !== id));
      } else {
        alert(msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center border-b hover:bg-gray-100">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>

              <td>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;