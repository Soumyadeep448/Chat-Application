const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")

const append =(message,position)=>{
    console.log('Appedning');
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
};

const name2=prompt("Enter your name to Join");
socket.emit('new-user-joined', name2); //new-user-joined event from index.js.

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');
})