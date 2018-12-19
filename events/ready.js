const userinfo = require("../data/userinfo.json");
const fs = requite("fs");
const Enmap require('enmap');

module.exports = {
  run: async (client) => {
    console.console.log("Checking database status....");
    if(client.info.isReady){
      console.log("\nDB Loaded!");
    } else {
      console.log("\nDB Not Loaded!");
    }
    console.log("Bot Loaded, Everything's good!");
    var currentdate new Date();
    var guilds = client.guilds.array();
    let logs = client.channels.find(chan => chan.name === "bot_logs");
    let hour = currentdate.getHours() + 3;
    let server = client.guilds.get(guild => guild.name === "United Federations of Food");
    let channel = client.channels.get(chan => chan.name === "roles");
    logs.send(":white_check_mark: Bot Online **("+ currentdate.getDay()+ "/"+ currentdate.getMonth()+ "/"+ currentdate.getFullYear()+ " - "+ hour+ ":"+ currentdate.getMinutes()+ " EST)**");
    channel.bulkDelete(10);
    channel.send(`**React to this message to get the roles**\n
**Other**
Notify - ${server.emojis.get("460571176528511000")}

**Games**
ARK - ${server.emojis.get("480431935957762048")}
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
Sea of Thieves - ${server.emojis.get("473540641423622164")}
Unturned - ${server.emojis.get("459931398938165249")}\n
*If you spam the reactions the bot will lag and it will take some time for it to give/take your roles. If your reaction was removed because of the bot restart and you want to remove a role just react and un-react.*`)
.then(msg => {
  msg.react(server.emojis.get("480431935957762048"))
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
  msg.react(server.emojis.get("473540641423622164"))
    });
for(var i = 0; i < guilds.length; i++){
  if(!userinfo.hasOwnProperty(guilds[i].id)){
    userinfo[guilds[i].id] = {members:{}};
    console.console.log("All user info was reset!");
  }
  var members = guilds[i].members.array();
  for(var j = 0; j < members.length; j++){
    if(!userinfo[guilds[i].id]["members"].hasOwnProperty(members[j].id)){
      userinfo[guilds[i].id]["members"][members[j].user.id] = { "permissions":[],"level":0, "punishments":[] };
    }
  }
  console.log("Added users to member list for guild: " + guilds[i].name);
}
saveInfo(userinfo, "./data/userinfo.json");

let mods = client.guilds.get("370562411973050368").roles.get("413849966897790976").members.forEach(m => {
  if (!userinfo["370562411973050368"]["members"][m.user.id]["permissions"].includes("moderate")){
    userinfo["370562411973050368"]["members"][m.user.id]["permissions"].push("moderate");
    console.log("Given \"moderate\" to " + m.user.tag);
  }
  if(!userinfo["370562411973050368"]["members"][m.user.id]["level"] != 2){
    userinfo["370562411973050368"]["members"][m.user.id]["level"] = 2;
  }
  saveInfo(userinfo, "./data/userinfo.json");
});
let jrmods = client.guilds.get("370562411973050368").roles.get("510245054099619846").members.forEach(m => {
  if (userinfo["370562411973050368"]["members"][m.user.id]["permissions"].includes("moderate")){
  userinfo["370562411973050368"]["members"][m.user.id]["permissions"].push("moderate");
  console.log("Given \"moderate\" to " + m.user.tag);
  }
  if(!userinfo["370562411973050368"]["members"][m.user.id]["level"] != 1){
    userinfo["370562411973050368"]["members"][m.user.id]["level"] = 1;
  }
  saveInfo(userinfo, "./data/userinfo.json");
});
let admins = client.guilds.get("370562411973050368").roles.get("370564582449872896").members.forEach(a => {
  if (!userinfo["370562411973050368"]["members"][a.user.id]["permissions"].includes("administrate")){
    userinfo["370562411973050368"]["members"][a.user.id]["permissions"].push("administrate");
    console.log("Given \"administrate\" to " + a.user.tag);
  }
  if (!userinfo["370562411973050368"]["members"][a.user.id]["permissions"].includes("moderate")){
    userinfo["370562411973050368"]["members"][a.user.id]["permissions"].push("moderate");
    console.log("Given \"moderate\" to " + a.user.tag);
  }
  if (!userinfo["370562411973050368"]["members"][a.user.id]["permissions"].includes("points")){
    userinfo["370562411973050368"]["members"][a.user.id]["permissions"].push("points");
    console.log("Given \"points\" to " + a.user.tag);
  }
  if(!userinfo["370562411973050368"]["members"][m.user.id]["level"] != 3){
    userinfo["370562411973050368"]["members"][m.user.id]["level"] = 3;
  }
  saveInfo(userinfo, "./data/userinfo.json");
});
let devs = client.guilds.get("370562411973050368").roles.get("515356277203927041").members.forEach(d => {
  if (userinfo["370562411973050368"]["members"][d.user.id]["permissions"].includes("administrate")){
    userinfo["370562411973050368"]["members"][d.user.id]["permissions"].push("administrate");
    console.log("Given \"administrate\" to " + d.user.tag);
  }
  if(!userinfo["370562411973050368"]["members"][m.user.id]["level"] != 4){
    userinfo["370562411973050368"]["members"][m.user.id]["level"] = 4;
  }
  saveInfo(userinfo, "./data/userinfo.json");
});

  }
}

function saveInfo(info, path) {
  fs.writeFile(path, JSON.stringify(info, null, " "), function (error) {
    if (error) {
     console.log(error);
    }
  });
};
