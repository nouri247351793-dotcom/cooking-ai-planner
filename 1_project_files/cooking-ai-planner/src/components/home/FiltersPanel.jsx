import { createDefaultFilters } from '../../services/homeRecipeAgentService.js'

const defaults = createDefaultFilters()

const durationOptions = [
  { value: '10', label: '≤ 10 分钟' },
  { value: '15', label: '≤ 15 分钟' },
  { value: '20', label: '≤ 20 分钟' },
  { value: '30', label: '≤ 30 分钟' },
  { value: '45', label: '≤ 45 分钟' },
  { value: '60', label: '≤ 60 分钟' },
]

const budgetOptions = [
  { value: 'any', label: '不限预算' },
  { value: 'low', label: '低预算（<10 元）' },
  { value: 'mid', label: '中预算' },
]

const equipmentOptions = [
  { value: 'any', label: '不限设备' },
  { value: 'dormPot', label: '仅宿舍小锅' },
  { value: 'microwaveOnly', label: '仅微波炉' },
  { value: 'airfryer', label: '空气炸锅' },
  { value: 'noOven', label: '无烤箱' },
  { value: 'noStove', label: '无明火' },
]

const servingOptions = [
  { value: '1', label: '1 人份' },
  { value: '2', label: '2 人份' },
  { value: '3', label: '3 人份' },
  { value: '4', label: '4 人份' },
]

function getActiveFilterCount(filters) {
  return ['durationMax', 'budget', 'equipmentLimit', 'servings'].filter((key) => {
    return String(filters[key]) !== String(defaults[key])
  }).length
}

export default function FiltersPanel({ filters, onChange, embedded = false }) {
  const setPatch = (patch) => onChange({ ...filters, ...(patch || {}) })
  const activeCount = getActiveFilterCount(filters)

  return (
    <div className={embedded ? 'homeFilters homeFilters--embedded' : 'homeFilters'}>
      <details className="filtersMore filtersMore--v3">
        <summary className="filtersMore__summary">
          <span className="filtersMore__summaryMain">筛选</span>
          <span className="filtersMore__summaryMeta">{activeCount ? `已设置 ${activeCount} 项` : '时长 / 预算 / 设备 / 人份'}</span>
        </summary>

        <div className="filtersMore__body">
          <div className="filtersMore__intro">
            把筛选项统一放在这里，默认不占用主输入区注意力；需要限制条件时再展开调整。
          </div>

          <div className="filterGrid">
            <label className="field">
              <div className="field__label">时长</div>
              <select
                className="select"
                value={filters.durationMax}
                name="filter_duration"
                onChange={(event) => setPatch({ durationMax: event.target.value })}
              >
                {durationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <div className="field__label">预算</div>
              <select
                className="select"
                value={filters.budget}
                name="filter_budget"
                onChange={(event) => setPatch({ budget: event.target.value })}
              >
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <div className="field__label">设备</div>
              <select
                className="select"
                value={filters.equipmentLimit}
                name="filter_equipment_limit"
                onChange={(event) => setPatch({ equipmentLimit: event.target.value })}
              >
                {equipmentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <div className="field__label">几人份</div>
              <select
                className="select"
                value={filters.servings}
                name="filter_servings"
                onChange={(event) => setPatch({ servings: event.target.value })}
              >
                {servingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button type="button" className="filtersMore__reset" onClick={() => onChange(defaults)}>
            恢复默认筛选
          </button>
        </div>
      </details>
    </div>
  )
}
