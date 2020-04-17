import React from 'react'
import { Button, Card, H1, InputGroup } from '@blueprintjs/core'
import laplacianOnCube from '../../../assets/LaplacianOnCube.jpg'

import './Step1.scss'

import { debugLog } from '../../../lib/logs'
import PropTypes from 'prop-types'

/**
 * Step1 class
 */
class Step1 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      error: 'normal'
    }
  }

    /**
     * Update Email
     *
     * @param e Event
     */
    updateEmail = (e) => {
      debugLog('Signin::updateEmail: ' + e.target.value)
      let tmp = 'normal'
      if (this.testEmail(e.target.value))
        tmp = 'primary'
      e.persist()
      this.setState(state => ({
        ...state,
        email: e.target.value,
        error: tmp
      }))
      this.props.setMail(e.target.value)
    }

    /**
     * test Email and return true if he is valid.
     *
     * @param email Email
     */
    testEmail = (email) => {
      if (email.length === 0 || email.length > 64)
        return (false)
      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regexp.test(email)
    }

    /**
     * Handle key press and move the focus if the key is left or right
     *
     * @param i id of the input code
     * @param event Event
     */
    handleKeyPress(event) {
      debugLog('Signin::handleKeypress: value=' + event.key)
      if (event.key === 'Enter') {
        event.preventDefault()
        if (this.state.error === 'primary')
          this.props.nextStep()
        else
        {
          this.setState(state => ({
            ...state,
            error: 'danger'
          }))
        }
      }
    }

    render () {
      return (
        <Card>
          <H1>Create a new project</H1>
          <p className="bp3-text-large">
                    To make a project from scratch, please confirm your email address.
          </p>
          <InputGroup
            className="Signin-email"
            large="true"
            intent={this.state.error}
            leftIcon="envelope"
            placeholder="name@example.com"
            onKeyDown={(e) => this.handleKeyPress(e)}
            type="email"
            value={this.state.email}
            onChange={e => this.updateEmail(e)}
          />
          <Button
            fill="true"
            large="true"
            rightIcon="arrow-right"
            intent={this.state.error}
            text="Next step"
            disabled={this.state.error !== 'primary'}
            onClick={() => this.props.nextStep()}
            type="button"
          />
          <img
            className="Signin-laplacian"
            src={laplacianOnCube}
            alt="Laplacian on cube"
          />
        </Card>
      )
    }
}

Step1.propTypes = {
  nextStep: PropTypes.func.isRequired,
  setMail: PropTypes.func.isRequired
}

export default Step1
