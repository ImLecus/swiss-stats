export interface ContentElement {
    type: "text",
    label: string;
}

export interface HeadingElement {
    type: "heading",
    label: string;
}

export interface ImageElement {
    type: "image",
    src: string;
    alt: string;
}

export type Element = ContentElement | HeadingElement | ImageElement;

