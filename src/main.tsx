import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import { APIProvider } from '@vis.gl/react-google-maps'

import Router from './Router'

import './main.css'

createRoot(document.querySelector('body')!).render(
  <StrictMode>
    <BrowserRouter>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}>
        <Router />
      </APIProvider>
    </BrowserRouter>
  </StrictMode>
)
