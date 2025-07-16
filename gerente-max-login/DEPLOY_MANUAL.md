# 🚀 Deploy Manual - GerenteMax Login

## ✅ **MÉTODO MAIS FÁCIL: Vercel via Browser**

### Passo 1: Preparar o Projeto
Certifique-se que o build está funcionando:
```bash
npm run build
```
✅ **Status**: Build OK - Projeto pronto!

### Passo 2: Subir para GitHub (Opcional mas recomendado)

#### 2.1 Inicializar Git:
```bash
cd gerente-max-login
git init
git add .
git commit -m "Initial commit - GerenteMax Login System"
```

#### 2.2 Criar repositório no GitHub:
1. Acesse: https://github.com/new
2. Nome: `gerente-max-login`
3. Clique "Create repository"

#### 2.3 Conectar e enviar:
```bash
git remote add origin https://github.com/SEU_USERNAME/gerente-max-login.git
git branch -M main
git push -u origin main
```

### Passo 3: Deploy no Vercel

#### Opção A: Via GitHub (Recomendado)
1. **Acesse**: https://vercel.com
2. **Login/Signup** com GitHub
3. **Clique**: "New Project"
4. **Import**: Seu repositório `gerente-max-login`
5. **Configure**:
   - Framework Preset: `Next.js`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. **Deploy**: Clique "Deploy"

#### Opção B: Via Upload Direto
1. **Acesse**: https://vercel.com
2. **Login/Signup**
3. **Arraste**: a pasta `gerente-max-login` inteira
4. **Deploy**: Automático

---

## 🔵 **ALTERNATIVA: Netlify**

### Via Drag & Drop:
1. **Build local**:
   ```bash
   npm run build
   ```

2. **Acesse**: https://netlify.com
3. **Login/Signup**
4. **Arraste**: a pasta `.next` para o Netlify

### Via GitHub:
1. **Conecte** seu repo no Netlify
2. **Configure**:
   - Build command: `npm run build`
   - Publish directory: `.next`

---

## 🐳 **ALTERNATIVA: Deploy via Docker**

### 1. Criar Dockerfile:
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

### 2. Build e Deploy:
```bash
# Build
docker build -t gerente-max-login .

# Test local
docker run -p 3000:3000 gerente-max-login

# Deploy para qualquer cloud
```

---

## 📋 **ARQUIVOS JÁ CONFIGURADOS**

✅ **next.config.ts** - Configurado
✅ **tailwind.config.ts** - Cores da empresa
✅ **package.json** - Scripts de deploy
✅ **vercel.json** - Configuração Vercel
✅ **tsconfig.json** - TypeScript OK
✅ **Build** - Testado e funcionando

---

## 🎯 **URLS ESPERADAS**

Após deploy, você terá URLs como:
- **Vercel**: `https://gerente-max-login-[hash].vercel.app`
- **Netlify**: `https://gerente-max-login-[hash].netlify.app`
- **Custom**: Configurar domínio próprio

---

## 🧪 **TESTAR O DEPLOY**

Após o deploy, teste:

1. **Acesse a URL** fornecida
2. **Teste responsivo** (mobile/desktop)
3. **Teste login**:
   - Email: `desenvolvimento@gerentemax.com`
   - Senha: `Gm@x123.`
4. **Verifique API** - Se houver erro CORS:
   - Configure CORS na API
   - Ou use proxy/rewrite

---

## 🔧 **CONFIGURAÇÕES EXTRAS**

### Environment Variables (se necessário):
```env
NEXT_PUBLIC_API_URL=https://gerentemax-dev2.azurewebsites.net
NODE_ENV=production
```

### Custom Domain:
1. No dashboard da plataforma
2. Settings → Domains
3. Adicionar domínio

---

## 🆘 **PROBLEMAS COMUNS**

### API CORS Error:
- API deve permitir origem do deploy
- Verificar headers CORS
- Usar proxy se necessário

### Build Error:
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Performance:
- Imagens otimizadas ✅
- Bundle otimizado ✅
- Lazy loading ✅

---

## 🎉 **RESULTADO FINAL**

Você terá:
- 🌐 **URL pública** funcionando
- 📱 **Design responsivo**
- ⚡ **Performance otimizada**
- 🔒 **HTTPS automático**
- 🎨 **UI moderna** com cores da empresa
- 🔐 **Login funcional** com API

**Tempo estimado**: 5-10 minutos
**Custo**: Gratuito (tier free)
**Manutenção**: Deploy automático via Git