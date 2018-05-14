const { Client } = require('discord.js');
const client = new Client({ disableEveryone: true});
const fs = require('fs');
client.config = require('./config.json');
client.error = require('./error.js').run;
client.tempProfiles = {};
exports.client = client;

client.on("error", (O_o) => {});

client.on("guildMemberAdd", (user) => {
    let infoChannel = client.channels.get("420407754327457792");
    let channel = user.guild.channels.find('name', 'welcome');
    if (!channel) return;
    channel.send(`:tada: Welcome to the United Federations of Food ${user.user}, you are member ${user.guild.memberCount}. Please read ${infoChannel} and enjoy your time here! :heart:`);
    var role = user.guild.roles.find('name', 'Members');
    user.addRole(role)
});

client.on("guildMemberRemove", (user) => {
    let channel = user.guild.channels.find('name', 'leave');
    if (!channel) return;
    channel.send(`**${user.user.tag}** has left. We now have ${user.guild.memberCount} members`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  var user = message.mentions.members.first();
  var content = message.content;

  if(/discord\.gg\//.test(content) || /\.gg/.test(content) || /\.gg\/[a-zA-Z0-9]/.test(content)) {
    message.delete();
    message.channel.send(message.author.toString() + ", please refrain from posting invite links.");
    let channel = message.guild.channels.find('name', 'mod_logs');
    if (!channel) return;
    const embed = new Discord.RichEmbed()
    .setColor(0x42f471)
    .setAuthor(`Automated Warn | ${message.author.tag}`, client.user.avatarURL)
    .addField("User", `${message.author.tag}`, true)
    .addField("Moderator", "Food#4973", true)
    .addField("Reason", `Invite Links`, true)
    .setFooter('UFF Moderation')
    .setTimestamp()
    channel.send( {embed} );
  }
  });

fs.readdir('./events', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});
