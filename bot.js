const { Client } = require('discord.js');
const Discord = require("discord.js");
const mysql = require("mysql");
const client = new Client({ disableEveryone: true});
const fs = require('fs');
const sqlusr = require("./user.json");
const connection = mysql.createConnection({
      host: sqlusr.ip,
      port: sqlusr.port,
      user: sqlusr.username,
      password: sqlusr.password,
      database: sqlusr.database
});
const dutils = require("./database.js");
client.config = require('./config.json');
client.login(client.config.token);
client.error = require('./error.js').run;

const blacklist = client.config.blacklist;

client.on('ready', async () => {
  setInterval(timedXpVC, 60*1000);
});

function timedXpVC(){
  const gen1 = client.channels.get("370562412497207299").members;
  const gen2 = client.channels.get("452693215980683266").members;
      gen1.forEach(function(member){
        dutils.getMemberOptions(client, member.user, connection, "Activity Rewards").then(function(opts){
            var options = JSON.parse(opts);
            var channel = client.guilds.get("370562411973050368").channels.find(chan => chan.name === "level-up");
            if((options.curLvl * 150) <= options.curLvl){
              options.curXp = 0;
              options.curLvl += 1;
              options.curPts += options.curLvl*5;
              const embed = new Discord.RichEmbed()
              .setColor(0xD042F4)
              .setAuthor(`Automated Message | ${member.user.tag}`, client.user.avatarURL)
              .addField("User", `${member.user.tag}`, true)
              .addField("Reason", `You leveled up to level ${options.curLvl} and gained ${options.curLvl*5} points!`, true)
              .setFooter("Food Bot | v1.2")
              .setTimestamp();
              channel.send( {embed} );
            } else {
                options.curXp += 60;
            }
            var stropts = JSON.stringify(options);
            dutils.updateMemberOptions(client, member.user, stropts.replace("\"{", "{").replace("\"}", "}"), connection, "Activity Rewards");
        });
      });
      gen2.forEach(function(member){
        dutils.getMemberOptions(client, member.user, connection, "Activity Rewards").then(function(opts){
            var options = JSON.parse(opts);
            var channel = client.guilds.get("370562411973050368").channels.find(chan => chan.name === "level-up");
            if((options.curLvl * 150) <= options.curLvl){
              options.curXp = 0;
              options.curLvl += 1;
              options.curPts += options.curLvl*5;
              const embed = new Discord.RichEmbed()
              .setColor(0xD042F4)
              .setAuthor(`Automated Message | ${member.user.tag}`, client.user.avatarURL)
              .addField("User", `${member.user.tag}`, true)
              .addField("Reason", `You leveled up to level ${options.curLvl} and gained ${options.curLvl*5} points!`, true)
              .setFooter("Food Bot | v1.2")
              .setTimestamp();
              channel.send( {embed} );
            } else {
                options.curXp += 60;
            }
            var stropts = JSON.stringify(options);
            dutils.updateMemberOptions(client, member.user, stropts.replace("\"{", "{").replace("\"}", "}"), connection, "Activity Rewards");
        });
      });
      console.log("Looped for VC Xp reward. Rewarded " + (gen1.array.length + gen2.array.length) + " members.");
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
    dutils.addMember(client, user, connection, "Member Registrar");
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
  if(reaction.message.channel.name === "roles" && !user.bot){
    try {
      var roles = reaction.message.guild.roles.array();
      const member = await reaction.message.guild.member(user);
      const attemptedRole = await reaction.message.guild.roles.find(role => role.name.split(" ").join("") === reaction.emoji.name);
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
  if(reaction.message.channel.name === "roles"){
    const member = await reaction.message.guild.member(user);
    const attemptedRole = await reaction.message.guild.roles.find(role => role.name.split(" ").join("") === reaction.emoji.name);
    const hasRole = await member.roles.has(attemptedRole.id);
    if(hasRole){
      await member.removeRole(attemptedRole).catch(console.error);
      await console.log('[Role Manager] User role removed: (', user.username, ') ', reaction.emoji.name);
    }
  }
});

client.on("message", async msg => {
  if (msg.author.bot) return;
  // if(msg.channel.name !== "bot_testing") return;
  if(msg.author.cooldown) {
    return;
  }
  let cards = ["https://i.imgur.com/GaESyzw.png", "https://i.imgur.com/HOwoODP.png", "https://i.imgur.com/0jlEeCL.png", "https://i.imgur.com/JqTsbgw.png"]
  let random = cards[Math.floor(Math.random() * cards.length)];
  var message = msg;
  var content = message.content;
  dutils.getMemberOptions(client, msg.author, connection, "Message Handler").then(function(opts){
    dutils.getMemberPermission(client, msg.author, connection, "Message Handler").then(function(permission){
        // console.log('Permission: ' + permission);
        var options = JSON.parse(opts);//{"muted":true,"developer":false,"curXp":0,"curLvl":0,"curPts":0}
        // console.log('Options: ' + options);
        if(options["muted"]){
          msg.delete();
          const embed = new Discord.RichEmbed()
          .setColor(0xD042F4)
          .setAuthor(`Automated Message | ${message.author.tag}`, client.user.avatarURL)
          .addField("User", `${message.author.tag}`, true)
          .addField("Reason", `Attempting to chat whilst muted. Please wait out your mute.`, true)
          .addField("Content", `${message.content}`, true)
          .setFooter("Food Bot | v1.2")
          .setTimestamp();
          msg.author.send( {embed} );
          msg.channel.guild.channels.find(chan => chan.name === "mod_logs").send( {embed} );
          console.log('\n[Message Handling -> Member Management -> Log] Told user ' + msg.author.username + ' to wait out their mute!');
          return;
        }

        let curPts = options["curPts"];
        let curXp = options["curXp"];
        let curLvl = options["curLvl"];
        let nxtLvl = options["curLvl"] * 150;
        curXp += 5;
        if (nxtLvl <= curXp) {
           curLvl += 1;
           nxtPts = curLvl*5;
           curPts += nxtPts;
           curXp = 0;
           const embed = new Discord.RichEmbed()
           .setColor(0xD042F4)
           .setAuthor(`Automated Message | ${message.author.tag}`, client.user.avatarURL)
           .addField("User", `${message.author.tag}`, true)
           .addField("Reason", `You leveled up to level ${curLvl} and gained ${nxtPts} points!`, true)
           .setFooter("Food Bot | v1.2")
           .setTimestamp();
           var mchannel = client.guilds.get("370562411973050368").channels.find(chan => chan.name === "level-up");
           mchannel.send( {embed} );
        }
        options["curXp"] = curXp;
        options["curLvl"] = curLvl;
        options["curPts"] = curPts;
        var stropts = JSON.stringify(options);
        // msg.channel.send("Hey, look at these options: " + stropts);
        // console.log("After Options: " + stropts);
        //Finished Xp Handling
        //BEGIN PUNISHMENT HANDLING
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
            const reason = "Blacklisted Phrase";
            var punishment = `{"punished":${user.user.id},"punisher":${msg.author.id},"reason":${reason}}`;
            dutils.savePunisment(client, JSON.stringify(punishment).replace("\"{", "{").replace("\"}", "}"), user.user.id, msg.author.id, connection, "Message Handler -> Food Auto Warn");
            const embed = new Discord.RichEmbed()
            .setColor(0x42f471)
            .setAuthor(`Automated Warn | ${message.author.tag}`, client.user.avatarURL)
            .addField("User", `${message.author.tag}`, true)
            .addField("Reason", reason, true)
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
          const reason = "Unapproved Advertisement";
          var punishment = `{"punished":${user.user.id},"punisher":${msg.author.id},"reason":${reason}}`;
          dutils.savePunisment(client, JSON.stringify(punishment).replace("\"{", "{").replace("\"}", "}"), user.user.id, msg.author.id, connection, "Message Handler -> Food Auto Warn");
          const embed = new Discord.RichEmbed()
          .setColor(0x42f471)
          .setAuthor(`Automated Warn | ${message.author.tag}`, client.user.avatarURL)
          .addField("User", `${message.author.tag}`, true)
          .addField("Reason", reason, true)
          .addField("Content", `${message.content}`, true)
          .setFooter('UFF Moderation')
          .setTimestamp();
          channel.send( {embed} );
          return;
        }
        //END PUNISHMENT HANDLING
        dutils.updateMemberOptions(client, msg.author, stropts.replace("\"{", "{").replace("\"}", "}"), connection, "Message Handler -> Xp Handling");
        //send updated member options LAST

    }).catch(function(error){
      throw error;
    });
  }).catch(function(error){
    throw error;
  });
  if (msg.content === "STOP") {
    msg.channel.send("https://www.youtube.com/watch?v=O2otihe65SI")
  } else if (msg.content === "no homo") {
    msg.channel.send("yes homo")
  } else if (msg.content === "no u") {
    msg.channel.send("", {files: [random]})
  }
});

