module.exports = {
    run: async (client, msg, args) => {
        const target = msg.mentions.users.first();
        if (!target) return msg.channel.send(msg.author.displayAvatarURL);
        msg.channel.send(target.avatarURL);        
    },
    meta: {
        name: 'avatar',
        description: 'View an avatar of a user',
        usage: ''
    }
}