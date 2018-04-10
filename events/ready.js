module.exports = {
    run: async (client) => {
        console.log(`Ready!`);
        client.user.setActivity(`${client.config.prefix}help for help`);
  }
}
