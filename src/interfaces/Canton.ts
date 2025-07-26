import type {Element} from "./InfoElement.ts";
import cantons from "../assets/canton-info.json";

export default interface Canton {
    name: string,
    population: number,
    language: string,
    header: string,
    content: Element[],
}

export const getCanton = (name: string) : Canton => (
    cantons[name as keyof typeof cantons] as Canton
)