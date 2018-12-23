const mysql = require("mysql");

module.exports = {
  updateMemberOptions: async (client, member, options, connection, func) => {
    connection.query("UPDATE members SET options='" + JSON.stringify(options) + "' WHERE memberid='" + member.id +"';", function(error, result){
      if(error){
        throw error;
      } else {
        console.log('\n[' + func + ' -> Database Utils -> Log] Updated options for user ' + member.user.username + '!');
      }
    });
  },
  getMemberOptions: async (client, member, connection, func) => {
    connection.query("SELECT options FROM members WHERE memberid='" + member.id +"';", function(error, result){
      if(error){
        throw error;
      } else {
        console.log('\n[' + func + ' -> Database Utils -> Log] Got options for user ' + member.user.username + '!');
        return JSON.parse(result[0]["options"]);
      }
    });
  },
  addMember: async (client, member, connection, func) => {
    connection.query("INSERT INTO `members` (`id`,`memberid`,`punishments`,`options`,`permission`) VALUES (0,\'" + member.id +"\',\'{}\',\'{\"muted\":false,\"developer\":false,\"points\":0,\"xp\":0,\"level\":0,\"daily\":0}\',0);", async function(error, result){
      if(error) {
        console.error(error.message);
        return false;
      }
      console.log("[" + func + " -> Database Utils -> Members]" + member.user.username + " was created");
      return true;
    });
  },
  getMemberPermission: async (client, member, connection, func) => {
    connection.query("SELECT permission FROM members WHERE memberid='" + member.id +"';", function(error, result){
      if(error){
        throw error;
      } else {
        console.log('\n[' + func + ' -> Database Utils -> Log] Got permission for user ' + member.user.username + '!');
        return JSON.parse(result[0]["permission"]);
      }
    });
  },
  getMemberPunishments: async (client, member, connection, func) => {
    connection.query("SELECT punishment FROM punishments WHERE punishedid='" + member.id +"';", function(error, result){
      if(error){
        throw error;
      } else {
        console.log('\n[' + func + ' -> Database Utils -> Log] Got punisments for user ' + member.user.username + '!');
        return result;
      }
    });
  },
  savePunisment: async (client, punishment connection, func) => {
    connection.query("INSERT INTO `punisments` (`id`,`punishedid`,`punisherid`,`punishment`) VALUES (0,\'" + punishment.punished.id + "\',\'" + punishment.punisher.id + "\',\'" + JSON.stringify(punishment) + "\',\'" + punishment.date + "\',\'" + punishment.reason + "\',0);", async function(error, result){
      if(error) {
        console.error(error.message);
        return false;
      }
      console.log("[" + func + " -> Database Utils -> Log] New punishment saved: " + JSON.stringify(punishment));
      return true;
    });
  },
  getPunishmentTemplate: async (client, func) => {
    return {"punished":null,"punisher":null,"date": new Date(),"reason":null};
  }

}
