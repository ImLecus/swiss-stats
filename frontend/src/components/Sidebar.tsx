import "../styles/sidebar.css"
import KantonButton from "./CantonButton.tsx";

function Sidebar() {
    return (
        <aside id="sidebar">
            <input type="search" placeholder="Search Swiss statistics..." id="sidebar-search" />
            <KantonButton name="Aargau"/>
            <KantonButton name="Bern"/>
            <KantonButton name="Basilea"/>
            <KantonButton name="Genève"/>
            <KantonButton name="Jura"/>
            <KantonButton name="Luzern"/>
            <KantonButton name="Ticino"/>
            <KantonButton name="Vaud"/>
            <KantonButton name="Zürich"/>
            <KantonButton name="Zug"/>
        </aside>
    );
}

export default Sidebar;