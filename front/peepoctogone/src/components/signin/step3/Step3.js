import React from 'react'
import { Button, Callout, Card, H1, InputGroup } from '@blueprintjs/core'

import './Step3.scss'

import { debugLog } from '../../../lib/logs'
import PropTypes from 'prop-types'
import basic_avatar from '../../../assets/basic-avatar.png'

/**
 * Step3 class
 */
class Step3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      validity: 'normal',
      passwordTrue: 'normal',
      confirmPasswordTrue: 'normal',
      firstNameTrue: 'normal',
      lastNameTrue: 'normal',
      passwordError: '',
      confirmPasswordError: 'This password is not the same',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    }
  }

    /**
     * Update FirstName
     *
     * @param e Event
     */
    updateFirstName = (e) => {
      debugLog('Signin::updateFirstName: ' + e.target.value)
      e.persist()
      let tmp = 'normal'
      if (e.target.value.length > 0 && e.target.value.length <= 64)
        tmp = 'primary'
      this.setState(state => ({
        ...state,
        firstName: e.target.value,
        firstNameTrue: tmp
      }))
    }

    /**
     * Update LastName
     *
     * @param e Event
     */
    updateLastName = (e) => {
      debugLog('Signin::updateLastName: ' + e.target.value)
      e.persist()
      let tmp = 'normal'
      if (e.target.value.length > 0 && e.target.value.length <= 64)
        tmp = 'primary'
      this.setState(state => ({
        ...state,
        lastName: e.target.value,
        lastNameTrue: tmp
      }))
    }

    /**
     * Update Password
     *
     * @param e Event
     */
    updatePassword = (e) => {
      debugLog('Signin::updatePassword: ' + e.target.value)
      e.persist()
      let tmp = 'primary'
      let error = ''
      let confirmPasswordTmp = this.state.confirmPasswordTrue

      if (e.target.value.length === 0)
        tmp = 'normal'
      else if (e.target.value.length < 6) {
        tmp = 'danger'
        error = 'This password is too short'
      }
      else if (e.target.value.length > 64) {
        tmp = 'danger'
        error = 'This password is too long'
      }
      if (tmp === 'primary' && this.state.confirmPassword === e.target.value)
        confirmPasswordTmp = 'primary'
      else if (this.state.confirmPassword !== e.target.value && this.state.confirmPasswordTrue === 'primary')
        confirmPasswordTmp = 'danger'
      this.setState(state => ({
        ...state,
        password: e.target.value,
        passwordTrue: tmp,
        passwordError: error,
        confirmPasswordTrue: confirmPasswordTmp
      }))
    }

    /**
     * Update ConfirmPassword
     *
     * @param e Event
     */
    updateConfirmPassword = (e) => {
      debugLog('Signin::updateConfirmassword: ' + e.target.value)
      e.persist()
      let tmp = 'primary'
      let error = ''
      if (e.target.value.length === 0)
        tmp = 'normal'
      else if (e.target.value !== this.state.password) {
        tmp = 'danger'
        error = 'This password is not the same'
      }
      else if (e.target.value.length > 64) {
        tmp = 'danger'
        error = 'This password is too long'
      }

      this.setState(state => ({
        ...state,
        confirmPassword: e.target.value,
        confirmPasswordTrue: tmp,
        confirmPasswordError: error
      }))
    }

    componentDidUpdate() {
      if (this.state.firstNameTrue === 'primary' && this.state.lastNameTrue === 'primary' &&
            this.state.passwordTrue === 'primary' && this.state.confirmPasswordTrue === 'primary') {
        this.props.setUserData(this.state.firstName, this.state.lastName, this.state.password)
        if (this.state.validity !== 'primary') {
          this.setState(state => ({
            ...state,
            validity: 'primary'
          }))
        }
      }
      else {
        if (this.state.validity === 'primary') {
          this.setState(state => ({
            ...state,
            validity: 'normal'
          }))
        }
      }
    }

    render() {
      return (
        <Card>
          <H1>Check your name and password</H1>
          <img
            className="Signin-avatar"
            src={basic_avatar}
            alt="Basic Avatar"
          />
          <p className="bp3-text-large">
                    Your full name:
          </p>
          <div className={'Signin-fullName'}>
            <InputGroup
              className="Signin-firstName"
              large="true"
              intent={this.state.firstNameTrue}
              leftIcon="people"
              placeholder="firstName"
              type="text"
              value={this.state.firstName}
              onChange={e => this.updateFirstName(e)}
            />
            <InputGroup
              className="Signin-lastName"
              large="true"
              intent={this.state.lastNameTrue}
              placeholder="lastName"
              type="text"
              value={this.state.lastName}
              onChange={e => this.updateLastName(e)}
            />
          </div>
          <p className="bp3-text-large">
                    Your password:
          </p>
          <InputGroup
            className="Signin-password"
            large="true"
            intent={this.state.passwordTrue}
            placeholder="password"
            type="password"
            value={this.state.password}
            leftIcon="lock"
            onChange={e => this.updatePassword(e)}
          />
          {this.state.passwordTrue === 'danger' ?
            <Callout
              className="Signin-password-error"
              intent="danger"
            >
              {this.state.passwordError}
            </Callout>
            : null}
          <InputGroup
            className="Signin-confirm-password"
            large="true"
            intent={this.state.confirmPasswordTrue}
            placeholder="confirm your password"
            type="password"
            value={this.state.confirmPassword}
            onChange={e => this.updateConfirmPassword(e)}
          />
          {this.state.confirmPasswordTrue === 'danger' ?
            <Callout
              className="Signin-confirm-password-error"
              intent="danger"
            >
              {this.state.confirmPasswordError}
            </Callout>
            : null}
          <p>
                    min 6 digits large
          </p>
          <Button
            fill="true"
            large="true"
            rightIcon="arrow-right"
            intent={this.state.validity}
            text="Next step"
            disabled={this.state.validity !== 'primary'}
            onClick={() => this.props.nextStep()}
            type="button"
          />
        </Card>
      )
    }
}

Step3.propTypes = {
  nextStep: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired
}

export default Step3