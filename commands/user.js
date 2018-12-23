const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, connection, args) => {
   let member = msg.mentions.members.first();
if (!member) {
 msg.channel.send({embed: new Discord.RichEmbed()
.setAuthor(`Information about ${msg.author.tag}`, msg.author.avatarURL)
.addField("Username", `${msg.author.username}`, true)
.addField("Discrim", `${msg.author.discriminator}`, true)
.addField("User ID", `${msg.author.id}`, true)
.addField("Status", `${msg.author.presence.status}`, true)
.addField("Joined", `${msg.member.joinedAt}`)
.addField("Registered", `${msg.author.createdAt}`)
.setThumbnail(msg.author.avatarURL)
.setColor("#42f471")})
   } else {
 msg.channel.send({embed: new Discord.RichEmbed()
.setAuthor(`Information about ${member.user.tag}`, member.user.avatarURL)
.addField("Username", `${member.user.username}`, true)
.addField("Discrim", `${member.user.discriminator}`, true)
.addField("User ID", `${member.id}`, true)
.addField("Status", `${member.presence.status}`, true)
.addField("Joined", `${member.joinedAt}`)
.addField("Registered", `${member.user.createdAt}`)
.setThumbnail(member.user.avatarURL)
.setColor("#42f471")})
      }
  },
    meta: {
        name: 'userinfo',
        description: 'Information about a user',
        usage: ''
    }
}
