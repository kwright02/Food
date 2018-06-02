const Discord = require("discord.js");
// This userinfo require is creating a JSON object out of the userinfo.json file
const userinfo = require("../data/userinfo.json");
const fs = require("fs");

module.exports = {
    run: async (client, msg, args) => {
      var channel = msg.channel;
      var members = msg.guild.members.array();
      if(!(msg.guild.member(msg.author).hasPermission("ADMINISTRATOR") || !userinfo[msg.author.id]["permissions"].includes("administrate"))) {
        channel.send("You must have the `ADMINISTRATOR` permission in this guild or have the Food `administrate` permission.");
        return;
      }
      if(args.length < 1) {
        msg.reply("correct usage: `+perms add [user|userid] <permission> | remove <user> <permission> | show <user>`");
        return;
      }
      switch(args[0]) {
        case "add":
          if(args.length < 3) {
            msg.reply("correct usage: `+perms add [user|userid] <permission>`");
            return;
          }
          if(!client.config["permissions"].includes(args[2])) {
            channel.send("Permission `" + args[2] + "` does not exist.");
            return;
          }
          var targUser = null;
          for(var i = 0; i < members.length; i++) {
            if(("@" + members[i].user.username + "#" + members[i].user.tag) === args[1] || members[i].user.id === args[1]) {
              console.log("Found user");
              targUser = members[i];
            }
          }
          if(!targUser) {
            channel.send("Could not find user `" + args[1] + "`");
            return;
          }
          if(userinfo[msg.guild.id]["members"][targUser.user.id]["permissions"].includes(args[2])) {
            channel.send("User `" + args[1] + "` already has permission `" + args[2] + "`.");
            return;
          }
          userinfo[msg.guild.id]["members"][targUser.user.id]["permissions"].push(args[2]);
          channel.send("Added permission `" + args[2] + "` to user `" + args[1] + "`");
          saveInfo(userinfo);
          break;
        case "remove":
          if(args.length < 3) {
            msg.reply("correct usage: `+perms remove [user|userid] <permission>`  ");
            return;
          }
          if(!client.config["permissions"].includes(args[2])) {
            channel.send("Permission `" + args[2] + "` does not exist.");
            return;
          }
          var targUser = null;
          for(var i = 0; i < members.length; i++) {
            console.log("Target User: " + members[i].user.tag);
            if(("@" + members[i].user.username + "#" + members[i].user.tag) === args[1] || members[i].user.id === args[1]) {
              console.log("Found user");
              targUser = members[i];
            }
          }
          if(!targUser) {
            channel.send("Could not find user `" + args[1] + "`");
            return;
          }
          if(!userinfo[msg.guild.id]["members"][targUser.user.id]["permissions"].includes(args[2])) {
            channel.send("User `" + args[1] + "` does not have permission `" + args[2] + "`.");
            return;
          }
          userinfo[msg.guild.id]["members"][targUser.user.id]["permissions"].pop(args[2]);
          channel.send("Removed permission `" + args[2] + "` to user `" + args[1] + "`");
          saveInfo(userinfo);
          break;
        case "show":
          if(args.length < 2) {
            msg.reply("correct usage: `+perms show [user|userid]`");
            return;
          }
          var targUser = null;
          for(var i = 0; i < members.length; i++) {
            console.log("Target User: " + members[i].user.tag);
            if(("@" + members[i].user.username + "#" + members[i].user.tag) === args[1] || members[i].user.id === args[1]) {
              console.log("Found user");
              targUser = members[i];
            }
          }
          if(!targUser) {
            channel.send("Could not find user `" + args[1] + "`");
            return;
          }
          const embed = new Discord.RichEmbed()
          .setColor(0x42f471)
          .setAuthor(`User Permissions | ${targUser.user.tag}`, client.user.avatarURL);
          var perms = "";
          for(var i = 0; i < userinfo[targUser.user.id]["permissions"].length; i++) {
            perms += userinfo[targUser.user.id]["permissions"][i] + "\n";
          }
          if(!perms) {
            channel.send("User `" + args[1] + "` does not have any permissions.");
            return;
          }
          embed.addField("Permissions", perms)
          .setFooter('Food Permissions')
          .setTimestamp();
          channel.send( {embed} );
          break;
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
