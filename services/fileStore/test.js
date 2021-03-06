var mbClientConn = require("../common/mbConnection/netConnection");
var clientFactory = require("devir-mbclient");
var fs = require('fs');

var client = mbClientConn(function (isReconecting) {

    client.sendRequest("/files/docx/toFilledPDF", {
        templateId: '56278466889209541f33e89d',
        objToFill: {
            first_name: 'Иван',
            last_name: 'Салдаев',
            phone: '7(702)322-14-86',
            description: 'nonPriced',
            price: '0'
        },
        fileName: 'filledTemplate'
    }, function (err, data) {
        if (err) {
            console.error(err);
        }
        else {
            console.log(data);
        }
    });
});