import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './Home.scss';
import waveSvg from './wave.svg'

function Home() {

    const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple'];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(currentIndex => (currentIndex < 5) ? currentIndex + 1 : 0);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home" style={{ backgroundColor: colors[currentIndex] }}>
            
            <div className="container">
                <h1>AUDIO VISUALIZER</h1>
                <img src={waveSvg} />
                <Link to="/audiovisualizer" className="button">LET´S START</Link>
            </div>
        </div>
    );
}

export default Home;