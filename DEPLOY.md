# 🚀 Guia de Deploy - GerenteMax Login

## 📋 Opções de Publicação

### 🔥 **OPÇÃO 1: Vercel (Recomendado - Mais Fácil)**

#### Método A: Deploy via CLI (No Terminal)
```bash
# 1. Login na Vercel
npx vercel login

# 2. Deploy do projeto
npx vercel

# 3. Deploy para produção
npx vercel --prod
```

#### Método B: Deploy via GitHub + Vercel Dashboard
1. **Push para GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - GerenteMax Login"
   git branch -M main
   git remote add origin https://github.com/SEU_USERNAME/gerente-max-login.git
   git push -u origin main
   ```

2. **Conectar no Vercel:**
   - Acesse: https://vercel.com
   - Faça login/cadastro
   - Clique "Import Project"
   - Conecte seu repositório GitHub
   - Deploy automático!

---

### 🔵 **OPÇÃO 2: Netlify**

#### Via CLI:
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy para produção
netlify deploy --prod
```

#### Via Dashboard:
1. Acesse: https://netlify.com
2. Arraste a pasta `out/` ou conecte GitHub
3. Deploy automático

---

### ☁️ **OPÇÃO 3: AWS Amplify**

```bash
# Instalar AWS Amplify CLI
npm install -g @aws-amplify/cli

# Configurar
amplify configure

# Inicializar
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

---

### 🐳 **OPÇÃO 4: Docker + Qualquer Cloud**

Criou `Dockerfile`:
```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

```bash
# Build da imagem
docker build -t gerente-max-login .

# Run local
docker run -p 3000:3000 gerente-max-login

# Deploy para qualquer cloud (AWS ECS, GCP Cloud Run, etc.)
```

---

## 🎯 **DEPLOY RÁPIDO - PASSO A PASSO**

### ✅ **Método Mais Simples (Vercel)**

1. **Preparar o projeto:**
   ```bash
   npm run build  # ✅ Já fizemos isso
   ```

2. **Deploy em 1 comando:**
   ```bash
   npx vercel --prod
   ```

3. **Seguir instruções:**
   - Set up and deploy? **Y**
   - Which scope? **Selecionar sua conta**
   - Link to existing project? **N**
   - Project name? **gerente-max-login**
   - Directory? **./** (Enter)
   - Override settings? **N**

4. **Pronto!** Você terá uma URL como:
   ```
   https://gerente-max-login-xyz.vercel.app
   ```

---

## 🔧 **Configurações Importantes**

### Environment Variables (Se necessário)
```bash
# No Vercel/Netlify dashboard, adicionar:
NEXT_PUBLIC_API_URL=https://gerentemax-dev2.azurewebsites.net
```

### Custom Domain (Opcional)
1. No dashboard da plataforma
2. Settings → Domains
3. Adicionar seu domínio personalizado

---

## 📱 **Testando o Deploy**

Após o deploy, teste:
- ✅ Página carrega corretamente
- ✅ Design responsivo funciona
- ✅ Login com API funciona
- ✅ Seleção de clientes funciona
- ✅ Redirecionamento funciona

---

## 🆘 **Solução de Problemas**

### Build Errors:
```bash
# Limpar cache
npm run clean
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### API CORS Issues:
- Verificar se a API permite requisições do domínio
- Adicionar headers CORS se necessário

### Performance:
- Usar `next/image` para otimização
- Lazy loading implementado
- Bundle analisado e otimizado

---

## 🏁 **Resultado Final**

Após o deploy você terá:
- 🌐 **URL pública** para acesso
- 📱 **Responsivo** em todos dispositivos
- ⚡ **Performance** otimizada
- 🔒 **HTTPS** automático
- 🔄 **CI/CD** configurado (se via GitHub)

### URLs de Exemplo:
- Vercel: `https://gerente-max-login.vercel.app`
- Netlify: `https://gerente-max-login.netlify.app`
- Custom: `https://login.gerentemax.com`