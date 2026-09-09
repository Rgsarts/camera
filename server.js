const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.send('Servidor de Monitoramento Ativo');
});

io.on('connection', (socket) => {
    console.log('Novo dispositivo conectado:', socket.id);

    socket.on('video-stream', (data) => {
        io.emit('video-feed', data);
    });

    socket.on('disconnect', () => {
        console.log('Dispositivo desconectado:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});