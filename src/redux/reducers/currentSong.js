import { type as setSongFile } from '../actions/setSongFile';
import { type as setBgColor } from '../actions/setBgColor';
import { type as setFgColor } from '../actions/setFgColor';
import { type as setOnPlay } from '../actions/setOnPlay';

const initialState = {
    fileName: 'Artista - Título.mp3',
    blobFile: null,
    mp3File: null,
    onPlay: false,
    fgColor: '#ae12d4',
    bgColor: '#fff700'
}

const reducer = (state = initialState, { type, value }) => {
    switch (type) {
        case setSongFile: {

            var newFileName = value.currentTarget.files[0].name;
            console.log(" FUNCIONOOOO WIII ");

            if (newFileName.search(".mp3") != -1 && newFileName.search("-") != -1) {
                var newMp3File = URL.createObjectURL(value.currentTarget.files[0]);
                var newBlobFile = new Blob([value.currentTarget.files[0]], { type: "sound/mp3" });

                return {
                    ...state,
                    mp3File: newMp3File,
                    blobFile: newBlobFile,
                    fileName: newFileName,
                }
            } else {
                window.alert("Recuerda que el archivo debe de ser .mp3 y dividir su nombre de la siguiente manera:  NOMBRE CANCIÓN - NOMBRE ARTISTA");
            }

        }

        case setBgColor: {
            return {
                ...state,
                bgColor: value
            }
        }

        case setFgColor: {
            return {
                ...state,
                fgColor: value
            }
        }

        case setOnPlay: {
            return {
                ...state,
                onPlay: value
            }
        }

        default:
            return state;
    }
}

export default reducer;