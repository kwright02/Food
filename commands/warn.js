module.exports = {
    run: async (client, msg, args) => {
        let user = msg.mentions.members.first();
        if (!msg.guild.me.hasPermission("KICK_MEMBERS")) return await msg.channel.send("Bot does not have permission!");
        if (!msg.member.hasPermission("KICK_MEMBERS")) return await msg.channel.send("You do not have permission!");
        if (!user) user = msg.guild.members.get(args[0]);
        if (!user) return await msg.channel.send("Please mention a valid user to warn");
        const reason = args.slice(1).join(" ");
        if (reason) {
        await msg.channel.send(`**${user.user.tag}** has been warned for '${reason}'`);
        let channel = user.guild.channels.find('name', 'moderation_logs');
        if (!channel) return;
        channel.send(`**${user.user.tag}** warned by **${msg.author.tag}** - **Reason:** ${reason}`);
        } else if (!reason) {
        await msg.channel.send(`**${user.user.tag}** has been warned with no specified reason`); 
        let channel = msg.guild.channels.find('name', 'moderation_logs');
        if (!channel) return;
        channel.send(`**${user.user.tag}** warned by **${msg.author.tag}** - **Reason:** None Provided`);
      }
    },
    meta: {
        name: 'warn',
        ownerOnly: false,
        description: 'Warn a user',
        usage: ''
    }
}