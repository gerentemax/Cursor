'use client'

import { projetos } from '@/data/mockData'
import { formatDate, getStatusColor, getProgressColor } from '@/lib/utils'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function CronogramaPage() {
  const projetosOrdenados = [...projetos].sort((a, b) => 
    new Date(a.dataPrevisaoTermino).getTime() - new Date(b.dataPrevisaoTermino).getTime()
  )

  const hoje = new Date()
  
  const getDaysUntilDeadline = (deadline: Date) => {
    const diff = deadline.getTime() - hoje.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cronograma</h1>
        <p className="text-gray-600">Timeline e prazos dos projetos</p>
      </div>

      {/* Timeline Overview */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Visão Geral - Próximos Prazos</h3>
        
        <div className="space-y-4">
          {projetosOrdenados.map((projeto, index) => {
            const daysUntil = getDaysUntilDeadline(projeto.dataPrevisaoTermino)
            const isOverdue = daysUntil < 0
            const isUrgent = daysUntil <= 30 && daysUntil >= 0
            
            return (
              <div key={projeto.id} className="relative">
                {/* Timeline line */}
                {index < projetosOrdenados.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                )}
                
                <div className="flex items-start">
                  {/* Timeline dot */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    isOverdue ? 'bg-red-100' : isUrgent ? 'bg-yellow-100' : 'bg-green-100'
                  }`}>
                    <CalendarIcon className={`h-6 w-6 ${
                      isOverdue ? 'text-red-600' : isUrgent ? 'text-yellow-600' : 'text-green-600'
                    }`} />
                  </div>
                  
                  {/* Project info */}
                  <div className="ml-4 flex-1 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{projeto.nome}</h4>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(projeto.status)}`}>
                        {projeto.status.replace('-', ' ')}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-500">Cliente</p>
                        <p className="font-medium">{projeto.cliente}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Início</p>
                        <p className="font-medium">{formatDate(projeto.dataInicio)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Previsão de término</p>
                        <div className="flex items-center gap-2">
                          <p className={`font-medium ${isOverdue ? 'text-red-600' : isUrgent ? 'text-yellow-600' : 'text-gray-900'}`}>
                            {formatDate(projeto.dataPrevisaoTermino)}
                          </p>
                          <ClockIcon className="h-4 w-4 text-gray-400" />
                          <span className={`text-sm ${isOverdue ? 'text-red-600' : isUrgent ? 'text-yellow-600' : 'text-gray-500'}`}>
                            {isOverdue ? `${Math.abs(daysUntil)} dias atrasado` : 
                             daysUntil === 0 ? 'Vence hoje' :
                             `${daysUntil} dias restantes`}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mb-2">
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
                    
                    <p className="text-sm text-gray-600">{projeto.endereco}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CalendarIcon className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">No Prazo</p>
              <p className="text-2xl font-semibold text-gray-900">
                {projetos.filter(p => getDaysUntilDeadline(p.dataPrevisaoTermino) > 30).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Urgentes</p>
              <p className="text-2xl font-semibold text-gray-900">
                {projetos.filter(p => {
                  const days = getDaysUntilDeadline(p.dataPrevisaoTermino)
                  return days <= 30 && days >= 0
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="h-5 w-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Atrasados</p>
              <p className="text-2xl font-semibold text-gray-900">
                {projetos.filter(p => getDaysUntilDeadline(p.dataPrevisaoTermino) < 0).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Projetos</p>
              <p className="text-2xl font-semibold text-gray-900">{projetos.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}