# De Quantas Dicas Você Precisa? 🎯

Um jogo de adivinhação multiplayer online inspirado no clássico físico! Adivinhe palavras com o menor número de dicas possível e ganhe pontos épicos. Modos individual, dupla ou casal, com salas públicas/privadas, ranking global e sons divertidos.

## 🚀 Como Rodar Localmente

1. **Clone o repo**: `git clone <url-do-repo>`.
2. **Configure env vars**: Copie `frontend/.env.example` para `frontend/.env.local` e `backend/.env.example` para `backend/.env`. Preencha com suas chaves do Supabase.
3. **Instale dependências**:
   - Front-end: `cd frontend && npm install`.
   - Back-end: `cd backend && npm install`.
4. **Rode**:
   - Back-end: `cd backend && node server.js` (porta 3001).
   - Front-end: `cd frontend && npm run dev` (porta 3000).
5. Acesse `http://localhost:3000` e divirta-se!

## 🛠️ Tecnologias
- Front-end: Next.js, React, Tailwind CSS, Socket.io-client.
- Back-end: Node.js, Express, Socket.io, Supabase.
- Multiplayer: Socket.io para salas em tempo real.

## 📜 Como Adicionar Novas Edições
Edite `shared/perguntas.json` ou use o painel admin (futuro). Cada tema precisa de ~100 perguntas com 5 dicas cada.

## 🎉 Deploy
- Front-end: Vercel (conecte o repo).
- Back-end: Heroku ou Railway.
- Banco: Supabase (configure tabelas: users, salas, rankings, perguntas).

Divirta-se e compartilhe seus resultados! 🏆

