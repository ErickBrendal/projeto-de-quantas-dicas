# 🚀 Guia de Deployment - De Quantas Dicas Você Precisa

## Visão Geral

Este guia mostra como fazer deploy do projeto em produção usando:
- **Frontend**: Vercel (Next.js)
- **Backend**: Railway ou Render (Node.js)
- **Banco de Dados**: Supabase (PostgreSQL)

---

## 📋 Pré-requisitos

1. Conta no [GitHub](https://github.com)
2. Conta no [Vercel](https://vercel.com)
3. Conta no [Supabase](https://supabase.com)
4. Conta no [Railway](https://railway.app) ou [Render](https://render.com)

---

## 🔧 Passo 1: Configurar Supabase

### 1.1 Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha os dados:
   - **Project name**: `de-quantas-dicas`
   - **Database password**: Guarde com segurança
   - **Region**: Escolha a mais próxima
4. Clique em "Create new project"

### 1.2 Obter Credenciais

1. Vá para **Settings** → **API**
2. Copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_KEY` (backend)

### 1.3 Criar Tabelas

No Supabase SQL Editor, execute:

```sql
-- Tabela de usuários
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255),
  nome VARCHAR(255),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de salas
CREATE TABLE salas (
  id VARCHAR(255) PRIMARY KEY,
  nome VARCHAR(255),
  tema VARCHAR(255),
  modo VARCHAR(255),
  criador_id UUID REFERENCES users(id),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de rankings
CREATE TABLE rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES users(id),
  pontos INTEGER DEFAULT 0,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de respostas
CREATE TABLE respostas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES users(id),
  sala_id VARCHAR(255) REFERENCES salas(id),
  resposta VARCHAR(255),
  dicas_usadas INTEGER,
  acertou BOOLEAN,
  pontos_ganhos INTEGER,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🌐 Passo 2: Deploy Frontend no Vercel

### 2.1 Conectar Repositório

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione "Import Git Repository"
4. Procure por `projeto-de-quantas-dicas`
5. Clique em "Import"

### 2.2 Configurar Variáveis de Ambiente

1. Na página do projeto, vá para **Settings** → **Environment Variables**
2. Adicione as variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
NEXT_PUBLIC_BACKEND_URL=https://seu-backend.railway.app
```

### 2.3 Configurar Build Settings

1. **Framework Preset**: Next.js
2. **Build Command**: `cd frontend && npm install && npm run build`
3. **Output Directory**: `frontend/.next`
4. **Install Command**: `cd frontend && npm install`

### 2.4 Deploy

1. Clique em "Deploy"
2. Aguarde a compilação
3. Seu site estará em: `https://seu-projeto.vercel.app`

---

## ⚙️ Passo 3: Deploy Backend no Railway

### 3.1 Conectar Repositório

1. Acesse [railway.app](https://railway.app)
2. Clique em "New Project"
3. Selecione "Deploy from GitHub repo"
4. Autorize o Railway no GitHub
5. Selecione `projeto-de-quantas-dicas`

### 3.2 Configurar Variáveis de Ambiente

1. Na página do projeto, vá para **Variables**
2. Adicione:

```
PORT=3001
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-service-role
JWT_SECRET=gere-uma-chave-secreta-aleatoria
NODE_ENV=production
FRONTEND_URL=https://seu-projeto.vercel.app
```

### 3.3 Configurar Build

1. **Root Directory**: `backend`
2. **Start Command**: `node server.js`
3. **Install Command**: `npm install`

### 3.4 Deploy

1. Clique em "Deploy"
2. Aguarde a compilação
3. Seu backend estará em: `https://seu-backend.railway.app`

---

## 🔄 Passo 4: Atualizar URLs

Após fazer deploy, atualize as variáveis de ambiente:

### Frontend (Vercel)

```
NEXT_PUBLIC_BACKEND_URL=https://seu-backend.railway.app
```

### Backend (Railway)

```
FRONTEND_URL=https://seu-projeto.vercel.app
```

---

## 🧪 Testar Deploy

### Teste Frontend

1. Acesse `https://seu-projeto.vercel.app`
2. Verifique se a página carrega
3. Teste o login e navegação

### Teste Backend

```bash
curl https://seu-backend.railway.app/health
# Deve retornar: {"status":"OK","timestamp":"..."}
```

### Teste Integração

1. Abra o DevTools (F12)
2. Vá para **Console**
3. Verifique se há erros de conexão
4. Teste criar uma sala

---

## 🔐 Segurança

### Checklist de Segurança

- [ ] Variáveis de ambiente não estão commitadas
- [ ] `.env` está no `.gitignore`
- [ ] JWT_SECRET é uma string aleatória forte
- [ ] CORS está configurado corretamente
- [ ] Supabase RLS (Row Level Security) está ativado
- [ ] Senhas do banco não são expostas

### Ativar RLS no Supabase

1. Vá para **Authentication** → **Policies**
2. Clique em "Enable RLS" para cada tabela
3. Configure políticas de acesso

---

## 📊 Monitoramento

### Vercel Analytics

1. Vá para **Analytics** no dashboard do Vercel
2. Monitore performance e erros

### Railway Logs

1. Vá para **Logs** no Railway
2. Verifique erros do backend

### Supabase Logs

1. Vá para **Logs** no Supabase
2. Monitore queries do banco

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"

```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install
```

### Erro: "CORS error"

Verifique `FRONTEND_URL` no backend:

```javascript
// backend/server.js
cors: {
  origin: process.env.FRONTEND_URL,
}
```

### Erro: "Database connection failed"

Verifique credenciais do Supabase:

```bash
curl -X GET \
  -H "apikey: sua-chave-anon" \
  https://seu-projeto.supabase.co/rest/v1/users
```

### Erro: "Build failed"

1. Verifique logs no Vercel/Railway
2. Certifique-se que `package.json` está correto
3. Teste localmente: `npm run build`

---

## 🚀 Próximos Passos

1. **Domínio Personalizado**
   - Vercel: Settings → Domains
   - Railway: Settings → Custom Domain

2. **SSL/TLS**
   - Vercel: Automático
   - Railway: Automático

3. **CI/CD**
   - GitHub Actions para testes automáticos
   - Deploy automático ao fazer push

4. **Backup**
   - Ativar backups automáticos no Supabase
   - Fazer backup regular do código

---

## 📞 Suporte

Dúvidas?
- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Railway](https://docs.railway.app)
- [Documentação Supabase](https://supabase.com/docs)

---

**Versão**: 1.0.0  
**Última atualização**: Outubro 2024

