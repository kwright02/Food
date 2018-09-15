module.exports = {
    run: async (client, msg, args) => {
        if (msg.guild.channels.some(ch => ch.name === msg.author.username + "'s PVC")) return msg.channel.send("You already have a PVC!");
        client.guilds.get("370562411973050368").createChannel(msg.author.username + "'s PVC", "voice").then(c => {
            c.setParent("489205457320411147")
            let everyone = msg.guild.roles.find(ch => ch.name === "@everyone");
            c.overwritePermissions(everyone, {
               'VIEW_CHANNEL': false
            });
            c.overwritePermissions(msg.author, {
                'VIEW_CHANNEL': true,
                'MANAGE_CHANNELS': true,
                'CONNECT': true
            });
});
msg.channel.send("Created your PVC! You can join it in the \"Private Voice Channels\" category")
},
    meta: {
        name: 'pvc',
        description: 'Create a private voice channel',
        usage: ''
    }
}
