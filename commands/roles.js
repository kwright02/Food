const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, args) => {
        const roles = ["Ark", "Battlefield", "Castle Crasher", "Call of Duty", "Crafting Dead (Minecraft)", "CS:GO", "Destiny", "DOOM", "Fallout", "Fortnite", "Garry's Mod", "Grand Theft Auto", "Golf It", "Hand Simulator", "Hearhtstone", "H1Z1", "League of Legends", "Minecraft", "Modded Minecraft", "Overwatch", "Payday", "Politics and War", "Rocket League", "PUBG", "Rainbow Six Seige", "Roblox", "Rust", "Skyrim", "Team Fortress 2", "Town of Salem", "Terraria", "Unturned", "VR Chat", "War thunder", "Watchdogs", "World of Tanks", "Spotify"];
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