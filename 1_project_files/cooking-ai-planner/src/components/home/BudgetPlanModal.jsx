import { useEffect, useState } from 'react'

function useLockBodyScroll(open) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])
}

function formatCurrency(value) {
  return `¥${Number(value || 0).toFixed(Number(value || 0) % 1 === 0 ? 0 : 1)}`
}

function formatDate(date) {
  if (!date) return '今天'
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export default function BudgetPlanModal({ open, onClose, budgetLedger }) {
  const { stats, setMonthlyBudget, addExpense } = budgetLedger
  const [budgetInput, setBudgetInput] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseNote, setExpenseNote] = useState('')
  const [message, setMessage] = useState('')

  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    setBudgetInput(stats.hasBudget ? String(stats.monthlyBudget) : '')
    setExpenseAmount('')
    setExpenseNote('')
    setMessage('')
  }, [open, stats.hasBudget, stats.monthlyBudget])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, open])

  if (!open) return null

  const handleBudgetSubmit = (event) => {
    event.preventDefault()
    const result = setMonthlyBudget(budgetInput)
    if (!result.ok) {
      setMessage('请先输入大于 0 的本月预算。')
      return
    }
    setMessage('本月预算已更新。')
  }

  const handleExpenseSubmit = (event) => {
    event.preventDefault()
    const result = addExpense({ amount: expenseAmount, note: expenseNote })
    if (!result.ok) {
      setMessage('请填写大于 0 的本次做饭开支。')
      return
    }
    setExpenseAmount('')
    setExpenseNote('')
    setMessage('已记录本次做饭开支。')
  }

  return (
    <div
      className="modalOverlay"
      role="dialog"
      aria-modal="true"
      aria-label="本月省钱计划"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="modalCard budgetModal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modalHead">
          <div>
            <div className="modalTitle">💰 本月省钱计划</div>
            <div className="muted" style={{ marginTop: 6 }}>
              先记录预算，再把每次做饭花费记下来。这里只做本地账本，不接真实支付数据。
            </div>
          </div>
          <button type="button" className="iconBtn" onClick={onClose} aria-label="关闭">
            ×
          </button>
        </div>

        {!stats.hasBudget ? (
          <form className="budgetSetup" onSubmit={handleBudgetSubmit}>
            <div className="budgetSetup__title">先设置本月预算</div>
            <div className="budgetSetup__desc">第一次进入省钱计划时，需要先告诉系统这个月准备花多少钱做饭。</div>
            <label className="field">
              <div className="field__label">本月预算</div>
              <input
                className="input"
                type="number"
                min="1"
                step="1"
                value={budgetInput}
                onChange={(event) => setBudgetInput(event.target.value)}
                placeholder="例如：400"
              />
            </label>
            <button type="submit" className="primaryBtn">
              保存预算
            </button>
          </form>
        ) : (
          <>
            <div className="budgetModal__section">
              <div className="sectionTitle">预算概览</div>
              <div className="budgetModal__grid" style={{ marginTop: 10 }}>
                <div className="budgetStat">
                  <div className="budgetStat__k">本月预算</div>
                  <div className="budgetStat__v">{formatCurrency(stats.monthlyBudget)}</div>
                </div>
                <div className="budgetStat">
                  <div className="budgetStat__k">本月已花</div>
                  <div className="budgetStat__v">{formatCurrency(stats.spent)}</div>
                </div>
                <div className="budgetStat">
                  <div className="budgetStat__k">剩余预算</div>
                  <div className="budgetStat__v">{formatCurrency(stats.remaining)}</div>
                </div>
                <div className="budgetStat">
                  <div className="budgetStat__k">当前状态</div>
                  <div className="budgetStat__v" style={{ fontSize: 13 }}>
                    {stats.status}
                  </div>
                </div>
              </div>
              <div className="progressBar budgetModal__progress" aria-label={`预算使用比例 ${stats.usagePercent}%`}>
                <div className="progressBar__fill" style={{ width: `${stats.usagePercent}%` }} />
              </div>
            </div>

            <form className="budgetModal__section budgetForm" onSubmit={handleBudgetSubmit}>
              <div className="sectionTitle">修改本月预算</div>
              <div className="budgetForm__row">
                <label className="field">
                  <div className="field__label">预算金额</div>
                  <input
                    className="input"
                    type="number"
                    min="1"
                    step="1"
                    value={budgetInput}
                    onChange={(event) => setBudgetInput(event.target.value)}
                  />
                </label>
                <button type="submit" className="ghostBtn isPrimary">
                  更新预算
                </button>
              </div>
            </form>

            <form className="budgetModal__section budgetForm" onSubmit={handleExpenseSubmit}>
              <div className="sectionTitle">新增本次做饭开支</div>
              <div className="budgetForm__row">
                <label className="field">
                  <div className="field__label">金额</div>
                  <input
                    className="input"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={expenseAmount}
                    onChange={(event) => setExpenseAmount(event.target.value)}
                    placeholder="例如：12.5"
                  />
                </label>
                <label className="field budgetForm__note">
                  <div className="field__label">备注（可选）</div>
                  <input
                    className="input"
                    type="text"
                    value={expenseNote}
                    onChange={(event) => setExpenseNote(event.target.value)}
                    placeholder="例如：番茄鸡蛋食材"
                  />
                </label>
                <button type="submit" className="primaryBtn">
                  记录开支
                </button>
              </div>
            </form>

            <div className="budgetModal__section">
              <div className="sectionTitle">本月项目记录</div>
              {stats.monthlyExpenses.length ? (
                <div className="budgetRecordList">
                  {stats.monthlyExpenses.map((expense) => (
                    <div className="budgetRecord" key={expense.id}>
                      <div>
                        <div className="budgetRecord__note">{expense.note || '本次做饭开支'}</div>
                        <div className="budgetRecord__date">{formatDate(expense.date)}</div>
                      </div>
                      <div className="budgetRecord__amount">{formatCurrency(expense.amount)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="emptyMini">本月还没有记录做饭开支。</div>
              )}
            </div>
          </>
        )}

        {message ? <div className="budgetModal__message">{message}</div> : null}

        <div className="actionsRow" style={{ marginTop: 14 }}>
          <button type="button" className="ghostBtn" onClick={onClose}>
            关闭
          </button>
          <button type="button" className="ghostBtn isPrimary" onClick={onClose}>
            完成
          </button>
        </div>
      </div>
    </div>
  )
}
