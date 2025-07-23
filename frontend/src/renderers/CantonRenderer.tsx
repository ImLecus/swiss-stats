import type {Element} from "../interfaces/InfoElement.ts";
import type {ReactElement} from "react";

export default function renderCantonElement(element: Element) : ReactElement | null {
    switch (element.type) {
        case "text":
            return <p>{element.label}</p>;
        case "heading":
            return <h3>{element.label}</h3>;
        case "image":
            return <img src={element.src} />
        default:
            return null;
    }
}