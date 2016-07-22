import { connect } from 'react-redux'
import {
    modifyVariable, resetTransfer, toggleVariable, removeVariable, fetchValue, requestTransfer, receiveTransfer
} from '../actions/variables'
import Variable from '../componenets/Variable'
import { get, urlEncode } from '../io'
import { variables } from '../config'

const mapStateToProps = (state, { variable, index }) => {
    let { activeVariable, runConfiguration } = state
    let active = activeVariable === variable.name
    let { unit, method, point, zones, climate } = runConfiguration
    let variableConfig = variables.find(item => item.name === variable.name)
    let { name, value, transfer, transferIsModified } = variable
    let { label, multiplier, units } = variableConfig

    if (transfer === null) {
        transfer = 0
    }

    transfer /= multiplier

    if (unit === 'imperial' && units !== null) {
        if (units.imperial.convertTransfer) {
            transfer = units.imperial.convertTransfer(transfer)
        }
        else if (units.imperial.convert !== null) {
            transfer = units.imperial.convert(transfer)
        }
    }

    transfer = parseFloat(transfer.toFixed(2))

    if (value !== null) {
        value /= multiplier

        if (unit === 'imperial' && units !== null) {
            value = units.imperial.convert(value)
        }

        value = parseFloat(value.toFixed(2))
    }

    return {
        zone: zones.selected,
        active,
        index,
        name,
        label,
        value,
        transfer,
        transferIsModified,
        unit,
        units,
        method,
        point,
        climate
    }
}

const mapDispatchToProps = (dispatch, { variable, index }) => {
    return {
        onTransferChange: (transfer, unit, units) => {
            let value = parseFloat(transfer)

            if (!isNaN(value)) {
                if (unit === 'imperial' && units !== null) {
                    if (units.metric.convertTransfer) {
                        value = units.metric.convertTransfer(value)
                    }
                    else if (units.metric.convert !== null) {
                        value = units.metric.convert(value)
                    }
                }

                let variableConfig = variables.find(item => item.name === variable.name)

                dispatch(modifyVariable(variable.name, value * variableConfig.multiplier))
            }
        },

        onResetTransfer: () => {
            dispatch(resetTransfer(variable.name))
        },

        onToggle: () => {
            dispatch(toggleVariable(variable.name))
        },

        onRemove: () => {
            dispatch(removeVariable(variable.name, index))
        },

        onRequestValue: () => {
            dispatch(fetchValue(variable.name))
        },

        fetchTransfer: (method, point, zone, year) => {
            dispatch(requestTransfer(variable.name))

            let pointIsValid = point !== null && point.x !== null && point.y !== null

            if (method === 'seedzone' && pointIsValid) {
                let url = '/sst/transfer-limits/?' + urlEncode({
                    point: point.x + ',' + point.y,
                    variable: variable.name,
                    zone_id: zone,
                    time_period: year
                })

                return get(url).then(response => response.json()).then(json => {
                    if (json.results.length) {
                        return json.results[0].transfer
                    }
                    else {
                        return null
                    }
                })
            }

            return null
        },
        
        receiveTransfer: transfer => {
            dispatch(receiveTransfer(variable.name, transfer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Variable)
