import react from 'react';
import ReactDOM from 'react-dom';
import fetchHandler from './fetch';

// Define the properties of the menu
const menuContent = Object.assign(Object.create({}), {
  content: [{
    name: 'Home',
    link: '/',
  }, {
    name: 'Pokedex',
    link: '/pokedex',
  }, {
    name: 'Admin',
    link: '/admin',
  }, {
    name: 'Localise',
    link: '/localise',
  }],
  footerMenu: '',
});

/**
 * Bootloader
 *          Load and start every function and dependencies that need to be start for the website
 */
const APIFacade = (() => {
  /**
   * Services
   * @return {Promise}
   */
  const fetchFacade = function (API_URL = '', method, headers = {}, params = {}) {
    return new Promise((resolve, reject) => {
      try {
        fetchHandler.init(API_URL, method)
                .set(headers, params)
                .make()
                .then((self) => {
                  self.res().then((data) => {
                    resolve(data);
                  });
                });
      } catch (e) {
        reject(e);
      }
    });
  };
  // Everything that need to be done at start should be done here..
  return {
    _fetch: fetchFacade,
  };
})();

/**
 * Utils
 *          Every function that's common is put in the utils (if not subject to any React things)
 */
const utils = (() => {
    /**
     * Init
     *      Return every common component that might need a React Component
     **/
  const init = function () {
    return {
      _reactDom: ReactDOM,
      _utils: this,
    };
  };

  return {
    initDependencies: init,
  };
})();

export { utils, APIFacade, react, menuContent, ReactDOM };