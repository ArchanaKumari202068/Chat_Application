const express =require('express') //function
const { connected } = require('process')
const app = express()

const http =require('http').createServer(app)





const PORT = process.env.PORT || 8080

http.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) => {
    // res.send('Hello World')
    res.sendFile(__dirname + '/index.html')

})


//SOcket

const io = require('socket.io')(http)

io.on('connection',(socket) => {
    console.log('connected...')
    socket.on('message',(msg) => {
        // console.log(msg)
        socket.broadcast.emit('message',msg)
    })
})