import {createContext} from "react";

interface Context {
    selected: string;
    visible: boolean;
    setSelected: (value: string) => void;
    setVisible: (visible: boolean) => void;
}
export const InfoContext = createContext<Context | undefined>(undefined);