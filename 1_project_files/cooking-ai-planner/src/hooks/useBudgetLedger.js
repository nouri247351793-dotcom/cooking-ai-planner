import useLocalStorage from './useLocalStorage.js'
import { STORAGE_KEYS } from '../store/storageKeys.js'

const initialBudgetLedger = {
  monthlyBudget: '',
  expenses: [],
  updatedAt: '',
}

function getCurrentMonthKey() {
  return new Date().toISOString().slice(0, 7)
}

function toAmount(value) {
  const numberValue = Number(value)
  if (!Number.isFinite(numberValue)) return 0
  return Math.max(0, Math.round(numberValue * 100) / 100)
}

export function deriveBudgetStats(ledger, monthKey = getCurrentMonthKey()) {
  const safeLedger = ledger || initialBudgetLedger
  const monthlyBudget = toAmount(safeLedger.monthlyBudget)
  const expenses = Array.isArray(safeLedger.expenses) ? safeLedger.expenses : []
  const monthlyExpenses = expenses.filter((item) => String(item.date || '').startsWith(monthKey))
  const spent = monthlyExpenses.reduce((sum, item) => sum + toAmount(item.amount), 0)
  const remaining = Math.max(0, monthlyBudget - spent)
  const usagePercent = monthlyBudget > 0 ? Math.min(100, Math.round((spent / monthlyBudget) * 100)) : 0
  const status = monthlyBudget <= 0 ? '未设置预算' : spent > monthlyBudget ? '已超出预算' : usagePercent >= 80 ? '接近预算上限' : '预算稳定'

  return {
    monthKey,
    monthlyBudget,
    monthlyExpenses,
    spent,
    remaining,
    usagePercent,
    status,
    hasBudget: monthlyBudget > 0,
  }
}

export default function useBudgetLedger() {
  const [ledger, setLedger] = useLocalStorage(STORAGE_KEYS.budgetLedger, initialBudgetLedger)
  const safeLedger = {
    ...initialBudgetLedger,
    ...(ledger || {}),
    expenses: Array.isArray(ledger && ledger.expenses) ? ledger.expenses : [],
  }
  const stats = deriveBudgetStats(safeLedger)

  const setMonthlyBudget = (amount) => {
    const monthlyBudget = toAmount(amount)
    if (monthlyBudget <= 0) return { ok: false, reason: 'invalid_budget' }
    const nextLedger = {
      ...safeLedger,
      monthlyBudget,
      updatedAt: new Date().toISOString(),
    }
    setLedger(nextLedger)
    return { ok: true, ledger: nextLedger }
  }

  const addExpense = ({ amount, note }) => {
    const safeAmount = toAmount(amount)
    if (safeAmount <= 0) return { ok: false, reason: 'invalid_amount' }

    const nextExpense = {
      id: `expense-${Date.now()}`,
      amount: safeAmount,
      note: String(note || '').trim(),
      date: new Date().toISOString(),
    }
    const nextLedger = {
      ...safeLedger,
      expenses: [nextExpense, ...safeLedger.expenses],
      updatedAt: nextExpense.date,
    }
    setLedger(nextLedger)
    return { ok: true, expense: nextExpense, ledger: nextLedger }
  }

  const updateExpense = (expenseId, patch) => {
    if (!expenseId) return { ok: false, reason: 'missing_expense_id' }
    const target = safeLedger.expenses.find((expense) => expense.id === expenseId)
    if (!target) return { ok: false, reason: 'expense_not_found' }

    const safeAmount = toAmount(patch && patch.amount)
    if (safeAmount <= 0) return { ok: false, reason: 'invalid_amount' }
    const parsedDate = patch && patch.date ? new Date(patch.date) : null
    if (parsedDate && Number.isNaN(parsedDate.getTime())) return { ok: false, reason: 'invalid_date' }

    const nextExpense = {
      ...target,
      amount: safeAmount,
      note: String((patch && patch.note) || '').trim(),
      date: parsedDate ? parsedDate.toISOString() : target.date,
      updatedAt: new Date().toISOString(),
    }

    const nextLedger = {
      ...safeLedger,
      expenses: safeLedger.expenses.map((expense) => (expense.id === expenseId ? nextExpense : expense)),
      updatedAt: nextExpense.updatedAt,
    }
    setLedger(nextLedger)
    return { ok: true, expense: nextExpense, ledger: nextLedger }
  }

  const deleteExpense = (expenseId) => {
    if (!expenseId) return { ok: false, reason: 'missing_expense_id' }
    const exists = safeLedger.expenses.some((expense) => expense.id === expenseId)
    if (!exists) return { ok: false, reason: 'expense_not_found' }

    const now = new Date().toISOString()
    const nextLedger = {
      ...safeLedger,
      expenses: safeLedger.expenses.filter((expense) => expense.id !== expenseId),
      updatedAt: now,
    }
    setLedger(nextLedger)
    return { ok: true, ledger: nextLedger }
  }

  return {
    ledger: safeLedger,
    stats,
    setMonthlyBudget,
    addExpense,
    updateExpense,
    deleteExpense,
  }
}
