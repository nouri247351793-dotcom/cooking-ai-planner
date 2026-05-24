import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppDataProvider } from './store/appData.js'
import { CookingTimerProvider } from './hooks/useCookingTimer.js'
import './styles/global.css'
import './styles/app.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppDataProvider>
      <CookingTimerProvider>
        <App />
      </CookingTimerProvider>
    </AppDataProvider>
  </StrictMode>,
)
