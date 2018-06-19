const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, args) => {
        const roles = ["Event Notify", "Ark", "Battlefield", "Brawlhalla", "Call of Duty", "Crafting Dead (Minecraft)", "CS:GO", "Fortnite", "Fortnite @", "Garry's Mod", "Grand Theft Auto", "H1Z1", "League of Legends", "Minecraft", "Modded Minecraft", "Overwatch", "Payday", "PUBG", "Rocket League", "Raft", "Rainbow Six Seige", "Roblox", "Rust", "Town of Salem", "Unturned", "War Thunder", "World of Tanks"];
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
