const connection = require('../config/database');
const Service = require('../services/http_response');
/**
 * @author Hector Rodrigues Da Silva
 */

module.exports = {
        
    /**
      *
      * @param request
      * @param response
      * @method POST
      * @return {*}
    */
    setMessage: (request, response) => {
        const { author, data_message, hour_message, message, type_upload, directory_upload } = request.body;
        const querySetMessage =
            `INSERT INTO message 
             SET 
                author='${author}',
                data_message='${data_message}', 
                hour_message='${hour_message}',
                message='${message}',
                type_upload='${type_upload}',
                directory_upload='${directory_upload}'`;

        connection.query(querySetMessage, (err, results) => {
            if(err) throw err;
            Service.HTTP_CUSTOM_RESPONSE(200, 'json', results, response);
        });
    },

    /**
      *
      * @param request
      * @param response
      * @method GET
      * @return {data}
    */
    getAllMessages: (request, response) => {
        const queryGetMessages =
            `SELECT * FROM message`;

        connection.query(queryGetMessages, (err, results) => {
            if(err) throw err;
            if(results.length > 0)
                Service.HTTP_CUSTOM_RESPONSE(200, 'json', results, response);
            else
                Service.HTTP_CUSTOM_RESPONSE(404, 'send', results, response);
        });
    },

    /**
      *
      * @param req
      * @param res
      * @method GET
      * @return {data}
    */
    getLimitMessages: (req, res) => {

    },

    /**
      *
      * @param request
      * @param response
      * @method GET
      * @return {data}
    */
    getCountMessages: (request, response) => {
        const queryCountMessages =
            `SELECT COUNT(message) as message
             FROM message`;

        connection.query(queryCountMessages, (err, results) => {
            if(err) throw err;
            if(results.length > 0)
                Service.HTTP_CUSTOM_RESPONSE(200, 'json', results, response);
            else
                Service.HTTP_CUSTOM_RESPONSE(404, 'send', results, response);
        });
    }
}