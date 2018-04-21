module.exports = {
    run: async (client, msg, args) => {
        let user = msg.mentions.members.first();
        if (!msg.guild.me.hasPermission("BAN_MEMBERS")) return await msg.channel.send("Bot does not have \`BAN_MEMBERS\` permission!");
        if (!msg.member.hasPermission("BAN_MEMBERS")) return await msg.channel.send("You do not have \`BAN_MEMBERS\` permission!");
        if (!user) user = msg.guild.members.get(args[0]);
        if (!user) return await msg.channel.send("Please mention a valid user to ban");
        if (!user.bannable) return await msg.channel.send("User cannot be banned"); 
        const reason = args.slice(1).join(" ");
        if (reason) {
        await user.ban(`Banned by ${msg.author.tag} - ${reason}`);
        await msg.channel.send(`**${user.user.tag}** has been banned for '${reason}'`);
        let channel = user.guild.channels.find('name', 'moderation_logs');
        if (!channel) return;
        channel.send(`**${user.user.tag}** banned by **${msg.author.tag}** - **Reason:** ${reason}`);
        } else if (!reason) {
        await user.ban(`Banned by ${msg.author.tag} - No reason specified`);
        await msg.channel.send(`**${user.user.tag}** has been banned with no specified reason`); 
        let channel = user.guild.channels.find('name', 'moderation_logs');
        if (!channel) return;
        channel.send(`**${user.user.tag}** banned by **${msg.author.tag}** - **Reason:** None Provided`);
      }
    },
    meta: {
        name: 'ban',
        ownerOnly: false,
        description: 'Ban a user from the server',
        usage: ''
    }
}
