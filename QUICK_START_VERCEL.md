# ⚡ Quick Start: Deploy no Vercel em 5 Minutos

## 🎯 Objetivo

Fazer deploy do frontend no Vercel com um clique!

---

## 📋 O que você precisa

1. ✅ Conta no [Vercel](https://vercel.com) (gratuita)
2. ✅ Conta no [Supabase](https://supabase.com) (gratuita)
3. ✅ Este repositório GitHub

---

## 🚀 Passo 1: Criar Projeto no Supabase (2 min)

### 1.1 Acesse Supabase

1. Vá para [supabase.com](https://supabase.com)
2. Clique em **"New Project"**
3. Preencha:
   - **Project name**: `de-quantas-dicas`
   - **Database password**: `SenhaForte123!` (guarde!)
   - **Region**: Escolha a mais próxima
4. Clique **"Create new project"** e aguarde

### 1.2 Copie as Credenciais

1. Vá para **Settings** → **API**
2. Copie e guarde:
   - `Project URL` (ex: `https://xxxxx.supabase.co`)
   - `anon public` key (ex: `eyJhbGc...`)

---

## 🌐 Passo 2: Deploy no Vercel (2 min)

### 2.1 Clique no Botão de Deploy

Clique aqui para fazer deploy automático:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ErickBrendal/projeto-de-quantas-dicas&project-name=de-quantas-dicas&repo-name=de-quantas-dicas&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_BACKEND_URL)

### 2.2 Autorizar Vercel

1. Clique em **"Continue with GitHub"**
2. Autorize o Vercel
3. Clique em **"Create"**

### 2.3 Adicionar Variáveis de Ambiente

Na página de configuração, preencha:

```
NEXT_PUBLIC_SUPABASE_URL = https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sua-chave-anon
NEXT_PUBLIC_BACKEND_URL = http://localhost:3001
```

**Nota**: Você pode usar `http://localhost:3001` por enquanto. Depois, quando fizer deploy do backend, atualize.

### 2.4 Clique em "Deploy"

Aguarde 2-3 minutos enquanto o Vercel compila seu projeto.

---

## ✅ Pronto!

Seu site estará em:
```
https://seu-projeto.vercel.app
```

Teste acessando a URL e clicando em "Jogar Anonimamente"!

---

## 🔧 Próximos Passos (Opcional)

### Adicionar Domínio Personalizado

1. Vá para **Settings** → **Domains** no Vercel
2. Adicione seu domínio
3. Configure DNS (instruções no Vercel)

### Deploy do Backend

Quando quiser fazer deploy do backend:

1. Crie conta no [Railway](https://railway.app)
2. Conecte seu repositório GitHub
3. Configure variáveis de ambiente
4. Atualize `NEXT_PUBLIC_BACKEND_URL` no Vercel

---

## 🐛 Problemas?

### "Build failed"

Verifique:
1. Variáveis de ambiente estão preenchidas?
2. Supabase está acessível?
3. Veja logs do Vercel para mais detalhes

### "Blank page"

1. Abra DevTools (F12)
2. Vá para **Console**
3. Procure por erros
4. Verifique se `NEXT_PUBLIC_SUPABASE_URL` está correto

### "Cannot connect to backend"

Por enquanto, isso é normal. O backend está rodando localmente.

Para fazer deploy do backend, siga [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 📚 Documentação Completa

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Guia completo de deployment
- [README.md](./README.md) - Visão geral do projeto

---

**Versão**: 1.0.0  
**Tempo estimado**: 5 minutos  
**Dificuldade**: ⭐ Muito Fácil

