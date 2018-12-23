module.exports = {
    run: async (client, msg, connection, args) => {
let choices = ["Heads", "Tails"];
let random = choices[Math.floor(Math.random()*choices.length)];
      msg.channel.send(random)
    },
    meta: {
        name: 'coinflip',
        description: 'Flip a coin',
        usage: ''
    }
}
