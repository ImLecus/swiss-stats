import "../styles/canton-button.css"
import {useContext} from "react";
import {InfoContext} from "../Context.tsx";
import type {Canton} from "../interfaces/Canton.ts";

const CantonButton = (props: {id: string, canton: Canton}) =>{
    const context = useContext(InfoContext);
    return(
        <div className="canton-button" onClick={() => {
                context?.setSelected(props.id);
                context?.setVisible(true);
            }}>
            <img alt={props.canton.name} src={props.canton.header} />
            <h3>{props.canton.name}</h3>
        </div>
    );
}

export default CantonButton;