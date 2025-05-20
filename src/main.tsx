import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './main.css'

// import { HeroUIProvider } from '@heroui/system'

createRoot(document.querySelector('body')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
