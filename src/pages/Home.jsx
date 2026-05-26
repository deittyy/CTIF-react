import { useState, useEffect } from "react";

const Home = () => {
  const [videoError, setVideoError] = useState(false);

  const videoSources = ["/cgee thinks.mp4", "/cgee2.mp4"];
  const randomVideo =
    videoSources[Math.floor(Math.random() * videoSources.length)];

  return (
    <div className="hero-video">
      {!videoError ? (
        <video
          key={randomVideo}
          autoPlay
          muted
          loop
          playsInline
          poster="./CgeeThinksitFits Logo-01.png"
          onError={() => setVideoError(true)}
        >
          <source src={randomVideo} type="video/mp4" />
        </video>
      ) : (
        <img
          src="./CgeeThinksitFits Logo-01.png"
          alt="Background fallback"
          className="fallback-image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      <div className="hero-overlay">
        <div>
          <img src="./cgee.png" />
          <p> CTIFs • Nigeria • Multiversal </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
