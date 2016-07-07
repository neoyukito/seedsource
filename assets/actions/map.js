export const setMapOpacity = opacity => {
    return {
        type: 'SET_MAP_OPACITY',
        opacity
    }
}

export const toggleVisibility = () => {
    return {
        type: 'TOGGLE_VISIBILITY'
    }
}