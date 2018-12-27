const mysql = require("mysql");

module.exports = {
  updateMemberOptions: async (client, member, options, connection, func) => {
    return new Promise((resolve, reject) => {
      return connection.query("UPDATE members SET options='" + options + "' WHERE memberid='" + member.id +"';", function(error, result){
      if(error){
        console.error(error.message);
        return resolve(null);
      }
      console.log('\n[' + func + ' -> Database Utils -> Log] Updated options for user ' + member.username + '!');
      return resolve(options);
    });
  });
  },
  getMemberOptions: async (client, member, connection, func) => {
    return new Promise((resolve, reject) => {
      return connection.query("SELECT options FROM members WHERE memberid='" + member.id +"';", function(error, result){
        if(error) {
          console.error(error.message);
          return resolve(null);
        }
        console.log('\n[' + func + ' -> Database Utils -> Log] Got options for user ' + member.username + '!');
        return resolve(result[0]["options"]);
      });
    });
  },
  addMember: async (client, member, connection, func) => {
    connection.query("SELECT memberid FROM members;", async function(error, result){
      if(error) {
        console.error(error.message);
        return null;
      }
      var current = JSON.parse(JSON.stringify(result));
    client.guilds.forEach(async function(server){
      //Loop over each member in the current server
        var created = false;
        for(var i = 0; i < current.length; i += 1){
            if(current[i]["memberid"] === member.id){
              console.log("[" + func + " -> Database Utils -> " + server.name + " -> Member Management -> Log] Validated user " + member.user.username + "(" + member.id +") in the database");
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
            console.log("[" + func + " -> Database Utils -> " + server.name + " -> Member Management  -> Log]" + member.user.username + " was created");
            return true;
          });
        }
      return true;
    });
    return true;
  });
  },
  getMemberPermission: async (client, member, connection, func) => {
    return new Promise((resolve, reject) => {
      return connection.query("SELECT permission FROM members WHERE memberid='" + member.id +"';", function(error, result){
        if(error) {
          console.error(error.message);
          return resolve(null);
        }
        console.log('\n[' + func + ' -> Database Utils -> Log] Got permission for user ' + member.username + '!');
        return resolve(result[0]["permission"]);
      });
    });
  },
  getMemberPunishments: async (client, member, connection, func) => {
    return new Promise((resolve, reject) => {
      return connection.query("SELECT punishment FROM punishments WHERE memberid='" + member.id +"';", function(error, result){
      if(error){
        console.error(error.message);
        return resolve(null);
      }
      console.log('\n[' + func + ' -> Database Utils -> Log] Got punishments for user ' + member.username + '!');
      return resolve(result);
    });
  });
  },
  savePunisment: async (client, punishment, punished, punisher, connection, func) => {
      return new Promise((resolve, reject) => {
        return connection.query("INSERT INTO `punishments` (`id`,`punishedid`,`punisherid`,`punishment`,`date`) VALUES (0,\'" + punished + "\',\'" + punisher + "\',\'" + punishment + "\',\'" + new Date() + "\');", function(error, result){
        if(error){
          console.error(error.message);
          return resolve(null);
        }
        console.log('\n[' + func + ' -> Database Utils -> Log] Saved new punishment for user by the id of ' + punished + '!');
        return resolve(result);
      });
    });
  }

}
