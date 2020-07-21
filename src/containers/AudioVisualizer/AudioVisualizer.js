import React from 'react';
import Audio3D from '../../components/Audio3D/Audio3D';
import MixingBoard from '../../components/MixingBoard/MixingBoard';
import './AudioVisualizer.scss';

function AudioVisualizer({currentSong}) {

    return (
        <div className="AudioVisualizer">
            <MixingBoard/>
            <Audio3D/>
        </div >
    )
}

export default AudioVisualizer;