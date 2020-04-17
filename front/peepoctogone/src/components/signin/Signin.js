import React from 'react'

import './Signin.scss'

import Step1 from './step1/Step1'
import Step2 from './step2/Step2'
import Step3 from './step3/Step3'

import PropTypes from 'prop-types'
import Step4 from './step4/Step4'

import { connect } from 'react-redux'
import { authenticationOn } from '../../redux/actions/authentication'
import { setBusiness } from '../../redux/actions/business'

import { DASHBOARD_URL } from '../../config/routes'
import { debugLog, errorLog } from '../../lib/logs'
import {
  businessAdd, getUserBusinesses,
  userAdd,
  userCheckEmail,
  userUpdate
} from '../../lib/api'

/**
 * Signin class
 */
class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1
    }
    this.user = {
      id: 0,
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      businessList: []
    }
    this.workspace = {
      id: 0
    }
    // DEBUG
    // this.user.email = "j@j.fr"
    // this.checkMail()
  }

  /**
   * Set email
   *
   * @param email Email
   *
   */
  setMail = (email) => {
    debugLog('Signin::setMail: email=' + email)
    this.user.email = email
  }

  /**
   * Set User Data
   *
   * @param firstName FirstName
   * @param lastName LastName
   * @param password Password
   *
   */
  setUserData = (firstName, lastName, password) => {
    debugLog('Signin::setUserData: firstName=' + firstName + ' | lastName=' + lastName + ' | password=' + password)
    this.user.firstName = firstName
    this.user.lastName = lastName
    this.user.password = password
  }

  /**
   * Add user to the database
   */
  addUser = () => {
    userAdd(
      {
        email: this.user.email,
        isValidated: false
      },
      res => {
        this.user.id = res.id
        this.setState(state => ({
          ...state,
          step: state.step + 1
        }))
      },
      err => {
        errorLog(err.message)
        if (err.desc) errorLog(err.desc)
        this.props.showToast('danger', err.message)
      }
    )
  }

  /**
   * Set pending Business
   */
  setPendingBusiness = () => {
    getUserBusinesses(this.user.id,
      res => {
        this.user.businessList = res.reduce((result, business) => {
          if (business !== null)
            result.push(business)
          return (result)
        }
        , [])
        debugLog('SignIn::getUserBusiness: ' + JSON.stringify(this.user.businessList))
        this.setState(state => ({
          ...state,
          step: state.step + 1
        }))
      },
      err => this.props.showToast('danger', err.message)
    )
  }

  /**
   * Check mail
   */
  checkMail = () => {
    userCheckEmail(this.user.email,
      res => {
        if (res.exists && res.isvalidated)
          this.props.showToast('danger', 'This email is already use')
        else if (res.exists) {
          this.user.id = res.id
          this.setPendingBusiness()
        }
        else
          this.addUser()
      }
      , err => {
        this.props.showToast('danger', err.message)
      })
  }

  /**
   * Change the step of the Signin
   */
  nextStep = () => {
    debugLog('Signin::NextStep: ' + this.state.step)

    if (this.state.step === 1) {
      debugLog('Step 1: ' + this.user.email)
      this.checkMail()
    }
    else if (this.state.step === 2) {
      userUpdate(
        this.user.id,
        {
          key: 'isvalidated',
          value: true
        },
        () => {
          this.setState(state => ({
            ...state,
            step: state.step + 1
          }))
        },
        err => {
          errorLog(err.message)
          if (err.desc) errorLog(err.desc)
          this.props.showToast('danger', err.message)
        }
      )
    }
    else if (this.state.step === 3) {
      userUpdate(
        this.user.id,
        [
          {
            key: 'lastname',
            value: this.user.lastName
          },
          {
            key: 'firstname',
            value: this.user.firstName
          },
          {
            type: 'crypt',
            key: 'password',
            value: this.user.password
          }
        ],
        () => {
          businessAdd(
            {
              name: 'My workspace',
              owner: this.user.id
            },
            (res) => {
              this.workspace.id = res.id
              this.setState(state => ({
                ...state,
                step: state.step + 1
              }))
            },
            err => {
              errorLog(err.message)
              if (err.desc) errorLog(err.desc)
              this.props.showToast('danger', err.message)
            }
          )
        },
        err => {
          errorLog(err.message)
          if (err.desc) errorLog(err.desc)
          this.props.showToast('danger', err.message)
        }
      )
    }
    else if (this.state.step === 4) {
      this.props.authenticationOn({
        id: this.user.id
      })
      this.props.setBusiness({ id: this.workspace.id })
      this.props.history.push(DASHBOARD_URL)
    }
  }

  render() {
    return (
      <div className="Signin-false-dashboard">
        <div className="Signin-blur-background">
          <div className="Signin">
            {(() => {
              switch (this.state.step) {
              default:
                return (<Step1 nextStep={this.nextStep} setMail={this.setMail}/>)
              case 2:
                return (<Step2 nextStep={this.nextStep} email={this.user.email}/>)
              case 3:
                return (<Step3 nextStep={this.nextStep} setUserData={this.setUserData}/>)
              case 4:
                return (<Step4 nextStep={this.nextStep} user={this.user} showToast={this.props.showToast}/>)
              }
            })()
            }
          </div>
        </div>
      </div>
    )
  }
}

Signin.propTypes = {
  authenticationOn: PropTypes.func.isRequired,
  setBusiness: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  showToast: PropTypes.func.isRequired
}

export default connect(
  null,
  {
    authenticationOn,
    setBusiness
  }
)(Signin)
