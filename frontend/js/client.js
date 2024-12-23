const socket=io('http://localhost:8000');
//http://localhost:8000

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")
var audio=new Audio("Resources/pop.mp3")
var c=0;
const headertxt=document.getElementById('headtxt');



const append =(message,position)=>{
    console.log('Appedning');
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')
    {
        audio.play();
    }
    
};

form.addEventListener('submit',(e)=>{
    e.preventDefault(); //Prevents reloading the page.
    const message = messageInput.value;
    append(`You: ${message}`,'right')
    c=c+1;
    if(c>0)
    {
        headertxt.innerText="Welcome "+name2+"!";
    }
    socket.emit('send',message)
    messageInput.value=''; //Empties the form after the message is sent
})



const name2=prompt("Enter your name to Join");
socket.emit('new-user-joined', name2); //new-user-joined event from index.js.




socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');
})

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left');
})

socket.on('left',name=>{
    append(`${name} left the chat`,'left');
})

headertxt.innerText="Welcome "+name2+"! You may start typing..";
