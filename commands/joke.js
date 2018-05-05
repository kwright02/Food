const Discord = require("discord.js");
const request = require("snekfetch");

module.exports = {
    run: async (client, msg, args) => {
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