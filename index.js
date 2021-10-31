//código index.js

var functions = require('./functions');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//CORS enable
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});

app.post('/rastreamento_watson',function(req, res){
    console.log(req.body)
    action = req.body.action
    codigo = req.body.codigo
    let rastreamento = null

    console.log(action)
    console.log(codigo)

    if(action == "rastreamento"){

        functions.getCorreios(codigo)
            .then(function(response){
                var parsedResponse = JSON.parse(response);
                
                rastreamento = "*Certo, aqui está o rastreamento da sua entrega:* \n------\n";

                for (status = 0; status < parsedResponse.eventos.length; status++){
                
                    rastreamento = rastreamento +
                    "Data: " + parsedResponse.eventos[status].data +
                    "\nHora: " + parsedResponse.eventos[status].hora + 
                    "\nLocal: " + parsedResponse.eventos[status].local +
                    "\nStatus: " + parsedResponse.eventos[status].status +
                    "\n------\n"
                }

                console.log(rastreamento)
                return res.json({"mensagem": rastreamento}) 
            })
    }

})

//server running
app.listen(app.get('port'), function () {
	console.log("running: " + app.set('port'))
});
JAVASCRIPT
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