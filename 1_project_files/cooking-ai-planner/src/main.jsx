import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppDataProvider } from './store/appData.js'
import './styles/global.css'
import './styles/app.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppDataProvider>
      <App />
    </AppDataProvider>
  </StrictMode>,
)
