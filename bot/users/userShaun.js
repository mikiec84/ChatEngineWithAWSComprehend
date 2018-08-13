"use strict";

let ChatEngineCore = require('chat-engine');

const ChatEngine = ChatEngineCore.create({
    publishKey: 'PASTE YOUR PUBLISH KEY',
    subscribeKey: 'PASTE YOUR SUBSCRIBE KEY'
});

let homeChat;
const chatRoom = 'zika-forum';

ChatEngine.onAny((a) => {
    console.log(a)
})

ChatEngine.on('$.ready', (data) => {

    let me = data.me;

    homeChat = new ChatEngine.Chat('zika-forum');
   
    homeChat.on('$.connected', () => {

          
          console.log("User " + me.state.full + " has joined the forum")


      });

});

ChatEngine.connect('Shaun', { username: 'shaun', full: "Shaun Bell" }, 'auth-key');
