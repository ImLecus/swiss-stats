import { StrictMode, createContext } from 'react'
import { createRoot } from 'react-dom/client'

import Sidebar from "./components/Sidebar.tsx";
import './index.css'
import Map from "./components/Map.tsx";
import SidebarDetails from "./components/SidebarDetails.tsx";

import cantons from "./assets/canton-info.json"
import type Canton from "./interfaces/Canton.ts";

const InfoContext = createContext(true);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <InfoContext.Provider value={false}>
          <Sidebar/>
          <SidebarDetails canton={cantons["ZH"] as Canton}/>
          <Map/>
      </InfoContext.Provider>
  </StrictMode>,
)
