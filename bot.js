const { Client } = require('discord.js');
const Discord = require("discord.js");
const userinfo = require("./data/userinfo.json");
const client = new Client({ disableEveryone: true});
const fs = require('fs');
const Enmap = require('enmap');
const sqlusr = require("./user.json");
const connection = mysql.createConnection({
      host: sqlusr.ip,
      port: sqlusr.port,
      user: sqlusr.username,
      password: sqlusr.password,
      database: "memberData"
});
const dutils = require("database.js");
client.config = require('./config.json');
client.login(client.config.token);
client.error = require('./error.js').run;

const blacklist = client.config.blacklist;

// client.on('ready', async () => {
//   setTimeout(timedXpVC, 6*1000);
// });
//
// function timedXpVC(){
//   const gen1 = client.channels.get("370562412497207299").members;
//   const gen2 = client.channels.get("370562412497207299").members;
//       gen1.forEach(member => {
//         const key = `${member.id}`;
//         var curXp = 0;
//       try {
//         curXp = options[(key, "xp");
//       } catch(err) {
//         console.log("This key wasn't found: " + key);
//       }
//         curXp += 60;
//         client.info.set(key, curXp, "xp");
//       });
//       gen2.forEach(member => {
//         const key = `${member.id}`;
//         let curXp = options[(key, "xp");
//         curXp += 60;
//         client.info.set(key, curXp, "xp");
//       });
//       console.log("Looped for VC Xp reward. Rewarded " + (gen1.length + gen2.length) + " members.");
//       setTimeout(timedXpVC, 60*1000);
// }

client.on("error", (O_o) => {});

client.on("guildMemberAdd", (user) => {
    let infoChannel = client.channels.get("420407754327457792");
    let channel = user.guild.channels.find(chan => chan.name === 'welcome');
    let imgur = "https://i.imgur.com/eCA7xqc.png";
    if (!channel) return;
    channel.send(`:tada: Welcome to the United Federations of Food ${user.user}, you are member ${user.guild.memberCount}. Please read ${infoChannel} and enjoy your time here! :heart:`);
    user.send(`**Welcome to UFF**\n**There are a few things I'd like you to know before you start chit-chatting with all of the pretty people.**\n**-** Read the channels in the "Server Information" category.\n**-** If you would like to apply for staff go to #bot-commands and type +applymod for moderator, +applypm for partner manager, and +applywelcome for welcomer.\n**-** We might have an awesome giveaway going on in #giveaways.\n**-** We have some sponsors. Kinguin and Stimpacks.\nUse code UFF at <https://stimpacks.com?utm_source=affiliate&utm_campaign=UFF> for 15% of on some delicious beef jerky.\nUse code UFF at <https://kinguin.net/?r=54545> for 3% on your next cheap game.\n\n**Have Fun!**`);
    user.send("", {files: [imgur]})
    var role = user.guild.roles.find(role => role.name === 'Members');
    user.addRole(role);
    dutils.addMember(client, user, connection);
});

client.on("guildMemberRemove", (user) => {
    let channel = user.guild.channels.find(chan => chan.name === 'leave');
    if (!channel) return;
    channel.send(`**${user.user.tag}** has left. We now have ${user.guild.memberCount} members`);
});

