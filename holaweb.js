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

   bot.dialog('/',[// Primer dialogo o dialogo raìz, se crea dentro del bot
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿Cómo te llamas?');
    },
    function (session, results){
        let msj = results.response;
        session.send(`hola ${msj}`);
        session.beginDialog('/preguntar lugar');

    }
]);
bot.dialog('/preguntarlugar',[// metodo preguntar lugar 
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿donde estas?');
    },
    function (session, results){
        let lugar = results.response;
        session.endDialog(`saludos por ${lugar}`);
    }
]);
bot.dialog('/preguntarclima',[// metodo preguntar lugar 
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿como está el clima?');
    },
    function (session, results){
        let clima = results.response;
        session.endConversation(`el ${clima}es muy agradable`);
        session.beginDialog('/preguntar deporte');
    }
]);
bot.dialog('/preguntardepor',[// metodo preguntar lugar 
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿cual es tu deporte favorito?');
    },
    function (session, results){
        let deporte = results.response;
        session.endConversation(`el ${deporte}`);
        session.beginDialog('/preguntar comida');
    }
]);
bot.dialog('/preguntarcomida',[// metodo preguntar lugar 
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿cual es tu comida favorita?');
    },
    function (session, results){
        let comida = results.response;
        session.endConversation(`la ${comida}tambies es mi comida favorita`);
        session.beginDialog('/preguntar hobby');
    }
]);
bot.dialog('/preguntarhobby',[// metodo preguntar lugar 
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿cual es tu hobby favorito?');
    },
    function (session, results){
        let hobby = results.response;
        session.endConversation(`el ${hobby}`);
        session.beginDialog('/preguntar hobby');
    }
]);