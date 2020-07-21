export const type = 'SET_ONPLAY';

const setOnPlay = onPlay => {
    return {
        type,
        value: onPlay
    };
};

export default setOnPlay;