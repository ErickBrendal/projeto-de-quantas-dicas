const express = require('express');
const router = express.Router();

// Simulação de banco de dados
const salas = [];

// Obter todas as salas
router.get('/', (req, res) => {
  res.json(salas);
});

// Criar sala
router.post('/', (req, res) => {
  const { nome, tema, modo, nomeJogador } = req.body;
  
  if (!nome || !tema || !modo || !nomeJogador) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  const sala = {
    id: `sala_${Date.now()}`,
    nome,
    tema,
    modo,
    jogadores: [{ id: `user_${Date.now()}`, nome: nomeJogador }],
    criador: `user_${Date.now()}`,
    criadoEm: new Date(),
  };

  salas.push(sala);
  res.status(201).json(sala);
});

// Obter sala por ID
router.get('/:id', (req, res) => {
  const sala = salas.find(s => s.id === req.params.id);
  if (!sala) {
    return res.status(404).json({ error: 'Sala não encontrada' });
  }
  res.json(sala);
});

// Atualizar sala
router.put('/:id', (req, res) => {
  const sala = salas.find(s => s.id === req.params.id);
  if (!sala) {
    return res.status(404).json({ error: 'Sala não encontrada' });
  }

  Object.assign(sala, req.body);
  res.json(sala);
});

// Deletar sala
router.delete('/:id', (req, res) => {
  const index = salas.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Sala não encontrada' });
  }

  const sala = salas.splice(index, 1);
  res.json(sala[0]);
});

module.exports = router;

