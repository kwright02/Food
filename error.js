module.exports = {
    run: async (client, error, action, info) => {
       console.log(`\n\n\n<-> ERROR REPORT <->\n\n\nAction: ${action}\nInfo:\n${info}\nError: ${error.substring(0, 1024)}\n<-> EXTRA INFORMATION <->\n`);
  }
}