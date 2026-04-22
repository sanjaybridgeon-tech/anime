import loaderVideo from "../assets/loader.mp4";

function AnimatedLoader() {
  return (
    <div className="fixed inset-0 w-full h-full bg-black z-50">

      <video
        src={loaderVideo}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Optional overlay (text) */}
     

    </div>
  );
}

export default AnimatedLoader;