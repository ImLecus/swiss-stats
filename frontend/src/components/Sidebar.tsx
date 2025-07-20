import "../styles/sidebar.css"
import SidebarCategory from "./SidebarCategory.tsx";

function Sidebar() {
    return (
        <aside id="sidebar">
            <input type="search" placeholder="Search Swiss statistics..." id="sidebar-search" />
            <SidebarCategory name="Economy"
                             options={ [
                                 {name: "Average Income", value: 0},
                                 {name: "Minimum Income", value: 1}
                             ]} />
            <SidebarCategory name="Longevity"
                             options={ [
                                 {name: "Average Lifespan", value: 2}
                             ]} />
        </aside>
    );
}

export default Sidebar;