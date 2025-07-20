import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Sidebar from "./components/Sidebar.tsx";
import './index.css'
import Map from "./components/Map.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sidebar/>
    <Map/>
  </StrictMode>,
)
