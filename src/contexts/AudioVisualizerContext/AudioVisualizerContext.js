import React from 'react';

const AudioVisualizerContext = React.createContext({
    bgColor: '#fff700',
    setBgColor: () => null,
    fgColor: '#ae12d4',
    setFgColor: () => null,
    mp3File: 'https://iondrimbafilho.me/3d5/ocean_drive.mp3',
    setMp3File: () => null,
});

export default AudioVisualizerContext;