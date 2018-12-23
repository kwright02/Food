module.exports = {
    run: async (client, msg, connection, args) => {
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
