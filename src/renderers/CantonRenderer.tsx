import type {Element} from "../interfaces/InfoElement.ts";
import type {ReactElement} from "react";

let INSTANCE = 0;

export default function renderCantonElement(element: Element) : ReactElement | null {
    INSTANCE++;
    switch (element.type) {
        case "text":
            return <p key={INSTANCE}>{element.label}</p>;
        case "heading":
            return <h3 key={INSTANCE}>{element.label}</h3>;
        case "image":
            return <img key={INSTANCE} src={element.src} alt={element.alt}/>
        default:
            return null;
    }
}