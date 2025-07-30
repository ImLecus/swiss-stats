import Sidebar from "./components/Sidebar.tsx";
import SidebarDetails from "./components/SidebarDetails.tsx";
import Map from "./components/Map.tsx";
import {useState, useEffect} from "react";
import {InfoContext} from "./Context.tsx";
import LanguageSelector from "./components/LanguageSelector.tsx";
import ContentLock from "./components/ContentLock.tsx";


const App = () => {
    const [selected, setSelected] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [orientation, setOrientation] = useState<OrientationType>(screen.orientation.type);


    useEffect(() => {
        screen.orientation.onchange = () => setOrientation(screen.orientation.type);
    }, []);

    return (
        <InfoContext.Provider value={{selected, visible, setSelected, setVisible}}>
            <ContentLock visible={orientation.includes("portrait")} />
            <Sidebar/>
            <SidebarDetails visible={visible} canton={selected ?? ""} />
            <Map/>
            <LanguageSelector />
        </InfoContext.Provider>
    )
}

export default App;