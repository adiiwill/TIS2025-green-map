import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import "./main.css"

import {HeroUIProvider} from '@heroui/system'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <HeroUIProvider>
          <main className="dark text-foreground">
              <App />
          </main>
      </HeroUIProvider>
  </StrictMode>,
)
