const Discord = require("discord.js");
const userinfo = require("../data/userinfo.json");

module.exports = {
    run: async (client, msg, args) => {
      if(!userinfo[msg.guild.id]["members"][msg.author.id]["permissions"].includes("moderate")) return msg.channel.send("You need the \`moderate\` permission to use this.");
       let user = msg.mentions.members.first();
        if (!user) user = msg.guild.members.get(args[0]);
        if (!user) return await msg.channel.send("Please mention a valid user to warn.");
        const reason = args.slice(1).join(" ");
        await msg.channel.send(`:white_check_mark: ***${user.user.tag}** has been warned.*`);
        let channel = user.guild.channels.find(chan => chan.name === 'mod_logs');
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