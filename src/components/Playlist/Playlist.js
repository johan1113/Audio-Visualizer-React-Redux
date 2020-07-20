import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import './Playlist.scss';
import { fb } from '../../utils/firebase';

const Playlist = (props) => {

    const [lsSongsList, setLsSongsList] = React.useState(null);
    const [listIndex, setListIndex] = React.useState(0);

    React.useEffect(() => {
        //Get all docs from Songs collection
        let db = fb.firestore();
        var arr = [];
        db.collection("songs").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                arr.push(doc.data());
            });
        });
        setLsSongsList(arr);
    }, []);

    const handleSoundMixer = () => {
        props.setControllerCase(0);
    }

    const handlePlay = () => {
        props.setOnPlay(true);
    }

    const handleStop = () => {
        props.setOnPlay(false);
    }

    const handleSelectedSong = (event) => {
        console.log('//////// ingresa a selected song ///////////');
        setListIndex(parseInt(event.currentTarget.dataset.index));
        console.log(listIndex);
        const selectedSong = lsSongsList[listIndex];

        props.setBgColor(selectedSong.bgColor);
        props.setFgColor(selectedSong.fgColor);
        props.setFileName(selectedSong.fileName);

        // Create a root reference
        var storageRef = fb.storage().ref();
        storageRef.child('songs/' + selectedSong.fileName).getDownloadURL().then(function (url) {
            // `url` is the download URL for 'songs/song_name.mp3'
            //props.setMp3File('https://storage.googleapis.com/batch/storage/v1/'+url);
            props.setMp3File('https://storage.googleapis.com/batch/storage/v1/songs/'+selectedSong.fileName);            
        });
    }

    const handlePreviousSong = () => {

        console.log('////////// entra a previous song //////////');
        console.log(listIndex);
        console.log(lsSongsList.length);

        if (listIndex == 0) {
            setListIndex(lsSongsList.length - 1);
        } else {
            setListIndex(listIndex - 1);
        }

        const selectedSong = lsSongsList[listIndex];
        props.setBgColor(selectedSong.bgColor);
        props.setFgColor(selectedSong.fgColor);
        props.setFileName(selectedSong.fileName);

        // Create a root reference
        var storageRef = fb.storage().ref();
        storageRef.child('songs/' + selectedSong.fileName).getDownloadURL().then(function (url) {
            // `url` is the download URL for 'songs/song_name.mp3'
            //props.setMp3File('https://storage.googleapis.com/batch/storage/v1/'+url);
            props.setMp3File('https://storage.googleapis.com/batch/storage/v1/songs/'+selectedSong.fileName);      
        });
    }

    const handleNextSong = () => {

        console.log('////////// entra a next song //////////');
        console.log(listIndex);
        console.log(lsSongsList.length);

        if (listIndex === (lsSongsList.length - 1)) {
            setListIndex(0);
        } else {
            setListIndex(listIndex + 1);
        }

        const selectedSong = lsSongsList[listIndex];
        props.setBgColor(selectedSong.bgColor);
        props.setFgColor(selectedSong.fgColor);
        props.setFileName(selectedSong.fileName);

        // Create a root reference
        var storageRef = fb.storage().ref();
        storageRef.child('songs/' + selectedSong.fileName).getDownloadURL().then(function (url) {
            // `url` is the download URL for 'songs/song_name.mp3'
            //props.setMp3File('https://storage.googleapis.com/batch/storage/v1/'+url);
            props.setMp3File('https://storage.googleapis.com/batch/storage/v1/songs/'+selectedSong.fileName);      
        });
    }

    return (
        <div className="Playlist">

            <div className="title">
                <h1>My Playlist</h1>
            </div>

            {lsSongsList != null
                ?
                <List component="nav" aria-label="main mailbox folders" className="songs-list" id="scrollbar">
                    {lsSongsList.map((value, index) => {
                        return <ListItem button onClick={handleSelectedSong} data-index={index}> <ListItemText primary={value.fileName.replace('.mp3', '').split('-', 2)[1]} secondary={value.fileName.replace('.mp3', '').split('-', 2)[0]} /> <ListItemIcon> <RadioButtonUncheckedIcon style={{ fill: value.fgColor }} /> <FiberManualRecordIcon style={{ fill: value.bgColor }} /> </ListItemIcon>  </ListItem>
                    })}
                </List>
                :
                <h3>First, you need to save your songs</h3>
            }

            <div className="controls">

                <SkipPreviousIcon button onClick={handlePreviousSong} style={{ fill: 'black' }} fontSize="large" />

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

                <SkipNextIcon button onClick={handleNextSong} style={{ fill: 'black' }} fontSize="large" />

            </div>

            <div className="windowButtons">
                <button className="button" id="btn_black" onClick={handleSoundMixer}>get back to Sound Mixer</button>
            </div>
        </div>
    );
}

export default Playlist;