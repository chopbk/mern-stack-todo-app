/**
 * @Description This function response error to Client Request
 * @param {Object} res : info to response
 * @param (error) err: err message
 * @param (number) code: err code
 * @return {Object} res : response
 */
module.exports.ResErr = function (res, err, code) { // Error Web Response
    if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
    }

    if (typeof code !== 'undefined') res.statusCode = code;

    return res.json({
        success: false,
        error: err
    });
};
/**
 * @Description This function  use for response success to Client Request
 * @param {Object} res : info to response
 * @param (error) err: err message
 * @param (number) code: err code
 * @return {Object} res : response
 */
module.exports.ResSuccess = function (res, data, code) { // Success Web Response
    let success = {
        success: true
    };
    if (typeof data === 'object') {
        data = Object.assign(data, success); //merge the objects
    }
    if (typeof code !== 'undefined') res.statusCode = code;

    return res.json(data)
};

