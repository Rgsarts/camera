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
});<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Painel de Monitoramento - Câmera</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; background: #121212; color: #fff; margin-top: 50px; }
        img { max-width: 100%; height: auto; border: 2px solid #444; border-radius: 8px; }
    </style>
</head>
<body>
    <h1>Monitoramento ao Vivo</h1>
    <p>Aguardando transmissão do Realme A3x...</p>
    
    <!-- Elemento onde a imagem da câmera vai aparecer -->
    <img id="cameraStream" alt="Transmitindo..." />

    <!-- Biblioteca do Socket.io -->
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        const imgElement = document.getElementById('cameraStream');

        // Recebe o frame enviado pelo app e mostra na tela
        socket.on('video-frame', (data) => {
            imgElement.src = 'data:image/jpeg;base64,' + data;
        });
    </script>
</body>
</html>