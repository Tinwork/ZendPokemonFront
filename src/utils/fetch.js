/**
 *  Fetch
 *      Making a request toward the back-end
 */
const fetchHandler = (() => {
  // Creating the variable that will be available accross the fetch function
  let req;
  const reqParams = Object.create({});
  let fetchResp = Object.create({});

    /**
     *  Prepare
     *          Prepare a Request
     *  @param {String} API_URL
     *  @param {String} method
     *  @return {Object} <this>
     *  @private
     *  @chainable
     */
  const prepare = function (API_URL, method = 'POST') {
    req = new Request(API_URL);
    reqParams.method = method;

    return this;
  };

    /**
     *  Set Params
     *          Set parameters to the Request
     *  @param {Mixed} Object
     *  @return {Object} <this>
     *  @private
     *  @chainable
     */
  const setParams = function (headers = {}, mixed) {
    if (req === undefined || req === null) {
      throw Error('Request is not defined');
    }

    // set the params
    if (headers !== undefined || headers !== null) {
      reqParams.headers = headers;
    }

    if (mixed !== undefined || mixed !== null) {
      req.body = JSON.stringify(mixed);
    }

    return this;
  };

   /**
    *  Execute
    *          Execute the following request
    *          * Promise return the this if success
    *  @return {Promise} Promise {}
    *  @private
    *  @chainable
    */
  const execute = function () {
    const self = this;
    return fetch(req).then((response) => {
      fetchResp = response;
      return Promise.resolve(self);
    })
    .catch(err => Promise.reject(err));
  };

    /**
     *  Result
     *          Return the result of the request
     *          if the user desired a special params then return the right param
     *  @param {Array} params
     *  @return {Object} paramsToReturn
     *  @private
     */
  const result = (params = []) => {
    let paramsToReturn = Object.create({});
    return fetchResp.json()
             .then((data) => {
               if (params.length > 0) {
                 paramsToReturn = params.map(param => data[param]);
               } else {
                 paramsToReturn = data;
               }

               return Promise.resolve(paramsToReturn);
             })
             .catch(err => {
               return Promise.reject(err);
             });
  };


    // Return a list of Object
  return {
    init: prepare,
    set: setParams,
    make: execute,
    res: result,
  };
})();

export { fetchHandler as default };