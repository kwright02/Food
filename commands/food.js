const ms = require('ms');
const moment = require('moment');
const fs = require('fs');

module.exports = {
    run: async (client, msg, connection, args) => {
      let bc = client.channels.get("399916099325657088");
      if (msg.channel.id !== "399916099325657088") {
       msg.channel.send(`This command can only be used in ${bc}.`)
       return;
        }
    var options = dutils.getMemberOptions(client, msg.author.user, connection, "Food Command");

    if (curDaily != moment().format('L')) {
          curDaily = moment().format('L');
          options["curPts"] = options["curPts"] + 10;
          options["daily"] = curDaily;
          dutils.updateMemberOptions(client, msg.author.user, connection, "Food Command");
   const responses = ['Apple', 'Cake', 'Cookie', 'Shrimp', 'Lobster', 'Crab', 'Fish', 'Pop Corn', 'Cheese', 'Orange', 'Lemon', 'Banana', 'Garlic', 'Coconut', 'Avocado', 'Tofu', 'Tomato', 'Onion', 'Lentil', 'Carrot', 'Spinach', 'Cracker', 'Bread', 'Waffle', 'Pancake', 'Eggs', 'Tuna', 'Bacon', 'Lamb', 'Asparagus', 'Almond', 'Eggplant', 'Celery', 'Beans', 'Grapefruit', 'Pomegranate', 'Brussels Sprouts', 'Beef', 'Pork', 'Hotdog']
   msg.channel.send(`You claimed your daily **10** Food Points and your food is **${responses[Math.floor(Math.random() * responses.length)]}**!`);
         } else {
         msg.channel.send("You can claim your daily again " + moment().endOf('day').fromNow())
     }
    },
    meta: {
        name: 'daily',
        description: 'Daily food points',
        usage: ''
    }
}
