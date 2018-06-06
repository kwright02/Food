module.exports = {
    run: async (client, msg, args) => {
        const roles = ["Event Notify", "Ark", "Battlefield", "Brawlhalla", "Call of Duty", "Crafting Dead (Minecraft)", "CS:GO", "Fortnite", "Fortnite @", "Garry's Mod", "Grand Theft Auto", "H1Z1", "League of Legends", "Minecraft", "Modded Minecraft", "Overwatch", "Payday", "PUBG", "Rocket League", "Raft", "Rainbow Six Seige", "Roblox", "Rust", "Town of Salem", "Unturned", "War Thunder", "World of Tanks"];
        let role = msg.guild.roles.find('name', args.join(" "));
        if (!roles.includes(args.join(" "))) return msg.channel.send("Either role doesn't exist or you're not using capital letters in the correct spots!");
        if (!args[0]) return msg.channel.send("Please enter a role to join!");
        if (msg.member.roles.has(role.id)) {
            msg.member.removeRole(role)
            msg.channel.send("Taken role " + args.join(" ") + ` from ${msg.author.username}`)
        }
        if (!msg.member.roles.has(role.id)) {
            msg.member.addRole(role)
            msg.channel.send("Given role " + args.join(" ") + ` to ${msg.author.username}`)
        }
    },
    meta: {
        name: 'role',
        description: 'Join a role',
        usage: ''
    }
}
