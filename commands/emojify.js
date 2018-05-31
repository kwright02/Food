const Discord = require("discord.js");

const mapping = {
  ' ': '   ',
  '0': ':zero:',
  '1': ':one:',
  '2': ':two:',
  '3': ':three:',
  '4': ':four:',
  '5': ':five:',
  '6': ':six:',
  '7': ':seven:',
  '8': ':eight:',
  '9': ':nine:',
  '!': ':grey_exclamation:',
  '?': ':grey_question:',
  '#': ':hash:',
  '*': ':asterisk:'
};

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});

module.exports = {
    run: async (client, msg, args) => {
  if (args.length < 1) return msg.channel.send('Please provide some text to emojify.');
  if (args.length > 10) return msg.channel.send('You can only emojify 10 characters of text.');
  msg.channel.createWebhook(msg.author.username, msg.author.avatarURL)
        .then(wh => {
        wh.send(
        args.join(' ')
       .split('')
       .map(c => mapping[c] || c)
       .join('')
        );
       wh.delete();
      })
    },
    meta: {
        name: 'emojify',
        ownerOnly: false,
        description: 'Turn your message into emotes',
        usage: ''
    }
}
