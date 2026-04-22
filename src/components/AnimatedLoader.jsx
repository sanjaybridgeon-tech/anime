
function AnimatedLoader() {
  return (
    <div className="fixed inset-0 w-full h-full bg-black z-50">
      <video
        src="/images/Loader.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}


export default AnimatedLoader;