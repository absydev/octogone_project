import {
  AUTHENTICATION_ON,
  AUTHENTICATION_OFF
} from '../actionTypes/authentication'

const initialState = {
  authorized: false,
  user: {}
}

export default (state=initialState, action) => {
  switch (action.type) {
  case AUTHENTICATION_ON:
    return {
      authorized: true,
      user: {
        id: action.user.id
      }
    }
  case AUTHENTICATION_OFF:
    return {
      authorized: false,
      user: {}
    }
  default:
    return state
  }
}
