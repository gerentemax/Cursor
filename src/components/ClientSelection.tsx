'use client';

import { motion } from 'framer-motion';
import { Building2, Mail, Phone, CheckCircle } from 'lucide-react';
import { Cliente } from '@/types/auth';

interface ClientSelectionProps {
  clientes: Cliente[];
  onClientSelect: (cliente: Cliente) => void;
  loading?: boolean;
}

export default function ClientSelection({ clientes, onClientSelect, loading = false }: ClientSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gerente-blue mb-2">
          Selecione sua Empresa
        </h2>
        <p className="text-gerente-gray">
          Encontramos múltiplas empresas associadas ao seu usuário. Selecione a empresa que deseja acessar.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientes.map((cliente, index) => (
          <motion.div
            key={cliente.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 20px 40px rgba(0, 89, 163, 0.15)' 
            }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <button
              onClick={() => onClientSelect(cliente)}
              disabled={loading}
              className="w-full p-6 bg-white rounded-xl border border-gerente-gray-light hover:border-gerente-blue transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Status indicator */}
              <div className="absolute top-4 right-4">
                {cliente.ativo ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-red-500" />
                )}
              </div>

              {/* Company icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gerente-blue to-gerente-light-blue rounded-full flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Company info */}
              <div className="text-center space-y-3">
                <h3 className="text-lg font-semibold text-gerente-blue truncate">
                  {cliente.nome}
                </h3>
                
                {cliente.razaoSocial && (
                  <p className="text-sm text-gerente-gray truncate">
                    {cliente.razaoSocial}
                  </p>
                )}

                {cliente.documento && (
                  <p className="text-xs text-gerente-gray font-mono">
                    {cliente.documento}
                  </p>
                )}

                <div className="flex flex-col space-y-2 pt-2">
                  {cliente.email && (
                    <div className="flex items-center justify-center space-x-2 text-xs text-gerente-gray">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{cliente.email}</span>
                    </div>
                  )}
                  
                  {cliente.telefone && (
                    <div className="flex items-center justify-center space-x-2 text-xs text-gerente-gray">
                      <Phone className="w-3 h-3" />
                      <span>{cliente.telefone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-gerente-blue to-gerente-light-blue opacity-0 hover:opacity-5 rounded-xl transition-opacity duration-300" />
            </button>

            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-xl">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gerente-blue"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-8"
      >
        <p className="text-sm text-gerente-gray">
          Não encontrou sua empresa? Entre em contato com o suporte.
        </p>
      </motion.div>
    </motion.div>
  );
}