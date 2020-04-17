import React from 'react'
import PropTypes from 'prop-types'

import './Dashboard.scss'

import {debugLog, errorLog} from '../../lib/logs'
import { H1, H2 } from '@blueprintjs/core'

import {connect} from 'react-redux'
import {authorizedUser} from '../../redux/selectors/authentication'

const mapStateToProps = state => {
    return {
        authentication: {
            user: authorizedUser(state)
        }
    }
}

/**
 * Dashboard class
 */
class Dashboard extends React.Component {
    /**
     * Constructor
     * @param props Props
     */
    constructor(props) {
        debugLog('Dashboard::constructor')
        super(props)
    }

    /**
     * Mount
     */
    componentDidMount() {
        debugLog('Dashboard::componentDidMount')
    }

    render() {
        debugLog('Dashboard::render')

        return (
            <div className="Dashboard">
                <div className="Dashboard-add">
                    <H1>Peepoctogone</H1>
                    <H2>See the world the way it really is!</H2>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    showToast: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    null
)(Dashboard)
