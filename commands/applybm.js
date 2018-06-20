const Discord = require("discord.js");
const fs = require("fs");
const userinfo = require("../data/userinfo.json");

module.exports = {
    run: async (client, msg, args) => {
      sendSurvey(client, client.config.surveys.applybm, msg, "Branch Manager Application");
    },
    meta: {
        name: 'ban',
        description: 'Ban a user from the server',
        usage: ''
    }
}

function saveInfo(info, path) {
  fs.writeFile(path, JSON.stringify(info, null, " "), function (error) {
    if (error) {
     console.log(error);
    }
  });
};

function sendSurvey(client, questSet, msg, survname) {
  try {
    msg.author.send("Are you ready to begin? `Y/N`").catch(e => {
      if(e) {
        return msg.channel.send('Oh noes! An error has occurred! We cannot DM you!');
      }
    });
    var answers = [];
    var counter = 0;
    setTimeout(async function() {
      msg.channel.send("Sending you the application now. Please check your DM's.");
      var dmchan = msg.author.dmChannel;
      if (!dmchan) dmchan = msg.author.createDM();
      const collector = new Discord.MessageCollector(dmchan, m => m.author.id === msg.author.id, { maxMatches: 1000000});
      await collector.on('collect', collectedMessage => {
        if(counter === 0) {
          if(/^y$/.test(collectedMessage.content.toLowerCase())) {
            dmchan.send("Beginning survey...");
            dmchan.send(questSet[0]);
            counter++;
            return;
          } else if(/^n$/.test(collectedMessage.content.toLowerCase())) {
            dmchan.send("Ending survey...");
            collector.stop();
            return;
          } else {
            dmchan.send("Are you ready to begin? `Y/N`");
            return;
          }
        }
        if (counter === Object.keys(questSet).length) {
          console.log("TTTTest: " + questSet[counter] + ": " + collectedMessage.content);
          answers[counter - 1] = collectedMessage.content;
          var collection = new Map();
          for(var i = 0; i < Object.keys(questSet).length; i++) {
            collection[questSet[i]] = answers[i];
            console.log("Test: " + collection[questSet[i]]);
          }
          console.log(collection);
          userinfo[msg.guild.id]["members"][msg.author.id]["applications"][userinfo[msg.guild.id]["members"][msg.author.id]["applications"].length] = { "application":"Branch Manager", "answers":collection };
          saveInfo(userinfo, "./data/userinfo.json");
          dmchan.startTyping();
          dmchan.send("Survey over...");
          dmchan.stopTyping();
          collector.stop();
          var guildChans = msg.guild.channels.array();
          var logs = msg.guild.channels.find("name", "mod_logs");
          const embed = new Discord.RichEmbed()
          .setColor(0x42f471)
          .setAuthor(`Survey Completion | ${msg.author.tag}`, client.user.avatarURL)
          .addField("Survey", `survname`, false);
          var counter2 = 1;
          for(var targQuest in collection) {
            embed.addField("Question #" + counter2, targQuest + ":\n" + collection[targQuest], false);
            counter2++;
          }
          embed.setFooter("Questo Surveys")
          .setTimestamp();
          logs.send({ embed });
        } else {
          console.log(questSet[counter - 1] + ": " + collectedMessage.content);
          answers[counter - 1] = collectedMessage.content;
          dmchan.startTyping();
          dmchan.send(questSet[counter]);
          dmchan.stopTyping();
          counter++;
        }
        return;
      });
    }, 1000);
  } catch(error) {
    console.log(error);
  }
}
