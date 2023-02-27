const express=require("express")//creating a express server
const { Socket } = require("socket.io")
const app=express()//assigning to app variable
const server=require("http").Server(app)//creates a server
const io=require("socket.io")(server)//socket.io will know where the server was working and how to interact with that
const {v4:uuidV4}=require('uuid')//here we are taking a function called v4 and we named it as uuidV4



app.set('view engine','ejs')
app.use(express.static('public'))//all js and css will in this folder

app.get('/',(req,res)=>{
    res.redirect(`/${uuidV4()}`)//by calling the uuidV4 function, we get the random room id's


})
app.get('/:room',(req,res)=>{
    res.render('room',{roomId:req.params.room})
})
io.on('connection',socket=>{
    //this is the socket that the user is connected to
    //we are writing eventlisteners
    socket.on('join-room',(roomId,userId)=>{
socket.join(roomId)
socket.broadcast.to(roomId).emit('user-connected',userId) 
socket.on('disconnect',()=>{
    socket.broadcast.to(roomId).emit('user-disconnected',userId)
} )  })

})//runs anytime someone connects to the webpage
server.listen(3000)//start server in port 3000


