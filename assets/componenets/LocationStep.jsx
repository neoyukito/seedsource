import React, { PropTypes } from 'react'
import ConfigurationStep from './ConfigurationStep'
import PointChooser from '../containers/PointChooser'

let getObjectiveLabel = objective => (
    objective == 'seedlots' ? 'Select a planting site' : 'Select a seedlot location'
)

class LocationStep extends React.Component {
    render() {
        let { objective, number } = this.props

        return (
            <ConfigurationStep title={getObjectiveLabel(objective)} number={number}>
                <PointChooser />

                <div>&nbsp;</div>
                <div className="hidden">
                    <label className="control-label">Region</label>
                    <select className="form-control">
                        <option value="west1">West</option>
                    </select>
                </div>
            </ConfigurationStep>
        )
    }
}

LocationStep.shouldRender = () => true

LocationStep.propTypes = {
    objective: PropTypes.string.isRequired
}

export default LocationStep
