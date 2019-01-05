module.exports = {
    run: async (client, msg, connection, args) => {
      let bc = client.channels.get("399916099325657088");
      if (msg.channel.id !== "399916099325657088") {
       msg.channel.send(`This command can only be used in ${bc}.`)
       return;
        }
let ques = args[0];
let choices = ["Yes", "No", "It is certain", "Don't count on it", "Outlook good", "Outlook not so good", "Ask agian later"];
let random = choices[Math.floor(Math.random()*choices.length)];
if(!ques) return msg.channel.send("Please ask a yes or no question.")
      msg.channel.send(random)
    },
    meta: {
        name: '8ball',
        description: 'The magic 8ball',
        usage: ''
    }
}
