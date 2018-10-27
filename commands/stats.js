const Discord = require("discord.js");
const userinfo = require("../data/userinfo.json");
const fs = require("fs");

module.exports = {
    run: async (client, msg, args) => {
    const key = `${msg.author.id}`;
     let user = msg.mentions.members.first();
      var channel = msg.channel;
      var members = msg.guild.members.array();
      if (!user) {
    if(!client.info.get(`${msg.author.id}`)) {
    client.info.ensure(`${msg.author.id}`, {
      xp: 0,
      level: 1,
      points: 0,
      daily: 0
    });
     }
       let userPoints = client.info.get(key, "points")
       let userXp = client.info.get(key, "xp")
       let userLevel = client.info.get(key, "level")
       let totUntil = userLevel * 300;
       let curUntil = totUntil - userXp;
        const embed = new Discord.RichEmbed()
        .setColor(0x42f471)
        .setAuthor(msg.author.username + "'s Stats", client.user.avatarURL)
        .setDescription(`**Points**: ${userPoints}\n**XP**: ${userXp}\n**Level**: ${userLevel}\n**XP Until Level Up**: ${curUntil}`)
        await msg.channel.send( {embed} );
            } else {
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
    if(!client.info.get(`${targUser.user.id}`)) {
    client.info.ensure(`${targUser.user.id}`, {
      xp: 0,
      level: 1,
      points: 0,
      daily: 0
    });
     }
    const key2 = `${targUser.user.id}`;
       let userPoints2 = client.info.get(key2, "points")
       let userXp2 = client.info.get(key2, "xp")
       let userLevel2 = client.info.get(key2, "level")
       let totUntil2 = userLevel2 * 300;
       let curUntil2 = totUntil2 - userXp2;
        const embed = new Discord.RichEmbed()
        .setColor(0x42f471)
        .setAuthor(targUser.user.username + "'s Stats", targUser.user.avatarURL)
        .setDescription(`**Points**: ${userPoints2}\n**XP**: ${userXp2}\n**Level**: ${userLevel2}\n**XP Until Level Up**: ${curUntil2}`)
        await msg.channel.send( {embed} );
      }
    },
  meta: {
    name: 'stats',
    description: 'Check a users stats',
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