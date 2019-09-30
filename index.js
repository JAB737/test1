const http = require('http');
const connect = require('connect');
const fs = require('fs');
var bPaginaCargada = false;
var fileDataxs = "";


function check1(req, res, next){
    //res.write("Chequeando 1");
    console.log("Ejecutando el primer Cheque");
    if (req.url == "/"){
        res.end("End");
    } else {
        next();
    }
}

function check2(req, res, next){
    console.log("Ejecutando el segundo Cheque");
    var texto = "";
    texto = fs.readFileSync("./index.html").toString();
 
    var name = req.url.replace("/","");
    texto = texto.replace("{nombre$}",name);
 
    res.writeHead(200,{"Context-type":"text/html"});
    res.write(texto);
    
    res.end();
}

const app = connect();
app.use(check1);
app.use(check2);
http.createServer(app).listen(2000);
console.log("Server running on port:2000");

