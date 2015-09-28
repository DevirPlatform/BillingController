/**
 * Created by mac on 23.09.15.
 */
module.exports.success = function(payload){
    return {operationResult: 0, result: payload};
};

module.exports.validationError = function(validationResult){
    return {operationResult: 1, result: validationResult};
};

module.exports.internalError = function(error){
    return {operationResult: 2, result: error};
};

module.exports.buildError = function (err) {
    if (err.name)
        if (err.name == 'ValidationError') return { operationResult: 1, result: [err] };
    return { operationResult: 2, result: err };
};