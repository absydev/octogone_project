import React from 'react'
import PropTypes from 'prop-types'

import './Login.scss'

import { SIGNIN_URL, DASHBOARD_URL } from '../../config/routes'
import { debugLog } from '../../lib/logs'
import { userCheckLogin } from '../../lib/api'
import { Link } from 'react-router-dom'
import { Button, Card, FormGroup, InputGroup, Tooltip } from '@blueprintjs/core'

import { connect } from 'react-redux'
import { authenticationOn } from '../../redux/actions/authentication'

/**
 * Login class
 */
class Login extends React.Component {
  constructor (props) {
    debugLog('Login::constructor')
    super(props)
    this.state = {
      user: {
        email: '',
        password: ''
      },
      showPassword: false
    }
  }

  /**
   * Update user name
   *
   * @param e Event
   */
  updateEmail = (e) => {
    debugLog('Login::updateEmail')
    e.persist()
    this.setState(state => ({
      ...state,
      user: {
        ...state.user,
        email: e.target.value
      }
    }))
  }

  /**
   * Show/Hide password
   */
  handleShowPassword = () => {
    debugLog('Login::handleShowPassword')
    this.setState(state => ({
      ...state,
      showPassword: !state.showPassword
    }))
  }

  /**
   * Update password
   *
   * @param e Event
   */
  updatePassword = (e) => {
    debugLog('Login::updatePassword')
    e.persist()
    this.setState(state => ({
      ...state,
      user: {
        ...state.user,
        password: e.target.value
      }
    }))
  }

  /**
   * Handle login click
   *
   * @param e Event
   */
  handleLogin = (e) => {
    debugLog('Login::handleLogin')
    e.preventDefault()
    userCheckLogin(
      this.state.user,
      res => {
        this.props.authenticationOn({
          id: res.id
        })
        this.props.clearToaster()
        this.props.history.push(DASHBOARD_URL)
      },
      err => this.props.showToast('danger', err.message)
    )
  }

  render () {
    const lockButton =
      <Tooltip content={`${this.state.showPassword ? 'Hide' : 'Show'} Password`}>
        <Button
          icon={this.state.showPassword ? 'unlock' : 'lock'}
          minimal="true"
          onClick={this.handleShowPassword}
        />
      </Tooltip>

    return (
      <div className="Login">
        <div className="Login-center">
          <Card>
            <form>
              <FormGroup
                label="User name:"
                labelFor="login-input"
              >
                <InputGroup
                  id="login-input"
                  large="true"
                  placeholder="Enter your user name..."
                  type="text"
                  value={this.state.user.email}
                  onChange={e => this.updateEmail(e)}
                />
              </FormGroup>
              <FormGroup
                label="Password:"
                labelFor="password-input"
              >
                <InputGroup
                  large="true"
                  placeholder="Enter your password..."
                  rightElement={lockButton}
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.user.password}
                  onChange={e => this.updatePassword(e)}
                />
              </FormGroup>
              <div className="Login-button">
                <Button type="submit" intent="primary" text="Login" rightIcon="chevron-right" onClick={(e) => this.handleLogin(e)} />
              </div>
            </form>
            <Link to={SIGNIN_URL}>
              Do not have an account? Create one!
            </Link>
          </Card>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  showToast: PropTypes.func.isRequired,
  clearToaster: PropTypes.func.isRequired,
  authenticationOn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default connect(
  null,
  {
    authenticationOn
  }
)(Login)
