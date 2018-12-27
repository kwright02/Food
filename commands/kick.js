const Discord = require("discord.js");
const dutils = require("../database.js");

module.exports = {
    run: async (client, msg, connection, args) => {
      let user = msg.mentions.members.first();
      if (!msg.guild.me.hasPermission("KICK_MEMBERS")) return await msg.channel.send("Bot does not have \`KICK_MEMBERS\` permission!");
      if (!msg.member.hasPermission("KICK_MEMBERS")) return await msg.channel.send("You do not have \`KICK_MEMBERS\` permission!");
      if (!user) user = msg.guild.members.get(args[0]);
      if (!user) return await msg.channel.send("Please mention a valid user to kick.");
      if (!user.kickable) return await msg.channel.send("User cannot be kicked.");
      const reason = args.slice(1).join(" ");
      if (!reason) return msg.channel.send("Please provide a reason for the kick.");
      let channel = user.guild.channels.find(chan => chan.name === 'mod_logs');
      if (!channel) return;
      var punishment = `{"punished":${user.user.id},"punisher":${msg.author.id},"reason":${reason}}`;
      dutils.savePunisment(client, JSON.stringify(punishment).replace("\"{", "{").replace("\"}", "}"), user.user.id, msg.author.id, connection, "Kick Command");
      user.kick();
      const embed = new Discord.RichEmbed()
      .setColor(0xf4d041)
      .setAuthor(`Kick | ${user.user.tag}`, client.user.avatarURL)
      .addField("User", `${user.user.tag}`, true)
      .addField("Moderator", `${msg.author.tag}`, true)
      .addField("Reason", `${reason}`, true)
      .setFooter('Food Bot | v1.2')
      .setTimestamp()
      channel.send( {embed} );
      msg.channel.send( {embed} );
    },
    meta: {
        name: 'kick',
        description: 'Kick a user from the server',
        usage: ''
    }
}
