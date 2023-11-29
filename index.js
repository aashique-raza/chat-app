import express from 'express'
import http from 'http';
import { Server } from 'socket.io';


const app=express()
const server = http.createServer(app);
const io = new Server(server);
const PORT=process.env.PORT||5000


app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index')
})

let user;

io.on('connection', (socket) => {
    
    console.log(`user connected`);
    
    socket.on('msg',(data)=>{
        console.log(data)
        socket.broadcast.emit('send-message',data)
    })

    
  
    // Event handler for 'disconnect' event
    socket.on('disconnect', () => {
        
        console.log(`user disconnected`);
      
      });
  });



server.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})