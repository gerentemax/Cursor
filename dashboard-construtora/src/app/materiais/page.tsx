'use client'

import { useState } from 'react'
import { materiais } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'
import { CubeIcon, PlusIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function MateriaisPage() {
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas')
  const [filtroTermo, setFiltroTermo] = useState('')
  const [mostrarApenasEstoqueBaixo, setMostrarApenasEstoqueBaixo] = useState(false)

  const categorias = [...new Set(materiais.map(m => m.categoria))]
  
  const materiaisFiltrados = materiais.filter(material => {
    const matchCategoria = filtroCategoria === 'todas' || material.categoria === filtroCategoria
    const matchTermo = material.nome.toLowerCase().includes(filtroTermo.toLowerCase()) ||
                      material.fornecedor.toLowerCase().includes(filtroTermo.toLowerCase())
    const matchEstoque = !mostrarApenasEstoqueBaixo || material.estoque <= material.estoqueMinimo
    return matchCategoria && matchTermo && matchEstoque
  })

  const materiaisBaixoEstoque = materiais.filter(m => m.estoque <= m.estoqueMinimo)
  const valorTotalEstoque = materiais.reduce((total, m) => total + (m.estoque * m.precoUnitario), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Materiais</h1>
          <p className="text-gray-600">Controle de estoque e materiais</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <PlusIcon className="h-5 w-5" />
          Novo Material
        </button>
      </div>

      {/* Alert for Low Stock */}
      {materiaisBaixoEstoque.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Atenção: {materiaisBaixoEstoque.length} materiais com estoque baixo
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Verifique a lista abaixo e faça a reposição necessária.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <CubeIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Materiais</p>
              <p className="text-2xl font-semibold text-gray-900">{materiais.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Estoque Baixo</p>
              <p className="text-2xl font-semibold text-gray-900">{materiaisBaixoEstoque.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
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
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Valor Estoque</p>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(valorTotalEstoque)}</p>
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
              placeholder="Nome do material ou fornecedor..."
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
            <input
              type="checkbox"
              id="estoque-baixo"
              checked={mostrarApenasEstoqueBaixo}
              onChange={(e) => setMostrarApenasEstoqueBaixo(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="estoque-baixo" className="text-sm font-medium text-gray-700">
              Apenas estoque baixo
            </label>
          </div>
          <span className="text-sm text-gray-500">
            Mostrando {materiaisFiltrados.length} de {materiais.length} materiais
          </span>
        </div>
      </div>

      {/* Materials Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Lista de Materiais</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Material
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estoque
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço Unitário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fornecedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materiaisFiltrados.map((material) => {
                const isLowStock = material.estoque <= material.estoqueMinimo
                const valorTotal = material.estoque * material.precoUnitario
                
                return (
                  <tr key={material.id} className={`hover:bg-gray-50 ${isLowStock ? 'bg-red-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CubeIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{material.nome}</div>
                          <div className="text-sm text-gray-500">Unidade: {material.unidade}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {material.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">{material.estoque} {material.unidade}</div>
                        <div className="text-xs text-gray-500">
                          Mín: {material.estoqueMinimo} {material.unidade}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(material.precoUnitario)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(valorTotal)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{material.fornecedor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isLowStock ? (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                          Estoque Baixo
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          OK
                        </span>
                      )}
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