import React from 'react';
import './MixingBoard.scss';
import { CirclePicker } from 'react-color';
import { connect } from 'react-redux';
import setSongFile from '../../redux/actions/setSongFile';
import setBgColor from '../../redux/actions/setBgColor';
import setFgColor from '../../redux/actions/setFgColor';
import setOnPlay from '../../redux/actions/setOnPlay';


const MixingBoard = (props) => {

    const {currentSong} = props;

    const handleBgColorChange = (bgColor) => {
        props.setBgColor(bgColor.hex);
        console.log(bgColor.hex);
        console.log(currentSong.bgColor);
    }

    const handleFgColorChange = (fgColor) => {
        props.setFgColor(fgColor.hex);
        console.log(fgColor.hex);
        console.log(currentSong.fgColor);
    }

    const handleChange = (event) => {
        props.setSongFile(event);
    }

    const handlePlay = () => {
        props.setOnPlay(true);
    }

    const handleStop = () => {
        props.setOnPlay(false);
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
                    <button className="play" style={{ display: !currentSong.onPlay ? 'block' : 'none' }} onClick={handlePlay}>
                        <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" width="32" height="32" viewBox="0 0 25 32"
                            data-tags="play,media control">
                            <g fill="#000000" transform="scale(0.03125 0.03125)">
                                <path d="M192 0v1024l640-511.264-640-512.736z" />
                            </g>
                        </svg>
                    </button>
                    <button className="pause" style={{ display: currentSong.onPlay ? 'block' : 'none' }} onClick={handleStop}>
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
                <CirclePicker color={currentSong.fgColor} onChange={handleFgColorChange} />
            </section>

            <section id="bg">
                <h2>Background Color</h2>
                <CirclePicker color={currentSong.bgColor} onChange={handleBgColorChange} />
            </section>

        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return{
        setSongFile: event => dispatch(setSongFile(event)),
        setBgColor: bgColor => dispatch(setBgColor(bgColor)),
        setFgColor: fgColor => dispatch(setFgColor(fgColor)),
        setOnPlay: onPlay => dispatch(setOnPlay(onPlay))
    };
};

const mapStateToProps = (state) => {
    return {
        currentSong: state.currentSong,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MixingBoard);