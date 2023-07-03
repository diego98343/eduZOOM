const {StatusCode} = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class unauthorizedError extends CustomAPIError{
    constructor(message){
        super(message);
        this.StatusCode = StatusCode.FORBIDDEN;
    }
}

module.exports = unauthorizedError;