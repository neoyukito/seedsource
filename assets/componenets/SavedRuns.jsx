import React, { PropTypes } from 'react'
import SavedRun from '../containers/SavedRun'

class SavedRuns extends React.Component {
    constructor(props) {
        super(props)
        this.state = {activeSave: null}
    }

    componentDidMount() {
        this.props.onLoad()
    }

    componentWillUpdate({ isLoggedIn }) {
        if (this.props.isLoggedIn !== isLoggedIn) {
            this.props.onLoad()
        }
    }

    render() {
        let { saves, isLoggedIn } = this.props
        let { activeSave } = this.state

        if (!isLoggedIn) {
            return (
                <div>
                    You may create an account to save and retrieve your runs. Click on the "Account" tab in the upper
                    right to login or create an account..
                </div>
            )
        }

        if (saves.length == 0) {
            return <div>You currently have no saved runs.</div>
        }

        return (
            <div className="configurationList">
                {saves.map(item => {
                    return (
                        <SavedRun
                            key={item.uuid}
                            save={item}
                            active={activeSave === item.uuid}
                            onClick={() => {
                                this.setState({activeSave: item.uuid})
                            }}
                        />
                    )
                })}
            </div>
        )
    }
}

SavedRuns.propTypes = {
    saves: PropTypes.array.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    onLoad: PropTypes.func.isRequired
}

export default SavedRuns
