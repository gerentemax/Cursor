'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Home as HomeIcon, User } from 'lucide-react';
import Logo from '@/components/Logo';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gerente-light-blue via-white to-gerente-gray-light">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Logo */}
          <div className="mb-8">
            <Logo size="lg" />
          </div>

          {/* Success message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            
            <h1 className="text-4xl font-bold text-gerente-blue mb-4">
              Login realizado com sucesso!
            </h1>
            
            <p className="text-lg text-gerente-gray">
              Bem-vindo ao GerenteMax. Você foi autenticado com sucesso e pode começar a usar a plataforma.
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-gerente-blue to-gerente-gray hover:from-gerente-blue hover:to-gerente-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gerente-blue transition-all duration-200">
              <HomeIcon className="w-5 h-5 mr-2" />
              Ir para Dashboard
            </button>
            
            <button className="inline-flex items-center justify-center px-6 py-3 border border-gerente-blue rounded-lg shadow-sm text-base font-medium text-gerente-blue bg-white hover:bg-gerente-light-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gerente-blue transition-all duration-200">
              <User className="w-5 h-5 mr-2" />
              Meu Perfil
            </button>
          </motion.div>

          {/* Footer info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gerente-gray">
              Esta é uma demonstração da tela de login. Em um sistema real, você seria redirecionado para o dashboard principal.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}