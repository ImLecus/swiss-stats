import {type Canton, getCanton} from "../interfaces/Canton.ts";
import renderCantonElement from "../renderers/CantonRenderer.tsx";
import {useContext} from "react";
import {InfoContext} from "../Context.tsx";
import Arrow from "../assets/svg/arrow.svg";
import ArrowDark from "../assets/svg/arrow-dark.svg";

const SidebarDetails = (props: {visible: boolean, canton: string} ) => {
    const info : Canton = getCanton(props.canton);
    const context = useContext(InfoContext);

    function getLanguageEmoji(language: string){
        switch(language){
            case "swiss-german":
                return "🇩🇪";
            case "french":
                return "🇫🇷";
            case "italian":
                return "🇮🇹";
            default:
                return "❔"
        }
    }

    return (
        <aside id="sidebar-info" style={{transform: props.visible ? "translateX(0)" : "translateX(-120%)"}}>
            <div className="sidebar-return" onClick={() => context?.setVisible(false)}>
                <picture>
                    <source srcSet={ArrowDark} media="(prefers-color-scheme: dark)"/>
                    <img src={Arrow} alt="arrow" width={20}/>
                </picture>
                <a>Return</a>
            </div>

            <img alt="canton-img" src={info?.header ?? "null"} id="sidebar-info-header"/>
            <div className="sidebar-content">
                <h2>{info?.name}</h2>
                <div className="sidebar-item">
                    <h4>Population:</h4>
                    <p>~{info?.population} citizens</p>
                </div>
                <div className="sidebar-item">
                    <h4>Languages:</h4>
                    <div>
                        {
                            info?.languages.map(lang => 
                                <p>{getLanguageEmoji(lang)}</p>
                            )
                        }
                    </div>
                </div>
                {
                    info?.content.map(e => renderCantonElement(e))
                }
            </div>
        </aside>
    );
}

export default SidebarDetails;