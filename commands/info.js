const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, connection, args) => {
        const embed = new Discord.RichEmbed()
.setAuthor(`Information about United Federations of Food`, msg.guild.iconURL)
.addField("ID", `${msg.guild.id}`, true)
.addField("Name", `United Federations of Food`, true)
.addField("Owner", `MythicalFood (Shane)`, true)
.addField("Region", `${msg.guild.region}`, true)
.addField("Channels", `${msg.guild.channels.size}`, true)
.addField("Members", `${msg.guild.memberCount}`, true)
.addField("Roles", `${msg.guild.roles.size}`, true)
.addField("Bots", `${msg.guild.members.filter(m=>m.user.bot).size}`, true)
.setThumbnail(msg.guild.iconURL)
.setColor(0x42f471)
        await msg.channel.send( {embed} );
},
    meta: {
        name: 'info',
        description: 'Information about UFF',
        usage: ''
    }
}
