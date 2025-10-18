import perguntas from '../../../shared/perguntas.json';

export default function handler(req, res) {
  const { tema } = req.query;
  
  if (!perguntas[tema]) {
    return res.status(404).json({ error: 'Tema não encontrado' });
  }
  
  const pergunta = perguntas[tema][Math.floor(Math.random() * perguntas[tema].length)];
  res.status(200).json(pergunta);
}

