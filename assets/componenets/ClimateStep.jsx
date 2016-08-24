import React, { PropTypes } from 'react'
import ConfigurationStep from '../containers/ConfigurationStep'
import { timeLabels } from '../config'

const ClimateStep = ({ climate, number, active, onChange }) => {
    let { seedlot, site } = climate
    let modelSelect = null

    if (!active) {
        let siteKey = site.time
        if (site.time !== '1961_1990' && site.time !== '1981_2010') {
            siteKey += site.model
        }

        return (
            <ConfigurationStep title="Select climate scenarios" number={number} name="climate" active={false}>
                <div><strong>Seedlot climate: </strong> {timeLabels[seedlot.time]}</div>
                <div><strong>Planting site climate: </strong> {timeLabels[siteKey]}</div>
            </ConfigurationStep>
        )
    }

    if (site.time !== '1961_1990' && site.time !== '1981_2010') {
        modelSelect = (
            <select
                className="form-control form-inline"
                value={site.model}
                onChange={(e) => {
                    e.preventDefault()
                    onChange('model', e.target.value, 'site')
                }}
            >
                <option value="rcp45">RCP 4.5</option>
                <option value="rcp85">RCP 8.5</option>
            </select>
        )
    }

    return (
        <ConfigurationStep title="Select climate scenarios" number={number} name="climate" active={true}>
            <div>
                <em>Which climate are the seedlots adapted to?</em>
            </div>

            <div>
                <select
                    className="form-control form-inline"
                    value={seedlot.time}
                    onChange={e => {
                        e.preventDefault()
                        onChange('year', e.target.value, 'seedlot')
                    }}
                >
                    <option value="1961_1990">1961 - 1990</option>
                    <option value="1981_2010">1981 - 2010</option>
                </select>
            </div>

            <div>&nbsp;</div>

            <div>
                <em>When should trees be best adapted to the planting site?</em>
            </div>

            <div>
                <select
                    className="form-control form-inline"
                    value={site.time}
                    onChange={e => {
                        e.preventDefault()
                        onChange('year', e.target.value, 'site')
                    }}
                >
                    <option value="1961_1990">1961 - 1990</option>
                    <option value="1981_2010">1981 - 2010</option>
                    <option value="2025">2025</option>
                    <option value="2055">2055</option>
                    <option value="2085">2085</option>
                </select>
                { " " }
                {modelSelect}
            </div>
        </ConfigurationStep>
    )
}

ClimateStep.propTypes = {
    active: PropTypes.bool.isRequired,
    climate: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default ClimateStep
