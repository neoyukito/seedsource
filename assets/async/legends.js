import resync from '../resync'
import {
    requestVariableLegend, receiveVariableLegend, requestResultsLegend, receiveResultsLegend
} from '../actions/legends'
import { getServiceName } from '../utils'

const variableLegendSelect = ({ activeVariable, runConfiguration }) => {
    let { objective, climate } = runConfiguration

    return {
        activeVariable,
        objective,
        climate: objective === 'seedlots' ? climate.site : climate.seedlot
    }
}

const resultsLegendSelect = ({ job, legends }) => {
    return {
        serviceId: job.serviceId,
        hasLegend: legends.results.legend !== null
    }
}

export default store => {
    // Variable legend
    resync(store, variableLegendSelect, ({ activeVariable, objective }, io, dispatch) => {
        if (activeVariable !== null) {
            dispatch(requestVariableLegend())

            let serviceName = getServiceName(activeVariable, objective, store.getState().runConfiguration.climate)
            let url = '/arcgis/rest/services/' + serviceName + '/MapServer/legend'

            return io.get(url).then(response => response.json()).then(json => dispatch(receiveVariableLegend(json)))
        }
    })

    // Results legend
    resync(store, resultsLegendSelect, ({ serviceId, hasLegend }, io, dispatch) => {
        if (serviceId !== null && !hasLegend) {
            dispatch(requestResultsLegend())

            let url = '/arcgis/rest/services/' + serviceId + '/MapServer/legend'

            return io.get(url).then(response => response.json()).then(json => dispatch(receiveResultsLegend(json)))
        }
    })
}
