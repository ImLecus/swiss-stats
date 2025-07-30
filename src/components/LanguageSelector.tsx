import {useState} from "react";
import LangIcon from "../assets/svg/lang.svg";
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
        icon: "🇬🇧",
    },
    {
        name: "Español",
        code: "es",
        icon: "🇪🇸",
    },
    {
        name: "Deutsch",
        code: "de",
        icon: "🇩🇪",
    },
    {
        name: "Français",
        code: "fr",
        icon: "🇫🇷"
    }
]

function LanguageSelector() {
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState("en");

    return (
        <div id="language-selector-wrapper">
            <button id="language-selector" onClick={() => setOpen(!open)}>
                <img src={LangIcon} alt="lang"/>
                <span>Language</span>
            </button>
            <div id="language-selector-content" style={{height: open ? "100%" : "0%", opacity: open? 1 : 0}}>
                {
                    languages.map(language => (
                        <button key={language.code} className="language" onClick={() => {
                            setLanguage(language.code);
                            setOpen(false);
                        }}>
                            <span>{language.icon}</span>
                            <span>{language.name}</span>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default LanguageSelector;