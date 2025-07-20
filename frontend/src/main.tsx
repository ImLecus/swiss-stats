import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Sidebar from "./components/Sidebar.tsx";
import './index.css'
import MapControls from "./components/MapControls.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sidebar/>
    <MapControls />
  </StrictMode>,
)