client.on("message", function(msg) {
  if(msg.author === client.user) {
    return;
  }
  var sender = msg.author;
  const channel = msg.channel;
  // If channel has no recorded message for session, create messages array and add sent message
  if(!channel.messages) {
    channel.messages = [];
  } else {
    if(channel.slowmode) {
      if(!sender.cooldown) {
        sender.cooldown = setTimeout(function() {
          sender.cooldown = null;
        }, 5000);
        return;
      }
      msg.delete();
      return;
    }
    for(var id in channel.messages) {
      var curMessage = channel.messages[id];
      var length = 0;
      for(var id2 in curMessage.messages) {
        length++;
      }
      if(length === 4 && curMessage.timer) {
        msg.delete();
        channel.send("Slowmode has been activated in " + channel.name);
        sender.cooldown = setTimeout(function() {
          sender.cooldown = null;
        }, 5000);
        channel.slowmode = setTimeout(function() {
          channel.slowmode = null;
          channel.send("Slowmode has been deactivated in " + channel.name);
        }, 60000);
        break;
      }
      channel.messages[id].messages[msg.id] = msg;
    }
  }
  var length = channel.messages.length;
  const timer = function() {
    delete channel.messages[msg.id];
  };
  var message = {
    "msg":msg,
    "timer": setTimeout(timer, 10000),
    "messages":[]
  };
  channel.messages[msg.id] = message;
});

fs.readdir('./events', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunction.run(client, connection, ...args));
    });
});
