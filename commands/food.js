module.exports = {
    run: async (client, msg, args) => {
  const responses = [
   'Apple', 'Cake', 'Cookie', 'Shrimp', 'Lobster', 'Crab', 'Fish', 'Pop Corn', 'Cheese', 'Orange', 'Lemon', 'Banana', 'Garlic', 'Coconut', 'Avocado', 'Tofu', 'Tomato', 'Onion', 'Lentil', 'Carrot', 'Spinach', 'Cracker', 'Bread', 'Waffle', 'Pancake', 'Eggs', 'Tuna', 'Bacon', 'Lamb', 'Asparagus', 'Almond', 'Eggplant', 'Celary', 'Beans', 'Grapefruit', 'Pomegranate', 'Brussels Sprouts', '**You got the Mythical Food! Message an admin for the Mythical rank!**'] 
   msg.channel.send(`${responses[Math.floor(Math.random() * responses.length)]}`);
},
    meta: {
        name: 'food',
        ownerOnly: false,
        description: 'Random food',
        usage: ''
    }
}