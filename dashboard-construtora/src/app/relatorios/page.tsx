'use client'

import { projetos, funcionarios, fornecedores, materiais, transacoes } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'
import { ChartBarIcon, DocumentArrowDownIcon, PrinterIcon } from '@heroicons/react/24/outline'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function RelatoriosPage() {
  // Dados para gráficos
  const projetosPorStatus = [
    { status: 'Em Andamento', quantidade: projetos.filter(p => p.status === 'em-andamento').length, color: '#10B981' },
    { status: 'Pausado', quantidade: projetos.filter(p => p.status === 'pausado').length, color: '#F59E0B' },
    { status: 'Planejamento', quantidade: projetos.filter(p => p.status === 'planejamento').length, color: '#3B82F6' },
    { status: 'Concluído', quantidade: projetos.filter(p => p.status === 'concluido').length, color: '#6B7280' }
  ]

  const funcionariosPorCargo = funcionarios.reduce((acc, func) => {
    acc[func.cargo] = (acc[func.cargo] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const dadosFuncionarios = Object.entries(funcionariosPorCargo).map(([cargo, quantidade]) => ({
    cargo,
    quantidade
  }))

  const receitas = transacoes.filter(t => t.tipo === 'entrada').reduce((sum, t) => sum + t.valor, 0)
  const despesas = transacoes.filter(t => t.tipo === 'saida').reduce((sum, t) => sum + t.valor, 0)
  const lucro = receitas - despesas

  const orcamentoTotal = projetos.reduce((sum, p) => sum + p.orcamento, 0)
  const custoTotal = projetos.reduce((sum, p) => sum + p.custoAtual, 0)

  const relatorios = [
    {
      titulo: 'Relatório de Projetos',
      descricao: 'Status, progresso e performance dos projetos',
      tipo: 'projetos',
      icone: ChartBarIcon
    },
    {
      titulo: 'Relatório Financeiro',
      descricao: 'Receitas, despesas e lucratividade',
      tipo: 'financeiro',
      icone: ChartBarIcon
    },
    {
      titulo: 'Relatório de Funcionários',
      descricao: 'Equipe, cargos e folha de pagamento',
      tipo: 'funcionarios',
      icone: ChartBarIcon
    },
    {
      titulo: 'Relatório de Materiais',
      descricao: 'Estoque, custos e fornecedores',
      tipo: 'materiais',
      icone: ChartBarIcon
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Análises e métricas da construtora</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
            <DocumentArrowDownIcon className="h-5 w-5" />
            Exportar Excel
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <PrinterIcon className="h-5 w-5" />
            Imprimir
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Receita Total</h3>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(receitas)}</p>
          <p className="text-sm text-gray-500">Últimos 12 meses</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Lucro Líquido</h3>
          <p className={`text-3xl font-bold ${lucro >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(lucro)}
          </p>
          <p className="text-sm text-gray-500">Margem: {((lucro / receitas) * 100).toFixed(1)}%</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Projetos Ativos</h3>
          <p className="text-3xl font-bold text-blue-600">
            {projetos.filter(p => p.status === 'em-andamento').length}
          </p>
          <p className="text-sm text-gray-500">De {projetos.length} total</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Funcionários</h3>
          <p className="text-3xl font-bold text-purple-600">
            {funcionarios.filter(f => f.status === 'ativo').length}
          </p>
          <p className="text-sm text-gray-500">Ativos de {funcionarios.length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Projetos por Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projetosPorStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="quantidade"
              >
                {projetosPorStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {projetosPorStatus.map((item) => (
              <div key={item.status} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600">{item.status}: {item.quantidade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Funcionários por Cargo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosFuncionarios}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cargo" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantidade" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Resumo Financeiro</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Performance dos Projetos</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Orçamento Total:</span>
                  <span className="font-medium">{formatCurrency(orcamentoTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Custo Atual:</span>
                  <span className="font-medium">{formatCurrency(custoTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Margem Estimada:</span>
                  <span className={`font-medium ${(orcamentoTotal - custoTotal) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(orcamentoTotal - custoTotal)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recursos</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Funcionários Ativos:</span>
                  <span className="font-medium">{funcionarios.filter(f => f.status === 'ativo').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fornecedores Ativos:</span>
                  <span className="font-medium">{fornecedores.filter(f => f.status === 'ativo').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Materiais em Estoque:</span>
                  <span className="font-medium">{materiais.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor do Estoque:</span>
                  <span className="font-medium">
                    {formatCurrency(materiais.reduce((sum, m) => sum + (m.estoque * m.precoUnitario), 0))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Types */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Relatórios Disponíveis</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatorios.map((relatorio) => (
              <div key={relatorio.tipo} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <relatorio.icone className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">{relatorio.titulo}</h4>
                    <p className="text-sm text-gray-500">{relatorio.descricao}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Visualizar</button>
                  <button className="text-sm text-green-600 hover:text-green-800">Exportar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}