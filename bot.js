const { Client } = require('discord.js');
const Discord = require("discord.js");
const userinfo = require("./data/userinfo.json");
const client = new Client({ disableEveryone: true});
const fs = require('fs');
const Enmap = require('enmap');
client.config = require('./config.json');
client.login(client.config.token);
client.error = require('./error.js').run;
client.info = new Enmap({
  name: "userinfo",
  autoFetch: true,
  fetchAll: false
});
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
        var guilds = client.guilds.array();
        for(var i = 0; i < guilds.length; i++) {
          if(!userinfo.hasOwnProperty(guilds[i].id)) {
            userinfo[guilds[i].id] = { "members": {} };
            console.log("All user information has been reset");
          }
          var members = guilds[i].members.array();
          for(var j = 0; j < members.length; j++) {
            if(!userinfo[guilds[i].id]["members"].hasOwnProperty(members[j].id)) {
              userinfo[guilds[i].id]["members"][members[j].user.id] = { "permissions":[], "punishments":[], "applications": {} };
              console.log("Added user " + members[j].user.tag  + " of id " + members[j].id + " to " + guilds[i].name + " userinfo members list");
            }
          }
        }
        saveInfo(userinfo, "./data/userinfo.json");
});

client.on("guildMemberRemove", (user) => {
    let channel = user.guild.channels.find('name', 'leave');
    if (!channel) return;
    channel.send(`**${user.user.tag}** has left. We now have ${user.guild.memberCount} members`);
});

client.on('messageUpdate', (oldMessage, newMessage) => {
if (oldMessage.content.length < 1) return;
if (oldMessage.content.length > 1000) return;
if (oldMessage.author.bot) return;
    let channel = oldMessage.guild.channels.find('name', 'action_logs');
    if (!channel) return;
        const embed = new Discord.RichEmbed()
        .setColor(0x42f471)
        .setAuthor(`Message Update | ${oldMessage.author.tag}`, client.user.avatarURL)
        .addField("ID", `${newMessage.id}`, true)
        .addField("Before", `${oldMessage}`, true)
        .addField("After", `${newMessage}`, true)
        .setTimestamp()
        channel.send( {embed} );
});

client.on("messageDelete", (dm) => {
if (dm.content.length < 1) return;
if (dm.content.length > 1000) return;
if (dm.author.bot) return;
    let channel = dm.guild.channels.find('name', 'action_logs');
    if (!channel) return;
        const embed = new Discord.RichEmbed()
        .setColor(0x42f471)
        .setAuthor(`Message Delete | ${dm.author.tag}`, client.user.avatarURL)
        .addField("ID", `${dm.id}`, true)
        .addField("Content", `${dm}`, true)
        .setTimestamp()
        channel.send( {embed} );
});

let cooldown = new Set();
let ctime = 30;

client.on("message", async msg => {
const key = `${msg.author.id}`;
if (msg.author.bot) return;
if (cooldown.has(msg.author.id)) return;
let member = msg.guild.member(msg.author);

if(!client.info.get(`${msg.author.id}`)) {
   client.info.ensure(`${msg.author.id}`, {
      xp: 0,
      level: 1,
      points: 0,
      daily: 0
 });
}
let curPts = client.info.get(key, "points");
let curXp = client.info.get(key, "xp");
let curLvl = client.info.get(key, "level");
let nxtLvl = client.info.get(key, "level") * 300;
let nxtPts = client.info.get(key, "level") * 5;
curXp += 5;
client.info.set(key, curXp, "xp");
cooldown.add(msg.author.id);
if (nxtLvl <= curXp) {
   curLvl += 1;
   client.info.set(key, curLvl, "level");
   curXp = 0;
   client.info.set(key, curXp, "xp");
   curPts += nxtPts;
   client.info.set(key, curPts, "points");
    msg.reply(`you have leveled up to level ${curLvl}! Your prize is ${nxtPts} Food Points!`)
   }
 setTimeout(() => {
  cooldown.delete(msg.author.id)
}, ctime * 1000);
});

