const Discord = require("discord.js");
const request = require("snekfetch");

module.exports = {
    run: async (client, msg, connection,args) => {
      let bc = client.channels.get("399916099325657088");
      if (msg.channel.id !== "399916099325657088") {
       msg.channel.send(`This command can only be used in ${bc}.`)
       return;
        }
        let res = await request.get("http://www.rrrather.com/botapi").send();
        const embed = new Discord.RichEmbed()
        .setColor(0x42f471)
        .setAuthor("Would you rather...", client.user.avatarURL)
        .setDescription(`\`Choice A\` ${res.body.choicea}
\`Choice B\` ${res.body.choiceb}`)
        await msg.channel.send( {embed} );
    },
    meta: {
        name: 'wyr',
        description: 'Would you rather, this or that',
        usage: ''
    }
}
