const { Client } = require('discord.js');
const client = new Client({ disableEveryone: true});
const fs = require('fs');
client.config = require('./config.json');
client.login(client.config.token);
client.error = require('./util/errorLogger.js').run;
client.tempProfiles = {};
exports.client = client;

client.on("error", (O_o) => {});

client.on("guildMemberAdd", (user) => {
    let infoChannel = client.channels.get("420407754327457792");
    let suggestChannel = client.channels.get("420411538449498113");
    let botChannel = client.channels.get("399916099325657088");
    let channel = user.guild.channels.find('name', 'welcome');
    if (!channel) return;
    channel.send(`Everyone welcome ${user.user} to United Federations of Food!\nCurrent Member Count: ${user.guild.memberCount}`);
    user.send(`**Hello!**\n\nThank you for joining United Federations of Food. Please take a moment to familiarize yourself with our rules located in ${infoChannel}\nIf you play a certain game you can do ?rank (game here) in ${botChannel} to get that role so you can become apart of that games branch\nIf you play a game and we don't have a rank for it you can make a suggestion in ${suggestChannel}\nFeel free to contact one of our staff members if you need help with anything. A list of staff members is located in ${infoChannel}\n\n*We hope you have a good time!*\n*-UFF Staff Team*`)
    var role = user.guild.roles.find('name', 'Members');
    user.addRole(role)
});

client.on("guildMemberRemove", (user) => {
    let channel = user.guild.channels.find('name', 'leave');
    if (!channel) return;
    channel.send(`**${user.user.tag}** has left!\nCurrent Member Count: ${user.guild.memberCount}`);
});

fs.readdir('./events', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

