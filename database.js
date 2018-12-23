const mysql = require("mysql");

module.exports = {
  updateMemberOptions: async (client, member, options, connection) => {
    connection.query("UPDATE members SET options='" + JSON.stringify(options) + "' WHERE memberid='" + member.id +"';", function(error, result){
      if(error){
        throw error;
      } else {
        console.log('\n[Database Utils -> Log] Updated options for user ' + member.user.username + '!');
      }
    });
  },
  getMemberOptions: async (client, member, connection) => {
    connection.query("SELECT options FROM members WHERE memberid='" + member.id +"';", function(error, result){
      if(error){
        throw error;
      } else {
        console.log('\n[Database Utils -> Log] Got options for user ' + member.user.username + '!');
        return JSON.parse(result[0]["options"]);
      }
    });
  },
  addMember: async (client, member, connection) => {
    connection.query("INSERT INTO `members` (`id`,`memberid`,`punishments`,`options`,`permission`) VALUES (0,\'" + member.id +"\',\'{}\',\'{\"muted\":false,\"developer\":false,\"points\":0,\"xp\":0,\"level\":0,\"daily\":0}\',0);", async function(error, result){
      if(error) {
        console.error(error.message);
        return false;
      }
      console.log("[Database Utils -> Members]" + member.user.username + " was created");
      return true;
    });
  },
  getMemberPermission: async (client, member, connection) => {
    connection.query("SELECT permission FROM members WHERE memberid='" + member.id +"';", function(error, result){
      if(error){
        throw error;
      } else {
        console.log('\n[Database Utils -> Log] Got permission for user ' + member.user.username + '!');
        return JSON.parse(result[0]["permission"]);
      }
    });
  }

}
