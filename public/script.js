// import { name } from "ejs";

const chatEl=document.querySelector('.chat-box')

let name;

do{
     name=prompt('enter your name')
}while(!name)

// console.log(name)

const formEl=document.querySelector('form')

formEl.addEventListener('submit',(e)=>{
    e.preventDefault()
    let msg=document.getElementById('message-input').value
    console.log(msg)
    const message={
        user:name,
        msg:msg
    }

    sendMessage(message,'outgoing')
    socket.emit('msg',message)
})

let socket = io(); // Default namespace

function sendMessage(data,cl){
    const div = document.createElement("div");
    div.classList.add('message',cl)

    let string=`<h4>${data.user}</h4>
    <p class="text">${data.msg}</p>`;

    div.innerHTML=string

    chatEl.appendChild(div)
    
    let msg=document.getElementById('message-input').value=''
    scrollBottom()

}

// message recive--

socket.on('send-message',(data)=>{
    sendMessage(data,'incoming')
    scrollBottom()
})

function scrollBottom(){
    chatEl.scrollTop=chatEl.scrollHeight
}