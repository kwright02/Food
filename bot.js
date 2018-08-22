const { Client } = require('discord.js');
const Discord = require("discord.js");
const userinfo = require("./data/userinfo.json")
const client = new Client({ disableEveryone: true});
const fs = require('fs');
client.config = require('./config.json');
client.login(client.config.token);
client.error = require('./error.js').run;
exports.client = client;
const blacklist = client.config.blacklist;

client.on("error", (O_o) => {});

client.on("guildMemberAdd", (user) => {
    let infoChannel = client.channels.get("420407754327457792");
    let channel = user.guild.channels.find('name', 'welcome');
    if (!channel) return;
    channel.send(`:tada: Welcome to the United Federations of Food ${user.user}, you are member ${user.guild.memberCount}. Please read ${infoChannel} and enjoy your time here! :heart:`);
    var role = user.guild.roles.find('name', 'Members');
    var role2 = user.guild.roles.find('name', 'Notify');
    user.addRole(role);
    user.addRole(role2);
});

client.on("guildMemberRemove", (user) => {
    let channel = user.guild.channels.find('name', 'leave');
    if (!channel) return;
    channel.send(`**${user.user.tag}** has left. We now have ${user.guild.memberCount} members`);
});

client.on("messageReactionAdd", (reaction, user) => {
  if(reaction.message.channel.id != "460515586661679114") return;
  const member = reaction.message.guild.member(user);
  var notify = client.guilds.get("370562411973050368").roles.find('name', 'Notify');
  if(reaction.emoji.name === "notify") member.removeRole(notify)
  var bh = client.guilds.get("370562411973050368").roles.find('name', 'Brawlhalla');
  if(reaction.emoji.name === "Brawlhalla") member.addRole(bh)
  var sot = client.guilds.get("370562411973050368").roles.find('name', 'Sea of Thieves');
  if(reaction.emoji.name === "SoT") member.addRole(sot)
  var ark = client.guilds.get("370562411973050368").roles.find('name', 'Brawlhalla');
  if(reaction.emoji.name === "ARK") member.addRole(ark)
  var csgo = client.guilds.get("370562411973050368").roles.find('name', 'CS:GO');
  if(reaction.emoji.name === "CSGO") member.addRole(csgo)
  var ftn = client.guilds.get("370562411973050368").roles.find('name', 'Fortnite');
  if(reaction.emoji.name === "Fortnite") member.addRole(ftn)
  var gmod = client.guilds.get("370562411973050368").roles.find('name', 'Gmod');
  if(reaction.emoji.name === "Gmod") member.addRole(gmod)
  var lol = client.guilds.get("370562411973050368").roles.find('name', 'League of Legends');
  if(reaction.emoji.name === "LOL") member.addRole(lol)
  var mc = client.guilds.get("370562411973050368").roles.find('name', 'Minecraft');
  if(reaction.emoji.name === "Minecraft") member.addRole(mc)
  var ow = client.guilds.get("370562411973050368").roles.find('name', 'Overwatch');
  if(reaction.emoji.name === "Overwatch") member.addRole(ow)
  var pd = client.guilds.get("370562411973050368").roles.find('name', 'Payday');
  if(reaction.emoji.name === "Payday") member.addRole(pd)
  var pubg = client.guilds.get("370562411973050368").roles.find('name', 'PUBG');
  if(reaction.emoji.name === "PUBG") member.addRole(pubg)
  var rl = client.guilds.get("370562411973050368").roles.find('name', 'Rocket League');
  if(reaction.emoji.name === "RocketLeague") member.addRole(rl)
  var r6 = client.guilds.get("370562411973050368").roles.find('name', 'Rainbow Six Seige');
  if(reaction.emoji.name === "R6") member.addRole(r6)
  var rb = client.guilds.get("370562411973050368").roles.find('name', 'Roblox');
  if(reaction.emoji.name === "Roblox") member.addRole(rb)
  var ru = client.guilds.get("370562411973050368").roles.find('name', 'Rust');
  if(reaction.emoji.name === "Rust") member.addRole(ru)
  var un = client.guilds.get("370562411973050368").roles.find('name', 'Unturned');
  if(reaction.emoji.name === "Unturned") member.addRole(un)
});

