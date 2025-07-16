export interface Projeto {
  id: string;
  nome: string;
  endereco: string;
  cliente: string;
  dataInicio: Date;
  dataPrevisaoTermino: Date;
  status: 'planejamento' | 'em-andamento' | 'pausado' | 'concluido';
  progresso: number;
  orcamento: number;
  custoAtual: number;
  responsavel: string;
  descricao: string;
}

export interface Funcionario {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  salario: number;
  dataAdmissao: Date;
  status: 'ativo' | 'inativo' | 'ferias';
  projetos: string[];
}

export interface Fornecedor {
  id: string;
  nome: string;
  cnpj: string;
  contato: string;
  email: string;
  telefone: string;
  categoria: string;
  status: 'ativo' | 'inativo';
  avaliacao: number;
}

export interface Material {
  id: string;
  nome: string;
  categoria: string;
  unidade: string;
  precoUnitario: number;
  estoque: number;
  estoqueMinimo: number;
  fornecedor: string;
}

export interface Transacao {
  id: string;
  tipo: 'entrada' | 'saida';
  categoria: string;
  descricao: string;
  valor: number;
  data: Date;
  projeto?: string;
  formaPagamento: string;
}

export interface DashboardMetrics {
  totalProjetos: number;
  projetosAtivos: number;
  receitaTotal: number;
  custosTotal: number;
  lucro: number;
  funcionariosAtivos: number;
  materiaisEstoqueBaixo: number;
}