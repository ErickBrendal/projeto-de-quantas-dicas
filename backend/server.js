require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/salas', require('./routes/salas'));
app.use('/api/jogo', require('./routes/jogo'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Socket.io - Gerenciamento de salas em tempo real
const salas = new Map();

io.on('connection', (socket) => {
  console.log(`Novo cliente conectado: ${socket.id}`);

  // Criar sala
  socket.on('criar_sala', (data) => {
    const salaId = `sala_${Date.now()}`;
    salas.set(salaId, {
      id: salaId,
      nome: data.nome,
      tema: data.tema,
      modo: data.modo,
      jogadores: [{ id: socket.id, nome: data.nomeJogador }],
      criador: socket.id,
    });
    socket.join(salaId);
    socket.emit('sala_criada', { salaId });
    io.emit('salas_atualizadas', Array.from(salas.values()));
  });

  // Entrar em sala
  socket.on('entrar_sala', (data) => {
    const sala = salas.get(data.salaId);
    if (sala) {
      sala.jogadores.push({ id: socket.id, nome: data.nomeJogador });
      socket.join(data.salaId);
      io.to(data.salaId).emit('jogador_entrou', { nome: data.nomeJogador });
      io.emit('salas_atualizadas', Array.from(salas.values()));
    }
  });

  // Iniciar jogo
  socket.on('iniciar_jogo', (data) => {
    const sala = salas.get(data.salaId);
    if (sala && sala.criador === socket.id) {
      io.to(data.salaId).emit('jogo_iniciado', { tema: sala.tema });
    }
  });

  // Enviar resposta
  socket.on('enviar_resposta', (data) => {
    io.to(data.salaId).emit('resposta_recebida', {
      jogador: data.nomeJogador,
      resposta: data.resposta,
      dicasUsadas: data.dicasUsadas,
    });
  });

  // Desconectar
  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
    
    // Remover jogador das salas
    salas.forEach((sala, salaId) => {
      sala.jogadores = sala.jogadores.filter(j => j.id !== socket.id);
      if (sala.jogadores.length === 0) {
        salas.delete(salaId);
      }
    });
    
    io.emit('salas_atualizadas', Array.from(salas.values()));
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

module.exports = { app, io };

