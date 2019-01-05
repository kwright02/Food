const Discord = require("discord.js");

module.exports = {
    run: async (client, msg, connection, args) => {
      let bc = client.channels.get("399916099325657088");
      if (msg.channel.id !== "399916099325657088") {
       msg.channel.send(`This command can only be used in ${bc}.`)
       return;
        }
      var channel = msg.channel;
      channel.send(`––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
:information_source: UFF Social Information :information_source:

Twitter: https://twitter.com/FederationsOf
Steam Community: https://steamcommunity.com/groups/UnitedFederationsofFood#
Kinguin: https://www.kinguin.net/?r=54545 Discount Code: UFF
Stimpacks: https://stimpacks.com/?utm_source=affiliate&utm_campaign=UFF. Discount Code: UFF

If you’re interested in sponsoring UFF, please contact an Admin or Higher
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––`)
},
meta: {
    name: 'social',
    description: 'Get UFF social information',
    usage: ''
    }
 }
