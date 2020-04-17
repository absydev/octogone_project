import {
  AUTHENTICATION_ON,
  AUTHENTICATION_OFF
} from '../actionTypes/authentication'

export const authenticationOn = (user) => ({
  type: AUTHENTICATION_ON,
  user: user
})

export const authenticationOff = () => ({
  type: AUTHENTICATION_OFF
})
