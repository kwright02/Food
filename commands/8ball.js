module.exports = {
    run: async (client, msg, connection, args) => {
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
