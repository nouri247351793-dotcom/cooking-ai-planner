import { createDefaultFilters } from '../../services/homeRecipeAgentService.js'

const defaults = createDefaultFilters()

export default function FiltersPanel({ filters, onChange, embedded = false }) {
  const setPatch = (patch) => onChange({ ...filters, ...(patch || {}) })

  const capsules = [
    {
      key: 't10',
      label: '10 分钟内',
      isActive: (f) => String(f.durationMax) === '10',
      apply: () => setPatch({ durationMax: '10' }),
      reset: () => setPatch({ durationMax: defaults.durationMax }),
    },
    {
      key: 't20',
      label: '20 分钟内',
      isActive: (f) => String(f.durationMax) === '20',
      apply: () => setPatch({ durationMax: '20' }),
      reset: () => setPatch({ durationMax: defaults.durationMax }),
    },
    {
      key: 'b10',
      label: '<10 元',
      isActive: (f) => String(f.budget) === 'low',
      apply: () => setPatch({ budget: 'low' }),
      reset: () => setPatch({ budget: defaults.budget }),
    },
    {
      key: 'dormpot',
      label: '仅宿舍小锅',
      isActive: (f) => String(f.equipmentLimit) === 'dormPot',
      apply: () => setPatch({ equipmentLimit: 'dormPot' }),
      reset: () => setPatch({ equipmentLimit: defaults.equipmentLimit }),
    },
    {
      key: 'microwave',
      label: '微波炉',
      isActive: (f) => String(f.equipmentLimit) === 'microwaveOnly',
      apply: () => setPatch({ equipmentLimit: 'microwaveOnly' }),
      reset: () => setPatch({ equipmentLimit: defaults.equipmentLimit }),
    },
    {
      key: 'airfryer',
      label: '空气炸锅',
      isActive: (f) => String(f.equipmentLimit) === 'airfryer',
      apply: () => setPatch({ equipmentLimit: 'airfryer' }),
      reset: () => setPatch({ equipmentLimit: defaults.equipmentLimit }),
    },
    {
      key: 'simple',
      label: '极简',
      isActive: (f) => String(f.durationMax) === '20' && String(f.budget) === 'low',
      apply: () => setPatch({ durationMax: '20', budget: 'low' }),
      reset: () => setPatch({ durationMax: defaults.durationMax, budget: defaults.budget }),
    },
    {
      key: 's1',
      label: '1 人份',
      isActive: (f) => String(f.servings) === '1',
      apply: () => setPatch({ servings: '1' }),
      reset: () => setPatch({ servings: defaults.servings }),
    },
  ]

  return (
    <div className={embedded ? 'homeFilters homeFilters--embedded' : 'homeFilters'}>
      <div className="capsRow" aria-label="快捷筛选">
        {capsules.map((c) => {
          const active = c.isActive(filters)
          return (
            <button
              key={c.key}
              type="button"
              className={active ? 'capBtn is-active' : 'capBtn'}
              onClick={() => (active ? c.reset() : c.apply())}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      <details className="filtersMore">
        <summary className="filtersMore__summary">更多筛选</summary>
        <div className="filterGrid" style={{ marginTop: 10 }}>
          <label className="field">
            <div className="field__label">时长</div>
            <select
              className="select"
              value={filters.durationMax}
              name="filter_duration"
              onChange={(e) => onChange({ ...filters, durationMax: e.target.value })}
            >
              <option value="10">≤ 10 分钟</option>
              <option value="15">≤ 15 分钟</option>
              <option value="20">≤ 20 分钟</option>
              <option value="30">≤ 30 分钟</option>
              <option value="45">≤ 45 分钟</option>
              <option value="60">≤ 60 分钟</option>
            </select>
          </label>

          <label className="field">
            <div className="field__label">预算</div>
            <select
              className="select"
              value={filters.budget}
              name="filter_budget"
              onChange={(e) => onChange({ ...filters, budget: e.target.value })}
            >
              <option value="any">不限</option>
              <option value="low">低预算（≈ &lt;10 元）</option>
              <option value="mid">中预算</option>
            </select>
          </label>

          <label className="field">
            <div className="field__label">设备</div>
            <select
              className="select"
              value={filters.equipmentLimit}
              name="filter_equipment_limit"
              onChange={(e) => onChange({ ...filters, equipmentLimit: e.target.value })}
            >
              <option value="any">不限</option>
              <option value="dormPot">仅宿舍小锅</option>
              <option value="microwaveOnly">仅微波炉</option>
              <option value="airfryer">空气炸锅（占位）</option>
              <option value="noOven">无烤箱</option>
              <option value="noStove">无明火</option>
            </select>
          </label>

          <label className="field">
            <div className="field__label">几人份</div>
            <select
              className="select"
              value={filters.servings}
              name="filter_servings"
              onChange={(e) => onChange({ ...filters, servings: e.target.value })}
            >
              <option value="1">1 人份</option>
              <option value="2">2 人份</option>
              <option value="3">3 人份</option>
              <option value="4">4 人份</option>
            </select>
          </label>
        </div>
      </details>
    </div>
  )
}

