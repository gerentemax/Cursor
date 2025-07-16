'use client'

import { useState } from 'react'
import { projetos } from '@/data/mockData'
import { formatCurrency, formatDate, getStatusColor, getProgressColor } from '@/lib/utils'
import { BuildingOfficeIcon, PlusIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline'
import { Projeto } from '@/types'

export default function ProjetosPage() {
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')
  const [projetoSelecionado, setProjetoSelecionado] = useState<Projeto | null>(null)

  const projetosFiltrados = filtroStatus === 'todos' 
    ? projetos 
    : projetos.filter(p => p.status === filtroStatus)

  const statusOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'planejamento', label: 'Planejamento' },
    { value: 'em-andamento', label: 'Em Andamento' },
    { value: 'pausado', label: 'Pausado' },
    { value: 'concluido', label: 'Concluído' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projetos</h1>
          <p className="text-gray-600">Gerencie todos os projetos da construtora</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <PlusIcon className="h-5 w-5" />
          Novo Projeto
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-4 items-center">
          <label className="text-sm font-medium text-gray-700">Filtrar por status:</label>
          <select 
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <span className="text-sm text-gray-500">
            Mostrando {projetosFiltrados.length} de {projetos.length} projetos
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projetosFiltrados.map((projeto) => (
          <div key={projeto.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">{projeto.nome}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{projeto.endereco}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Cliente:</span>
                      <span className="font-medium">{projeto.cliente}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Responsável:</span>
                      <span className="font-medium">{projeto.responsavel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Orçamento:</span>
                      <span className="font-medium">{formatCurrency(projeto.orcamento)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Previsão:</span>
                      <span className="font-medium">{formatDate(projeto.dataPrevisaoTermino)}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progresso</span>
                      <span>{projeto.progresso}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(projeto.progresso)}`}
                        style={{ width: `${projeto.progresso}%` }}
                      />
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex justify-between items-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(projeto.status)}`}>
                      {projeto.status.replace('-', ' ')}
                    </span>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setProjetoSelecionado(projeto)}
                        className="text-gray-400 hover:text-blue-600"
                        title="Ver detalhes"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-green-600"
                        title="Editar"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {projetoSelecionado && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">{projetoSelecionado.nome}</h2>
              <button 
                onClick={() => setProjetoSelecionado(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
                <p className="text-gray-900">{projetoSelecionado.descricao}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Cliente</h3>
                  <p className="text-gray-900">{projetoSelecionado.cliente}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Responsável</h3>
                  <p className="text-gray-900">{projetoSelecionado.responsavel}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Endereço</h3>
                <p className="text-gray-900">{projetoSelecionado.endereco}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Data de Início</h3>
                  <p className="text-gray-900">{formatDate(projetoSelecionado.dataInicio)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Previsão de Término</h3>
                  <p className="text-gray-900">{formatDate(projetoSelecionado.dataPrevisaoTermino)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Orçamento</h3>
                  <p className="text-gray-900">{formatCurrency(projetoSelecionado.orcamento)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Custo Atual</h3>
                  <p className="text-gray-900">{formatCurrency(projetoSelecionado.custoAtual)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Progresso ({projetoSelecionado.progresso}%)</h3>
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${getProgressColor(projetoSelecionado.progresso)}`}
                    style={{ width: `${projetoSelecionado.progresso}%` }}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(projetoSelecionado.status)}`}>
                  {projetoSelecionado.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}