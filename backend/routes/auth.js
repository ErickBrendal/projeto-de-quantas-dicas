const express = require('express');
const router = express.Router();

// Login anônimo
router.post('/anonimo', (req, res) => {
  const usuarioId = `user_${Date.now()}`;
  res.json({
    success: true,
    usuarioId,
    mensagem: 'Login anônimo realizado com sucesso',
  });
});

// Login com Google (integrar com Supabase)
router.post('/google', (req, res) => {
  // TODO: Integrar com Supabase OAuth
  res.json({
    success: true,
    mensagem: 'Login com Google realizado com sucesso',
  });
});

// Logout
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    mensagem: 'Logout realizado com sucesso',
  });
});

module.exports = router;

