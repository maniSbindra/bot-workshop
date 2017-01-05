var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();

var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'please enter your name');
    },
    function (session, result) {
       session.send("hello, " + result.response);
    }
]
);