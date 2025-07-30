import type Canton from "../interfaces/Canton.ts";
import renderCantonElement from "../renderers/CantonRenderer.tsx";
import cantons from "../assets/canton-info.json"
import {useContext} from "react";
import {InfoContext} from "../Context.tsx";
import Arrow from "../assets/arrow.svg";
import ArrowDark from "../assets/arrow-dark.svg";

const SidebarDetails = (props: {visible: boolean, canton: string} ) => {
    const info : Canton = cantons[props.canton as keyof typeof cantons] as Canton;
    const context = useContext(InfoContext);

    return (
        <aside id="sidebar-info" style={{transform: props.visible ? "translateX(0)" : "translateX(-100%)"}}>
            <div className="sidebar-return" onClick={() => context?.setVisible(false)}>
                <picture>
                    <source srcSet={ArrowDark} media="(prefers-color-scheme: dark)"/>
                    <img src={Arrow} alt="arrow" width={20}/>
                </picture>
                <a>Return</a>
            </div>

            <img alt="canton-img" src={info?.header} id="sidebar-info-header"/>
            <div className="sidebar-content">
                <h2>{info?.name}</h2>
                <div className="sidebar-item">
                    <h4>Population:</h4>
                    <p>{info?.population}</p>
                </div>
                <div className="sidebar-item">
                    <h4>Languages:</h4>
                    <p>{info?.language}</p>
                </div>
                {
                    info?.content.map(e => renderCantonElement(e))
                }
            </div>
        </aside>
    );
}

export default SidebarDetails;