var Botkit = require('botkit');

//Setup controller that defines the bots behavours (for slack)
var controller = Botkit.slackbot({
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  studio_token: process.env.studio_token,
});

//setup webserver for bot to receive incoming messages via webhook
controller.setupWebserver(process.env.port,function(err,webserver){
  controller.createWebhookEndpoints(controller.webserver);
  controller.createOauthEndpoints(controller.webserver);
});


//example listen and reply
controller.hears('hello','direction_mention,direct_message', function(bot, message){
  bot.reply(message,'Howdy!');
});


controller.hears('tacos','direction_mention,direct_message', function(bot, message){
  bot.startConversation(message, function(err, convo) {
    convo.say('Taco Time');
    convo.ask('what type of taco do you want?', function(answer, convo){
      var tacoType = answer.txt;

      //do something with the answer
      // storeTacoType(convo.context.user, taco_type);
      convo.say('YUMMMM!!!'); // add another reply
      convo.next(); // continue with conversation
    });
  });
});
