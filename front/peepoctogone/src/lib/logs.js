import {debug} from '../config/debug'

/**
 * Debug log function
 *
 * @param data data to print
 */
export const debugLog = (data) => {
    if (debug) {
        console.log('%cDEBUG:', 'color: blue')
        console.log(data)
    }
}

/**
 * Info log function
 *
 * @param data data to print
 */
export const infoLog = (data) => {
    console.log('%cINFO:', 'color: green')
    console.log(data)
}

/**
 * Error log function
 *
 * @param data data to print
 */
export const errorLog = (data) => {
    console.log('%cERROR:', 'color: red')
    console.log(data)
}
