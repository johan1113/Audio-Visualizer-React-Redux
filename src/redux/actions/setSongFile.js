export const type = 'SET_SONGFILE';

const setSongFile = event => {
    return {
        type,
        value: event
    };
};

export default setSongFile;