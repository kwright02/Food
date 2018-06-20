const userinfo = require("../data/userinfo.json");
const fs = require("fs");

module.exports = {
    run: async (client) => {
        console.log(`Ready!`);
        var guilds = client.guilds.array();
        for(var i = 0; i < guilds.length; i++) {
          if(!userinfo.hasOwnProperty(guilds[i].id)) {
            userinfo[guilds[i].id] = { "members": {} };
            console.log("Added guild " + guilds[i].name + " of id " + guilds[i].id + " to userinfo guilds list");
          }
          var members = guilds[i].members.array();
          for(var j = 0; j < members.length; j++) {
            if(!userinfo[guilds[i].id]["members"].hasOwnProperty(members[j].id)) {
              userinfo[guilds[i].id]["members"][members[j].user.id] = { "permissions":[], "applications": {} };
              console.log("Added user " + members[j].user.tag  + " of id " + members[j].id + " to " + guilds[i].name + " userinfo members list");
            }
            if(!userinfo[guilds[i].id]["members"][members[j].user.id].hasOwnProperty("permissions")) {
              userinfo[guilds[i].id]["members"][members[j].user.id]["permissions"] = [];
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
