const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, args) => {
        let member = msg.mentions.members.first();
        if (!msg.guild.me.hasPermission("MANAGE_MESSAGES")) return await msg.channel.send("SyncBOT does not have \`MANAGE_MESSAGES\` permission!");
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) return await msg.channel.send("You do not have \`MANAGE_MESSAGES\` permission!");
        const count = parseInt(args[0]) + 1;
        if (!count) return await msg.channel.send("Please specify an amount of messages to delete!");
        if (count > 100 || count < 3) return await msg.channel.send("Please make sure your amount is between 2 and 100!");
        const deleted = await msg.channel.bulkDelete(count);
        const amount = deleted.size - 1;
        let channel = msg.guild.channels.find('name', 'mod_logs');
        if (!channel) return;
        const embed = new Discord.RichEmbed()
        .setColor(0x42f471)
        .setAuthor(`Purge | ${msg.author.tag}`, client.user.avatarURL)
        .addField("Channel", `${msg.channel}`, true)
        .addField("Messages Deleted", `${amount}`, true)
        .setFooter('UFF Moderation')
        .setTimestamp()
        await channel.send( {embed} );
    },
    meta: {
        name: 'purge',
        description: 'Delete a certain amount of messages',
        usage: ''
    }
}
