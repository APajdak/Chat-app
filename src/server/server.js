const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const Room = require('./utils/room');
const randomHash = require('./utils/randomHash');
const date = require('date-and-time');

let chat = new Room();

const viewPath = path.join(__dirname, '/../views')
const publicPath = path.join(__dirname, '/../public')
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

hbs.registerPartials(viewPath + '/partials');
app.set('views', viewPath);
app.set('view engine', hbs);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    let randomCode = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    res.render('index.hbs', {
        code: randomCode,
        title: 'Advanced Chat',
        loadAjax: true,
    });
});
let indexApp = io.of('/index');

indexApp.on('connection', socket=>{
    
    indexApp.to(socket.id).emit('room', randomHash(15));

    socket.on('createInvitation', data=>{
       let token =  chat.createToken(data);
       indexApp.to(socket.id).emit('token', {
           url: token,
           user : data.userName
       });
    })
})


app.get('/chat', (req, res) => {
    res.render('chat.hbs', {
        date: date.format(new Date(), 'DD MMMM YYYY'),
        loadSocket: true,
        title: 'Chat-app'
    });
})

let chatApp = io.of('/chat');

chatApp.on('connection', socket => {
    socket.on('code', data => {
        let token = chat.decodeToken(data.code, socket.handshake.query.token);
        if(token){
            socket.join(token.ID);
        }else{
            console.log("Try again");
        }
    });
    
});


server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});