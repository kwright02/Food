const ms = require('ms');
const moment = require('moment');
const fs = require('fs');

module.exports = {
    run: async (client, msg, connection, args) => {
    var options = dutils.getMemberOptions(client, msg.author.user, connection);
    let curPts = options["points"];
    let curDaily = options["daily"];

    if (curDaily != moment().format('L')) {
          curDaily = moment().format('L');
          curPts = curPts + 10;
          options["daily"] = curDaily;
          options["points"] = curPts;
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
