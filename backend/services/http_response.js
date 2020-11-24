module.exports = {

    /**
     *
     * @param typeResponse
     * @param results
     * @param response
     * @returns {any|Promise<any>|void}
     * @constructor
     */
    HTTP_RESPONSE_DEFAULT: (typeResponse, results, response) => {
        if(typeResponse === 'json')
             return response.status(results.length > 0 ? 200 : 404).json(results);
        else
             return response.status(200).send(results);
    },

    /**
     *
     * @param statusCode
     * @param typeResponse
     * @param results
     * @param response
     * @returns {any|Promise<any>|void}
     * @constructor
     */
    HTTP_CUSTOM_RESPONSE: (statusCode, typeResponse, results, response) => {
        if(typeResponse === 'json')
            return response.status(statusCode).json(Object.assign(results, { status: statusCode }));
        else
            return response.status(statusCode).send(Object.assign(results, { status: statusCode }));
    }
}