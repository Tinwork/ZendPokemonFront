/**
 *  Fetch 
 *      Making a request toward the back-end 
 */
const fetch = (() => {

    // Creating the variable that will be available accross the fetch function
    let req,
        reqHeaders = new Headers(),
        reqParams = Object.create({})
        fetchResp  = Object.create({});
    
    let headers = new Headers();
    
    /**
     *  Prepare 
     *          Prepare a Request 
     *  @param {String} API_URL 
     *  @param {String} method 
     *  @return {Object} <this>
     *  @private 
     */
    let prepare = function(API_URL, method = 'POST'){
        req = new Request(API_URL)
        reqParams.method = method

        return this;
    }

    /**
     *  Set Params 
     *          Set parameters to the Request 
     *  @param {Mixed} Object 
     *  @return {Object} <this>
     *  @private 
     */
    let setParams = function(headers, mixed){
        let headers = Object.create()
        if (req === undefined || req === null) {
            throw Error("Request is not defined");
        }

        // set the params 
        if (headers !== undefined || headers !== null) 
            reqParams.headers = headers;

        if (mixed !== undefined || mixed !== null)
            req.body = JSON.stringify(mixed)
        
        return this;
    }

    /**
     *  Execute 
     *          Execute the following request 
     *          * Promise return the this if success 
     *  @return {Promise} Promise {}
     *  @private
     */
    let execute = function(){
        return fetch(req).then(function(response){
            // save the data in fetchResp 
            fetchResp = JSON.parse(response);
            resolve(this);
        })
        .catch(err => {
            // return the error 
            reject(err);
        })
    }

    /**
     *  Result 
     *          Return the result of the request 
     *  @return {Object} paramsToReturn 
     *  @private 
     */
    let result = (params = []) => {
        let paramsToReturn = Object.create({});
        if (params.length > 0) 
            for (param of param) {
                paramsToReturn[param] = fetchResp[param]
            }
        else 
            paramsToReturn = fetchResp

        return paramsToReturn
    }

    // Return a list of Object 
    return {
        init : prepare,
        set  : setParams,
        make : execute,
        res  : result
    }
})();