import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🛑 Validation
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
});

const data = await res.text(); // ✅ read ONCE

if (res.ok) {
  localStorage.setItem("userId", data); // ✅ use it
  navigate("/");
} else {
  alert(data || "Login Failed ❌");
}
    } catch (error) {
      console.error(error);
      alert("Server error ⚠️");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🌊 Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://wallpapers.com/images/high/calm-anime-sea-sailing-girl-ibvej85n7i6pwcwg.webp")',
        }}
      ></div>

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* 📜 CARD */}
      <div className="scroll-card relative z-10 p-8 w-[360px] text-center">

        {/* 🎌 Chinese Heading */}
        <h2
          className="text-5xl mb-2 text-yellow-900 drop-shadow-[0_0_8px_rgba(120,80,0,0.7)]"
          style={{ fontFamily: "'Ma Shan Zheng', cursive" }}
        >
          登录
        </h2>

        <p className="text-yellow-800 mb-4 text-sm">
          WELCOME
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 bg-transparent border-b-2 border-yellow-900 text-yellow-900 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 bg-transparent border-b-2 border-yellow-900 text-yellow-900 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-900 text-white p-2 mt-4 rounded hover:bg-black transition"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>

        </form>

        {/* 🔗 Register Link */}
        <p className="mt-4 text-yellow-900">
          New?{" "}
          <Link to="/register" className="underline">
            Register Now
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;