import fetch from 'isomorphic-fetch'
import { getServiceName } from '../utils'

export const selectUnit = unit => {
    return {
        type: 'SELECT_UNIT',
        unit
    }
}

export const addVariable = variable => {
    return {
        type: 'ADD_VARIABLE',
        variable
    }
}

export const removeVariable = (variable, index) => {
    return {
        type: 'REMOVE_VARIABLE',
        variable,
        index
    }
}

export const modifyVariable = (index, transfer) => {
    return {
        type: 'MODIFY_VARIABLE',
        index,
        transfer
    }
}

export const toggleVariable = variable => {
    return {
        type: 'TOGGLE_VARIABLE',
        variable
    }
}

export const receiveValue = (variable, json) => {
    return {
        type: 'RECEIVE_VALUE',
        value: json.results[0].attributes['Pixel value'],
        variable,
    }
}

export const requestValue = variable => {
    return {
        type: 'REQUEST_VALUE',
        variable
    }
}

export const fetchValue = name => {
    return (dispatch, getState) => {
        let {runConfiguration} = getState()
        let {objective, point, time, model, variables} = runConfiguration
        let variable = variables.find(item => item.name === name)
        let pointIsValid = point !== null && point.x !== null && point.y !== null

        if (variable !== undefined && variable.value === null && !variable.isFetching && pointIsValid) {
            dispatch(requestValue(name))

            let url = '/arcgis/rest/services/' + getServiceName(name, objective, time, model) +
                '/MapServer/identify/' + '?f=json&tolerance=2&imageDisplay=1600%2C1031%2C96&&' +
                'geometryType=esriGeometryPoint&' +
                'mapExtent=-12301562.058352625%2C6293904.1727356175%2C-12056963.567839967%2C6451517.325059711' +
                '&geometry=' + JSON.stringify(point)

            return fetch(url).then(response => response.json()).then(json => dispatch(receiveValue(name, json)))
        }

        return Promise.resolve()
    }
}

export const receiveLegend = (variable, json) => {
    return {
        type: 'RECEIVE_LEGEND',
        legend: json.layers[0].legend,
        variable
    }
}

export const requestLegend = variable => {
    return {
        type: 'REQUEST_LEGEND',
        variable
    }
}

export const fetchLegend = name => {
    return (dispatch, getState) => {
        let { runConfiguration } = getState()
        let { objective, point, time, model, variables } = runConfiguration
        let variable = variables.find(item => item.name === name)

        if (variable !== undefined && variable.legend === null && !variable.isFetchingLegend) {
            dispatch(requestLegend(name))

            let url = '/arcgis/rest/services/' + getServiceName(name, objective, time, model) + '/MapServer/legend'

            return fetch(url).then(response => response.json()).then(json => dispatch(receiveLegend(name, json)))
        }

        return Promise.resolve()
    }
}