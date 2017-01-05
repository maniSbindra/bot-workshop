var builder = require('botbuilder');
var restify = require('restify');

// var connector = new builder.ConsoleConnector().listen();
var server = restify.createServer();

server.listen(process.env.PORT || 9711, function(){
console.log("%s listening on %s", server.name, server.url);
});

var connector = new builder.ChatConnector(
    {

    }
);

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'Hello there, please enter your name');
    },
    function (session, result) {
       session.send("hello, " + result.response);
    }
]
);

