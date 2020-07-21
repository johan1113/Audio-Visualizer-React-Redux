export const type = 'SET_BGCOLOR';

const setBgColor = bgColor => {
    return {
        type,
        value: bgColor
    };
};

export default setBgColor;