import React from 'react'
import { Callout, Card, H1, NumericInput } from '@blueprintjs/core'

import './Step2.scss'

import { debugLog } from '../../../lib/logs'
import PropTypes from 'prop-types'
import email_send from '../../../assets/email_send.png'

/**
 * Step2 class
 */
class Step2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      code: []
    }
    this.codeInput = {}
  }

    /**
     * Update Code Number X
     *
     * @param value Value of the code
     * X = id of the code
     */
    updateCodeZero = (value) => {
      this.updateCode(value, 0)
    }

    updateCodeOne = (value) => {
      this.updateCode(value, 1)
    }

    updateCodeTwo = (value) => {
      this.updateCode(value, 2)
    }

    updateCodeThree = (value) => {
      this.updateCode(value, 3)
    }

    updateCodeFour = (value) => {
      this.updateCode(value, 4)
    }

    updateCodeFive = (value) => {
      this.updateCode(value, 5)
    }

    /**
     * Update Code
     *
     * @param value Value
     * @param i id of the code
     */
    updateCode = (value, i) => {
      debugLog('Signin::updateCode: value=' + value + ' id=' + i)
      const newCode = this.state.code

      if (value !== null && value >= 0 && value <= 9) {
        newCode[i] = value
        this.nextField(i)
      }
      else {
        if (this.state.code[i] !== undefined)
          newCode[i] = undefined
      }
      this.setState(state => ({
        ...state,
        code: newCode,
        error: false
      }))
    }

    /**
     * Move the focus to the next input field
     *
     * @param i id of the code
     */
    nextField = (i) => {
      if (i < 5)
        this.codeInput[i + 1].focus()
      else
        this.codeInput[0].focus()
    }

    /**
     * Move the focus to the previous input field
     *
     * @param i id of the code
     */
    previousField = (i) => {
      if (i > 0)
        this.codeInput[i - 1].focus()
      else
        this.codeInput[5].focus()
    }

    /**
     * Move the focus to the end of the number
     *
     * @param e Event
     */
    focusAtEnd = (e) => {
      const tmp = e.target.value
      e.target.value = ''
      e.target.value = tmp
    }

    /**
     * Check if the code is correct or delete all codes
     */
    codeConfirm = () => {
      const code = this.state.code.join('')
      debugLog('Code confirm code:' + code)
      if (code.length === 6) {
        if (code === '666666')
          this.props.nextStep()
        else
          this.errorCode()
      }
    }

    /**
     * Display error and clean old code if code is false.
     */
    errorCode = () => {
      debugLog('Signin::errorCode:')
      const newCode = this.state.code
      newCode.length = 0
      this.setState(state => ({
        ...state,
        error: true,
        code: []
      }))
    }

    /**
     * Handle key press and move the focus if the key is left or right
     *
     * @param i id of the input code
     * @param event Event
     */

    handleKeyPress(i, event) {
      debugLog('Signin::handleKeypress: value=' + event.key + ' id=' + i)
      if (event.key === 'Backspace') {
        event.preventDefault()
        this.updateCode(undefined, i)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        this.nextField(i)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        this.previousField(i)
      }
    }

    componentDidUpdate() {
      if (this.state.code.length === 6)
        this.codeConfirm()
    }

    render() {
      return (
        <Card>
          <H1>Check your email</H1>
          <p>
                    We sent you a code to <strong>{this.props.email}.</strong>
          </p>
          <div className="Signin-validation">
            <NumericInput
              className="Signin-input"
              large="true"
              buttonPosition="none"
              allowNumericCharactersOnly="true"
              min="0"
              max="9"
              intent={this.state.error ? 'danger' : 'primary'}
              value={this.state.code[0]}
              onValueChange={this.updateCodeZero}
              inputRef={(input) => {
                this.codeInput[0] = input
              }}
              onKeyDown={(e) => this.handleKeyPress(0, e)}
              onFocus={this.focusAtEnd}
              fill="true"
            />
            <NumericInput
              className="Signin-input"
              large="true"
              buttonPosition="none"
              allowNumericCharactersOnly="true"
              min="0"
              max="9"
              intent={this.state.error ? 'danger' : 'primary'}
              value={this.state.code[1]}
              onValueChange={this.updateCodeOne}
              inputRef={(input) => {
                this.codeInput[1] = input
              }}
              onKeyDown={(e) => this.handleKeyPress(1, e)}
              onFocus={this.focusAtEnd}
            />
            <NumericInput
              className="Signin-input"
              large="true"
              buttonPosition="none"
              allowNumericCharactersOnly="true"
              min="0"
              max="9"
              intent={this.state.error ? 'danger' : 'primary'}
              value={this.state.code[2]}
              onValueChange={this.updateCodeTwo}
              inputRef={(input) => {
                this.codeInput[2] = input
              }}
              onKeyDown={(e) => this.handleKeyPress(2, e)}
              onFocus={this.focusAtEnd}
            />
            <p className="separator">-</p>
            <NumericInput
              className="Signin-input"
              large="true"
              buttonPosition="none"
              allowNumericCharactersOnly="true"
              min="0"
              max="9"
              value={this.state.code[3]}
              intent={this.state.error ? 'danger' : 'primary'}
              onValueChange={this.updateCodeThree}
              inputRef={(input) => {
                this.codeInput[3] = input
              }}
              onKeyDown={(e) => this.handleKeyPress(3, e)}
              onFocus={this.focusAtEnd}
            />
            <NumericInput
              className="Signin-input"
              large="true"
              buttonPosition="none"
              allowNumericCharactersOnly="true"
              min="0"
              max="9"
              value={this.state.code[4]}
              intent={this.state.error ? 'danger' : 'primary'}
              onValueChange={this.updateCodeFour}
              inputRef={(input) => {
                this.codeInput[4] = input
              }}
              onKeyDown={(e) => this.handleKeyPress(4, e)}
              onFocus={this.focusAtEnd}
            />
            <NumericInput
              className="Signin-input"
              large="true"
              buttonPosition="none"
              allowNumericCharactersOnly="true"
              min="0"
              max="9"
              value={this.state.code[5]}
              onValueChange={this.updateCodeFive}
              intent={this.state.error ? 'danger' : 'primary'}
              inputRef={(input) => {
                this.codeInput[5] = input
              }}
              onKeyDown={(e) => this.handleKeyPress(5, e)}
              onFocus={this.focusAtEnd}
            />
          </div>
          {this.state.error ?
            <Callout
              className="Signin-code-error"
              intent="danger"
            >
              {'This code isn\'t valid. Please to give another.'}
            </Callout>
            : null}
          <p>
                    Remember to check your spam folder
          </p>
          <img
            className="Signin-email-send"
            src={email_send}
            alt="Email_send"
          />
        </Card>
      )
    }
}

Step2.propTypes = {
  nextStep: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired
}

export default Step2
