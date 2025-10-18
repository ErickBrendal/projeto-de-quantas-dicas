const express = require('express');
const router = express.Router();

// Simulação de perguntas
const perguntas = {
  coisas: [
    { resposta: 'Geladeira', dicas: ['Eletrodoméstico', 'Mantém frio', 'Prateleiras', 'Barulho', 'Abre porta'] },
    { resposta: 'Cama', dicas: ['Móvel', 'Dorme', 'Colchão', 'Lençol', 'Quarto'] },
  ],
  ator_atriz: [
    { resposta: 'Tom Hanks', dicas: ['Ator', 'Americano', 'Forrest Gump', 'Toy Story', 'Oscar'] },
  ],
  serie_filme: [
    { resposta: 'Titanic', dicas: ['Filme', 'Navio', 'Afunda', 'Amor', 'Famoso'] },
  ],
  marvel: [
    { resposta: 'Iron Man', dicas: ['Herói', 'Armadura', 'Dinheiro', 'Inteligente', 'Arco'] },
  ],
  dc: [
    { resposta: 'Batman', dicas: ['Herói', 'Morcego', 'Capa', 'Máscara', 'Dinheiro'] },
  ],
  biblia: [
    { resposta: 'Jesus', dicas: ['Personagem', 'Belém', 'Apóstolos', 'Cruz', 'Ressuscitou'] },
  ],
  pais: [
    { resposta: 'Brasil', dicas: ['País', 'América do Sul', 'Futebol', 'Carnaval', 'Amazônia'] },
  ],
};

// Obter pergunta aleatória
router.get('/pergunta', (req, res) => {
  const { tema } = req.query;

  if (!tema || !perguntas[tema]) {
    return res.status(400).json({ error: 'Tema inválido' });
  }

  const perguntasDoTema = perguntas[tema];
  const pergunta = perguntasDoTema[Math.floor(Math.random() * perguntasDoTema.length)];

  res.json(pergunta);
});

// Verificar resposta
router.post('/verificar', (req, res) => {
  const { resposta, respostaCorreta } = req.body;

  if (!resposta || !respostaCorreta) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  const acertou = resposta.toLowerCase() === respostaCorreta.toLowerCase();

  res.json({
    acertou,
    respostaCorreta,
  });
});

// Salvar pontos
router.post('/salvar-pontos', (req, res) => {
  const { usuarioId, pontos, tema } = req.body;

  if (!usuarioId || pontos === undefined || !tema) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  // TODO: Salvar no Supabase
  res.json({
    success: true,
    mensagem: 'Pontos salvos com sucesso',
  });
});

module.exports = router;

