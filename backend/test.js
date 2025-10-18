// Script de teste para o backend
const http = require('http');

const testEndpoints = [
  { method: 'GET', path: '/health', description: 'Health check' },
  { method: 'GET', path: '/api/salas', description: 'Obter salas' },
  { method: 'GET', path: '/api/jogo/pergunta?tema=coisas', description: 'Obter pergunta' },
];

console.log('🧪 Iniciando testes do backend...\n');

testEndpoints.forEach((test) => {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: test.path,
    method: test.method,
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`✓ ${test.method} ${test.path}`);
      console.log(`  Descrição: ${test.description}`);
      console.log(`  Status: ${res.statusCode}`);
      console.log(`  Resposta: ${data}\n`);
    });
  });

  req.on('error', (e) => {
    console.error(`✗ ${test.method} ${test.path}`);
    console.error(`  Erro: ${e.message}\n`);
  });

  req.end();
});

console.log('Testes iniciados. Aguarde...');

