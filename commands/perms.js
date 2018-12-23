const Discord = require("discord.js");
const userinfo = require("../data/userinfo.json");
const fs = require("fs");

module.exports = {
    run: async (client, msg, connection, args) => {
     if(args[0] !== "-override"){
       msg.channel.send("The permission command is under mantiencne, please refrain from it's use unless you know what you're doing!");
       return;
     } else {
      let user = msg.mentions.members.first();
      var channel = msg.channel;
     }
   },
   meta: {
     name: 'perms',
     description: 'Base command for altering and displaying permissions',
     usage: ''
   }
}

function saveInfo(info) {
  fs.writeFile("./data/userinfo.json", JSON.stringify(info, null, " "), function (error) {
    if (error) {
     console.log(error);
    }
  });
  console.log(require("../data/userinfo.json"));
};
