var restify = require('restify');
var builder = require('botbuilder');

//crear servidor 
var server = restify.createServer();
//se escucha en distintos puertos, particularmente en el 3978
server.listen(
    process.env.port ||
    process.env.PORT ||
    3978, function(){
        console.log("%s listening to %s", server.name, server.url);
});

    var connector = new builder.ChatConnector({
        appId: '',
        apppassword:''
   });
   var bot = new builder.UniversalBot(connector);
   server.post('api/messages', connector.listen());
   //dialogos
   
   bot.dialog('/',[ // Primer dialogo o dialogo raìz, se crea dentro del bot
    function(session,result,next){
        if(!session.userData.nombre){//preguntar si sabemos el nombre 
                builder.Prompts.text(session, '¿como te llamas?');
        }
        else{
            next();
        }
    },
    function(session,results){
        if(results.response){
            let msj = results.response;
            session.userData.nombre = msj;
        }
            session.send(`hola ${session.userdata.nombre}!`);
    }
]);