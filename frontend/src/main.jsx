import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import GovernmentDashboard from './components/govtDashboard/govtMainPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GovernmentDashboard/>
  </StrictMode>,
)
