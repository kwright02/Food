const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, args) => {
        const embed = new Discord.RichEmbed()
        .setAuthor("Food BOT Commands", client.user.avatarURL)
        .addField("System", "+help - List help commands\n+ping - Checks the bots ping")
        .addField("Regular", "+food - Daily food command\n+info - Information about the United Federations of Food")
        .addField("Staff", "+kick - Kick a user from the server\n+ban - Ban a user from the server\n+purge - Purge a certain amount of messages")
        .setColor(0x42f471)
        await msg.channel.send( {embed} );
},
    meta: {
        name: 'help',
        ownerOnly: false,
        description: 'List of commands',
        usage: ''
    }
}