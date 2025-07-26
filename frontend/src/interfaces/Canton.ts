import type {Element} from "./InfoElement.ts";

export default interface Canton {
    name: string,
    population: number,
    language: string,
    header: string,
    content: Element[],
}