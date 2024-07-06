import React, { useState, useEffect } from "react";

function Timer({ gameOver, reset, start, onTimeChange}) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (reset) {
      setTime(0);
    }
  }, [reset]);

  useEffect(() => {
    let timer;
    if (!gameOver && start) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          onTimeChange(newTime);
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameOver, start, onTimeChange]);

  return <p className="counter">{time}</p>;
}

export default Timer;
