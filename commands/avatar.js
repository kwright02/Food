module.exports = {
    run: async (client, msg, connection, args) => {
      let bc = client.channels.get("399916099325657088");
      if (msg.channel.id !== "399916099325657088") {
       msg.channel.send(`This command can only be used in ${bc}.`)
       return;
        }
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
