# 🚀 GUIA SUPER SIMPLES - COMO PUBLICAR SEU SITE NO GITHUB

## ⚠️ IMPORTANTE: Leia Tudo Antes de Começar!

Você precisa ter o **Git** instalado no seu computador. Se não tiver, baixe aqui:
- **Windows:** https://git-scm.com/download/win
- **Mac:** https://git-scm.com/download/mac

---

## 📋 PASSO 1: Criar Conta no GitHub (Se Não Tiver)

1. Acesse: https://github.com/signup
2. Preencha seus dados
3. Confirme seu email
4. Pronto! Conta criada ✅

---

## 📋 PASSO 2: Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Preencha assim:
   - **Repository name:** `GEHTECH27`
   - **Description:** `Site GEH TECH 27 - Cursos e Produtos Digitais`
   - **Public** ✅ (marque esta opção)
   - **Add a README:** ✅ (marque esta opção)
3. Clique no botão verde **"Create repository"**

---

## 📋 PASSO 3: Abrir o Terminal na Pasta do Projeto

### No Windows:
1. Abra a pasta do seu projeto
2. Clique na **barra de endereço** (onde mostra o caminho da pasta)
3. Digite `cmd` e aperte **Enter**

### No Mac:
1. Abra o Terminal
2. Digite `cd ` (com um espaço depois do cd)
3. Arraste a pasta do projeto para o Terminal
4. Aperte **Enter**

---

## 📋 PASSO 4: Executar os Comandos (COPIE UM POR UM)

⚠️ **IMPORTANTE:** Copie e cole cada comando no terminal, um de cada vez, e aperte Enter. Espere terminar antes de copiar o próximo.

### Comando 1:
```bash
git init
```
↑ Copie, cole no terminal e aperte Enter. Espere terminar.

### Comando 2:
```bash
git add .
```
↑ Copie, cole no terminal e aperte Enter. Espere terminar.

### Comando 3:
```bash
git commit -m "🚀 GEH TECH 27 - Site completo"
```
↑ Copie, cole no terminal e aperte Enter. Espere terminar.

### Comando 4:
```bash
git remote add origin https://github.com/geconias7/GEHTECH27.git
```
↑ Copie, cole no terminal e aperte Enter. Espere terminar.

### Comando 5:
```bash
git branch -M main
```
↑ Copie, cole no terminal e aperte Enter. Espere terminar.

### Comando 6 (ÚLTIMO):
```bash
git push -u origin main
```
↑ Copie, cole no terminal e aperte Enter.

---

## 📋 PASSO 5: Login no GitHub (Quando Pedir)

Quando você executar o último comando, vai aparecer uma janela:

1. **"Sign in to GitHub"** → Clique em **"Sign in with browser"**
2. Vai abrir o navegador → **Faça login no GitHub**
3. Vai aparecer um código → **Copie o código**
4. Volte para o terminal → **Cole o código** e aperte Enter
5. Clique em **"Sign in"** na janela que apareceu
6. Pronto! ✅

---

## 📋 PASSO 6: Ativar o GitHub Pages

1. Acesse: https://github.com/geconias7/GEHTECH27
2. Clique em **"Settings"** (ícone de engrenagem ⚙️)
3. No menu da esquerda, clique em **"Pages"**
4. Em **"Build and deployment"**:
   - **Source:** Selecione **"GitHub Actions"**
5. Pronto! O site vai ser publicado automaticamente ✅

---

## 📋 PASSO 7: Esperar o Site Publicar

1. Volte para a página principal do repositório
2. Clique em **"Actions"** (no menu superior)
3. Você vai ver um workflow rodando
4. Espere terminar (2-3 minutos)
5. Quando aparecer ✅ verde, o site está no ar!

---

## 🎉 SEU SITE ESTÁ NO AR!

Acesse: **https://geconias7.github.io/GEHTECH27/**

---

## 🔄 COMO ATUALIZAR O SITE NO FUTURO

Quando você fizer mudanças no código:

```bash
git add .
git commit -m "Atualização do site"
git push
```

Pronto! O site atualiza automaticamente! 🚀

---

## ❌ PROBLEMAS COMUNS

### "git: command not found"
→ Você precisa instalar o Git: https://git-scm.com/downloads

### "Permission denied"
→ Você precisa fazer login no GitHub (Passo 5)

### "Repository not found"
→ Verifique se o nome do repositório está correto: `GEHTECH27`

### Site em branco após publicar
→ Aguarde 2-3 minutos e atualize a página (Ctrl+F5)

---

## 📞 PRECISA DE AJUDA?

Se tiver algum problema, me avise que eu te ajudo!

---

**Feito com 💜 por GEH TECH 27**
