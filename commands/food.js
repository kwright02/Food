const ms = require('ms');
const moment = require('moment');
const fs = require('fs');

module.exports = {
    run: async (client, msg, args) => {
    const key = `${msg.author.id}`;
let curPts = client.info.get(key, "points");
let curDaily = client.info.get(key, "daily");
    if(!client.info.get(`${msg.author.id}`)) {
    client.info.ensure(`${msg.author.id}`, {
      xp: 0,
      level: 1,
      points: 0,
      daily: 0
    });
     }
console.log(moment().format('L'));
      if (curDaily != moment().format('L')) {
          curDaily = moment().format('L');
          client.info.set(key, curDaily, "daily");
          curPts = curPts + 10;
          client.info.set(key, curPts, "points");
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
