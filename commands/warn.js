const Discord = require("discord.js");
const fs = require("fs");
const userinfo = require("../data/userinfo.json");

module.exports = {
    run: async (client, msg, args) => {
      let user = msg.mentions.members.first();
      // let modPerms = msg.guild.roles.find("name", "Mod Permissions");
      // if (!msg.member.roles.has(modPerms.id)) {
      //   msg.channel.send("You must be a Moderator or higher to use this command.").then(answer => {
      //     answer.delete(5000);
      //     msg.delete(5000);
      //   });
      //   return;
      // }
      if (!user) user = msg.guild.members.get(args[0]);
      if (!user) return await msg.channel.send("Please mention a valid user to warn.");
      const reason = args.slice(1).join(" ");
      // let channel = user.guild.channels.find('name', 'mod_logs');
      // if (!channel) return;
      if (!reason) return msg.channel.send("Please provide a reason for the warn.");
      await msg.channel.send(`:white_check_mark: ***${user.user.tag}** has been warned.*`);
      if(!userinfo[msg.guild.id]["members"][user.user.id]["warns"]) {
        userinfo[msg.guild.id]["members"][user.user.id]["warns"] = new Map();
      }
      var warns = userinfo[msg.guild.id]["members"][user.user.id]["warns"];
      var warnID = genRandom(5);
      while(true) {
        var valid = true;
        for(targGuild in userinfo) {
          for(targMemb in userinfo[targGuild]["members"]) {
            for(targWarn in userinfo[targGuild]["members"][targMemb]["warns"]) {
              if(warnID === targWarn) {
                warnID = genRandom(5);
                valid = false;
              }
            }
          }
        }
        if(valid) {
          break;
        }
      }
      warns[warnID] = { "warranter":msg.author.id, "reason":reason };
      saveInfo(userinfo, "./data/userinfo.json");
      const embed = new Discord.RichEmbed()
      .setColor(0x42f471)
      .setAuthor(`Warn | ${user.user.tag}`, client.user.avatarURL)
      .addField("User", `${user.user.tag}`, true)
      .addField("Moderator", `${msg.author.tag}`, true)
      .addField("Reason", `${reason}`, true)
      .setFooter('UFF Moderation')
      .setTimestamp()
      await msg.channel.send( {embed} );
    },
    meta: {
        name: 'warn',
        description: 'Warn a user',
        usage: ''
    }
}

function genRandom(length) {
  var gen = "";
  var alph = "abcdefghijklmnopqrstuvwxyz";
  for(var i = 0; i < length; i++) {
    gen += alph[Math.floor(Math.random() * 26) + 1];
  }
  return gen;
}

function saveInfo(info, path) {
  fs.writeFile(path, JSON.stringify(info, null, " "), function (error) {
    if (error) {
     console.log(error);
    }
  });
};
