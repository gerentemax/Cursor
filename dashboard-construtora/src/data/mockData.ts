import { 
  Projeto, 
  Funcionario, 
  Fornecedor, 
  Material, 
  Transacao, 
  DashboardMetrics 
} from '@/types';

export const projetos: Projeto[] = [
  {
    id: '1',
    nome: 'Residencial Solar',
    endereco: 'Rua das Flores, 123 - Jardim América',
    cliente: 'João Silva',
    dataInicio: new Date('2024-01-15'),
    dataPrevisaoTermino: new Date('2024-12-15'),
    status: 'em-andamento',
    progresso: 65,
    orcamento: 450000,
    custoAtual: 285000,
    responsavel: 'Carlos Oliveira',
    descricao: 'Construção de casa térrea de 180m² com 3 quartos'
  },
  {
    id: '2',
    nome: 'Edifício Comercial Centro',
    endereco: 'Av. Principal, 456 - Centro',
    cliente: 'Empresa ABC Ltda',
    dataInicio: new Date('2024-03-01'),
    dataPrevisaoTermino: new Date('2025-06-30'),
    status: 'em-andamento',
    progresso: 35,
    orcamento: 1200000,
    custoAtual: 420000,
    responsavel: 'Ana Santos',
    descricao: 'Edifício comercial de 5 andares com elevador'
  },
  {
    id: '3',
    nome: 'Reforma Residencial',
    endereco: 'Rua dos Sonhos, 789 - Vila Nova',
    cliente: 'Maria José',
    dataInicio: new Date('2024-02-10'),
    dataPrevisaoTermino: new Date('2024-08-10'),
    status: 'pausado',
    progresso: 80,
    orcamento: 85000,
    custoAtual: 68000,
    responsavel: 'Pedro Costa',
    descricao: 'Reforma completa de apartamento 120m²'
  }
];

export const funcionarios: Funcionario[] = [
  {
    id: '1',
    nome: 'Carlos Oliveira',
    cargo: 'Engenheiro Civil',
    email: 'carlos@construtora.com',
    telefone: '(11) 98765-4321',
    salario: 8500,
    dataAdmissao: new Date('2020-03-15'),
    status: 'ativo',
    projetos: ['1', '2']
  },
  {
    id: '2',
    nome: 'Ana Santos',
    cargo: 'Arquiteta',
    email: 'ana@construtora.com',
    telefone: '(11) 91234-5678',
    salario: 7500,
    dataAdmissao: new Date('2021-01-10'),
    status: 'ativo',
    projetos: ['2']
  },
  {
    id: '3',
    nome: 'Pedro Costa',
    cargo: 'Mestre de Obras',
    email: 'pedro@construtora.com',
    telefone: '(11) 99876-5432',
    salario: 4500,
    dataAdmissao: new Date('2019-08-20'),
    status: 'ativo',
    projetos: ['3']
  },
  {
    id: '4',
    nome: 'José Pereira',
    cargo: 'Pedreiro',
    email: 'jose@construtora.com',
    telefone: '(11) 95555-1234',
    salario: 3200,
    dataAdmissao: new Date('2022-05-01'),
    status: 'ferias',
    projetos: ['1']
  }
];

export const fornecedores: Fornecedor[] = [
  {
    id: '1',
    nome: 'Materiais São Paulo',
    cnpj: '12.345.678/0001-90',
    contato: 'Roberto Silva',
    email: 'vendas@materiaissp.com',
    telefone: '(11) 3333-4444',
    categoria: 'Materiais Básicos',
    status: 'ativo',
    avaliacao: 4.5
  },
  {
    id: '2',
    nome: 'Ferragens Centro',
    cnpj: '98.765.432/0001-10',
    contato: 'Luiza Costa',
    email: 'comercial@ferragenscentro.com',
    telefone: '(11) 2222-3333',
    categoria: 'Ferragens',
    status: 'ativo',
    avaliacao: 4.8
  },
  {
    id: '3',
    nome: 'Tintas Premium',
    cnpj: '11.222.333/0001-44',
    contato: 'Carlos Mendes',
    email: 'vendas@tintaspremium.com',
    telefone: '(11) 4444-5555',
    categoria: 'Tintas e Acabamentos',
    status: 'ativo',
    avaliacao: 4.2
  }
];

export const materiais: Material[] = [
  {
    id: '1',
    nome: 'Cimento CP II',
    categoria: 'Materiais Básicos',
    unidade: 'saco 50kg',
    precoUnitario: 32.50,
    estoque: 45,
    estoqueMinimo: 20,
    fornecedor: 'Materiais São Paulo'
  },
  {
    id: '2',
    nome: 'Tijolo Cerâmico',
    categoria: 'Materiais Básicos',
    unidade: 'milheiro',
    precoUnitario: 485.00,
    estoque: 8,
    estoqueMinimo: 5,
    fornecedor: 'Materiais São Paulo'
  },
  {
    id: '3',
    nome: 'Vergalhão 10mm',
    categoria: 'Ferragens',
    unidade: 'barra 12m',
    precoUnitario: 28.90,
    estoque: 12,
    estoqueMinimo: 15,
    fornecedor: 'Ferragens Centro'
  },
  {
    id: '4',
    nome: 'Tinta Acrílica Branca',
    categoria: 'Tintas e Acabamentos',
    unidade: 'galão 18L',
    precoUnitario: 145.00,
    estoque: 3,
    estoqueMinimo: 8,
    fornecedor: 'Tintas Premium'
  }
];

export const transacoes: Transacao[] = [
  {
    id: '1',
    tipo: 'entrada',
    categoria: 'Pagamento Cliente',
    descricao: 'Pagamento parcial - Residencial Solar',
    valor: 150000,
    data: new Date('2024-01-20'),
    projeto: '1',
    formaPagamento: 'Transferência Bancária'
  },
  {
    id: '2',
    tipo: 'saida',
    categoria: 'Materiais',
    descricao: 'Compra de cimento e tijolos',
    valor: 15430,
    data: new Date('2024-01-25'),
    projeto: '1',
    formaPagamento: 'Cartão Corporativo'
  },
  {
    id: '3',
    tipo: 'saida',
    categoria: 'Mão de Obra',
    descricao: 'Pagamento salários Janeiro',
    valor: 23700,
    data: new Date('2024-02-05'),
    formaPagamento: 'PIX'
  },
  {
    id: '4',
    tipo: 'entrada',
    categoria: 'Pagamento Cliente',
    descricao: 'Entrada - Edifício Comercial',
    valor: 240000,
    data: new Date('2024-03-05'),
    projeto: '2',
    formaPagamento: 'Transferência Bancária'
  }
];

export const dashboardMetrics: DashboardMetrics = {
  totalProjetos: 3,
  projetosAtivos: 2,
  receitaTotal: 390000,
  custosTotal: 285000,
  lucro: 105000,
  funcionariosAtivos: 3,
  materiaisEstoqueBaixo: 2
};