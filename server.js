const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const router = require('./backend/routes');
const cors = require('./backend/config/cors');
/**
 * @author Hector Rodrigues Da Silva
 */

app.use(express.static(path.join(__dirname, 'frontend/public')));
app.use(cors);
app.use(morgan('dev'));

app.use(bodyParser.json({ limit: '500mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }))

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'frontend/public'));

app.use('/', router);

io.on('connection', soket => {
    console.log(`Socked conected ${soket.id}`)
    soket.on('sendMessage', data => {
        console.log(data)
        soket.broadcast.emit('receivedMessage', data);
    });
});

server.listen(7002, () => {
    console.log('Server - Status => OK')
});