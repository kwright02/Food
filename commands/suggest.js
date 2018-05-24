const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, args) => {
    if (!args[0]) return msg.channel.send("Well\, you have to suggest something!");
    let channel = client.channels.get("420411538449498113");
    if (!channel) return;
        const embed = new Discord.RichEmbed()
        .setColor(0x42f471)
        .setDescription(args.join(" "))
        .setFooter(`User ID - ${msg.author.id}`);
        client.channels.get("420411538449498113").createWebhook(msg.author.username, msg.author.avatarURL)
        .then(wh => {
        wh.send(embed)
         .then(msg => {
          msg.react("\u2705")
          msg.react("\u274E")
            })
        .then(() => {
        msg.channel.send(`Your suggestion has been sent to ${channel} to be reviewed. Thanks!`);
        wh.delete();
        })
      })
    },
    meta: {
        name: 'suggest',
        description: 'Suggest a feature for the bot',
        usage: ''
    }
}