client.on("messageReactionRemove", (reaction, user) => {
  if(reaction.message.channel.id != "460515586661679114") return;
  const member = reaction.message.guild.member(user);
  var notify = client.guilds.get("370562411973050368").roles.find('name', 'Notify');
  if(reaction.emoji.name === "notify") member.addRole(notify)
  var bh = client.guilds.get("370562411973050368").roles.find('name', 'Brawlhalla');
  var sot = client.guilds.get("370562411973050368").roles.find('name', 'Sea of Thieves');
  if(reaction.emoji.name === "SoT") member.removeRole(sot)
  var ark = client.guilds.get("370562411973050368").roles.find('name', 'Brawlhalla');
  if(reaction.emoji.name === "ARK") member.removeRole(ark)
  if(reaction.emoji.name === "Brawlhalla") member.removeRole(bh)
  var csgo = client.guilds.get("370562411973050368").roles.find('name', 'CS:GO');
  if(reaction.emoji.name === "CSGO") member.removeRole(csgo)
  var ftn = client.guilds.get("370562411973050368").roles.find('name', 'Fortnite');
  if(reaction.emoji.name === "Fortnite") member.removeRole(ftn)
  var gmod = client.guilds.get("370562411973050368").roles.find('name', 'Gmod');
  if(reaction.emoji.name === "Gmod") member.removeRole(gmod)
  var lol = client.guilds.get("370562411973050368").roles.find('name', 'League of Legends');
  if(reaction.emoji.name === "LOL") member.removeRole(lol)
  var mc = client.guilds.get("370562411973050368").roles.find('name', 'Minecraft');
  if(reaction.emoji.name === "Minecraft") member.removeRole(mc)
  var ow = client.guilds.get("370562411973050368").roles.find('name', 'Overwatch');
  if(reaction.emoji.name === "Overwatch") member.removeRole(ow)
  var pd = client.guilds.get("370562411973050368").roles.find('name', 'Payday');
  if(reaction.emoji.name === "Payday") member.removeRole(pd)
  var pubg = client.guilds.get("370562411973050368").roles.find('name', 'PUBG');
  if(reaction.emoji.name === "PUBG") member.removeRole(pubg)
  var rl = client.guilds.get("370562411973050368").roles.find('name', 'Rocket League');
  if(reaction.emoji.name === "RocketLeague") member.removeRole(rl)
  var r6 = client.guilds.get("370562411973050368").roles.find('name', 'Rainbow Six Seige');
  if(reaction.emoji.name === "R6") member.removeRole(r6)
  var rb = client.guilds.get("370562411973050368").roles.find('name', 'Roblox');
  if(reaction.emoji.name === "Roblox") member.removeRole(rb)
  var ru = client.guilds.get("370562411973050368").roles.find('name', 'Rust');
  if(reaction.emoji.name === "Rust") member.removeRole(ru)
  var un = client.guilds.get("370562411973050368").roles.find('name', 'Unturned');
  if(reaction.emoji.name === "Unturned") member.removeRole(un)
});

client.on("message", (message) => {
  // if (message.channel.id = "466125992986017804") return;
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
      userinfo[message.guild.id]["members"][message.author.id]["punishments"].push("`Warn -` Reason: Blacklisted Phrase | Moderator: Automated");
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
  if(message.channel.id == "466125992986017804") return;
   if(/discord\.gg\//.test(content) || /\.gg\/[a-zA-Z0-9]/.test(content)) {
     if(message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
     return;
    }
    message.delete();
    message.reply("please refrain from posting invite links.");
    let channel = message.guild.channels.find('name', 'mod_logs');
    if (!channel) return;
    userinfo[message.guild.id]["members"][message.author.id]["punishments"].push("`Warn -` Reason: Unapproved Advertisement | Moderator: Automated");
    saveInfo(userinfo, "./data/userinfo.json");
    const embed = new Discord.RichEmbed()
    .setColor(0x42f471)
    .setAuthor(`Automated Warn | ${message.author.tag}`, client.user.avatarURL)
    .addField("User", `${message.author.tag}`, true)
    .addField("Reason", `Unapproved Advertisement`, true)
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

function saveInfo(info, path) {
  fs.writeFile(path, JSON.stringify(info, null, " "), function (error) {
    if (error) {
     console.log(error);
    }
  });
};
