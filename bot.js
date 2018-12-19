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

client.on('ready', async () => {
  setTimeout(timedXpVC, 60*1000);
});

function timedXpVC(){
  console.log("Looped for VC Xp reward");
  const gen1 = client.channels.get("370562412497207299").members;
  const gen2 = client.channels.get("370562412497207299").members;
      gen1.forEach(member => {
        const key = `${member.id}`;
        let curXp = client.info.get(key, "xp");
        curXp += 60;
        client.info.set(key, curXp, "xp");
      });
      gen2.forEach(member => {
        const key = `${member.id}`;
        let curXp = client.info.get(key, "xp");
        curXp += 60;
        client.info.set(key, curXp, "xp");
      });
      setTimeout(timedXpVC, 6*1000);
}

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
  if (msg.author.bot) return;
  if (msg.content === "STOP") {
    msg.channel.send("https://www.youtube.com/watch?v=O2otihe65SI")
  } else if (msg.content === "no homo") {
    msg.channel.send("yes homo")
  } else if (msg.content === "no u") {
    msg.channel.send("", {files: [random]})
  }

  let cooldown = new Set();
  let ctime = 30;

  const key = `${msg.author.id}`;
  if (msg.author.bot) return;
  if (cooldown.has(msg.author.id)) return;
  let member = msg.guild.members.get(msg.author.id);
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
  let nxtLvl = (client.info.get(key, "level") * 300);
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

  var message = msg;
  var content = message.content;
  if(new RegExp(blacklist[0], "i").test(content) && (userinfo[message.guild.id]["members"][message.author.id]["level"] < 3)) {
    message.delete();
    message.channel.send(":white_check_mark: **Post Prevention Verification Successful...**");
    message.channel.send(":thumbsup: **Thank you**");
  }
  for(var i = 1; i < blacklist.length; i++) {
    if(new RegExp(blacklist[i], "i").test(content) && (userinfo[message.guild.id]["members"][message.author.id]["level"] < 3)) {
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
   if(userinfo[message.guild.id]["members"][message.author.id]["level"] < 3) return;
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
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

function saveInfo(info, path) {
  fs.writeFile(path, JSON.stringify(info, null, " "), function (error) {
    if (error) {
     console.log(error);
    }
  });
}
