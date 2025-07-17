// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const rememberCheckbox = document.getElementById('remember');
const loginBtn = loginForm.querySelector('.login-btn');
const btnText = loginBtn.querySelector('.btn-text');
const btnLoader = loginBtn.querySelector('.btn-loader');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Funcionalidade de mostrar/ocultar senha
togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Validação em tempo real
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function updateInputValidation(input, isValid) {
    if (isValid) {
        input.style.borderColor = 'var(--success-color)';
        input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
    } else {
        input.style.borderColor = 'var(--error-color)';
        input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    }
}

// Validação em tempo real dos inputs
emailInput.addEventListener('input', function() {
    const isValid = this.value === '' || validateEmail(this.value);
    if (this.value !== '') {
        updateInputValidation(this, isValid);
    } else {
        this.style.borderColor = 'var(--border-color)';
        this.style.boxShadow = 'none';
    }
});

passwordInput.addEventListener('input', function() {
    const isValid = this.value === '' || validatePassword(this.value);
    if (this.value !== '') {
        updateInputValidation(this, isValid);
    } else {
        this.style.borderColor = 'var(--border-color)';
        this.style.boxShadow = 'none';
    }
});

// Função para mostrar toast
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    
    const icon = toast.querySelector('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Função para simular loading
function setLoading(isLoading) {
    if (isLoading) {
        loginBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
    } else {
        loginBtn.disabled = false;
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
    }
}

// Credenciais de demonstração
const demoCredentials = {
    email: 'demo@exemplo.com',
    password: '123456'
};

// Submissão do formulário
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const remember = rememberCheckbox.checked;
    
    // Validação dos campos
    if (!email || !password) {
        showToast('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showToast('Por favor, insira um email válido.', 'error');
        emailInput.focus();
        return;
    }
    
    if (!validatePassword(password)) {
        showToast('A senha deve ter pelo menos 6 caracteres.', 'error');
        passwordInput.focus();
        return;
    }
    
    // Simulação de loading
    setLoading(true);
    
    try {
        // Simular requisição de API (aguardar 2 segundos)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Verificar credenciais de demonstração
        if (email === demoCredentials.email && password === demoCredentials.password) {
            // Login bem-sucedido
            showToast('Login realizado com sucesso!', 'success');
            
            // Salvar preferência de "lembrar de mim"
            if (remember) {
                localStorage.setItem('rememberUser', 'true');
                localStorage.setItem('userEmail', email);
            } else {
                localStorage.removeItem('rememberUser');
                localStorage.removeItem('userEmail');
            }
            
            // Redirecionar ou fazer algo após login bem-sucedido
            setTimeout(() => {
                showToast('Redirecionando...', 'success');
                // window.location.href = '/dashboard'; // Descomente para redirecionar
            }, 1500);
            
        } else {
            // Credenciais inválidas
            showToast('Email ou senha incorretos.', 'error');
        }
        
    } catch (error) {
        console.error('Erro no login:', error);
        showToast('Erro no servidor. Tente novamente.', 'error');
    } finally {
        setLoading(false);
    }
});

// Funcionalidade dos botões sociais
document.querySelector('.google-btn').addEventListener('click', function() {
    showToast('Login com Google em desenvolvimento.', 'error');
});

document.querySelector('.facebook-btn').addEventListener('click', function() {
    showToast('Login com Facebook em desenvolvimento.', 'error');
});

// Link "Esqueceu a senha?"
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    showToast('Funcionalidade de recuperação em desenvolvimento.', 'error');
});

// Link "Criar conta"
document.querySelector('.signup-link a').addEventListener('click', function(e) {
    e.preventDefault();
    showToast('Página de cadastro em desenvolvimento.', 'error');
});

// Verificar se deve lembrar do usuário
document.addEventListener('DOMContentLoaded', function() {
    const rememberUser = localStorage.getItem('rememberUser');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (rememberUser === 'true' && savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
        updateInputValidation(emailInput, validateEmail(savedEmail));
    }
});

// Animação de entrada suave
window.addEventListener('load', function() {
    const loginCard = document.querySelector('.login-card');
    loginCard.style.opacity = '0';
    loginCard.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        loginCard.style.transition = 'all 0.5s ease-out';
        loginCard.style.opacity = '1';
        loginCard.style.transform = 'translateY(0)';
    }, 100);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter para submeter o formulário
    if (e.key === 'Enter' && (e.target === emailInput || e.target === passwordInput)) {
        e.preventDefault();
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape para limpar campos
    if (e.key === 'Escape') {
        emailInput.value = '';
        passwordInput.value = '';
        emailInput.style.borderColor = 'var(--border-color)';
        emailInput.style.boxShadow = 'none';
        passwordInput.style.borderColor = 'var(--border-color)';
        passwordInput.style.boxShadow = 'none';
        emailInput.focus();
    }
});

// Funcionalidade para mostrar dica de credenciais de demo
function showDemoCredentials() {
    const demoInfo = document.createElement('div');
    demoInfo.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            max-width: 250px;
            font-size: 0.9rem;
        ">
            <strong>Credenciais de Demonstração:</strong><br>
            Email: demo@exemplo.com<br>
            Senha: 123456
            <button onclick="this.parentElement.remove()" style="
                position: absolute;
                top: 5px;
                right: 5px;
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 1.2rem;
            ">×</button>
        </div>
    `;
    
    document.body.appendChild(demoInfo);
    
    // Remover automaticamente após 10 segundos
    setTimeout(() => {
        if (demoInfo.parentElement) {
            demoInfo.remove();
        }
    }, 10000);
}

// Mostrar credenciais de demo após 3 segundos
setTimeout(showDemoCredentials, 3000);

// Adicionar efeito de partículas no background (opcional)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        animation: particle-float 6s linear infinite;
    `;
    
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.animationDelay = Math.random() * 6 + 's';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentElement) {
            particle.remove();
        }
    }, 6000);
}

// Adicionar CSS para animação das partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particle-float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Criar partículas periodicamente
setInterval(createParticle, 2000);