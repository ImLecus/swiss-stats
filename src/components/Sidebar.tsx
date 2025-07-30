import "../styles/sidebar.css"
import CantonButton from "./CantonButton.tsx";
import cantons from "../assets/canton-info.json"
import {useState} from "react";
import { getCanton } from "../interfaces/Canton.ts";

function Sidebar() {
    const [search, setSearch] = useState("");
    return (
        <aside id="sidebar">
            <input type="search" placeholder="Search Swiss cantons..." id="sidebar-search"
                   onChange={e => setSearch(e.target.value)} />
            {
                Object.keys(cantons).filter(id => id != "default")
                                    .filter(id => getCanton(id).name.includes(search))
                                    .map(id =>    <CantonButton id={id} canton={getCanton(id)} key={id} />
                )
            }
        </aside>
    );
}

export default Sidebar;