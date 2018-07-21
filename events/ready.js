const userinfo = require("../data/userinfo.json");
const fs = require("fs");

module.exports = {
    run: async (client) => {
    console.log(`Ready!`);
    let server = client.guilds.get("370562411973050368");
    let channel = client.channels.get("460515586661679114");
        channel.send(`**React to this message to get the roles**\n
Notify - ${server.emojis.get("460571176528511000")}
Brawlhalla - ${server.emojis.get("459930326349774849")}
CS:GO - ${server.emojis.get("459930831176204289")}
Fortnite - ${server.emojis.get("459931131924447234")}
Garry's Mod - ${server.emojis.get("459931586880602123")}
League of Legends - ${server.emojis.get("459931849062350848")}
Minecraft - ${server.emojis.get("459934891895947264")}
Overwatch - ${server.emojis.get("459935480281301004")}
Payday - ${server.emojis.get("459935231227723787")}
PUBG - ${server.emojis.get("459935629577420800")}
Rocket League - ${server.emojis.get("459935810989326336")}
Rainbow Six Seige - ${server.emojis.get("459936293451988992")}
Roblox - ${server.emojis.get("459936570208681994")}
Rust - ${server.emojis.get("459936871355645962")}
Unturned - ${server.emojis.get("459931398938165249")}\n
*If you spam the reactions the bot will lag and it will take some time for it to give/take your roles. If your reaction was removed because of the bot restart and you want to remove a role just react and un-react.*`)
         .then(msg => {
          msg.react(server.emojis.get("460571176528511000"))
          msg.react(server.emojis.get("459930326349774849"))
          msg.react(server.emojis.get("459930831176204289"))
          msg.react(server.emojis.get("459931131924447234"))
          msg.react(server.emojis.get("459931586880602123"))
          msg.react(server.emojis.get("459931849062350848"))
          msg.react(server.emojis.get("459934891895947264"))
          msg.react(server.emojis.get("459935480281301004"))
          msg.react(server.emojis.get("459935231227723787"))
          msg.react(server.emojis.get("459935629577420800"))
          msg.react(server.emojis.get("459935810989326336"))
          msg.react(server.emojis.get("459936293451988992"))
          msg.react(server.emojis.get("459936570208681994"))
          msg.react(server.emojis.get("459936871355645962"))
          msg.react(server.emojis.get("459931398938165249"))
            })
        var guilds = client.guilds.array();
        for(var i = 0; i < guilds.length; i++) {
          if(!userinfo.hasOwnProperty(guilds[i].id)) {
            userinfo[guilds[i].id] = { "members": {} };
            console.log("Added guild " + guilds[i].name + " of id " + guilds[i].id + " to userinfo guilds list");
          }
          var members = guilds[i].members.array();
          for(var j = 0; j < members.length; j++) {
            if(!userinfo[guilds[i].id]["members"].hasOwnProperty(members[j].id)) {
              userinfo[guilds[i].id]["members"][members[j].user.id] = { "permissions":[], "punishments":[], "applications": {} };
              console.log("Added user " + members[j].user.tag  + " of id " + members[j].id + " to " + guilds[i].name + " userinfo members list");
            }
            if(!userinfo[guilds[i].id]["members"][members[j].user.id].hasOwnProperty("permissions")) {
              userinfo[guilds[i].id]["members"][members[j].user.id]["permissions"] = [];
            }
            if(!userinfo[guilds[i].id]["members"][members[j].user.id].hasOwnProperty("punishments")) {
              userinfo[guilds[i].id]["members"][members[j].user.id]["punishments"] = {};
            }
            if(!userinfo[guilds[i].id]["members"][members[j].user.id].hasOwnProperty("applications")) {
              userinfo[guilds[i].id]["members"][members[j].user.id]["applications"] = {};
            }
          }
        }
        saveInfo(userinfo, "./data/userinfo.json");
  }
}

function saveInfo(info, path) {
  fs.writeFile(path, JSON.stringify(info, null, " "), function (error) {
    if (error) {
     console.log(error);
    }
  });
};
