import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Sidebar from "./components/Sidebar.tsx";
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sidebar/>
  </StrictMode>,
)
