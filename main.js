// Import the discord.js module
const Discord = require('discord.js');

require('dotenv').config()

// Create an instance of a Discord client
const client = new Discord.Client();

let hof_channel;

client.on('ready', () => {
    console.log('I am ready!');
    hof_channel = client.channels.cache.get('789977985154678785');
    deleteMessages();
    countMedals()
    
});

client.on('message', message => {
    if(message.author == client.user) return;

    if(message.channel === hof_channel){
        deleteMessages();
        countMedals();
    }
});

client.on("messageDelete", (msgDelete)=>{
    if(msgDelete.author == client.user) return;
    if(msgDelete.channel === hof_channel){
        deleteMessages();
        countMedals();
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
    hof_channel.messages.fetch()
    .then(messages =>{
        messages.forEach(msg => {
            if(msg.mentions.users.size > 0){
                let usr = msg.mentions.users.first().username;
                if(users.hasOwnProperty(usr)){
                    users[usr]++;
                } else {
                    users[usr] = 1;
                }
            }
            
        });

        createMessage(users);
    });
    return users;
}

function createMessage(users){
    let orderedUsers = sortObject(users);
    let text = '\n';
    const keys = Object.keys(orderedUsers);
    
    for(i = 0; i < keys.length; i++){
        switch(i){
            case 0:
                text += '\n:first_place:' + keys[i] + ' : ' + orderedUsers[keys[i]] + "\n"; 
                break;
            case 1:
                text += ':second_place:' + keys[i]+ ' : ' + orderedUsers[keys[i]] + "\n"; 
                break;
            case 2:
                text += ':third_place:' + keys[i] + ' : ' + orderedUsers[keys[i]] + "\n"; 
                break;
            default:
                text += ':regional_indicator_l:' + keys[i] + ' : ' + orderedUsers[keys[i]] + "\n"; 
                break;
        }
    }

    hof_channel.send(text);
}

function sortObject(obj){
    const sortable = Object.fromEntries(
        Object.entries(obj).sort(([,a],[,b]) => b-a)
    );

    return sortable;
}


// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.TOKEN);