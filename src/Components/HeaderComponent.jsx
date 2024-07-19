import React, { useState, useEffect } from 'react';
import './HeaderComponent.css';

const HeaderComponent = () => {
  const [elapsedHours, setElapsedHours] = useState(0);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (timerRunning) {
      intervalId = setInterval(() => {
        setElapsedSeconds(prev => {
          if (prev + 1 === 60) {
            setElapsedMinutes(prevMin => {
              if (prevMin + 1 === 60) {
                setElapsedHours(prevHours => prevHours + 1);
                return 0;
              }
              return prevMin + 1;
            });
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId); // Cleanup function to clear interval
  }, [timerRunning]);

  const handleStart = () => {
    setTimerRunning(true);
  };

  const handleStop = () => {
    setTimerRunning(false);
  };
  
  const handleReset = () => {
    setTimerRunning(false);
    setElapsedHours(0);
    setElapsedMinutes(0);
    setElapsedSeconds(0);
  };

  const formatTimeUnit = (unit) => unit.toString().padStart(2, '0');

  return (
    <section className="main-container">
      <h1 className='elapsed-time'>{formatTimeUnit(elapsedHours)}:{formatTimeUnit(elapsedMinutes)}:{formatTimeUnit(elapsedSeconds)}</h1>
      <div className="container">
        <p><button onClick={handleStart} disabled={timerRunning} className='buttons'>Start</button></p>
        <p><button onClick={handleStop} disabled={!timerRunning} className='buttons'>Stop</button></p>
        <p><button onClick={handleReset} disabled={timerRunning} className='buttons'>Reset</button></p>
      </div>
    </section>
  );
}

export default HeaderComponent;
