const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const Chat = require('./utils/chat');
const randomHash = require('./utils/randomHash');
const date = require('date-and-time');

let chat = new Chat();

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

app.get('/roomID', (req, res) => {
    res.send(randomHash(15));
})


app.post('/createInv', (req, res) => {
    let token = chat.createToken(req.body.room, req.body.userName, req.body.code);

    res.send({
        user: req.body.userName,
        url: token,
    });
});

let checkHash = (req, res, next) => {
    if (chat.getToken(encodeURIComponent(req.params.hash))) {
        next();
    } else {
        res.redirect(301, '/');
    }
}


app.get('/chat/:hash', checkHash, (req, res) => {
    res.render('chat.hbs', {
        date: date.format(new Date(), 'DD MMMM YYYY'),
        loadSocket: true,
        title: 'Chat-app'
    });
});

io.on('connection', socket =>{
    
});


server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});