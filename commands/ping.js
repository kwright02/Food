module.exports = {
    run: async (client, msg, args) => {
        const m = await msg.channel.send('Ping?');
        m.edit(`**Pong!** ${m.createdTimestamp - msg.createdTimestamp}ms`);
    },
    meta: {
        name: 'ping',
        ownerOnly: false,
        description: 'Shows the bots ping',
        usage: ''
    }
}