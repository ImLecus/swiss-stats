import Sidebar from "./components/Sidebar.tsx";
import SidebarDetails from "./components/SidebarDetails.tsx";
import Map from "./components/Map.tsx";
import {useState, useEffect} from "react";
import {InfoContext} from "./Context.tsx";
import ContentLock from "./components/ContentLock.tsx";

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const App = () => {
    const [selected, setSelected] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [orientation, setOrientation] = useState<OrientationType>(screen.orientation.type);


    useEffect(() => {
        screen.orientation.onchange = () => setOrientation(screen.orientation.type);
    }, []);

    return (
        <InfoContext.Provider value={{selected, visible, setSelected, setVisible}}>
            <ContentLock visible={isMobileDevice() && orientation.includes("portrait")} />
            <Sidebar/>
            <SidebarDetails visible={visible} canton={selected ?? ""} />
            <Map/>
        </InfoContext.Provider>
    )
}

export default App;