# ConstrutoraPro - Dashboard de Gestão

Um sistema completo e moderno para gestão de construtoras, desenvolvido com Next.js 14, React, TypeScript e Tailwind CSS.

## 🏗️ Funcionalidades

### Dashboard Principal
- **Métricas em tempo real**: Visualização de KPIs importantes
- **Gráficos interativos**: Receitas vs custos, status dos projetos
- **Alertas inteligentes**: Notificações sobre materiais com estoque baixo
- **Transações recentes**: Acompanhamento do fluxo financeiro

### Gestão de Projetos
- **Listagem completa**: Todos os projetos com filtros avançados
- **Acompanhamento de progresso**: Barras de progresso visuais
- **Status em tempo real**: Planejamento, em andamento, pausado, concluído
- **Modal de detalhes**: Informações completas de cada projeto
- **Controle financeiro**: Orçamento vs custo atual

### Gestão de Funcionários
- **Cadastro completo**: Dados pessoais, cargo, salário
- **Controle de status**: Ativo, inativo, férias
- **Folha de pagamento**: Cálculo automático da folha total
- **Alocação em projetos**: Visualização de projetos por funcionário
- **Filtros avançados**: Por nome, cargo ou status

### Gestão de Materiais
- **Controle de estoque**: Quantidade atual vs estoque mínimo
- **Alertas automáticos**: Materiais com estoque baixo
- **Gestão por categoria**: Organização por tipo de material
- **Controle financeiro**: Valor unitário e total do estoque
- **Filtros inteligentes**: Por categoria, fornecedor ou estoque

### Gestão de Fornecedores
- **Cadastro completo**: Dados da empresa, contatos, avaliações
- **Sistema de avaliação**: Classificação por estrelas
- **Organização por categoria**: Materiais básicos, ferragens, tintas, etc.
- **Controle de status**: Fornecedores ativos e inativos
- **Resumo estatístico**: Métricas por categoria

## 🚀 Tecnologias Utilizadas

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Ícones**: Heroicons
- **Gráficos**: Recharts
- **Manipulação de datas**: date-fns
- **Componentes**: Headless UI

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd dashboard-construtora
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto em desenvolvimento**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:3000
```

## 🎨 Design e UX

### Características do Design
- **Interface moderna**: Design limpo e profissional
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Navegação intuitiva**: Sidebar com navegação clara
- **Cores consistentes**: Paleta de cores harmoniosa
- **Feedback visual**: Estados hover, loading e interações

### Componentes Reutilizáveis
- **MetricCard**: Cards de métricas com ícones e trends
- **Sidebar**: Navegação lateral responsiva
- **Filtros**: Componentes de busca e filtros
- **Tabelas**: Listagens com ordenação e paginação
- **Modals**: Visualização de detalhes

## 📊 Estrutura de Dados

### Projetos
```typescript
interface Projeto {
  id: string
  nome: string
  endereco: string
  cliente: string
  dataInicio: Date
  dataPrevisaoTermino: Date
  status: 'planejamento' | 'em-andamento' | 'pausado' | 'concluido'
  progresso: number
  orcamento: number
  custoAtual: number
  responsavel: string
  descricao: string
}
```

### Funcionários
```typescript
interface Funcionario {
  id: string
  nome: string
  cargo: string
  email: string
  telefone: string
  salario: number
  dataAdmissao: Date
  status: 'ativo' | 'inativo' | 'ferias'
  projetos: string[]
}
```

### Fornecedores
```typescript
interface Fornecedor {
  id: string
  nome: string
  cnpj: string
  contato: string
  email: string
  telefone: string
  categoria: string
  status: 'ativo' | 'inativo'
  avaliacao: number
}
```

### Materiais
```typescript
interface Material {
  id: string
  nome: string
  categoria: string
  unidade: string
  precoUnitario: number
  estoque: number
  estoqueMinimo: number
  fornecedor: string
}
```

## 🔧 Funcionalidades Implementadas

### ✅ Concluído
- [x] Dashboard principal com métricas
- [x] Gestão completa de projetos
- [x] Gestão de funcionários
- [x] Gestão de materiais com controle de estoque
- [x] Gestão de fornecedores com avaliações
- [x] Sidebar responsiva
- [x] Filtros e buscas avançadas
- [x] Gráficos interativos
- [x] Sistema de alertas
- [x] Interface responsiva

### 🚧 Próximas Funcionalidades
- [ ] Gestão financeira completa
- [ ] Cronograma de obras
- [ ] Relatórios avançados
- [ ] Sistema de autenticação
- [ ] Integração com banco de dados
- [ ] Notificações push
- [ ] Exportação de relatórios
- [ ] Chat interno
- [ ] Gestão de documentos

## 📱 Responsividade

O dashboard foi desenvolvido com design mobile-first:

- **Desktop**: Layout completo com sidebar fixa
- **Tablet**: Layout adaptado com navegação otimizada
- **Mobile**: Sidebar colapsável com menu hambúrguer

## 🎯 Métricas e KPIs

### Dashboard Principal
- Total de projetos
- Projetos ativos
- Funcionários ativos
- Lucro atual
- Receitas vs custos (gráfico)
- Status dos projetos (gráfico pizza)

### Por Módulo
- **Projetos**: Progress, orçamento vs custo
- **Funcionários**: Total da folha, distribuição por status
- **Materiais**: Valor total do estoque, alertas de estoque baixo
- **Fornecedores**: Avaliação média, distribuição por categoria

## 🛠️ Personalização

### Cores
As cores podem ser facilmente alteradas no arquivo `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      danger: '#EF4444'
    }
  }
}
```

### Dados Mock
Os dados de demonstração estão em `src/data/mockData.ts` e podem ser facilmente substituídos por dados reais de uma API.

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🏢 Sobre o ConstrutoraPro

O ConstrutoraPro é uma solução completa para gestão de construtoras, oferecendo:

- **Controle total**: Gerencie projetos, equipe e recursos
- **Visibilidade**: Acompanhe métricas e indicadores em tempo real
- **Eficiência**: Automatize processos e reduza retrabalho
- **Crescimento**: Tome decisões baseadas em dados concretos

---

Desenvolvido com ❤️ para facilitar a gestão de construtoras e empresas do setor da construção civil.
