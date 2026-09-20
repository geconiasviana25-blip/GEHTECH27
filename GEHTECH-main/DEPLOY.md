# 🚀 Instruções para Publicar no GitHub

## Passo 1: Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome do repositório: `GEHTECH27`
3. Marque como **Público**
4. Clique em **Create repository**

## Passo 2: Enviar Código para o GitHub

Abra o terminal na pasta do projeto e execute:

```bash
# Inicializar git (se ainda não fez)
git init

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "Initial commit - GEH TECH 27"

# Adicionar repositório remoto
git remote add origin https://github.com/geconias7/GEHTECH27.git

# Renomear branch para main
git branch -M main

# Enviar para o GitHub
git push -u origin main
```

## Passo 3: Ativar GitHub Pages (Site Online)

1. Vá para o repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione:
   - Branch: `main` (ou `gh-pages`)
   - Pasta: `/ (root)` ou `/docs`
5. Clique em **Save**
6. Aguarde 1-2 minutos
7. Seu site estará em: `https://geconias7.github.io/GEHTECH27/`

## Passo 4: Atualizar Site no Futuro

Quando fizer mudanças no código:

```bash
# Adicionar mudanças
git add .

# Commit com mensagem
git commit -m "Descrição das mudanças"

# Enviar para o GitHub
git push
```

---

## 🎯 Resumo Rápido

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/geconias7/GEHTECH27.git
git branch -M main
git push -u origin main
```

Depois ative o GitHub Pages nas configurações do repositório!

---

## 📱 Links Úteis

- **GitHub:** https://github.com/geconias7/GEHTECH27
- **Site:** https://geconias7.github.io/GEHTECH27/
- **Facebook:** https://www.facebook.com/Gehtech27/
- **Instagram:** https://www.instagram.com/geconiasviana
