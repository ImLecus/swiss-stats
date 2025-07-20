import {useState} from "react";
import "../styles/sidebar.css"

interface Option {
    name: string,
    value: number | string,
}

function SidebarCategory(props: {name: string, options: Array<Option>}) {
    const [open, setOpen] = useState(false);

    const elements = props.options.map(opt => (
        <div className="sidebar-element">{opt.name}</div>
    ))

    return (
        <div className="sidebar-category-container">
            <div id="sidebar-category-header" onClick={() => setOpen(!open)}>{props.name}</div>
            {open && elements}
        </div>
    );
}

export default SidebarCategory;