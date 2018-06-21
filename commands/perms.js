const Discord = require("discord.js");
const userinfo = require("../data/userinfo.json");
const fs = require("fs");

module.exports = {
    run: async (client, msg, args) => {
     let user = msg.mentions.members.first();
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
      if (!user) user = msg.guild.members.get(args[0]);
      if (!user) return await msg.channel.send("Please mention a valid user to add a permission to.");
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
      if (!user) user = msg.guild.members.get(args[0]);
      if (!user) return await msg.channel.send("Please mention a valid user to remove a permission from.");
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
      if (!user) user = msg.guild.members.get(args[0]);
      if (!user) return await msg.channel.send("Please mention a valid user to show permissions.");
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
          const embed = new Discord.RichEmbed()
          .setColor(0x42f471)
          .setAuthor(`User Permissions | ${targUser.user.tag}`, client.user.avatarURL);
          var perms = "";
          for(var i = 0; i < userinfo[msg.guild.id]["members"][targUser.user.id]["permissions"].length; i++) {
            perms += userinfo[msg.guild.id]["members"][targUser.user.id]["permissions"][i] + "\n";
          }
          if(!perms) {
            channel.send("User `" + args[1] + "` does not have any permissions.");
            return;
          }
          embed.addField("Permissions", perms)
          .setFooter('UFF Permissions')
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