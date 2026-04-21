import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRecipeById } from '../data/recipeCatalog.js'
import { useShoppingList } from '../hooks/useShoppingList.js'
import {
  SHOPPING_CATEGORIES,
  SHOPPING_SOURCES,
  createEmptyShoppingItem,
  titleForShoppingGroup,
} from '../services/shoppingService.js'

export default function ShoppingDetailPage() {
  const { itemId } = useParams()
  const groupKey = decodeURIComponent(itemId || '')
  const recipe = groupKey && groupKey !== 'manual' ? getRecipeById(groupKey) : null

  const { shoppingItems: normalized, setShoppingItems } = useShoppingList()

  const groupItems = useMemo(() => {
    if (groupKey === 'manual') return normalized.filter((x) => !x.fromRecipeId)
    return normalized.filter((x) => x.fromRecipeId === groupKey)
  }, [groupKey, normalized])

  const stats = useMemo(() => {
    const total = groupItems.length
    const done = groupItems.filter((x) => x.checked).length
    return { total, done, progress: total ? Math.round((done / total) * 100) : 0 }
  }, [groupItems])

  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState('')
  const [draft, setDraft] = useState(() =>
    createEmptyShoppingItem({ fromRecipeId: groupKey === 'manual' ? '' : groupKey }),
  )

  const openCreate = () => {
    setEditingId('')
    setDraft(createEmptyShoppingItem({ fromRecipeId: groupKey === 'manual' ? '' : groupKey }))
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setEditingId(item.id)
    setDraft({ ...item })
    setModalOpen(true)
  }

  const saveDraft = () => {
    const name = (draft.name || '').trim()
    if (!name) return

    const now = new Date().toISOString()
    const next = {
      ...draft,
      name,
      qty: (draft.qty || '').trim(),
      updatedAt: now,
      createdAt: draft.createdAt || now,
      fromRecipeId: groupKey === 'manual' ? '' : groupKey,
      source: editingId ? draft.source : 'manual',
    }

    if (editingId) {
      setShoppingItems((prev) => prev.map((x) => (x.id === editingId ? next : x)))
    } else {
      setShoppingItems((prev) => [next, ...prev])
    }
    setModalOpen(false)
  }

  const sections = useMemo(() => {
    const by = {
      ingredient: [],
      condiment: [],
      equipment: [],
    }
    for (const it of groupItems) {
      if (by[it.category]) by[it.category].push(it)
      else by.ingredient.push(it)
    }
    for (const k of Object.keys(by)) {
      by[k].sort((a, b) => Number(a.checked) - Number(b.checked))
    }
    return by
  }, [groupItems])

  const categoryLabels = useMemo(() => {
    const map = {}
    for (const c of SHOPPING_CATEGORIES) map[c.key] = c.label
    return map
  }, [])

  const renderSection = (key) => {
    const label = categoryLabels[key] || key

    return (
      <div className="detailSection">
        <div className="sectionTitle">{label}</div>
        {sections[key] && sections[key].length ? (
          <ul className="shopList">
            {sections[key].map((it) => (
              <li key={it.id} className={it.checked ? 'shopItem is-done' : 'shopItem'}>
                <button
                  type="button"
                  className="checkBtn"
                  aria-label={it.checked ? '标记未完成' : '勾选完成'}
                  onClick={() => {
                    setShoppingItems((prev) =>
                      prev.map((x) =>
                        x.id === it.id ? { ...x, checked: !x.checked, updatedAt: new Date().toISOString() } : x,
                      ),
                    )
                  }}
                >
                  {it.checked ? '✓' : ''}
                </button>
                <div className="shopItem__main">
                  <div className="shopItem__name">{it.name}</div>
                  <div className="shopItem__sub">
                    <span className="shopItem__qty">{it.qty || '—'}</span>
                    <span className="dotSep" aria-hidden="true">
                      ·
                    </span>
                    <span className="shopItem__source">
                      {SHOPPING_SOURCES.find((s) => s.key === it.source)?.label || it.source}
                    </span>
                  </div>
                </div>
                <div className="shopItem__actions">
                  <button type="button" className="miniBtn" onClick={() => openEdit(it)}>
                    编辑
                  </button>
                  <button
                    type="button"
                    className="miniBtn danger"
                    onClick={() => setShoppingItems((prev) => prev.filter((x) => x.id !== it.id))}
                  >
                    删除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="notice subtle" style={{ marginTop: 8 }}>
            <div className="notice__desc">暂无{label}项。</div>
          </div>
        )}
      </div>
    )
  }

  return (
    <section className="page shoppingDetailPage">
      <div className="card">
        <div className="cardHeadRow">
          <div>
            <div className="card__title">{titleForShoppingGroup(groupKey)}</div>
            <div className="muted">
              {stats.total} 项 · 完成 {stats.done}/{stats.total}（{stats.progress}%）
            </div>
          </div>
          {recipe ? <img className="groupBadgeImg" src={recipe.imageSrc} alt="" /> : null}
        </div>

        {stats.total === 0 ? (
          <div className="emptyState" style={{ marginTop: 10 }}>
            <div className="emptyState__title">清单还是空的</div>
            <div className="emptyState__hint">
              你可以点右下角“+”手动添加；或到菜谱详情页点“加入待购清单”。
            </div>
          </div>
        ) : (
          <div className="shoppingDetailCols">
            <div className="shoppingDetailCol">{renderSection('ingredient')}</div>
            <div className="shoppingDetailCol">
              {renderSection('condiment')}
              {renderSection('equipment')}
            </div>
          </div>
        )}
      </div>

      <button type="button" className="fab" onClick={openCreate} aria-label="新增清单项">
        +
      </button>

      {modalOpen ? (
        <div className="modalOverlay" role="dialog" aria-modal="true" aria-label="编辑清单项">
          <div className="modalCard">
            <div className="modalHead">
              <div className="modalTitle">{editingId ? '编辑清单项' : '新增清单项'}</div>
              <button type="button" className="iconBtn" onClick={() => setModalOpen(false)} aria-label="关闭">
                ×
              </button>
            </div>

            <div className="formGrid">
              <label className="field">
                <div className="field__label">名称</div>
                <input
                  className="input"
                  value={draft.name}
                  name="shopping_item_name"
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  placeholder="例如：鸡蛋 / 西兰花 / 盐"
                />
              </label>

              <label className="field">
                <div className="field__label">数量</div>
                <input
                  className="input"
                  value={draft.qty}
                  name="shopping_item_qty"
                  onChange={(e) => setDraft({ ...draft, qty: e.target.value })}
                  placeholder="例如：1 个 / 1 颗 / 10g"
                />
              </label>

              <label className="field">
                <div className="field__label">分类</div>
                <select
                  className="select"
                  value={draft.category}
                  name="shopping_item_category"
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                >
                  {SHOPPING_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="field">
                <div className="field__label">来源（预留）</div>
                <input className="input" value={draft.source} name="shopping_item_source" disabled />
              </div>
            </div>

            <div className="actionsRow">
              <button type="button" className="ghostBtn" onClick={() => setModalOpen(false)}>
                取消
              </button>
              <button type="button" className="ghostBtn isPrimary" onClick={saveDraft}>
                保存
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
