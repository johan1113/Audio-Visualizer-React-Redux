export const type = 'SET_FGCOLOR';

const setFgColor = fgColor => {
    return {
        type,
        value: fgColor
    };
};

export default setFgColor;