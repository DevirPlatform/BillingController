/**
 * Created by mac on 21.09.15.
 */
var clientFactory = require("devir-mbclient");

var client = new clientFactory.core(clientFactory.netConnector, "localhost", "9009", function(isReconecting){

console.log("Подключение установлено");



});