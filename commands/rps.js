module.exports = {
    run: async (client, msg, connection, args) => {
      let bc = client.channels.get("399916099325657088");
      if (msg.channel.id !== "399916099325657088") {
       msg.channel.send(`This command can only be used in ${bc}.`)
       return;
        }
let choices = ["Rock", "Paper", "Scissors"];
let random = choices[Math.floor(Math.random()*choices.length)];
      msg.channel.send(random)
    },
    meta: {
        name: 'rps',
        description: 'Rock, paper, or scissors',
        usage: ''
    }
}
