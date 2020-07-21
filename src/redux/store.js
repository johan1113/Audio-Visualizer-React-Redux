import { createStore, combineReducers } from 'redux';
import currentSong from './reducers/currentSong';

const reducer = combineReducers({
    currentSong,
});

export default createStore(reducer);