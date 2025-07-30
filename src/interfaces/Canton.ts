import type {Element} from "./InfoElement.ts";
import cantons from "../assets/canton-info.json";

export interface Canton {
    name: string,
    population: number,
    language: string,
    header: string | null,
    content: Element[],
}

export const getCanton = (name: string) : Canton => {
    if(!Object.keys(cantons).includes(name)) {
        return cantons["default"] as Canton;
    }
    return cantons[name as keyof typeof cantons] as Canton;
}