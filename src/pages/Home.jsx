import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const images = [
    "/images/aot.jpg",
    "/images/onepiece.jpg",
    "/images/onepunchman.jpg"
  ];

  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);
  const [showHot, setShowHot] = useState(false);

  // 🎬 HERO + SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    setTimeout(() => {
      setShow(true);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // 🔥 HOT SECTION SCROLL ANIMATION
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("hot-section");

      if (section) {
        const top = section.getBoundingClientRect().top;
        const trigger = window.innerHeight * 0.7;

        if (top < trigger) {
          setShowHot(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white">

      {/* 🎬 HERO SECTION */}
      <div className="relative h-screen overflow-hidden">

        {/* 🔥 Background Slider */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
            }}
          ></div>
        ))}

        {/* 🌑 Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="relative z-10 flex items-center justify-center h-full px-6">

          {/* 👧 LEFT CHARACTER */}
          <img
            src="/images/image.png"
            alt="anime girl"
            className={`absolute left-0 bottom-0 w-[220px] md:w-[320px] transition-all duration-1000 ${
              show
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          />

          {/* TEXT */}
          <div
            className={`text-center transition-all duration-1000 ${
              show
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
           <div className="text-center">
  {/* MAIN TEXT */}
  <h1 className="anime-title">
    ANIME
  </h1>

  {/* SUB TEXT */}
  <p className="anime-subtitle">
    MAKES ME HAPPY WHEN NO ONE ELSE DOES
  </p>
</div>

            <Link
              to="/products"
              className="mt-8 inline-block bg-red-700 hover:bg-red-800 px-6 py-3 rounded-lg font-semibold transition"
            >
              Explore Books
            </Link>
          </div>
        </div>
      </div>

      {/* 🔥 HOT BOOKS SECTION */}
      <div
        id="hot-section"
        className="h-screen relative flex flex-col justify-center bg-gradient-to-b from-black via-gray-900 to-black px-6 overflow-hidden"
      >

        <h2 className="text-3xl md:text-5xl text-center font-bold text-yellow-400 mb-12">
           Hot Anime Books
        </h2>

        {/* 👧 POP CHARACTER (NEW EFFECT) */}
       <img
  src="/images/image2.png"
  alt="anime top"
  className={`absolute top-[40px] right-[20px] w-[200px] md:w-[280px] 
  drop-shadow-[0_0_25px_rgba(255,100,100,0.7)] 
  transition-all duration-1000 ${
    showHot
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-20"
  }`}
/>

        {/* 📚 BOOKS */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full relative z-10">

          <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
            <img src="/images/aot.jpg" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-yellow-300 font-bold">Attack on Titan</h3>
              <p className="text-red-400 mt-2">₹499</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
            <img src="/images/onepiece.jpg" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-yellow-300 font-bold">One Piece</h3>
              <p className="text-red-400 mt-2">₹599</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
            <img src="/images/onepunchman.jpg" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-yellow-300 font-bold">One Punch Man</h3>
              <p className="text-red-400 mt-2">₹399</p>
            </div>
          </div>

        </div>

        {/* BUTTON */}
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold"
          >
            View All Books
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Home;