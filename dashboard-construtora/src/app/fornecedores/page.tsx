'use client'

import { useState } from 'react'
import { fornecedores } from '@/data/mockData'
import { getStatusColor } from '@/lib/utils'
import { TruckIcon, PlusIcon, StarIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'

export default function FornecedoresPage() {
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas')
  const [filtroTermo, setFiltroTermo] = useState('')

  const categorias = [...new Set(fornecedores.map(f => f.categoria))]
  
  const fornecedoresFiltrados = fornecedores.filter(fornecedor => {
    const matchStatus = filtroStatus === 'todos' || fornecedor.status === filtroStatus
    const matchCategoria = filtroCategoria === 'todas' || fornecedor.categoria === filtroCategoria
    const matchTermo = fornecedor.nome.toLowerCase().includes(filtroTermo.toLowerCase()) ||
                      fornecedor.contato.toLowerCase().includes(filtroTermo.toLowerCase())
    return matchStatus && matchCategoria && matchTermo
  })

  const statusOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'ativo', label: 'Ativos' },
    { value: 'inativo', label: 'Inativos' }
  ]

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarSolidIcon key={i} className="h-4 w-4 text-yellow-400" />)
      } else {
        stars.push(<StarIcon key={i} className="h-4 w-4 text-gray-300" />)
      }
    }
    return stars
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fornecedores</h1>
          <p className="text-gray-600">Gerencie fornecedores e parceiros</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <PlusIcon className="h-5 w-5" />
          Novo Fornecedor
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <TruckIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total</p>
              <p className="text-2xl font-semibold text-gray-900">{fornecedores.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Ativos</p>
              <p className="text-2xl font-semibold text-gray-900">
                {fornecedores.filter(f => f.status === 'ativo').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Categorias</p>
              <p className="text-2xl font-semibold text-gray-900">{categorias.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <StarSolidIcon className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Avaliação Média</p>
              <p className="text-2xl font-semibold text-gray-900">
                {(fornecedores.reduce((sum, f) => sum + f.avaliacao, 0) / fornecedores.length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Buscar:</label>
            <input
              type="text"
              value={filtroTermo}
              onChange={(e) => setFiltroTermo(e.target.value)}
              placeholder="Nome ou contato..."
              className="border border-gray-300 rounded-md px-3 py-1 text-sm w-64"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Categoria:</label>
            <select 
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="todas">Todas</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select 
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <span className="text-sm text-gray-500">
            Mostrando {fornecedoresFiltrados.length} de {fornecedores.length} fornecedores
          </span>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {fornecedoresFiltrados.map((fornecedor) => (
          <div key={fornecedor.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <TruckIcon className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">{fornecedor.nome}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">CNPJ: {fornecedor.cnpj}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(fornecedor.status)}`}>
                  {fornecedor.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {fornecedor.categoria}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Contato:</span>
                    <span className="ml-2">{fornecedor.contato}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                    {fornecedor.email}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                    {fornecedor.telefone}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Avaliação</p>
                    <div className="flex items-center gap-1">
                      {renderStars(Math.floor(fornecedor.avaliacao))}
                      <span className="text-sm text-gray-600 ml-1">
                        {fornecedor.avaliacao.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Editar
                    </button>
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      Contatar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Resumo por Categoria</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ativos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avaliação Média
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categorias.map((categoria) => {
                const fornecedoresCategoria = fornecedores.filter(f => f.categoria === categoria)
                const ativosCategoria = fornecedoresCategoria.filter(f => f.status === 'ativo')
                const avaliacaoMedia = fornecedoresCategoria.reduce((sum, f) => sum + f.avaliacao, 0) / fornecedoresCategoria.length
                
                return (
                  <tr key={categoria} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{categoria}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{fornecedoresCategoria.length}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ativosCategoria.length}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {renderStars(Math.floor(avaliacaoMedia))}
                        </div>
                        <span className="text-sm text-gray-900">{avaliacaoMedia.toFixed(1)}</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}