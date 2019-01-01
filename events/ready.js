const config = require("../data/userinfo.json");
const fs = require("fs");
const Enmap = require('enmap');

module.exports = {
  run: async (client, connection) => {
    console.log(`[Log] Logged in as ${client.user.tag}!\nAttempting to reach database....`);
    //Connect to database
    connection.connect(function(err){
      if(err){
        throw err;
        return;
      } else {
        console.log('\n[Log] Database connection. established!');
        return;
      }
    });
    //Make sure memberData exists
    connection.query("CREATE DATABASE IF NOT EXISTS `memberData`;", async function(error, result) {
      if(error) {
        console.error(error.message);
        return false;
      }
      console.log("[Log] Ensured database table was created for server");
      return true;
    });
    //Make sure members exists
    connection.query("CREATE TABLE IF NOT EXISTS \`members\` (\`id\` INT NOT NULL AUTO_INCREMENT,\`memberid\` TEXT(255), \`punishments\` TEXT(1000000000), \`options\` TEXT(10000) NOT NULL, \`permission\` INT(255) NOT NULL, PRIMARY KEY (\`id\`));", async function(error, result){
        if(error) {
          console.error(error.message);
          return false;
        }
        console.log("[Log] Ensured database table \`members\` was created");
        return true;
      });
      //Grab all members for validation
      connection.query("SELECT memberid FROM members;", async function(error, result){
        if(error) {
          console.error(error.message);
          return null;
        }
        var current = JSON.parse(JSON.stringify(result));
        //Loop over each server the bot is in
        client.guilds.forEach(async function(server){
          //Loop over each member in the current server
          server.members.forEach(async function(member){
            var created = false;
            for(var i = 0; i < current.length; i += 1){
                if(current[i]["memberid"] === member.id){
                  console.log("[Member Validation -> " + server.name + " -> Log] Validated user " + member.user.username + "(" + member.id +") in the database");
                  created = true;
                  break;
                }
              }
            if(!created){
              await connection.query("INSERT INTO `members` (`id`,`memberid`,`punishments`,`options`,`permission`) VALUES (0,\'" + member.id +"\',\'{}\',\'{\"muted\":false,\"developer\":false,\"curXp\":0,\"curLvl\":0,\"curPts\":0}\',0);", async function(error, result){
                if(error) {
                  console.error(error.message);
                  return false;
                }
                console.log("[Member Validation -> " + server.name + " -> Member Management -> Log]" + member.user.username + " was created");
                return true;
              });
            }
            return true;
          });
        });
        return true;
      });
      //Make sure punishments exists
      connection.query("CREATE TABLE IF NOT EXISTS \`punishments\` (\`id\` INT NOT NULL AUTO_INCREMENT,\`punishedid\` TEXT(255),\`punisherid\` TEXT(255), \`punishment\` TEXT(1000000000), \`date\` TEXT(1000), PRIMARY KEY (\`id\`));", async function(error, result){
        if(error) {
          console.error(error.message);
          return false;
        }
        console.log("[Log] Ensured database table \`punishments\` was created");
      });
    var currentdate = new Date();
    var guilds = client.guilds.array();
    let logs = client.channels.find(chan => chan.name === "bot_logs");
    let hour = currentdate.getHours() + 3;
    let server = client.guilds.find(guild => guild.name === "United Federations of Food");
    let channel = client.channels.find(chan => chan.name === "roles");
    logs.send(":white_check_mark: Bot Online **("+ currentdate.getDay()+ "/"+ currentdate.getMonth()+ "/"+ currentdate.getFullYear()+ " - "+ hour+ ":"+ currentdate.getMinutes()+ " EST)**");
    channel.bulkDelete(10);
    channel.send(`**React to this message to get the roles**\n
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
  }
}