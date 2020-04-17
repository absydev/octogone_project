import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

import App from './App'

import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import configureStore from './redux/store'

import { PersistGate } from 'redux-persist/integration/react'

// Enable behavior which hides focus styles during mouse interaction.
import { FocusStyleManager } from '@blueprintjs/core'
FocusStyleManager.onlyShowFocusOnTabs()

const { store, persistor } = configureStore()
const root = document.getElementById('root')

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>, root
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
