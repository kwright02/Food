const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, args) => {
        const help = new Discord.RichEmbed()
        .setColor(0x42f471)
        .setAuthor("FoodBOT Commands", client.user.avatarURL)
        .addField("System", "+ping - Shows the bots ping\n+help - List help commands")
        .addField("Regular", "+info - Information about the United Federations of Food\n+social - UFF Social information\n+suggest - Suggest something for the server\n+user - Information about a certain user\n+avatar - Get a users avatar\n+applymod - Apply for moderator\n+applybm - Apply for branch manager")
        .addField("Fun", "+stats - Check a users xp, level, and food points\n+food - Claim your daily Food Points\n+wyr - Would you rather, this or that\n+joke - Tells a joke\n+ship - Ship 2 users together\n+emojify - Turn your message into emojis\n+8ball - The magic 8ball\n+flip - Flip a coin\n+rps - Rock, Paper, or Scissors")
        .addField("Staff", "+warn - Warn a user\n+kick - Kick a user\n+ban - Ban a user\n+perms - Manage a users permissions\n+purge - Purge a certain amount of messages\n+pts - Manage a users Food Points")
            msg.channel.send(help);
    },
    meta: {
        name: 'help',
        description: 'Need help?',
        usage: ''
    }
}
