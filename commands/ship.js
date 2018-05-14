const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, args) => {
let user1 = args[0];
if(!user1) return msg.reply("Please mention two users to ship!");
let user2 = args[1];
if(!user2) return msg.reply("Please mention a second user!");
let result = Math.floor(Math.random() * 100) + 1;
msg.channel.send(`:small_red_triangle_down: ${user1}\n:heart: ${result}% Match\n:small_red_triangle: ${user2}`)
},
meta: {
    name: 'ship',
    description: 'Ship 2 users',
    usage: ''
    }
 }
