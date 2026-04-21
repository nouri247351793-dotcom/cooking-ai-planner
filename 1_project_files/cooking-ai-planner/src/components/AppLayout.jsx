import { Link, Outlet, useLocation } from 'react-router-dom'
import PageHeader from './PageHeader.jsx'
import SideNav from './SideNav.jsx'
import TopBar from './TopBar.jsx'

function getLayoutMeta(location) {
  const { pathname, state } = location

  if (pathname === '/') {
    return {
      title: '大学生做饭学习规划师',
      subtitle: '年轻清爽的家常菜学习规划（先 mock，后接 AI）',
      showBack: false,
      right: (
        <Link className="iconBtn" to="/settings" aria-label="AI 配置">
          ⚙
        </Link>
      ),
    }
  }

  if (pathname === '/results') {
    return { title: '菜谱结果', showBack: true, backTo: '/' }
  }

  if (pathname === '/shopping') {
    return { title: '待购清单', showBack: false }
  }

  if (pathname.startsWith('/shopping/')) {
    return { title: '清单详情', showBack: true, headerShowBack: false, backTo: '/shopping' }
  }

  if (pathname === '/favorites') {
    return { title: '我的收藏', showBack: false }
  }

  if (pathname === '/recent') {
    return { title: '最近做过', showBack: false }
  }

  if (pathname === '/tips') {
    return { title: '新手贴士（占位）', showBack: false }
  }

  if (pathname.startsWith('/recipes/')) {
    return { title: '菜谱详情', showBack: true, headerShowBack: false, backTo: (state && state.from) || '/' }
  }

  if (pathname === '/settings') {
    return { title: 'AI 模型配置（占位）', showBack: true, backTo: '/' }
  }

  return { title: '页面', showBack: true, backTo: '/' }
}

export default function AppLayout() {
  const location = useLocation()
  const { pathname } = location
  const meta = getLayoutMeta(location)
  const shellVariant = pathname === '/' ? 'wide' : 'normal'
  const headerShowBack = typeof meta.headerShowBack === 'boolean' ? meta.headerShowBack : meta.showBack

  return (
    <div className="v2Frame">
      <aside className="v2Sidebar" aria-label="主导航">
        <SideNav />
      </aside>

      <div className="v2Body">
        {pathname === '/' ? null : <TopBar title={meta.title} showBack={meta.showBack} backTo={meta.backTo} />}

        <div className={shellVariant === 'wide' ? 'appShell appShell--wide' : 'appShell'}>
          {pathname === '/' ? null : (
          <PageHeader
            title={meta.title}
            subtitle={meta.subtitle}
            showBack={headerShowBack}
            backTo={meta.backTo}
            rightSlot={meta.right || <span className="pageHeader__spacer" aria-hidden="true" />}
          />
          )}

          <main className="appMain" role="main">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
