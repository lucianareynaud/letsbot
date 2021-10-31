//código functions.js

var rp = require('request-promise');
var request = require('request');


exports.getCorreios = function(codigo){
    var url = 'https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo=' + codigo;
    return rp({
        url: url,
        method: 'GET'
    });
}