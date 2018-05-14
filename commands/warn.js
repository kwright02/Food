const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, args) => {
       let user = msg.mentions.members.first();
       let modPerms = msg.guild.roles.find("name", "Mod Permissions");
        if (!msg.member.roles.has(modPerms.id)) {
            msg.channel.send("You must be a Moderator or higher to use this command.").then(answer => {
            answer.delete(5000)
            msg.delete(5000)
            });
          return;
           }
        if (!user) user = msg.guild.members.get(args[0]);
        if (!user) return await msg.channel.send("Please mention a valid user to warn.");
        const reason = args.slice(1).join(" ");
        await msg.channel.send(`:white_check_mark: ***${user.user.tag}** has been warned.*`);
        let channel = user.guild.channels.find('name', 'mod_logs');
        if (!channel) return;
        if (!reason) return msg.channel.send("Please provide a reason for the warn.");
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
