const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, args) => {
      let user = msg.mentions.members.first();
      if (!msg.guild.me.hasPermission("BAN_MEMBERS")) return await msg.channel.send("Bot does not have \`BAN_MEMBERS\` permission!");
      if (!msg.member.hasPermission("BAN_MEMBERS")) return await msg.channel.send("You do not have \`BAN_MEMBERS\` permission!");
      if (!user) user = msg.guild.members.get(args[0]);
      if (!user) return await msg.channel.send("Please mention a valid user to ban.");
      if (!user.kickable) return await msg.channel.send("User cannot be banned.");
      const reason = args.slice(1).join(" ");
      if (!reason) return msg.channel.send("Please provide a reason for the ban.");
      let channel = user.guild.channels.find('name', 'mod_logs');
      if (!channel) return;
      await msg.channel.send(`:white_check_mark: ***${user.user.tag}** has been banned.*`);
      await user.ban(`${user.user.tag} has been banned for '${reason}'`);
      const embed = new Discord.RichEmbed()
      .setColor(0x42f471)
      .setAuthor(`Ban | ${user.user.tag}`, client.user.avatarURL)
      .addField("User", `${user.user.tag}`, true)
      .addField("Moderator", `${msg.author.tag}`, true)
      .addField("Reason", `${reason}`, true)
      .setFooter('UFF Moderation')
      .setTimestamp()
      await channel.send( {embed} );
    },
    meta: {
        name: 'ban',
        description: 'Ban a user from the server',
        usage: ''
    }
}
