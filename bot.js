const Discord = require("discord.js");
const client = new Discord.Client();
const ms = require('ms');
const YouTube_API_Token = `SUPER SECRET TOKEN HERE`;
var YouTube_Client = require('youtube-node');
var yt = new YouTube_Client();
yt.setKey(YouTube_API_Token);
const ytdl = require('ytdl-core');
 
const perpage = 10

client.on("ready", () => {
  console.log("Started");

client.user.setPresence({ game: { name: '+help for help', type: 0 } });

});

var prefix = "+";

client.on("guildMemberAdd", (user) => {
    let fireTime = new Date();
    let channel = user.guild.channels.find('name', 'welcome');
    if (!channel) return;
    channel.send(`Welcome ${user.user} to the United Federations of Food!\nCurrent Member Count: ${user.guild.memberCount}`);
    var role = user.guild.roles.find('name', 'Members');
    user.addRole(role)
});

client.on("guildMemberRemove", (user) => {
    let fireTime = new Date();
    let channel = user.guild.channels.find('name', 'leave');
    if (!channel) return;
    channel.send(`**${user.user.tag}** has left!\nCurrent Member Count: ${user.guild.memberCount}`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

let args = message.content.split(" ").slice(1);

  if (command === "ping") {
    message.channel.send(`*Ping?*`).then(m => {
    m.edit(`**Pong** ` + (m.createdTimestamp - message.createdTimestamp) + `ms`);
    });
  }

  if (command === "food") {
  const responses = [
   'Apple', 'Cake', 'Cookie', 'Shrimp', 'Lobster', 'Crab', 'Fish', 'Pop Corn', 'Cheese', 'Orange', 'Lemon', 'Banana', 'Garlic', 'Coconut', 'Avocado', 'Tofu', 'Tomato', 'Onion', 'Lentil', 'Carrot', 'Spinach', 'Cracker', 'Bread', 'Waffle', 'Pancake', 'Eggs', 'Tuna', 'Bacon', 'Lamb', 'Asparagus', 'Almond', 'Eggplant', 'Celary', 'Beans', 'Grapefruit', 'Pomegranate', 'Brussels Sprouts', '**You got the Mythical Food! Message an admin for the Mythical rank!**'
] 
   message.channel.send(`${responses[Math.floor(Math.random() * responses.length)]}`);
}

if (command === "purge") {
let member = message.mentions.members.first();
let reason = message.content.split(" ").slice(2).join(" ");
   if (message.member.hasPermission("MANAGE_MESSAGES")) {
const user = message.mentions.users.first();
const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
if (!amount) return message.reply('Must specify an amount to delete!');
if (!amount && !user) return message.reply('Please specify an amount of messages to purge.');
message.channel.fetchMessages({
 limit: amount,
}).then((messages) => {
 if (user) {
 const filterBy = user ? user.id : Client.user.id;
 messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 }
 message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
});
} else {
          message.channel.send('You do not have access to use this command.');
          return;
        }}

    if (command === "kick") {
        let member = message.mentions.members.first();
        let reason = message.content.split(" ").slice(2).join(" ");
        
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (!member) {
                message.channel.send(`:x: Please mention a valid guild member!`)
                return;
            }
            if (!reason) {
                member.kick(`Kicked by ${message.author.tag}`).then(() => {
                    message.channel.send(`:white_check_mark: **${member.user.tag}** was kicked.`)
                    let channel = member.guild.channels.find('name', 'moderation');
                    if (!channel) return;
                    channel.send(`**${member.user.tag}** kicked by **${message.author.tag}** - **Reason:** None provided`);
                }).catch(() => {message.channel.send(`:x: Either that user isn't kickable, or the bot doesn't have permissions!`)});
            } else {
                member.kick(reason).then(() => {
                    message.channel.send(`:white_check_mark: **${member.user.tag}** was kicked.`)
                    let channel = member.guild.channels.find('name', 'moderation');
                    if (!channel) return;
                    channel.send(`**${member.user.tag}** kicked by **${message.author.tag}** - **Reason:** ${reason}`);
                }).catch(() => {message.channel.send(`:x: Either that user isn't kickable, or the bot doesn't have permissions!`)});
            }
        } else {
          message.channel.send(`:x: You don't have permission!`);
          return;
        }}

    if (command === "ban") {
        let member = message.mentions.members.first();
        let reason = message.content.split(" ").slice(2).join(" ");
        
        if (message.member.hasPermission("BAN_MEMBERS")) {
            if (!member) {
                message.channel.send(`:x: Please mention a valid guild member!`)
                return;
            }
            if (!reason) {
                member.ban(`Banned by ${message.author.tag}`).then(() => {
                    message.channel.send(`:white_check_mark: **${member.user.tag}** was banned.`)
                    let channel = member.guild.channels.find('name', 'moderation');
                    if (!channel) return;
                    channel.send(`**${member.user.tag}** banned by **${message.author.tag}** - **Reason:** None provided`);
                }).catch(() => {message.channel.send(`:x: Either that user isn't bannable, or the bot doesn't have permissions!`)});
            } else {
                member.ban(reason).then(() => {
                    message.channel.send(`:white_check_mark: **${member.user.tag}** was banned.`)
                    let channel = member.guild.channels.find('name', 'moderation');
                    if (!channel) return;
                    channel.send(`**${member.user.tag}** banned by **${message.author.tag}** - **Reason:** ${reason}`);
                }).catch(() => {message.channel.send(`:x: Either that user isn't bannable, or the bot doesn't have permissions!`)});
            }
        } else {
          message.channel.send(`:x: You don't have permission!`);
          return;
        }}

    if (command === "warn") {
        let member = message.mentions.members.first();
        let reason = message.content.split(" ").slice(2).join(" ");
        
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (!member) {
                message.channel.send(`:x: Please mention a valid guild member!`)
                return;
            }
            if (!reason) {
                message.channel.send(`User warned by **${message.author.tag}**`).then(() => {
                    message.channel.send(`:white_check_mark: **${member.user.tag}** was warned.`)
                    let channel = member.guild.channels.find('name', 'moderation');
                    if (!channel) return;
                    channel.send(`**${member.user.tag}** warned by **${message.author.tag}** - **Reason:** None provided`);
                }).catch(() => {message.channel.send(`:x: That user can not be warned!`)});
            } else {
                message.channel.send(`User warned by **${message.author.tag}**`).then(() => {
                    message.channel.send(`:white_check_mark: **${member.user.tag}** was warned.`)
                    let channel = member.guild.channels.find('name', 'moderation');
                    if (!channel) return;
                    channel.send(`**${member.user.tag}** warned by **${message.author.tag}** - **Reason:** ${reason}`);
                }).catch(() => {message.channel.send(`:x: That user can not be warned!`)});
            }
        } else {
          message.channel.send(`:x: You don't have permission!`);
          return;
        }}

  if (command === "play") {
         
        const args = message.content.split(" ").slice(1).join(" ");
        const voiceChannel = message.member.voiceChannel;
        const voice = message.guild.voiceConnection;
         
        if (!args) {
            const embed22 = new Discord.RichEmbed()
      embed22.setDescription(`ERR! Couldn't find any search terms or a url`);
      embed22.setAuthor(message.author.tag, message.author.avatarURL)
      message.channel.send({ embed: embed22 });
      return;
        }
 
  yt.search(args, 1, function(error, result) {
    if (error) {
      const embed22 = new Discord.RichEmbed()
      embed22.setDescription(`ERR! Couldn't find the video to play`);
      embed22.setAuthor(message.author.tag, message.author.avatarURL)
      message.channel.send({ embed: embed22 });
      return;
    } else {
      if (!voiceChannel) {
        const embed222 = new Discord.RichEmbed()
        embed222.setDescription(`ERR! You are not in a voice channel`);
        embed222.setAuthor(message.author.tag, message.author.avatarURL)
        message.channel.send({ embed: embed222 });
        return;
      }
      voiceChannel.join()
      .then(connnection => {
        const stream = ytdl(`https://www.youtube.com/watch?v=${result.items[0].id.videoId}`, { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        const embed = new Discord.RichEmbed()
        embed.addField("Music Started", `\n**Title -** ${result.items[0].snippet.title}\n**Author -** ${result.items[0].snippet.channelTitle}`, true);
        embed.setAuthor(message.author.tag, message.author.avatarURL)
        embed.setThumbnail(result.items[0].snippet.thumbnails.default.url)
        message.channel.send({ embed: embed });
        dispatcher.on('end', () => voiceChannel.leave());
    })}})}
 
if (command === "stop") {
const voice = message.guild.voiceConnection;
if (!voice) {
const embed = new Discord.RichEmbed()
embed.setDescription(`ERR! No music being played`);
embed.setAuthor(message.author.tag, message.author.avatarURL)
message.channel.send({ embed: embed });
} else {
if (!voice.dispatcher) return;
voice.dispatcher.end();
voice.disconnect();
const embed1 = new Discord.RichEmbed()
embed1.setDescription(`Music has been stopped`);
embed1.setFooter(message.author.tag, message.author.avatarURL)
message.channel.send({ embed: embed1 });
}}

  if (command === "userinfo") {
   let member = message.mentions.members.first();
if (!member) {
 message.channel.send({embed: new Discord.RichEmbed()
.setAuthor(`Information about ${message.author.tag}`, message.author.avatarURL)
.addField("User ID", `${message.author.id}`, true)
.addField("Status", `${message.author.presence.status}`, true)
.addField("Joined", `${message.member.joinedAt}`)
.addField("Registered", `${message.author.createdAt}`)
.setThumbnail(message.author.avatarURL)
.setColor("#282727")})
   } else {
 message.channel.send({embed: new Discord.RichEmbed()
.setAuthor(`Information about ${member.user.tag}`, member.user.avatarURL)
.addField("User ID", `${member.id}`, true)
.addField("Status", `${member.presence.status}`, true)
.addField("Joined", `${member.joinedAt}`)
.addField("Registered", `${member.user.createdAt}`)
.setThumbnail(member.user.avatarURL)
.setColor("#282727")})
      }
  }

  if (command === "info") {
   let member = message.mentions.members.first();
 message.channel.send({embed: new Discord.RichEmbed()
.setAuthor(`Information about the United Federations of Food`, message.guild.iconURL)
.addField("ID", `${message.guild.id}`, true)
.addField("Name", `United Federations of Food`, true)
.addField("Owner", `MythicalFood (Shane)`, true)
.addField("Region", `${message.guild.region}`, true)
.addField("Channels", `${message.guild.channels.size}`, true)
.addField("Members", `${message.guild.memberCount}`, true)
.addField("Roles", `${message.guild.roles.size}`, true)
.addField("Bots", `${message.guild.members.filter(m=>m.user.bot).size}`, true)
.setThumbnail(message.guild.iconURL)
.setColor("#282727")})
}

  if (command === "help") {
 message.channel.send({embed: new Discord.RichEmbed()
.setAuthor("Food BOT Commands", client.user.avatarURL)
.addField("System", "+help - List help commands\n+ping - Checks the bots ping")
.addField("Regular", "+food - Daily food command\n+info - Information about the United Federations of Food\n+userinfo - Information about a user")
.addField("Staff", "+kick - Kick a user from the server\n+ban - Ban a user from the server\n+warn - Warn a user")
.addField("Music", "+play - Play a song off of YouTube\n+stop - Stop the song that is being played")
.setColor("#0A2BF9")})
}
});

client.login("SUPER SECRET TOKEN HERE");
