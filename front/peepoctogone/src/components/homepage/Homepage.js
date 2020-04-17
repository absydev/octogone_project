import React from 'react'

import './Homepage.scss'

import { debugLog } from '../../lib/logs'

/**
 *  Homepage class
 *
 * Empty
 */
class Homepage extends React.Component {
    render () {
        debugLog('Homepage::render')
        return (
            <div className='Homepage'>
                HomePage
            </div>
        )
    }
}

export default  Homepage
