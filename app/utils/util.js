import react    from 'react'
import ReactDOM from 'react-dom'

/**
 * Bootloader 
 *          Load and start every function and dependencies that need to be start for the website
 */
let bootloader = (() => {
    // Everything that need to be done at start should be done here..
    return {

    }
})();

/**
 * Utils 
 *          Every function that's common is put in the utils (if not subject to any React things)
 */
let utils = (() => {
    
    /**
     * Init 
     *      Return every common component that might need a React Component 
     */
    let init = () => {
        return {
            _reactDom : ReactDOM,
            _utils : this
        }
    }

    return {
        initDependencies : init 
    }
})()

export {utils, bootloader, react}
