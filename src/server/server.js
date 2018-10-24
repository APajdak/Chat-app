const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const hbs = require('hbs');

const viewPath = path.join(__dirname, '/../views')
const publicPath = path.join(__dirname, '/../public')
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

hbs.registerPartials(viewPath + '/partials');
app.set('views', viewPath);
app.set('view engine', hbs);

app.use(express.static(publicPath));

app.get('/', ( req, res )=>{
    let randomCode = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

    res.render('index.hbs', {
        code: randomCode,
        title: 'Advanced Chat',
        loadAjax: true,
    });
});


app.get('/createInv', ( req, res )=>{
    
    let link = 'hyhy'

    res.send({
        hash: link
    })
})


server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
  })