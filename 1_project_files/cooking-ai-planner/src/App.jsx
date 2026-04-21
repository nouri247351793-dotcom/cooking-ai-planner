import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import HomePage from './pages/HomePage.jsx'
import RecipeDetailPage from './pages/RecipeDetailPage.jsx'
import RecipeResultsPage from './pages/RecipeResultsPage.jsx'
import RecentPage from './pages/RecentPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ShoppingDetailPage from './pages/ShoppingDetailPage.jsx'
import ShoppingListPage from './pages/ShoppingListPage.jsx'
import TipsPage from './pages/TipsPage.jsx'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/results" element={<RecipeResultsPage />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetailPage />} />
          <Route path="/shopping" element={<ShoppingListPage />} />
          <Route path="/shopping/:itemId" element={<ShoppingDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/recent" element={<RecentPage />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
