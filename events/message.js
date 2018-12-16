module.exports = {
    run: async (client, msg) => {
        if (msg.author.bot || !msg.guild) return;
        if (msg.content.startsWith(client.config.prefix)) {
            const args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            try {
                const commandFile = require(`../commands/${command}.js`);
                commandFile.run(client, msg, args);
            } catch (err) {
                if (err.toString().toLowerCase().includes('cannot find module')) return;
                client.error(client, err.stack, `(Message Handler) Command Run`, `   Command: ${msg.content}\n   User: ${msg.author.tag} (${msg.author.id})`);
            }
        }
    }
}
