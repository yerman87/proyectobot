//Invocar Botbuilder requiriendo el paquete
var builder = require('botbuilder');
// Hace lo mismo con el conector, une la consola con el bot
var conector = new builder.ConsoleConnector().listen();

var bot = new builder.UniversalBot(conector);

bot.dialog('/',[// Primer dialogo o dialogo raìz, se crea dentro del bot
    function(session){// objeto llamado sesiòn
        session.send('\nHola Mundo\n'); //este objeto es la manera de conectar con los usuarios
    }
])