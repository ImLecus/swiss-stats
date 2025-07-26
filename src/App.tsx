import Sidebar from "./components/Sidebar.tsx";
import SidebarDetails from "./components/SidebarDetails.tsx";
import Map from "./components/Map.tsx";
import {useState} from "react";
import {InfoContext} from "./Context.tsx";

const App = () => {
    const [selected, setSelected] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <InfoContext.Provider value={{selected, visible, setSelected, setVisible}}>
            <Sidebar/>
            <SidebarDetails visible={visible} canton={selected ?? ""} />
            <Map/>
        </InfoContext.Provider>
    )
}

export default App;