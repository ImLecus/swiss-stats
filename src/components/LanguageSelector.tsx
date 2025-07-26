import {useState} from "react";
import LangIcon from "../assets/lang.svg";
import "../styles/language-selector.css";

interface Language {
    name: string;
    code: string;
    icon: string;
}

const languages: Language[] = [
    {
        name: "English",
        code: "en",
        icon: "en",
    },
    {
        name: "Español",
        code: "es",
        icon: "es",
    },
    {
        name: "Deutsch",
        code: "de",
        icon: "de",
    },
    {
        name: "Français",
        code: "fr",
        icon: "fr"
    }
]

function LanguageSelector() {
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState("en");

    return (
        <div id="language-selector-wrapper">
            <button id="language-selector" onClick={() => setOpen(true)}>
                <img src={LangIcon} alt="lang"/>
                <span>Language</span>
            </button>
            {
                open && languages.map(language => (
                    <button className="language" onClick={() => {
                        setLanguage(language.code);
                        setOpen(false);
                    }}>
                        <img src={language.icon} alt={language.code} />
                        <span>{language.name}</span>
                    </button>
                ))
            }
        </div>
    )
}

export default LanguageSelector;