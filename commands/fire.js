module.exports = {
    run: async (client, msg, args) => {
       let member = msg.mentions.members.first();
       let channel = msg.guild.channels.find('name', 'server_updates');
       if (!channel) return;
       let perms = msg.guild.roles.find("name", "Permissions");
        if (!msg.member.roles.has(perms.id)) {
            msg.channel.send("You must be part of the recruitment team to do this.").then(answer => {
            answer.delete(5000)
            msg.delete(5000)
            });
          return;
           }
        if (!args[1]) {
        msg.channel.send('Please type \`mod/bm\` at the end.')
        } else if (args[1].toLowerCase() === 'mod') {
      var mod = msg.guild.roles.find('name', 'Moderator');
      member.removeRole(mod)
      var staff = msg.guild.roles.find('name', 'Staff');
      member.removeRole(staff)
      var modperms = msg.guild.roles.find('name', 'Mod Permissions');
      member.removeRole(modperms)
      msg.channel.send(`:white_check_mark: ***${member.user.tag}** has been fired.*`);
      channel.send(`***${msg.author.tag}** has fired **${member.user.tag}** from Moderator.*`);
        } else if (args[1].toLowerCase() === 'bm') {
      var bm = msg.guild.roles.find('name', 'Branch Manager');
      member.removeRole(bm)
      var staff = msg.guild.roles.find('name', 'Staff');
      member.removeRole(staff)
      msg.channel.send(`:white_check_mark: ***${member.user.tag}** has been fired.*`);
      channel.send(`***${msg.author.tag}** has fired **${member.user.tag}** from Branch Manager.*`);
        } else {
            msg.channel.send(`Unknown role.`);
        }     
    },
    meta: {
        name: 'hire',
        description: 'Fire someone from mod or bm',
        usage: ''
    }
}