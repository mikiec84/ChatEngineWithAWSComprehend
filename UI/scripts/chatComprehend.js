// create a new instance of ChatEngine
ChatEngine = ChatEngineCore.create({
    publishKey: 'PASTE YOUR PUBLISH KEY',
    subscribeKey: 'PASTE YOUR SUBSCRIBE KEY'
},{
        debug: true
    });

let colorScale = chroma.scale(['lightgray', 'red']).domain([0,10]);
// create a bucket to store our ChatEngine Chat object
let homeChat;

// create a bucket to store
let me;


// compile handlebars templates and store them for use later
let peopleTemplate = Handlebars.compile($("#person-template").html());
let meTemplate = Handlebars.compile($("#message-template").html());
let userTemplate = Handlebars.compile($("#message-response-template").html());


// use a helper function to generate a new profile
//let newPerson = generatePerson(true);


// this is our main function that starts our chat app
const initChat = () =>
{

  ChatEngine.connect ('Peter', { username: 'peter', full:"Peter Chako" }, 'auth-key');



  ChatEngine.on('$.ready', function(data)
  {
    me = data.me;
    console.log(me);
    homeChat = new ChatEngine.Chat('zika-forum');
    //console.log(homeChat.users);

    // when we recieve messages in this chat, render them
    homeChat.on('message', (message) => {
        renderMessage(message);
    });

   
    homeChat.on('$.online.*', (data) => {
        $('#people-list ul').append(peopleTemplate(data.user));
      });

      // when a user goes offline, remove them from the online list
      homeChat.on('$.offline.*', (data) => {
        $('#people-list ul').find('#' + data.user.uuid).remove();
      });

      // wait for our chat to be connected to the internet
      homeChat.on('$.connected', () => {

          console.log("Chat instance connected")          
          
      });

      // bind our "send" button and return key to send message
      $('#sendMessage').on('submit', sendMessage)

  }); // end on ready

} // end of init function



// send a message to the Chat
const sendMessage = () => {

    // get the message text from the text input
    let message = $('#message-to-send').val().trim();

    // if the message isn't empty
    if (message.length) {

      console.log(message);

        //send chat message to user John
        homeChat.emit('message', {
          
            "comprehend" :{

                    "sender" : "zika-news",
                    "text" : message
                }
            
        });

        console.log('message sent');

        // clear out the text input
        $('#message-to-send').val('');
    }

    // stop form submit from bubbling
    return false;

};



// render messages in the list
const renderMessage = (message, isHistory = false) => {

    // use the generic user template by default
    let template = userTemplate;

    console.log(message.sender.uuid + " said: " + message.data.comprehend.text);

    // if I happened to send the message, use the special template for myself
    if (message.sender.uuid == me.uuid) {
        template = meTemplate;
    }

    var msgtxt = "";

    msgtxt = message.data.comprehend.text;
    
    let el = template({

        messageOutput: msgtxt,
        time: getCurrentTime(),
        user: message.sender.state
    });

    // render the message
    if(isHistory) {
      $('.chat-history ul').prepend(el);
    } else {
      $('.chat-history ul').append(el);
    }

    // scroll to the bottom of the chat
    scrollToBottom();

    //update tags
    if(message.locations){
        updateTags(message.locations);  
    }
    

};


// scroll to the bottom of the window
const scrollToBottom = () => {
    $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
};

// get the current time in a nice format
const getCurrentTime = () => {
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
};

// Update Tags with Heatmap
const updateTags = (locCount) => {

    console.log(locCount);

    for (var loc in locCount) {
        
        var locId = loc.replace(/[ ,]/g,'-');
        
        if($('#'+locId).length == 0){
            $('#tagcont').append('<div id="'+locId + '" class="tags">' + loc + '</div>');
        }                 
        
        $('#'+locId).css("background-color",colorScale(locCount[loc]));
        
    }

}


// boot the app
initChat();

