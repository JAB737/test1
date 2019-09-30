const http = require('http');
const connect = require('connect');

function comm(req, res){
    res.write("Chao");
    res.end();
}

http.createServer(comm).listen(2000);
console.log("Server running on port:2000");

