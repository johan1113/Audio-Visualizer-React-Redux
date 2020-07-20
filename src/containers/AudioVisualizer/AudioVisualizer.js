import React from 'react';
import Audio3D from '../../components/Audio3D/Audio3D';
import MixingBoard from '../../components/MixingBoard/MixingBoard';
import Playlist from '../../components/Playlist/Playlist';
import './AudioVisualizer.scss';
import AudioVisualizerContext from '../../contexts/AudioVisualizerContext/AudioVisualizerContext';

function AudioVisualizer() {

    const [bgColor, setBgColor] = React.useState('#fff700');
    const [fgColor, setFgColor] = React.useState('#ae12d4');
    const [onPlay, setOnPlay] = React.useState(false);
    const [mp3File, setMp3File] = React.useState(null);
    const [blobFile, setBlobFile] = React.useState(null);
    const [fileName, setFileName] = React.useState('Artista - Título.mp3');
    const [controllerCase, setControllerCase] = React.useState(0);

    const context = {
        bgColor: bgColor,
        setBgColor: setBgColor,
        fgColor: fgColor,
        setFgColor: setFgColor,
        onPlay: onPlay,
        setOnPlay: setOnPlay,
        mp3File: mp3File,
        setMp3File: setMp3File,
        blobFile: blobFile,
        setBlobFile: setBlobFile,
        fileName: fileName,
        setFileName: setFileName,
        controllerCase: controllerCase,
        setControllerCase: setControllerCase
    }

    return (
        <div className="AudioVisualizer">

            <AudioVisualizerContext.Provider value={context}>

                {controllerCase == 0
                    ? <MixingBoard setBgColor={setBgColor} setFgColor={setFgColor} setOnPlay={setOnPlay} setMp3File={setMp3File} setBlobFile={setBlobFile} setFileName={setFileName} setControllerCase={setControllerCase} bgColor={bgColor} fgColor={fgColor} onPlay={onPlay} mp3File={mp3File} blobFile={blobFile} fileName={fileName} />
                    : <Playlist setControllerCase={setControllerCase} setBgColor={setBgColor} setFgColor={setFgColor} setOnPlay={setOnPlay} setMp3File={setMp3File} setFileName={setFileName} onPlay={onPlay} />
                }

                <Audio3D bgColor={bgColor} fgColor={fgColor} onPlay={onPlay} mp3File={mp3File} fileName={fileName} />

            </AudioVisualizerContext.Provider>
            {/*
            <AudioVisualization />
            */}

        </div >
    )
}



export default AudioVisualizer;