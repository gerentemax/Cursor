# GerenteMax - Sistema de Login

Um sistema de login moderno e responsivo para a plataforma GerenteMax, desenvolvido com Next.js 14, TypeScript e Tailwind CSS.

## 🚀 Características

- **Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- **Animações Suaves**: Utilizando Framer Motion para transições elegantes
- **Autenticação Robusta**: Integração com API GerenteMax para validação
- **Seleção de Cliente**: Interface para escolha entre múltiplos clientes
- **Validação de Formulários**: Validação em tempo real dos campos
- **Feedback Visual**: Estados de loading e mensagens de erro claras

## 🎨 Design System

### Cores da Empresa
- **Azul Principal**: `#0059A3`
- **Azul Claro**: `#DFEFFF`
- **Cinza Claro**: `#E6ECEF`
- **Cinza**: `#7A8E9F`
- **Branco**: `#FFFFFF`

### Componentes
- Logo animado com ícone personalizado
- Formulário de login com validação
- Cards de seleção de cliente
- Estados de loading e feedback

## 📱 Fluxo de Autenticação

1. **Login Inicial**: Usuário insere email e senha
2. **Verificação de Sistemas**: API retorna clientes disponíveis
3. **Seleção de Cliente**: 
   - Se 1 cliente: Login automático
   - Se múltiplos: Exibe seleção de cards
4. **Autenticação Final**: Login com cliente selecionado
5. **Redirecionamento**: Para página home após sucesso

## 🛠️ Tecnologias

- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização utilitária
- **Framer Motion**: Animações
- **Lucide React**: Ícones SVG

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

## 🔧 Configuração da API

O sistema está configurado para usar a API GerenteMax:

- **Base URL**: `https://gerentemax-dev2.azurewebsites.net`
- **Endpoint Sistema**: `/api/v1/Auth/Sistema`
- **Endpoint Login**: `/api/v1/Auth/Login`

### Credenciais de Teste
- **Email**: `desenvolvimento@gerentemax.com`
- **Senha**: `Gm@x123.`

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── home/           # Página pós-login
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página de login
├── components/
│   ├── ClientSelection.tsx  # Seleção de clientes
│   ├── LoginForm.tsx       # Formulário de login
│   └── Logo.tsx           # Logo da empresa
├── services/
│   └── api.ts             # Serviços de API
└── types/
    └── auth.ts            # Tipos TypeScript
```

## 🎯 Funcionalidades

### Componente de Login
- Validação em tempo real
- Toggle de visibilidade da senha
- Estados de loading
- Tratamento de erros

### Seleção de Clientes
- Cards responsivos
- Informações do cliente
- Indicadores de status
- Animações de hover

### Design Responsivo
- Layout adaptativo
- Mobile-first approach
- Animações otimizadas

## 🔒 Segurança

- Validação client-side
- Comunicação HTTPS
- Tratamento seguro de credenciais
- Feedback de erros sem exposição de dados

## 📈 Performance

- Componentes otimizados
- Lazy loading
- Animações performáticas
- Bundle otimizado

## 🧪 Desenvolvimento

### Scripts Disponíveis
```bash
npm run dev      # Desenvolvimento
npm run build    # Build produção
npm run start    # Executar produção
npm run lint     # Linting
```

### Personalização
- Cores definidas no `tailwind.config.ts`
- Componentes modulares
- Types TypeScript para API
- Configuração centralizada

---

Desenvolvido para GerenteMax - Sistema de Gestão Empresarial