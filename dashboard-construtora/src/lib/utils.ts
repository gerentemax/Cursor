import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function formatDate(date: Date): string {
  return format(date, 'dd/MM/yyyy', { locale: ptBR })
}

export function formatDatetime(date: Date): string {
  return format(date, 'dd/MM/yyyy HH:mm', { locale: ptBR })
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    'planejamento': 'bg-blue-100 text-blue-800',
    'em-andamento': 'bg-green-100 text-green-800',
    'pausado': 'bg-yellow-100 text-yellow-800',
    'concluido': 'bg-gray-100 text-gray-800',
    'ativo': 'bg-green-100 text-green-800',
    'inativo': 'bg-red-100 text-red-800',
    'ferias': 'bg-blue-100 text-blue-800'
  }
  
  return statusColors[status] || 'bg-gray-100 text-gray-800'
}

export function getProgressColor(progress: number): string {
  if (progress < 30) return 'bg-red-500'
  if (progress < 70) return 'bg-yellow-500'
  return 'bg-green-500'
}