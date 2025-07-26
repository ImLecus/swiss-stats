import type Canton from "../interfaces/Canton.ts";
import renderCantonElement from "../renderers/CantonRenderer.tsx";
import cantons from "../assets/canton-info.json"
import {useContext} from "react";
import {InfoContext} from "../Context.tsx";
import Arrow from "../assets/arrow.svg";

const SidebarDetails = (props: {visible: boolean, canton: string} ) => {
    const info : Canton = cantons[props.canton as keyof typeof cantons] as Canton;
    const context = useContext(InfoContext);

    return (
        <aside id="sidebar-info" style={{transform: props.visible ? "translateX(0)" : "translateX(-100%)"}}>
            <div className="sidebar-return" onClick={() => context?.setVisible(false)}>
                <img src={Arrow} alt="arrow"/>
                <a>Return</a>
            </div>

            <img alt="canton-img" src={info?.header} id="sidebar-info-header"/>
            <div className="sidebar-content">
                <h2>{info?.name}</h2>
                <div style={{ display: "flex"}}>
                    <h4>Population: </h4>
                    <p>{info?.population}</p>
                </div>
                {
                    info?.content.map(e => renderCantonElement(e))
                }
            </div>
        </aside>
    );
}

export default SidebarDetails;