client.on("messageReactionAdd", (reaction, user) => {
  if(reaction.message.channel.id != "460515586661679114") return;
  const member = reaction.message.guild.member(user);
  const server = client.guilds.get("370562411973050368");
  var notify = server.roles.find('name', 'Notify');
  if(reaction.emoji.name === "notify") member.removeRole(notify)
  var sot = server.roles.find('name', 'Sea of Thieves');
  if(reaction.emoji.name === "SoT") member.addRole(sot)
  var ark = server.roles.find('name', 'ARK');
  if(reaction.emoji.name === "ARK") member.addRole(ark)
  var bh = server.roles.find('name', 'Brawlhalla');
  if(reaction.emoji.name === "Brawlhalla") member.addRole(bh)
  var csgo = server.roles.find('name', 'CS:GO');
  if(reaction.emoji.name === "CSGO") member.addRole(csgo)
  var ftn = server.roles.find('name', 'Fortnite');
  if(reaction.emoji.name === "Fortnite") member.addRole(ftn)
  var gmod = server.roles.find('name', 'Gmod');
  if(reaction.emoji.name === "Gmod") member.addRole(gmod)
  var lol = server.roles.find('name', 'League of Legends');
  if(reaction.emoji.name === "LOL") member.addRole(lol)
  var mc = server.roles.find('name', 'Minecraft');
  if(reaction.emoji.name === "Minecraft") member.addRole(mc)
  var ow = server.roles.find('name', 'Overwatch');
  if(reaction.emoji.name === "Overwatch") member.addRole(ow)
  var pd = server.roles.find('name', 'Payday');
  if(reaction.emoji.name === "Payday") member.addRole(pd)
  var pubg = server.roles.find('name', 'PUBG');
  if(reaction.emoji.name === "PUBG") member.addRole(pubg)
  var rl = server.roles.find('name', 'Rocket League');
  if(reaction.emoji.name === "RocketLeague") member.addRole(rl)
  var r6 = server.roles.find('name', 'Rainbow Six Seige');
  if(reaction.emoji.name === "R6") member.addRole(r6)
  var rb = server.roles.find('name', 'Roblox');
  if(reaction.emoji.name === "Roblox") member.addRole(rb)
  var ru = server.roles.find('name', 'Rust');
  if(reaction.emoji.name === "Rust") member.addRole(ru)
  var un = server.roles.find('name', 'Unturned');
  if(reaction.emoji.name === "Unturned") member.addRole(un)
});

client.on("messageReactionRemove", (reaction, user) => {
  if(reaction.message.channel.id != "460515586661679114") return;
  const member = reaction.message.guild.member(user);
  const server = client.guilds.get("370562411973050368");
  var notify = server.roles.find('name', 'Notify');
  if(reaction.emoji.name === "notify") member.addRole(notify)
  var sot = server.roles.find('name', 'Sea of Thieves');
  if(reaction.emoji.name === "SoT") member.removeRole(sot)
  var ark = server.roles.find('name', 'ARK');
  if(reaction.emoji.name === "ARK") member.removeRole(ark)
  var bh = server.roles.find('name', 'Brawlhalla');
  if(reaction.emoji.name === "Brawlhalla") member.removeRole(bh)
  var csgo = server.roles.find('name', 'CS:GO');
  if(reaction.emoji.name === "CSGO") member.removeRole(csgo)
  var ftn = server.roles.find('name', 'Fortnite');
  if(reaction.emoji.name === "Fortnite") member.removeRole(ftn)
  var gmod = server.roles.find('name', 'Gmod');
  if(reaction.emoji.name === "Gmod") member.removeRole(gmod)
  var lol = server.roles.find('name', 'League of Legends');
  if(reaction.emoji.name === "LOL") member.removeRole(lol)
  var mc = server.roles.find('name', 'Minecraft');
  if(reaction.emoji.name === "Minecraft") member.removeRole(mc)
  var ow = server.roles.find('name', 'Overwatch');
  if(reaction.emoji.name === "Overwatch") member.removeRole(ow)
  var pd = server.roles.find('name', 'Payday');
  if(reaction.emoji.name === "Payday") member.removeRole(pd)
  var pubg = server.roles.find('name', 'PUBG');
  if(reaction.emoji.name === "PUBG") member.removeRole(pubg)
  var rl = server.roles.find('name', 'Rocket League');
  if(reaction.emoji.name === "RocketLeague") member.removeRole(rl)
  var r6 = server.roles.find('name', 'Rainbow Six Seige');
  if(reaction.emoji.name === "R6") member.removeRole(r6)
  var rb = server.roles.find('name', 'Roblox');
  if(reaction.emoji.name === "Roblox") member.removeRole(rb)
  var ru = server.roles.find('name', 'Rust');
  if(reaction.emoji.name === "Rust") member.removeRole(ru)
  var un = server.roles.find('name', 'Unturned');
  if(reaction.emoji.name === "Unturned") member.removeRole(un)
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
    message.delete();
    message.reply("please refrain from posting invite links.");
    let channel = message.guild.channels.find('name', 'mod_logs');
    if (!channel) return;
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
