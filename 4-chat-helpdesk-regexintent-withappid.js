var builder = require('botbuilder');
var restify = require('restify');

// var connector = new builder.ConsoleConnector().listen();
var server = restify.createServer();

server.listen(process.env.PORT || 3798, function () {
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


bot.dialog('/', new builder.IntentDialog()
    .matchesAny([/help/i, /support/i, /problem/i], [
        function (session) {
            session.beginDialog('/support');
        },
        function (session, result) {
            var ticketNumber = result.response;
            session.send("Your ticket number is %s", ticketNumber);
            session.endDialog();
        }
    ])
    .matchesAny([/hi/i, /hello/i], [
        function (session) {
            session.send("Hello there.....");
        }
    ])
    .onDefault([
        function (session) {
            session.send("sorry could not figure out intent");
        }
    ])
);

bot.dialog('/support', function (session) {
    var tickerNumber = Math.ceil(Math.random() * 20000);
    session.endDialogWithResult({
        response: tickerNumber
    });
});

