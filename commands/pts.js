const Discord = require("discord.js");
const userinfo = require("../data/userinfo.json");
const fs = require("fs");

module.exports = {
    run: async (client, msg, args) => {
    const key = `${msg.author.id}`;
     let user = msg.mentions.members.first();
      var channel = msg.channel;
      var members = msg.guild.members.array();
      if(!userinfo[msg.guild.id]["members"][msg.author.id]["permissions"].includes("points")) return msg.channel.send("You need the \`points\` permission to use this.");
      if(args.length < 1) {
        msg.reply("correct usage: `+pts add [user|userid] <amount> | remove <user> <amount> | show <user>`");
        return;
      }
      switch(args[0]) {
        case "add":
          if(args.length < 3) {
            msg.reply("correct usage: `+pts add [user|userid] <amount>`");
            return;
          }
      if (!user) return await msg.channel.send("Please mention a valid user to add points to.");
          var targUser = null;
          for(var i = 0; i < members.length; i++) {
            if(members[i].user.id === args[1] || members[i].user.id === user.id) {
              console.log("Found user");
              targUser = members[i];
            }
          }
          if(!targUser) {
            channel.send("Could not find user `" + user + "`");
            return;
          }
         if (isNaN(args[2])) return msg.channel.send("**" + args[2] + "** is not a number.");
         if (args[2].includes("+")) return msg.channel.send("**" + args[2] + "** is not a number.");
         if (args[2].includes("-")) return msg.channel.send("**" + args[2] + "** is not a number.");
    if(!client.info.get(`${targUser.user.id}`)) {
    client.info.ensure(`${targUser.user.id}`, {
      xp: 0,
      level: 1,
      points: 0,
      daily: 0
    });
     }
         let userPoints = client.info.get(`${user.id}`, "points");
         userPoints += parseInt(args[2]);
         client.info.set(`${targUser.user.id}`, userPoints, "points")
          channel.send("Added");
          break;
          case "remove":
          if(args.length < 3) {
            msg.reply("correct usage: `+pts add [user|userid] <amount>`");
            return;
          }
      if (!user) user = msg.guild.members.get(args[0]);
      if (!user) return await msg.channel.send("Please mention a valid user to remove points from.");
          var targUser = null;
          for(var i = 0; i < members.length; i++) {
            if(members[i].user.id === args[1] || members[i].user.id === user.id) {
              console.log("Found user");
              targUser = members[i];
            }
          }
          if(!targUser) {
            channel.send("Could not find user `" + user + "`");
            return;
          }
         if (isNaN(args[2])) return msg.channel.send("**" + args[2] + "** is not a number.");
         if (args[2].includes("+")) return msg.channel.send("**" + args[2] + "** is not a number.");
         if (args[2].includes("-")) return msg.channel.send("**" + args[2] + "** is not a number.");
         let userPoints2 = client.info.get(`${targUser.user.id}`, "points");
         if (args[2] > userPoints2) return msg.channel.send(targUser.user.tag + " doesn't have that many points.");
    if(!client.info.get(`${targUser.user.id}`)) {
    client.info.ensure(`${targUser.user.id}`, {
      xp: 0,
      level: 1,
      points: 0,
      daily: 0
    });
     }
         userPoints2 -= parseInt(args[2]);
         client.info.set(`${targUser.user.id}`, userPoints2, "points")
          channel.send("Removed");
          break;
          case "set":
          if(args.length < 3) {
            msg.reply("correct usage: `+pts add [user|userid] <amount>`");
            return;
          }
      if (!user) user = msg.guild.members.get(args[0]);
      if (!user) return await msg.channel.send("Please mention a valid user to set points to.");
          var targUser = null;
          for(var i = 0; i < members.length; i++) {
            if(members[i].user.id === args[1] || members[i].user.id === user.id) {
              console.log("Found user");
              targUser = members[i];
            }
          }
          if(!targUser) {
            channel.send("Could not find user `" + user + "`");
            return;
          }
         if (isNaN(args[2])) return msg.channel.send("**" + args[2] + "** is not a number.");
         if (args[2].includes("+")) return msg.channel.send("**" + args[2] + "** is not a number.");
         if (args[2].includes("-")) return msg.channel.send("**" + args[2] + "** is not a number.");
         if(!client.info.get(`${targUser.user.id}`)) {
          client.info.ensure(`${targUser.user.id}`, {
           xp: 0,
           level: 1,
           points: 0,
           daily: 0
         });
        }
         let userPoints3 = client.info.get(`${targUser.user.id}`, "points");
         userPoints3 = parseInt(args[2]);
         client.info.set(`${targUser.user.id}`, userPoints3, "points")
          channel.send("Set");
          break;
      }
    },
  meta: {
    name: 'pts',
    description: 'Base command for altering points',
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