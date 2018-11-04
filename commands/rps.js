module.exports = {
    run: async (client, msg, args) => {
let choices = ["Rock", "Paper", "Scissors"];
let random = choices[Math.floor(Math.random()*choices.length)];
      msg.channel.send(random)
    },
    meta: {
        name: 'coinflip',
        description: 'Flip a coin',
        usage: ''
    }
}
