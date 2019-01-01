const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    run: async (client, msg, connection, args) => {
      sendSurvey(client, client.config.surveys.applymod, msg, "Moderator Application");
    },
    meta: {
        name: 'applymod',
        description: 'Apply for moderator rank',
        usage: ''
    }
}

function sendSurvey(client, questSet, msg, survname) {
  try {
    msg.author.send("**Requirements**\n\n- Must be a very active member of UFF.\n- Must have good knowledge of the UFF rules and Discord TOS.\n- Must have a mic.\n\n*Do you meet this requirements?* `Y/N`").catch(e => {
      if(e) {
        return msg.channel.send('Please make your DMs avalible and try again.');
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
            dmchan.send(questSet[0]);
            counter++;
            return;
          } else if(/^n$/.test(collectedMessage.content.toLowerCase())) {
            dmchan.send("You must meet these requirements to apply, sorry.");
            collector.stop();
            return;
          } else {
            dmchan.send("**Requirements**\n\n- Must be a very active member of UFF.\n- 2. Must have good knowledge of the UFF rules and Discord TOS.\n- 3. Must have a mic.\n\n*Do you meet this requirements? `Y/N`*");
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
          dmchan.startTyping();
          dmchan.send("Thank you for applying, the recruitment team will read your application and you\'ll here back soon.");
          dmchan.stopTyping();
          collector.stop();
          var guildChans = msg.guild.channels.array();
          var logs = msg.guild.channels.find(chan => chan.name === "applications");
          const embed = new Discord.RichEmbed()
          .setColor(0x42f471)
          .setAuthor(`Moderator Application | ${msg.author.tag}`, client.user.avatarURL)
          var counter2 = 1;
          for(var targQuest in collection) {
            embed.addField(targQuest, collection[targQuest], false);
            counter2++;
          }
          embed.setFooter("UFF Recriutment")
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
