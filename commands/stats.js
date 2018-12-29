const Discord = require("discord.js");
const dutils = require("../database.js");
const fs = require("fs");

module.exports = {
    run: async (client, msg, connection, args) => {
      dutils.getMemberOptions(client, msg.author, connection, "Stats Command").then(function(opts){
        var options = JSON.parse(opts);
        let curPts = options["curPts"];
        let curXp = options["curXp"];
        let curLvl = options["curLvl"];
        let nxtLvl = options["curLvl"] * 300;
        let nxtPts = options["curLvl"] * 5;
        const embed = new Discord.RichEmbed()
        .setColor(0x41f4f4)
        .setAuthor(msg.author.username + "'s Stats", client.user.avatarURL)
        .addField(`**Points**:`,` ${curPts}`, true)
        .addField(`\n**XP**:`,` ${curXp}`, true)
        .addField(`\n**Level**:`,` ${curLvl}`, true)
        .addField(`\n**XP Until Level Up**:`, `${nxtLvl-curXp}`, true)
        .setFooter('Food Bot | v1.2')
        .setTimestamp()
        msg.channel.send( {embed} );
      });
    },
    meta: {
      name: 'stats',
      description: 'Check a users stats',
      usage: ''
    }
}
