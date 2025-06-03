import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './main.css'
import { BrowserRouter } from 'react-router'

import Router from './Router'

createRoot(document.querySelector('body')!).render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>
)
