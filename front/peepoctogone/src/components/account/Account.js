import React from 'react'
import PropTypes from 'prop-types'

import './Account.scss'

import {debugLog, errorLog} from '../../lib/logs'
import {H1, H2} from '@blueprintjs/core'

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
class Account extends React.Component {
    /**
     * Constructor
     * @param props Props
     */
    constructor(props) {
        debugLog('Account::constructor')
        super(props)
    }

    /**
     * Mount
     */
    componentDidMount() {
        debugLog('Account::componentDidMount')
    }

    render() {
        debugLog('Account::render')

        return (
            <div className="Account">
                <H1>Peepoctogone</H1>
                <div className="Dashboard-add">
                    <H2>Account page!</H2>
                </div>
            </div>
        )
    }
}

Account.propTypes = {
    showToast: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    null
)(Account)
