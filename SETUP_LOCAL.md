# 🖥️ Setup Local: Rodar Projeto na Sua Máquina

## Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn instalado
- Git instalado
- Conta no Supabase (gratuita)

---

## 🚀 Passo 1: Clonar Repositório

```bash
git clone https://github.com/ErickBrendal/projeto-de-quantas-dicas.git
cd projeto-de-quantas-dicas
```

---

## 🔧 Passo 2: Configurar Supabase

### 2.1 Criar Projeto

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha os dados e crie

### 2.2 Copiar Credenciais

1. Vá para **Settings** → **API**
2. Copie:
   - `Project URL`
   - `anon public` key

### 2.3 Criar Arquivo .env

**Frontend** (`frontend/.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

**Backend** (`backend/.env`):
```
PORT=3001
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-service-role
JWT_SECRET=sua-chave-secreta-aleatoria
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## 📦 Passo 3: Instalar Dependências

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd ../backend
npm install
```

---

## ▶️ Passo 4: Rodar Projeto

### Terminal 1: Backend

```bash
cd backend
npm run dev
# Ou: node server.js
```

Deve mostrar:
```
🚀 Servidor rodando na porta 3001
```

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

Deve mostrar:
```
ready - started server on 0.0.0.0:3000
```

---

## 🌐 Acessar Projeto

Abra no navegador:
```
http://localhost:3000
```

---

## 🧪 Testar Funcionalidades

1. **Menu Inicial**: Deve aparecer com botões de login
2. **Login Anônimo**: Clique em "Jogar Anonimamente"
3. **Seleção de Tema**: Escolha um tema e modo
4. **Jogo**: Veja as dicas e adivinhe
5. **Ranking**: Veja o ranking global

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"

```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install
```

### Erro: "Port 3000/3001 already in use"

```bash
# Mude a porta no .env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3002
PORT=3002
```

### Erro: "CORS error"

Verifique se `FRONTEND_URL` no backend está correto:
```
FRONTEND_URL=http://localhost:3000
```

### Erro: "Supabase connection failed"

1. Verifique `NEXT_PUBLIC_SUPABASE_URL`
2. Verifique `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Teste a conexão no Supabase Dashboard

---

## 📝 Estrutura de Pastas

```
projeto-de-quantas-dicas/
├── frontend/          # Next.js + React
│   ├── pages/        # Páginas do jogo
│   ├── components/   # Componentes React
│   ├── styles/       # CSS global
│   └── public/       # Assets estáticos
├── backend/          # Node.js + Express
│   ├── routes/       # Rotas da API
│   └── server.js     # Servidor principal
└── shared/           # Dados compartilhados
    └── perguntas.json
```

---

## 🚀 Deploy

Quando estiver pronto para fazer deploy:

1. **Frontend**: [QUICK_START_VERCEL.md](./QUICK_START_VERCEL.md)
2. **Backend**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

**Versão**: 1.0.0  
**Tempo estimado**: 10 minutos

