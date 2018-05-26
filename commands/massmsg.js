const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, args) => {
      if (!msg.guild.me.hasPermission("ADMINISTRATOR")) return await msg.channel.send("I need the \`ADMINISTRATOR\` permission to execute this command!");
      if (!msg.member.hasPermission("ADMINISTRATOR")) return await msg.channel.send("You need the \`ADMINISTRATOR\` permission to execute this command!");
      const message = args.slice(0).join(" ");
      if (!message) return msg.channel.send("Please provide a message to send out.");
      let channel = msg.guild.channels.find('name', 'logs');
      if (!channel) return msg.channel.send("There is no logs channel available for logging this mass message.\nPlease create a channel called \"logs\"");
      var sendTo = msg.guild.members.array();
      var userCount = 0;
      for(var i = 0; i < sendTo.length; i++) {
        var targUser = sendTo[i];
        if(targUser.user.bot) {
          console.log(targUser.user.username + "#" + targUser.user.discriminator + " of ID " + targUser.user.id + " is a bot and was skipped over during the mass messaging.");
        } else {
          console.log("Sending to " + targUser.user.username + "#" + targUser.user.discriminator + " of ID " + targUser.user.id);
          try {
            targUser.send(message.replace("{user}", targUser.user.username))
            console.log("Message " + (userCount + 1) + " sent...");
            userCount = userCount + 1;
          } catch(error) {
            console.log("Could not send to " + targUser.user.username + "#" + targUser.user.discriminator + " of ID " + targUser.user.id + " for unknown reasons.");
            console.log("Error:\n" + error.message);
          }
        }
      }
      await msg.channel.send("Mass message has been succesffuly sent to " + userCount + " users...");
      const embed = new Discord.RichEmbed()
      .setColor(0x42f471)
      .setAuthor("Mass Message | ${msg.author.tag}", msg.author.avatarURL)
      .addField("Message", message, false)
      .addField("Sender", `${msg.author.tag}`, true)
      .addField("User Count", "Attempted to send to " + userCount + " users")
      .setFooter('Food Mass Messaging')
      .setTimestamp()
      await channel.send( {embed} );
    },
    meta: {
        name: 'massmessage',
        description: 'Send a mass message to all users of the guild',
        usage: ''
    }
}
