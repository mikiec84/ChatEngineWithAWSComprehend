
"use strict";


let ChatEngineCore = require('chat-engine');
let typingIndicator = require('chat-engine-typing-indicator');

const fs = require('fs');
const es = require('event-stream');

const { spawn } = require('child_process');

var lineNr = 0;
let homeChat;


const ChatEngine = ChatEngineCore.create({
    publishKey: 'PASTE YOUR PUBLISH KEY',
    subscribeKey: 'PASTE YOUR SUBSCRIBE KEY'
});

ChatEngine.connect('Moderator', { username: 'zika-news', full: "Zika News", "moderator" : true }, 'auth-key');

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

//Spawn four dummy users randomly to join the chat room
function spawnUsers(){

    var otherChatUsers = ["John", "Shaun", "Ron", "Don"];

    var loginTime = 0;

    for (var i = 0; i < otherChatUsers.length; i++) {
        
        loginTime = loginTime + randomInt(10,20)*1000;
        
        setTimeout(function(data){
            
            console.log("Spawning " + 'users/' + data);

            var chld = spawn('node', ['users/' + data ]);

            chld.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });

            chld.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

        },loginTime,"user"+otherChatUsers[i]+".js")
    }

    
}


ChatEngine.onAny((a) => {
    console.log(a)
})

ChatEngine.on('$.ready', (data) => {

    let me = data.me;

    homeChat = new ChatEngine.Chat('zika-forum');

   
    homeChat.on('$.connected', () => {

          
          homeChat.emit('message',{
        		
          		"comprehend" :{

                    "sender" : "zika-news",
                    "text" :"Welcome to Zika Advisory Forum."

                }
                

		      });

   
      });

});

//Read and publish the Zika news from file
var s = fs.createReadStream('eventJournal.txt')
    .pipe(es.split())
    .pipe(es.mapSync(function(line){

        // pause the readstream
        s.pause();

        lineNr += 1;

        // process line here and call s.resume() when rdy
        // function below was for logging memory usage
        //logMemoryUsage(lineNr);
        setTimeout(function(data){
        	
        	homeChat.emit('message',{
        		
                "comprehend" :{

                    "sender" : "zika-news",
                    "text" : data

                }
          		
		    });

        	s.resume();

        },(randomInt(15,25) * 1000),line)

        // resume the readstream, possibly from a callback
        
    })
    .on('error', function(err){
        console.log('Error while reading file.', err);
    })
    .on('end', function(){
        
        console.log('Read entire file.');
        
        setTimeout(function(data){
            
            homeChat.emit('message',{
            		
                    "comprehend" :{
              		      "sender" : "zika-news",
            		      "text" :" That's it for today, goodbye folks"
                    }
    		});

            homeChat.leave()

        },5000);

        setTimeout(function(data){
            
            homeChat.leave()

        },10000);
    })
);

spawnUsers();


