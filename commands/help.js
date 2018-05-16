const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, args) => {
        if (!args[0]) {
        const help = new Discord.RichEmbed()
        .setColor(0x42f471)
        .setAuthor("FoodBOT Commands", client.user.avatarURL)
        .addField("Regular", "+ping - Shows the bots ping\n+help - Commands for the bot\n+food - Random food generation\n+info - Information about the United Federations of Food")
        .setFooter(`If you are a staff member do +help staff`)
            msg.channel.send(help);
        } else if (args[0].toLowerCase() === 'staff') {
        const staff = new Discord.RichEmbed()
        .setColor(0x42f471)
        .setAuthor("FoodBOT Staff Commands", client.user.avatarURL)
        .addField("Staff", "+kick - Kick a user from the server\n+ban - Ban a user from the server\n+warn - Warns a user\n+purge - Purge a certain amount of messages")
        .setFooter(`Do +help for normal commands`)
            msg.channel.send(staff);
        } else {
            msg.channel.send(`Error`);
        }
        
    },
    meta: {
        name: 'help',
        description: 'Need help?',
        usage: ''
    }
}
const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, args) => {
        if (!args[0]) {
        const help = new Discord.RichEmbed()
        .setColor(0x42f471)
        .setAuthor("FoodBOT Commands", client.user.avatarURL)
        .addField("Regular", "+ping - Shows the bots ping\n+help - Commands for the bot\n+food - Random food generation\n+info - Information about the United Federations of Food\n+role - Join a role\n+roles - List of roles\n+wyr - Would you rather, this or that\n+joke - Tells a joke\n+ship - Ships 2 users")
        .setFooter(`If you are a staff member do +help staff`)
            msg.channel.send(help);
        } else if (args[0].toLowerCase() === 'staff') {
        const staff = new Discord.RichEmbed()
        .setColor(0x42f471)
        .setAuthor("FoodBOT Staff Commands", client.user.avatarURL)
        .addField("Staff", "+kick - Kick a user from the server\n+ban - Ban a user from the server\n+warn - Warns a user\n+purge - Purge a certain amount of messages")
        .setFooter(`Do +help for normal commands`)
            msg.channel.send(staff);
        } else {
            msg.channel.send(`Error`);
        }
        
    },
    meta: {
        name: 'help',
        description: 'Need help?',
        usage: ''
    }
}
