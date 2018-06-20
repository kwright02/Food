const { Client } = require('discord.js');
const Discord = require("discord.js");
const userinfo = require("./data/userinfo.json")
const client = new Client({ disableEveryone: true});
const fs = require('fs');
client.config = require('./config.json');
client.login(client.config.token);
client.error = require('./error.js').run;
client.tempProfiles = {};
exports.client = client;
const blacklist = client.config.blacklist;

client.on("error", (O_o) => {});

client.on("guildMemberAdd", (user) => {
    let infoChannel = client.channels.get("420407754327457792");
    let channel = user.guild.channels.find('name', 'welcome');
    if (!channel) return;
    channel.send(`:tada: Welcome to the United Federations of Food ${user.user}, you are member ${user.guild.memberCount}. Please read ${infoChannel} and enjoy your time here! :heart:`);
    var role = user.guild.roles.find('name', 'Members');
    var role2 = user.guild.roles.find('name', 'Event Notify');
    user.addRole(role);
    user.addRole(role2);
});

client.on("guildMemberRemove", (user) => {
    let channel = user.guild.channels.find('name', 'leave');
    if (!channel) return;
    channel.send(`**${user.user.tag}** has left. We now have ${user.guild.memberCount} members`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  var content = message.content;
  if(new RegExp(blacklist[0], "i").test(content)) {
    message.delete();
    message.channel.send(":white_check_mark: **Post Prevention Verification Successful...**");
    message.channel.send(":thumbsup: **Thank you**");
  }
  for(var i = 1; i < blacklist.length; i++) {
    if(new RegExp(blacklist[i], "i").test(content)) {
      message.delete();
      message.channel.send(`:white_check_mark: ***${message.author.tag}** has been warned.*`);
      let channel = message.guild.channels.find('name', 'mod_logs');
      if (!channel) return;
      if(!userinfo[message.guild.id]["members"][message.author.id]["warns"]) {
        userinfo[message.guild.id]["members"][message.author.id]["warns"] = new Map();
      }
      var warns = userinfo[message.guild.id]["members"][message.author.id]["warns"];
      var warnID = genRandom(5);
      while(true) {
        var valid = true;
        for(targGuild in userinfo) {
          for(targMemb in userinfo[targGuild]["members"]) {
            for(targWarn in userinfo[targGuild]["members"][targMemb]["warns"]) {
              if(warnID === targWarn) {
                warnID = genRandom(5);
                valid = false;
              }
            }
          }
        }
        if(valid) {
          break;
        }
      }
      warns[warnID] = { "warranter":"automatic", "reason":"Blacklisted Phrase", "content":content };
      saveInfo(userinfo, "./data/userinfo.json");
      const embed = new Discord.RichEmbed()
      .setColor(0x42f471)
      .setAuthor(`Automated Warn | ${message.author.tag}`, client.user.avatarURL)
      .addField("User", `${message.author.tag}`, true)
      .addField("Reason", "Blacklisted Phrase", true)
      .addField("Content", `${message.content}`, true)
      .setFooter("UFF Moderation")
      .setTimestamp();
      channel.send( {embed} );
      return;
    }
  }
  if(/discord\.gg\//.test(content) || /\.gg\/[a-zA-Z0-9]/.test(content)) {
    if(message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
      return;
    }
    message.delete();
    message.reply("please refrain from posting invite links.");
    let channel = message.guild.channels.find('name', 'mod_logs');
    if (!channel) return;
    const embed = new Discord.RichEmbed()
    .setColor(0x42f471)
    .setAuthor(`Automated Warn | ${message.author.tag}`, client.user.avatarURL)
    .addField("User", `${message.author.tag}`, true)
    .addField("Reason", `Invite Links`, true)
    .addField("Content", `${message.content}`, true)
    .setFooter('UFF Moderation')
    .setTimestamp();
    channel.send( {embed} );
    return;
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

function genRandom(length) {
  var gen = "";
  var alph = "abcdefghijklmnopqrstuvwxyz";
  for(var i = 0; i < length; i++) {
    gen += alph[Math.floor(Math.random() * 26) + 1];
  }
  return gen;
}

function saveInfo(info, path) {
  fs.writeFile(path, JSON.stringify(info, null, " "), function (error) {
    if (error) {
     console.log(error);
    }
  });
};