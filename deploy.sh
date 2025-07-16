#!/bin/bash

echo "🚀 GerenteMax Login - Script de Deploy"
echo "======================================"

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Escolha o método de deploy:${NC}"
echo "1) Vercel (Recomendado)"
echo "2) Netlify" 
echo "3) Build local"
echo "4) Docker"

read -p "Digite sua escolha (1-4): " choice

case $choice in
  1)
    echo -e "${BLUE}🔥 Fazendo deploy no Vercel...${NC}"
    echo "Build do projeto..."
    npm run build
    
    echo "Fazendo deploy..."
    npx vercel --prod
    
    echo -e "${GREEN}✅ Deploy no Vercel concluído!${NC}"
    ;;
    
  2)
    echo -e "${BLUE}🔵 Fazendo deploy no Netlify...${NC}"
    echo "Build do projeto..."
    npm run build
    
    echo "Instalando Netlify CLI..."
    npm install -g netlify-cli
    
    echo "Fazendo deploy..."
    netlify deploy --prod
    
    echo -e "${GREEN}✅ Deploy no Netlify concluído!${NC}"
    ;;
    
  3)
    echo -e "${BLUE}🏗️ Build local...${NC}"
    npm run build
    echo -e "${GREEN}✅ Build concluído! Arquivos em .next/${NC}"
    echo "Para servir localmente: npm start"
    ;;
    
  4)
    echo -e "${BLUE}🐳 Build Docker...${NC}"
    docker build -t gerente-max-login .
    echo -e "${GREEN}✅ Imagem Docker criada!${NC}"
    echo "Para rodar: docker run -p 3000:3000 gerente-max-login"
    ;;
    
  *)
    echo -e "${RED}❌ Opção inválida!${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}🎉 Deploy finalizado!${NC}"
echo "Teste sua aplicação e verifique se tudo está funcionando."