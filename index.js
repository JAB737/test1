const http = require('http');
const connect = require('connect');

const fs = require('fs');
const app = connect();                      // Por lo visto debo crear una instancia de connect (aunque seria copia de un objeto)



// Revisar si hay un query en el URL
function check1(req, res, next){
    console.log("Ejecutando el codigo de 'check1()'. El URL entrante es >" + req.url + "<");
    if (req.url == "/"){
        res.write("Esta en la Main Page. Si quieres cargar la pagina HTML usa un query. Ejemplo (/jorge)");
        res.end("End");
    } else {
        next();
    }
}

// De haber algo en el URL ejecuto esta funcion
function check2(req, res, next){
    console.log("Ejecutando el codigo de 'check2()'");
    var texto = fs.readFileSync("./index.html").toString(); // Cargo la pagina WEB en 'texto'
    
    var name = req.url.replace("/","");
    texto = texto.replace("{nombre$}",name);
    
    res.writeHead(200,{"Context-type":"text/html"});
    res.write(texto);
    
    res.end();
}

// Ignoro la solicitud de Icono Favorito
function resFavIcon(req, res, next){
    console.log("(favicon.ico es ignorado)");
    res.end();
}

// Confirguro el 'connect()'
// Cuando un llamado entre, 'createServer()' llama a la funcion 'app' (o sea a Connect).
// A esta funcion le hacemos una queue de otras funciones que se ejecutaran en orden siempre
// que haya un 'next()'
app.use('/favicon',resFavIcon);             // Si el URL es '/favicon.ico' lo ignoro
app.use(check1);                            // Con el metodo 'use' puedo crear un queue con callBacks 
app.use(check2);                            // que seran llamado a medida de que use 'next()'

// Configuramos el servidor para que este atento a los llamados que le haga el Browser
http.createServer(app).listen(2000);        // Cuando haya una solicitud de conexion, 'createSerever()' llama al callback 'app'
console.log("Server running on port:2000");
