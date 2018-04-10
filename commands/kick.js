module.exports = {
    run: async (client, msg, args) => {
        let user = msg.mentions.members.first();
        if (!msg.guild.me.hasPermission("KICK_MEMBERS")) return await msg.channel.send("Bot does not have \`KICK_MEMBERS\` permission!");
        if (!msg.member.hasPermission("KICK_MEMBERS")) return await msg.channel.send("You do not have \`KICK_MEMBERS\` permission!");
        if (!user) user = msg.guild.members.get(args[0]);
        if (!user) return await msg.channel.send("Please mention a valid user to kick");
        if (!user.kickable) return await msg.channel.send("User cannot be kicked"); 
        const reason = args.slice(1).join(" ");
        if (reason) {
        await user.kick(`Kicked by ${msg.author.tag} - ${reason}`);
        await msg.channel.send(`**${user.user.tag}** has been kicked for '${reason}'`);
        let channel = user.guild.channels.find('name', 'moderation');
        if (!channel) return;
        channel.send(`**${user.user.tag}** kicked by **${msg.author.tag}** - **Reason:** ${reason}`);
        } else if (!reason) {
        await user.kick(`Kicked by ${msg.author.tag} - No reason specified`);
        await msg.channel.send(`**${user.user.tag}** has been kicked with no specified reason`); 
        let channel = msg.guild.channels.find('name', 'moderation');
        if (!channel) return;
        channel.send(`**${user.user.tag}** kicked by **${msg.author.tag}** - **Reason:** None Provided`);
      }
    },
    meta: {
        name: 'kick',
        ownerOnly: false,
        description: 'Kick a user from the server',
        usage: ''
    }
}