import React, { useState, useEffect } from "react";

export default function Endscreen({win, restartGame }) {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 1000);
  }, []);
  return (
    <div className = "endscreen"
      style={{
        opacity: render ? 1 : 0,
      }}
    >
      <div id="gameOverImage"></div>
      
      <div className="tryAgain" onClick={() => restartGame()}>
        Try Again
      </div>
    </div>
  );
}