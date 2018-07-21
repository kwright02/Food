const Discord = require("discord.js");
const userinfo = require("../data/userinfo.json");
const fs = require("fs");

module.exports = {
    run: async (client, msg, args) => {
     let user = msg.mentions.members.first();
      var channel = msg.channel;
      var members = msg.guild.members.array();
      if(!userinfo[msg.guild.id]["members"][msg.author.id]["permissions"].includes("moderate")) {
        channel.send("You must have the `moderate` punishments.");
        return;
      }
      if(args.length < 1) {
        msg.reply("correct usage: `+pun show <user>`");
        return;
      }
      switch(args[0]) {
        case "show":
      if (!user) user = msg.guild.members.get(args[0]);
      if (!user) return await msg.channel.send("Please mention a valid user to show punishments.");
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
          .setAuthor(`User Punishments | ${targUser.user.tag}`, client.user.avatarURL);
          var puns = "";
          for(var i = 0; i < userinfo[msg.guild.id]["members"][targUser.user.id]["punishments"].length; i++) {
            puns += userinfo[msg.guild.id]["members"][targUser.user.id]["punishments"][i] + "\n";
          }
          if(!puns) {
            channel.send("User `" + args[1] + "` does not have any punishments.");
            return;
          }
          embed.addField("Punishments", puns)
          .setFooter('UFF Moderation')
          .setTimestamp();
          channel.send( {embed} );
          break;
      }
    },
  meta: {
    name: 'puns',
    description: 'Base command for altering and displaying punishments',
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
