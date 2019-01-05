const Discord = require("discord.js");
const request = require("snekfetch");

module.exports = {
    run: async (client, msg, connection, args) => {
      let bc = client.channels.get("399916099325657088");
      if (msg.channel.id !== "399916099325657088") {
       msg.channel.send(`This command can only be used in ${bc}.`)
       return;
        }
        const res = await request.get("https://icanhazdadjoke.com/", {
            headers: {
                Accept:"text/plain"
            }
        }).send();
        const embed = new Discord.RichEmbed()
         .setTitle("Here is your joke...")
         .setAuthor("Here is your joke...", client.user.avatarURL)
         .setColor(0x42f471)
         .setDescription(`${res.body}`)
         await msg.channel.send( {embed} );
    },
    meta: {
        name: 'joke',
        description: 'Tells a joke',
        usage: ''
    }
}
