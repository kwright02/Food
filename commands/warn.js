const Discord = require("discord.js");
const dutils = require("../database.js");

module.exports = {
    run: async (client, msg, connection, args) => {
      let user = msg.mentions.members.first();
      if (!user) user = msg.guild.members.get(args[0]);
      if (!user) return await msg.channel.send("Please mention a valid user to warn.");
      const reason = args.slice(1).join(" ");
      await msg.channel.send(`:white_check_mark: ***${user.user.tag}** has been warned.*`);
      let channel = user.guild.channels.find(chan => chan.name === 'mod_logs');
      if (!channel) return;
      if (!reason) return msg.channel.send("Please provide a reason for the warn.");
      var punishment = `{"punished":${user.user.id},"punisher":${msg.author.id},"reason":${reason}}`;
      dutils.savePunisment(client, JSON.stringify(punishment).replace("\"{", "{").replace("\"}", "}"), user.user.id, msg.author.id, connection, "Warn Command");
      const embed = new Discord.RichEmbed()
      .setColor(0x42f471)
      .setAuthor(`Warn | ${user.user.tag}`, client.user.avatarURL)
      .addField("User", `${user.user.tag}`, true)
      .addField("Moderator", `${msg.author.tag}`, true)
      .addField("Reason", `${reason}`, true)
      .setFooter('UFF Moderation')
      .setTimestamp()
      await channel.send( {embed} );
    },
    meta: {
        name: 'warn',
        description: 'Warn a user',
        usage: ''
    }
}
