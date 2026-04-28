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
  
  // 3D Carousel State
  const [activeIndex, setActiveIndex] = useState(1);

  const books = [
    { id: 0, title: "Attack on Titan", price: "₹499", img: "/images/aot.jpg" },
    { id: 1, title: "One Piece", price: "₹599", img: "/images/onepiece.jpg" },
    { id: 2, title: "One Punch Man", price: "₹399", img: "/images/onepunchman.jpg" },
  ];

  // 🎬 HERO + SLIDER LOGIC
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    setTimeout(() => {
      setShow(true);
    }, 300);

    return () => clearInterval(interval);
  }, [images.length]);

  // 🔄 AUTOMATIC CARD ROTATION LOGIC
  useEffect(() => {
    const autoRotate = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % books.length);
    }, 3000); // Rotates every 3 seconds

    return () => clearInterval(autoRotate);
  }, [books.length]);

  // 🔥 HOT SECTION SCROLL TRIGGER
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
    <div className="min-h-screen text-white bg-black">

      {/* 🎬 HERO SECTION */}
      <div className="relative h-screen overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
        
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <img
            src="/images/image.png"
            alt="anime girl"
            className={`absolute left-0 bottom-0 w-[220px] md:w-[320px] transition-all duration-1000 ${
              show ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          />

          <div className={`text-center transition-all duration-1000 ${
              show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}>
            <h1 className="anime-title text-6xl md:text-8xl font-bold tracking-tighter">
              ANIME
            </h1>
            <p className="anime-subtitle text-lg md:text-2xl mt-2 font-light">
              MAKES ME HAPPY WHEN NO ONE ELSE DOES
            </p>
            <Link
              to="/products"
              className="mt-8 inline-block bg-red-700 hover:bg-red-800 px-8 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
            >
              Explore Books
            </Link>
          </div>
        </div>
      </div>

      {/* 🔥 HOT BOOKS SECTION (AUTOMATED 3D CAROUSEL) */}
      <div
        id="hot-section"
        className="h-screen relative flex flex-col justify-center bg-gradient-to-b from-black via-gray-900 to-black px-6 overflow-hidden"
      >
        <h2 className={`text-4xl md:text-5xl text-center font-bold text-yellow-400 mb-12 transition-all duration-1000 ${
          showHot ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
           Hot Anime Books
        </h2>

        <img
          src="/images/image2.png"
          alt="anime top"
          className={`absolute top-[40px] right-[20px] w-[180px] md:w-[240px] z-20 
          drop-shadow-[0_0_25px_rgba(255,100,100,0.7)] 
          transition-all duration-1000 ${
            showHot ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"
          }`}
        />

        {/* 📚 REDUCED SIZE 3D CARDS */}
        <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center [perspective:1800px] z-10">
          {books.map((book, index) => {
            let position = index - activeIndex;
            
            if (position < -1) position += 3;
            if (position > 1) position -= 3;

            const isActive = position === 0;

            return (
              <div
                key={book.id}
                onClick={() => setActiveIndex(index)}
                className={`absolute w-60 md:w-72 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-1000 ease-in-out ${
                  isActive ? "z-30 opacity-100" : "z-10 opacity-30 grayscale-[50%]"
                }`}
                style={{
                  transform: `
                    translateX(${position * 110}%) 
                    scale(${isActive ? 1.05 : 0.75}) 
                    translateZ(${isActive ? '350px' : '0px'})
                    rotateY(${position * -50}deg)
                  `,
                  transformStyle: "preserve-3d"
                }}
              >
                <img src={book.img} className="w-full h-60 object-cover" alt={book.title} />
                <div className="p-5 bg-black/50">
                  <h3 className="text-yellow-300 font-bold text-xl uppercase tracking-tighter truncate">
                    {book.title}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-red-500 font-bold text-lg">{book.price}</p>
                    <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded font-bold animate-pulse">
                      HOT
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 z-20">
          <Link
            to="/products"
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-2.5 rounded-lg font-bold shadow-lg transition-all hover:scale-105"
          >
            View All Books
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Home;