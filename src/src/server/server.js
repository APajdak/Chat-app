const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const encryptor = require('simple-encryptor')(process.env.MY_SECRET_KEY);
const Rooms = require('./utils/rooms');

let room = new Rooms();

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

app.get('/', ( req, res )=>{
    let randomCode = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

    res.render('index.hbs', {
        code: randomCode,
        title: 'Advanced Chat',
        loadAjax: true,
    });
});


app.post('/createInv', ( req, res )=>{
    room.addRoom()
    console.log(req.body);

    // res.send({
    //     hash: link
    // })
})


server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
  })