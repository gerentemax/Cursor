# 🔐 Tela de Login Moderna

Uma tela de login responsiva e moderna criada com HTML, CSS e JavaScript puro.

## ✨ Características

### 🎨 Design
- Interface moderna e elegante
- Design totalmente responsivo
- Animações suaves e interativas
- Gradiente de fundo com partículas flutuantes
- Modo escuro/claro suporte
- Ícones Font Awesome

### 🔧 Funcionalidades
- **Validação em tempo real** dos campos de email e senha
- **Mostrar/ocultar senha** com botão toggle
- **Lembrar usuário** com localStorage
- **Notificações toast** para feedback do usuário
- **Loading state** durante o processo de login
- **Credenciais de demonstração** para teste
- **Atalhos de teclado** (Enter para login, Esc para limpar)
- **Login social** (Google/Facebook - interface pronta)

### 🔒 Segurança
- Validação de email com regex
- Validação de senha (mínimo 6 caracteres)
- Sanitização de inputs
- Feedback visual de validação

## 🚀 Como Usar

### 1. Abrir o Arquivo
Simplesmente abra o arquivo `index.html` em qualquer navegador moderno.

### 2. Credenciais de Demonstração
Para testar a funcionalidade de login, use:
- **Email:** `demo@exemplo.com`
- **Senha:** `123456`

### 3. Funcionalidades Disponíveis
- Digite qualquer email válido para ver a validação em tempo real
- Use o botão do olho para mostrar/ocultar a senha
- Marque "Lembrar de mim" para salvar o email no localStorage
- Teste os atalhos de teclado:
  - `Enter`: Submeter formulário
  - `Esc`: Limpar todos os campos

## 📁 Estrutura dos Arquivos

```
📦 projeto-login/
├── 📄 index.html      # Estrutura HTML principal
├── 🎨 styles.css      # Estilos CSS modernos
├── ⚡ script.js       # Funcionalidades JavaScript
└── 📖 README.md       # Este arquivo
```

## 🎯 Funcionalidades Técnicas

### HTML
- Semântica moderna
- Acessibilidade (ARIA labels, foco adequado)
- Meta tags para responsividade
- Font Awesome para ícones

### CSS
- CSS Variables para temas consistentes
- Flexbox para layout responsivo
- Animações CSS suaves
- Media queries para mobile
- Box-shadow e gradientes modernos

### JavaScript
- ES6+ features
- Event listeners modernos
- Async/await para simulação de API
- Local Storage para persistência
- Validação em tempo real
- Manipulação dinâmica do DOM

## 📱 Responsividade

A tela foi projetada para funcionar perfeitamente em:
- 📱 Mobile (320px+)
- 📟 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Desktop Grande (1440px+)

## 🎨 Personalização

### Cores
Você pode facilmente personalizar as cores editando as CSS variables no início do arquivo `styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Cor principal */
    --primary-hover: #5855eb;      /* Cor ao passar o mouse */
    --success-color: #10b981;      /* Cor de sucesso */
    --error-color: #ef4444;        /* Cor de erro */
    /* ... outras cores */
}
```

### Funcionalidades
Para integrar com um backend real, modifique a função de submit no `script.js`:

```javascript
// Substitua esta parte no loginForm.addEventListener('submit', ...)
try {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
        showToast('Login realizado com sucesso!', 'success');
        // Redirecionar ou salvar token
    } else {
        showToast(data.message || 'Erro no login', 'error');
    }
} catch (error) {
    showToast('Erro de conexão', 'error');
}
```

## 🔧 Extensões Possíveis

- **Two-Factor Authentication (2FA)**
- **Recuperação de senha por email**
- **Login com mais redes sociais**
- **Captcha para segurança**
- **Modo escuro toggle**
- **Múltiplos idiomas**
- **Biometria (quando disponível)**

## 📄 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

## 🤝 Contribuições

Sinta-se à vontade para sugerir melhorias ou reportar bugs!

---

**Desenvolvido com ❤️ usando tecnologias web modernas**