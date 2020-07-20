import React from 'react';
import './MixingBoard.scss';
import { CirclePicker } from 'react-color';
import { fb } from '../../utils/firebase';

const MixingBoard = (props) => {

    const handleBgColorChange = (bgColor) => {
        props.setBgColor(bgColor.hex);
        console.log(bgColor.hex);
        console.log(props.bgColor);
    }

    const handleFgColorChange = (fgColor) => {
        props.setFgColor(fgColor.hex);
        console.log(fgColor.hex);
        console.log(props.fgColor);
    }

    const handleChange = (event) => {
        var newMp3File = URL.createObjectURL(event.currentTarget.files[0]);
        var newBlobFile = new Blob([event.currentTarget.files[0]], { type: "sound/mp3" });
        var fileName = event.currentTarget.files[0].name;
        console.log('/////// NEW MP3 FILE //////////')
        console.log(newMp3File);
        console.log(fileName);
        props.setMp3File(newMp3File);
        props.setBlobFile(newBlobFile);
        props.setFileName(fileName);
    }

    const handlePlay = () => {
        props.setOnPlay(true);
    }

    const handleStop = () => {
        props.setOnPlay(false);
    }

    const handleSavedSongs = () => {

        //localStorage.clear();
        //var lsSongsList = JSON.parse(localStorage.getItem('songsList'));
        let db = fb.firestore();
        db.collection('songs').add({
            //mp3File: props.mp3File,
            fileName: props.fileName,
            fgColor: props.fgColor,
            bgColor: props.bgColor
        });

        console.log('/////////// SE ACTUALIZÓ DATABASE FIREBASE //////////////');

        // Create a root reference
        var storageRef = fb.storage().ref();

        // Create file metadata including the content type
        var metadata = {
            contentType: 'audio/mp3',
        };

        // Upload the file and metadata
        var uploadTask = storageRef.child('songs/' + props.fileName).put(props.blobFile, metadata);

        console.log('/////////// SE ACTUALIZÓ STORAGE FIREBASE //////////////');
        /*
        var newSong = {
            mp3File : props.mp3File,
            fileName: props.fileName,
            fgColor: props.fgColor,
            bgColor: props.bgColor
        }

        if(lsSongsList != null){
            lsSongsList.push(newSong);
        }else{
            lsSongsList = [];
            lsSongsList.push(newSong);
        }
        localStorage.setItem('songsList', JSON.stringify(lsSongsList));

        console.log('/////////// SE ACTUALIZÓ EL LOCAL STORAGE //////////////');
        console.log(JSON.parse(localStorage.getItem('songsList')));
        */
    }

    const handlePlaylist = () => {
        props.setControllerCase(1);
    }

    return (
        <div className="MixingBoard">

            <div className="title">
                <h1>Sound Mixer</h1>
            </div>

            <div className="loaderPlayer">
                <input type="file" id="labelSong" accept=".mp3" onChange={handleChange} />
                <label className="button" id="btn_black" for="labelSong">Load Audio</label>

                <div className="controls">
                    <button className="play" style={{ display: !props.onPlay ? 'block' : 'none' }} onClick={handlePlay}>
                        <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" width="32" height="32" viewBox="0 0 25 32"
                            data-tags="play,media control">
                            <g fill="#000000" transform="scale(0.03125 0.03125)">
                                <path d="M192 0v1024l640-511.264-640-512.736z" />
                            </g>
                        </svg>
                    </button>
                    <button className="pause" style={{ display: props.onPlay ? 'block' : 'none' }} onClick={handleStop}>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32"
                            data-tags="pause,media control">
                            <g fill="#000000" transform="scale(0.03125 0.03125)">
                                <path d="M352 0h-192c-17.696 0-32 14.336-32 32v960c0 17.696 14.304 32 32 32h192c17.696 0 32-14.304 32-32v-960c0-17.664-14.304-32-32-32zM864 0h-192c-17.696 0-32 14.336-32 32v960c0 17.696 14.304 32 32 32h192c17.696 0 32-14.304 32-32v-960c0-17.664-14.304-32-32-32z"
                                />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>

            <section id="fg">
                <h2>Figures Color</h2>
                <CirclePicker color={props.fgColor} onChange={handleFgColorChange} />
            </section>

            <section id="bg">
                <h2>Background Color</h2>
                <CirclePicker color={props.bgColor} onChange={handleBgColorChange} />
            </section>

            <div className="windowButtons">
                <button className="button" id="btn_black" onClick={handleSavedSongs}>save this song</button>
                <button className="button" id="btn_black" onClick={handlePlaylist}>your saved songs</button>
            </div>

        </div>
    )
}

export default MixingBoard;