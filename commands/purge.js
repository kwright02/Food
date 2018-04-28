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
    },
    meta: {
        name: 'purge',
        description: 'Delete a certain amount of messages',
        usage: ''
    }
}
