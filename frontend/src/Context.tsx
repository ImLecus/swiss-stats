import {createContext} from "react";

interface Context {
    selected: string;
    setSelected: (value: string) => void;
    setVisible: (visible: boolean) => void;
}
export const InfoContext = createContext<Context | undefined>(undefined);