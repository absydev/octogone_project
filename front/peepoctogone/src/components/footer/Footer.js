import React from 'react'

import './Footer.scss'

import { debugLog } from '../../lib/logs'

/**
 * Footer class
 *
 * Empty
 */
class Footer extends React.Component {
  render () {
    debugLog('Footer::render')
    return (
      <footer>
      </footer>
    )
  }
}

export default Footer
