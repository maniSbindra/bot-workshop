var builder = require('botbuilder');
var restify = require('restify');

// var connector = new builder.ConsoleConnector().listen();
var server = restify.createServer();

server.listen(process.env.PORT || 3899, function () {
    console.log("%s listening on %s", server.name, server.url);
});

var connector = new builder.ChatConnector(
    {
        appId: process.env.MICROSOFT_APP_ID,
        appPassword: process.env.MICROSOFT_APP_PASSWORD

    }
);

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

const LuisModelUrl = process.env.LUIS_HELPDESK_MODEL_URL;
var recognizer = new builder.LuisRecognizer(LuisModelUrl);

// console.log(LuisModelUrl);

// var intents = new builder.IntentDialog({ recognizers: [recognizer] })
bot.dialog('/', new builder.IntentDialog({ recognizers: [recognizer] })
    .matches('raiseTicket', [
        function (session) {
            session.beginDialog('/support');
        },
        function (session, result) {
            var ticketNumber = result.response;
            session.send("Your ticket number is %s", ticketNumber);
            session.endDialog();
        }
    ])
    .matches('Greeting', [
        function (session) {
            session.send("Hello there!");
        }
    ])
    .onDefault([
        function (session) {
            session.send("sorry could not figure out intent");
        }
    ])
);

// bot.dialog('/', intents);


bot.dialog('/support', function (session) {
    var tickerNumber = Math.ceil(Math.random() * 20000);
    session.endDialogWithResult({
        response: tickerNumber
    });
});

