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
        session.beginDialog('/preguntarlugar');

    }
]);
bot.dialog('/preguntarlugar',[// metodo preguntar lugar 
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿donde estas?');
    },
    function (session, results){
        let lugar = results.response;
        session.endDialog(`saludos por ${lugar}`);
        session.beginDialog('/preguntarclima');
        
    }
]);
bot.dialog('/preguntarclima',[// metodo preguntar lugar 
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿como está el clima?');
    },
    function (session, results){
        let clima = results.response;
        session.endDialog(` ${clima} es muy agradable`);
        session.beginDialog('/preguntardepor');
    }
]);
bot.dialog('/preguntardepor',[// metodo preguntar lugar 
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿cual es tu deporte favorito?');
    },
    function (session, results){
        let deporte = results.response;
        session.endDialog(` ${deporte}`);
        session.beginDialog('/preguntarcomida');
    }
]);
bot.dialog('/preguntarcomida',[// metodo preguntar lugar 
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿cual es tu comida favorita?');
    },
    function (session, results){
        let comida = results.response;
        session.endDialog(` ${comida} tambien es mi comida favorita`);
        session.beginDialog('/preguntarhobby');
    }
]);
bot.dialog('/preguntarhobby',[// metodo preguntar lugar 
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿cual es tu hobby favorito?');
    },
    function (session, results){
        let hobby = results.response;
        session.endConversation(`A mi tambien ${hobby}`);
    }
]);