const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, args) => {
        const roles = ["Ark", "Battlefield", "Castle Crasher", "Call of Duty", "Crafting Dead (Minecraft)", "CS:GO", "Destiny", "DOOM", "Fallout", "Fortnite", "Garry's Mod", "Golf It", "Hand Simulator", "Hearhtstone", "H1Z1", "League of Legends", "Minecraft", "Payday", "Politics and War", "PUBG", "Rainbow Six Seige", "Rust", "Skyrim", "Team Fortress 2", "Terraria", "VR Chat", "War thunder", "Watchdogs", "World of Tanks"];
        const embed = new Discord.RichEmbed()
        .setColor(0x42f471)
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setDescription(`\`${roles.join('\n')}\``)
        await msg.channel.send( {embed} );
    },
    meta: {
        name: 'roles',
        description: 'List of all joinable roles',
        usage: ''
    }
}
