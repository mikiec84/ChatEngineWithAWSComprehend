"use strict";

let ChatEngineCore = require('chat-engine');

const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-970b2eef-0e4c-4a01-8c0e-5f0b05dc7591',
    subscribeKey: 'sub-c-58802186-79c6-11e8-a43f-d6f8762e29f7'
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
