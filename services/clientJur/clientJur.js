var clientFactory = require("devir-mbclient");
global.rootRequire = function(name){
    return require(__dirname + '/' + name);
}

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/BillingController');

errorBuilder = rootRequire('/helpers/mongoose/errorBuilder').buildError;

var clientJurLogic = rootRequire('/logic/clientJurLogic.js');

var client = new clientFactory.core(clientFactory.netConnector, "localhost", "9009", function (isReconecting) {

    console.log("Подключение установлено");

    client.registerRoute('/clientJur/getPeriods', function (request) {
        clientJurLogic.getPeriods(function (result) {
            if (result.operationResult != 0){
                console.log('/clientJur/getPeriods:', result.result);
            }
            request.sendResponse(result);
        });
    });

    client.registerRoute('/clientJur/getById', function (request) {
        clientJurLogic.getById(request.payload.clientJurId, function (result) {
            if (result.operationResult != 0){
                console.log('/clientJur/getById:', result.result);
            }
            request.sendResponse(result);
        });
    });

    client.registerRoute('/clientJur/getByCtrlId', function (request) {
        clientJurLogic.getAllByControllerId(request.payload.controllerId, function (result) {
            if (result.operationResult != 0){
                console.log('/clientJur/getByCtrlId:', result.result);
            }
            request.sendResponse(result);
        });
    });

    client.registerRoute('/clientJur/add', function (request) {
        clientJurLogic.add(request.payload, function (error, result) {
            if (error){
                console.log('clientJur/clientJur.js:', error);
            } else {
                request.sendResponse(result.result);
            }
        });
    });

    client.registerRoute('/clientJur/getAll', function (request) {
        clientJurLogic.getAll(request.payload, req.user.organizationId, function (result) {
            if (result.error){
                console.log('clientJur/getAll:', error);
            }
            request.sendResponse(result.relsult);
        });
    });

    client.registerRoute('/clientJur/syncClients', function (request) {
        clientJurLogic.sync(req.body.clients, function (data) {
        });
    });

    client.registerRoute("/clientJur/update", function (req, res) {
        clientJurLogic.update(req.body, function (data) {
        });
    });

    client.registerRoute("/clientJur", function (req, res) {
        clientJurLogic.delete(req.query.id, function (data) {
        });
    });

    client.registerRoute("/clientJur/search", function (req, res) {
        clientJurLogic.search(req.query.searchTerm, req.query.period, req.user, function (data) {
        });
    });

    client.registerRoute('/clientJur/updateClientCounter', function (req, res) {
        clientJurLogic.updateClientCounter(req.body, req.user._id, function (data) {
        });
    });

    client.registerService();

});