import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { TRPCProvider } from '@/providers/trpc'
import { I18nProvider } from '@/i18n/I18nContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TRPCProvider>
      <I18nProvider>
        <App />
      </I18nProvider>
    </TRPCProvider>
  </BrowserRouter>
)
