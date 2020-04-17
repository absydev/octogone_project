import React from 'react'

import './App.css'

import 'normalize.css/normalize.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'

import Header from './components/header/Header'
import Content from './components/content/Content'
import Footer from './components/footer/Footer'

import { debugLog } from './lib/logs'
import { BrowserRouter } from 'react-router-dom'

/**
 * App class
 */
class App extends React.Component {
    constructor (props) {
        debugLog('App::constructor')
        super(props)
        this.state = {
            toast: {}
        }
    }

    componentDidMount () {
        debugLog('App::componentDidMount')
        // checkAPI((data) => {
        //     if (data.status === 'error') {
        //         errorLog(data.message)
        //         if (data.desc) errorLog(data.desc)
        //         this.showToast('danger', data.message)
        //     }
        // })
    }

    showToast = (intent, message) => {
        debugLog('App::showToast')
        this.setState({
            toast: {
                intent: intent,
                message: message
            }
        })
    }

    render () {
        debugLog('App::render')
        return (
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <Content toast={this.state.toast} />
                    <Footer />
                </BrowserRouter>
            </div>
        )
    }
}

export default App
