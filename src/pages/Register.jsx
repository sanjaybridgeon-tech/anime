import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("Registered Successfully");
      navigate("/login");
    } else {
      alert("Register Failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🌊 Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://wallpapers.com/images/high/calm-anime-sea-sailing-girl-ibvej85n7i6pwcwg.webp")`,
        }}
      ></div>

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* 🏴‍☠️ SCROLL CARD */}
      <div className="scroll-card relative z-10 p-8 w-[360px] text-center">

        <h2
  className="text-4xl mb-2 text-yellow-900 text-center"
  style={{ fontFamily: "'Ma Shan Zheng', cursive" }}
>
  注册
</h2>

<p className="text-yellow-800 mb-4 text-sm">
  REGISTER
</p>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 bg-transparent border-b-2 border-yellow-900 text-yellow-900 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Create password"
            className="w-full p-2 bg-transparent border-b-2 border-yellow-900 text-yellow-900 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-yellow-900 text-white p-2 mt-4 rounded hover:bg-black transition"
          >
            Join
          </button>

        </form>

        {/* 🔗 Back to Login */}
        <p className="mt-4 text-yellow-900">
          Already have a account ?{" "}
          <Link to="/login" className="underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;