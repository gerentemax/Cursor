'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import LoginForm from '@/components/LoginForm';
import ClientSelection from '@/components/ClientSelection';
import { apiService } from '@/services/api';
import { Cliente } from '@/types/auth';

type LoginStep = 'login' | 'client-selection';

export default function LoginPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<LoginStep>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [credentials, setCredentials] = useState<{ email: string; senha: string }>({ 
    email: '', 
    senha: '' 
  });

  const handleLogin = async (email: string, senha: string) => {
    setLoading(true);
    setError('');
    setCredentials({ email, senha });

    try {
      // Passo 1: Verificar sistemas disponíveis
      const sistemaResponse = await apiService.getSistemas(email, senha);
      
      if (!sistemaResponse.success || !sistemaResponse.data?.clientes) {
        throw new Error(sistemaResponse.message || 'Erro ao buscar sistemas disponíveis');
      }

      const clientesDisponiveis = sistemaResponse.data.clientes;

      if (clientesDisponiveis.length === 0) {
        throw new Error('Nenhum cliente encontrado para este usuário');
      }

      if (clientesDisponiveis.length === 1) {
        // Passo 2: Login direto se apenas 1 cliente
        await performLogin(email, senha, clientesDisponiveis[0].id);
      } else {
        // Passo 3: Mostrar seleção de clientes se múltiplos
        setClientes(clientesDisponiveis);
        setCurrentStep('client-selection');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleClientSelect = async (cliente: Cliente) => {
    setLoading(true);
    setError('');

    try {
      await performLogin(credentials.email, credentials.senha, cliente.id);
    } catch (error: any) {
      console.error('Client selection error:', error);
      setError(error.message || 'Erro ao selecionar cliente');
    } finally {
      setLoading(false);
    }
  };

  const performLogin = async (email: string, senha: string, id_sistema: number) => {
    try {
      const loginResponse = await apiService.login({
        email,
        senha,
        id_aplicativo: null,
        id_sistema,
      });

      if (!loginResponse.success) {
        throw new Error(loginResponse.message || 'Erro ao fazer login');
      }

      // Sucesso - redirecionar para home
      router.push('/home');
    } catch (error) {
      throw error;
    }
  };

  const handleBackToLogin = () => {
    setCurrentStep('login');
    setClientes([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gerente-light-blue via-white to-gerente-gray-light">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gerente-blue opacity-5 rounded-full"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gerente-gray opacity-5 rounded-full"
        />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gerente-blue to-gerente-gray items-center justify-center p-12"
        >
          <div className="text-center text-white max-w-md">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8"
            >
              <Logo size="lg" animate={false} />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl font-bold mb-4"
            >
              Gerencie sua empresa com eficiência
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl opacity-90 mb-8"
            >
              Tenha controle total sobre seu negócio com nossa plataforma completa de gestão empresarial.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="space-y-4 text-left"
            >
              {[
                'Gestão financeira integrada',
                'Controle de estoque avançado',
                'Relatórios em tempo real',
                'Suporte especializado'
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white opacity-90">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:hidden text-center mb-8"
            >
              <Logo size="md" />
            </motion.div>

            {/* Main content area */}
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {currentStep === 'login' ? (
                <LoginForm
                  onSubmit={handleLogin}
                  loading={loading}
                  error={error}
                />
              ) : (
                <div>
                  <button
                    onClick={handleBackToLogin}
                    className="mb-6 text-gerente-blue hover:text-gerente-gray transition-colors text-sm flex items-center"
                  >
                    ← Voltar ao login
                  </button>
                  <ClientSelection
                    clientes={clientes}
                    onClientSelect={handleClientSelect}
                    loading={loading}
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 p-6 text-center text-sm text-gerente-gray"
      >
        <p>© 2024 GerenteMax. Todos os direitos reservados.</p>
      </motion.footer>
    </div>
  );
}