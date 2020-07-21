import React from 'react';
import Audio3D from '../../components/Audio3D/Audio3D';
import MixingBoard from '../../components/MixingBoard/MixingBoard';
import './AudioVisualizer.scss';
import { connect } from "react-redux";

function AudioVisualizer({currentSong}) {

    return (
        <div className="AudioVisualizer">
            <MixingBoard bgColor={currentSong.bgColor} fgColor={currentSong.fgColor} onPlay={currentSong.onPlay} mp3File={currentSong.mp3File} blobFile={currentSong.blobFile} fileName={currentSong.fileName} />
            <Audio3D bgColor={currentSong.bgColor} fgColor={currentSong.fgColor} onPlay={currentSong.onPlay} mp3File={currentSong.mp3File} fileName={currentSong.fileName} />
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        currentSong: state.currentSong,
    };
};

export default connect(mapStateToProps)(AudioVisualizer);