// Import the discord.js module
const Discord = require('discord.js');

require('dotenv').config()

// Create an instance of a Discord client
const client = new Discord.Client();

let hof_channel;

client.on('ready', () => {
    console.log('I am ready!');
    hof_channel = client.channels.cache.get('799957406058151986');


    deleteMessages();
});

client.on('message', message => {
    if(message.channel === hof_channel){
        if(message.content.startsWith('@')){

        }
    }
});

function deleteMessages(){
    hof_channel.messages.fetch()
        .then(messages => {
            const my_msg = messages.filter(m => m.author.id === '799954457549996074');
            hof_channel.bulkDelete(my_msg);
        })
        .catch(console.error);
}

function countMedals(){
    let users = {};
    let messages = hof_channel.messages.fetch();
    messages.forEach(msg => {
        let usr = msg.mentions.users[0];
        users[usr] = users[usr] === 'undefined' ? 0 : users[usr]++;
    });

    return users;
}

function createMessage(users){
    var sortable = [];
    users.forEach(usr =>{
        sortable.push()
    });
}




// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.TOKEN);