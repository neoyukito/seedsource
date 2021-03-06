import { SET_MAP_OPACITY, SET_BASEMAP, SET_ZOOM, TOGGLE_VISIBILITY } from '../actions/map'
import { FINISH_JOB } from '../actions/job'
import { morph } from '../utils'

const defaultState = {
    opacity: 1,
    basemap: '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    zoom: 5,
    showResults: true
}

export default (state=defaultState, action) => {
    switch (action.type) {
        case SET_MAP_OPACITY:
            return morph(state, {opacity: action.opacity})

        case SET_BASEMAP:
            return morph(state, {basemap: action.basemap})

        case SET_ZOOM:
            return morph(state, {zoom: action.zoom})

        case TOGGLE_VISIBILITY:
            return morph(state, {showResults: !state.showResults})

        case FINISH_JOB:
            return morph(state, {showResults: true})

        default:
            return state
    }
}
