module.exports = {
    run: async (client, msg, args) => {
        const roles = ["Ark", "Battlefield", "Castle Crasher", "Call of Duty", "Crafting Dead (Minecraft)", "CS:GO", "Destiny", "DOOM", "Fallout", "Fortnite", "Garry's Mod", "Grand Theft Auto", "Golf It", "Hand Simulator", "Hearhtstone", "H1Z1", "League of Legends", "Minecraft", "Modded Minecraft", "Overwatch", "Payday", "Politics and War", "Rocket League", "PUBG", "Rainbow Six Seige", "Roblox", "Rust", "Skyrim", "Team Fortress 2", "Town of Salem", "Terraria", "Unturned", "VR Chat", "War thunder", "Watchdogs", "World of Tanks", "Spotify"];
        let role = msg.guild.roles.find('name', args.join(" "));
        if (!roles.includes(args.join(" "))) return msg.channel.send("Either role doesn't exist or you're not using capital letters in the correct spots!");
        if (!args[0]) return msg.channel.send("Please enter a role to join!");
        if (msg.member.roles.has(role.id)) {
            msg.member.removeRole(role)
            msg.channel.send("Taken role " + args.join(" ") + ` from ${msg.author.username}`).then(answer => {
            answer.delete(5000)
            msg.delete(5000)
            });
        }
        if (!msg.member.roles.has(role.id)) {
            msg.member.addRole(role)
            msg.channel.send("Given role " + args.join(" ") + ` to ${msg.author.username}`).then(answer => {
            answer.delete(5000)
            msg.delete(5000)
            });
        }
    },
    meta: {
        name: 'role',
        description: 'Join a role',
        usage: ''
    }
}
