import React, { useState, useEffect } from 'react';
import './assets/css/style.css';

export default function Count() {
    const defaultMin = 59;
    const defaultSec = 59;
    const [minutes, setMinutes] = useState(defaultMin);
    const [seconds, setSeconds] = useState(defaultSec);
    const [isStart, setIsStart] = useState(false);
    let interval;

    useEffect(() => {
        if (isStart && (minutes > 0 || seconds > 0)) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds((prevSec) => prevSec - 1);
                } else if (minutes > 0) {
                    setMinutes((prevMin) => prevMin - 1);
                    setSeconds(59);
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isStart, minutes, seconds]);

    const start = () => {
        setIsStart(true);
    };

    const stop = () => {
        setIsStart(false);
    };

    const reset = () => {
        setIsStart(false);
        setMinutes(defaultMin);
        setSeconds(defaultSec);
    };

    return (
        <div className="card">
            <h2>Countdown App</h2>
            <div className="countdown">
                <p>{`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</p>
            </div>
            <div className="btn">
                <button onClick={start}>Start</button>
                <button onClick={stop}>Stop</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
