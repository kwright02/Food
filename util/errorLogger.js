module.exports = {
    run: async (client, error, action, info) => {
        const channel = client.channels.get(client.config.errLogChannel);
        const m = await channel.send({ embed: {
            title: 'Error',
            description: 'An error has occurred while performing an action.',
            timestamp: new Date(), 
            color: 15745325,
            fields: [
                {
                    name: 'Action',
                    value: action
                },
                {
                    name: 'Extra Information',
                    value: info
                },
                {
                    name: 'Error',
                    value: `\`\`\`js\n${error.substring(0, 1024)}\`\`\``
                }
            ]
        } });
    }
}
