import React from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'

import './Content.scss'

import {Card, Toaster} from '@blueprintjs/core'

import {debugLog} from '../../lib/logs'
import {LOGIN_URL, SIGNIN_URL, ACCOUNT_URL, DASHBOARD_URL, HOME_URL} from '../../config/routes'

import Login from '../login/Login'
import Signin from '../signin/Signin'
import Account from "../account/Account";

import Dashboard from "../dashboard/Dashboard";

import {connect} from 'react-redux'
import {isAuthorized} from '../../redux/selectors/authentication'
import Homepage from "../homepage/Homepage";

const mapStateToProps = state => {
    return {
        authentication: {
            isAuthorized: isAuthorized(state)
        }
    }
}

/**
 * Content class
 */
class Content extends React.Component {
    constructor(props) {
        debugLog('Content::constructor')
        super(props)
        this.toasterRef = React.createRef()
        this.toaster = null
    }

    componentDidMount() {
        this.toaster = this.toasterRef.current
    }

    componentDidUpdate(props) {
        debugLog('Content::componentDidUpdate')
        if (props.toast !== this.props.toast) {
            const toast = this.props.toast
            this.showToast(toast.intent, toast.message)
        }
    }

    /**
     * Show toast
     *
     * @param intent Intent
     * @param message Message
     */
    showToast = (intent, message) => {
        debugLog('Content::showToast')
        this.toaster.show({intent: intent, message: '' + message})
    }

    /**
     * Clear toaster
     */
    clearToaster = () => {
        debugLog('Content::clearToaster')
        this.toaster.clear()
    }

    render() {
        debugLog('Content::render')
        return (
            <div className="Content">
                <div className="Content-blur-background">
                    <div className="Content-window">
                        <Card>
                        <Toaster className={'Toaster'} ref={this.toasterRef}>
                        </Toaster>
                        <Route path={LOGIN_URL} render={props => this.props.authentication.isAuthorized ?
                            <Dashboard {...props} showToast={this.showToast} clearToaster={this.clearToaster}/> :
                            <Login {...props} showToast={this.showToast} clearToaster={this.clearToaster}/>}/>
                        <Route path={SIGNIN_URL} render={props => this.props.authentication.isAuthorized ?
                            <Dashboard {...props} showToast={this.showToast} clearToaster={this.clearToaster}/> :
                            <Signin {...props} showToast={this.showToast} clearToaster={this.clearToaster}/>}/>
                        <Route path={ACCOUNT_URL} render={props => this.props.authentication.isAuthorized ?
                            <Account {...props} showToast={this.showToast} clearToaster={this.clearToaster}/> :
                            <Login {...props} showToast={this.showToast} clearToaster={this.clearToaster}/>}/>
                        <Route path={DASHBOARD_URL} render={props => this.props.authentication.isAuthorized ?
                            <Dashboard {...props} showToast={this.showToast} clearToaster={this.clearToaster}/> :
                            <Login {...props} showToast={this.showToast} clearToaster={this.clearToaster}/>}/>
                        <Route exact path={HOME_URL} render={props => <Homepage {...props} showToast={this.showToast}
                                                                          clearToaster={this.clearToaster}/>}/>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Content.propTypes = {
    toast: PropTypes.object,
    authentication: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    null
)(Content)