client.on('messageUpdate', (oldMessage, newMessage) => {
if (oldMessage.content.length < 1) return;
if (oldMessage.content.length > 1000) return;
if (oldMessage.author.bot) return;
if (oldMessage.guild === null) return;
if (newMessage.content === oldMessage.content) return;
    let channel = oldMessage.guild.channels.find(chan => chan.name === 'action_logs');
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

client.on("messageDelete", async (dm) => {
if (dm.content.length < 1) return;
if (dm.content.length > 1000) return;
if (dm.author.bot) return;
if (dm.guild === null) return;
    let channel = dm.guild.channels.find(chan => chan.name === 'action_logs');
    if (!channel) return;
    const entry = await dm.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());
    let deleter = ""
    if (entry.extra.channel.id === dm.channel.id
      && (entry.target.id === dm.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    deleter = entry.executor.username
  } else {
    deleter = dm.author.username
         }
        const embed = new Discord.RichEmbed()
        .setColor(0x42f471)
        .setAuthor(`Message Delete | ${dm.author.tag}`, client.user.avatarURL)
        .addField("Deleter", `${deleter}`, true)
        .addField("Channel", `${dm.channel}`, true)
        .addField("Content", `${dm}`, true)
        .setFooter(dm.id)
        .setTimestamp()
        channel.send( {embed} );
});

client.on('messageReactionAdd', async (reaction, user) => {
  if(reaction.message.channel.id === "446769808218783764"){
    try {
      const member = await reaction.message.guild.member(user);
      const attemptedRole = await reaction.message.guild.roles.find(role => role.name === reaction.emoji.name);
      const hasRole = await member.roles.has(attemptedRole.id);
      if(!hasRole){
        await member.addRole(attemptedRole).catch(console.error);
        await console.log('[Role Manager] User role added: (', user.username, ') ', reaction.emoji.name);
      }
    } catch (e) {
        console.error(e);
    }
  }
});

client.on('messageReactionRemove', async (reaction, user) => {
  if(reaction.message.channel.id === "446769808218783764"){
    const member = await reaction.message.guild.member(user);
    const attemptedRole = await reaction.message.guild.roles.find(role => role.name === reaction.emoji.name);
    const hasRole = await member.roles.has(attemptedRole.id);
    if(hasRole){
      await member.removeRole(attemptedRole).catch(console.error);
      await console.log('[Role Manager] User role removed: (', user.username, ') ', reaction.emoji.name);
    }
  }
});

client.on("message", async msg => {
  let cards = ["https://i.imgur.com/GaESyzw.png", "https://i.imgur.com/HOwoODP.png", "https://i.imgur.com/0jlEeCL.png", "https://i.imgur.com/JqTsbgw.png"]
  let random = cards[Math.floor(Math.random() * cards.length)];
  var message = msg;
  var content = message.content;
  var options = dutils.getMemberOptions(client, msg.author.user, connection);
  var permission = parseInt(dutils.getMemberPermission(client, msg.author, connection));
  if (msg.author.bot) return;
  if(options["muted"]){
    msg.author.send("You are attempting to chat whilst muted. Please wait until your mute is up.");
    return;
  }

  if (msg.content === "STOP") {
    msg.channel.send("https://www.youtube.com/watch?v=O2otihe65SI")
  } else if (msg.content === "no homo") {
    msg.channel.send("yes homo")
  } else if (msg.content === "no u") {
    msg.channel.send("", {files: [random]})
  }

  let curPts = options["points"];
  let curXp = options["xp"];
  let curLvl = options["level"];
  let nxtLvl = options["level"] * 300;
  let nxtPts = options["level"] * 5;
  curXp += 5;
  if (nxtLvl <= curXp) {
     curLvl += 1;
     curXp = 0;
     curPts += nxtPts;
     msg.reply(`you have leveled up to level ${curLvl}! Your prize is ${nxtPts} Food Points!`);
  }
  options["level"] = curLvl;
  options["xp"] = curXp;
  options["points"] = curPts;
  dutils.updateMemberOptions(client, msg.author.user, options, connection);

  if(new RegExp(blacklist[0], "i").test(content) && permission < 3) {
    message.delete();
    message.channel.send(":white_check_mark: **Post Prevention Verification Successful...**");
    message.channel.send(":thumbsup: **Thank you**");
  }
  for(var i = 1; i < blacklist.length; i++) {
    if(new RegExp(blacklist[i], "i").test(content) && permission < 3) {
      message.delete();
      message.channel.send(`:white_check_mark: ***${message.author.tag}** has been warned.*`);
      let channel = message.guild.channels.find(chan => chan.name === 'mod_logs');
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
  if(permission > 3) return;
  if(/discord\.gg\//.test(content) || /\.gg\/[a-zA-Z0-9]/.test(content)) {
    message.delete();
    message.reply("please refrain from posting invite links.");
    let channel = message.guild.channels.find(chan => chan.name === 'mod_logs');
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
        client.on(eventName, (...args) => eventFunction.run(client, connection, ...args));
    });
});
