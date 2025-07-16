'use client'

import { 
  BuildingOfficeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import MetricCard from '@/components/MetricCard'
import { dashboardMetrics, projetos, transacoes, materiais } from '@/data/mockData'
import { formatCurrency, formatDate, getStatusColor, getProgressColor } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const chartData = [
  { name: 'Jan', receita: 150000, custos: 120000 },
  { name: 'Fev', receita: 180000, custos: 140000 },
  { name: 'Mar', receita: 240000, custos: 190000 },
  { name: 'Abr', receita: 200000, custos: 160000 },
  { name: 'Mai', receita: 220000, custos: 175000 },
]

const statusData = [
  { name: 'Em Andamento', value: 2, color: '#10B981' },
  { name: 'Pausado', value: 1, color: '#F59E0B' },
  { name: 'Planejamento', value: 0, color: '#3B82F6' },
]

export default function Dashboard() {
  const materiaisBaixoEstoque = materiais.filter(m => m.estoque <= m.estoqueMinimo)
  const transacoesRecentes = transacoes.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral da sua construtora</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total de Projetos"
          value={dashboardMetrics.totalProjetos}
          icon={BuildingOfficeIcon}
          trend={{ value: 15, isPositive: true }}
        />
        <MetricCard
          title="Projetos Ativos"
          value={dashboardMetrics.projetosAtivos}
          icon={ChartBarIcon}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Funcionários Ativos"
          value={dashboardMetrics.funcionariosAtivos}
          icon={UsersIcon}
        />
        <MetricCard
          title="Lucro Atual"
          value={formatCurrency(dashboardMetrics.lucro)}
          icon={CurrencyDollarIcon}
          trend={{ value: 22, isPositive: true }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Receitas vs Custos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar dataKey="receita" fill="#3B82F6" name="Receita" />
              <Bar dataKey="custos" fill="#EF4444" name="Custos" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Status dos Projetos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex justify-center space-x-4">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects Overview */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Projetos em Andamento</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {projetos.slice(0, 3).map((projeto) => (
              <div key={projeto.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{projeto.nome}</h4>
                    <p className="text-sm text-gray-500">{projeto.cliente}</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Progresso</span>
                        <span>{projeto.progresso}%</span>
                      </div>
                      <div className="mt-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(projeto.progresso)}`}
                          style={{ width: `${projeto.progresso}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(projeto.status)}`}>
                      {projeto.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Transações Recentes</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {transacoesRecentes.map((transacao) => (
              <div key={transacao.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{transacao.descricao}</h4>
                    <p className="text-sm text-gray-500">{transacao.categoria}</p>
                    <p className="text-xs text-gray-400">{formatDate(transacao.data)}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <span className={`text-sm font-medium ${
                      transacao.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transacao.tipo === 'entrada' ? '+' : '-'}{formatCurrency(transacao.valor)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      {materiaisBaixoEstoque.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Atenção: Materiais com estoque baixo</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc list-inside space-y-1">
                  {materiaisBaixoEstoque.map((material) => (
                    <li key={material.id}>
                      {material.nome} - Estoque: {material.estoque} {material.unidade}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
