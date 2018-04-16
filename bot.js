const { Client } = require('discord.js');
const client = new Client({ disableEveryone: true});
const fs = require('fs');
client.config = require('./config.json');
client.login(client.config.token);
// client.db = require('rethinkdbdash')({ db: 'sync' });
client.error = require('./util/errorLogger.js').run;
client.tempProfiles = {};
exports.client = client;

client.on("error", (O_o) => {});

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

fs.readdir('./events', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});
