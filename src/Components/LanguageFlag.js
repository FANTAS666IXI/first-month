import { useContext } from "react";
import { TranslationsContext } from "../Contexts/TranslationsContext";

function LanguageFlag() {
    const { language, changeLanguage } = useContext(TranslationsContext);

    return (
        <div className="language-flag-container">
            <img
                className="language-flag"
                src={`flags/${language}.png`}
                alt={`Language Flag ${language}`}
                onClick={changeLanguage}
            />
        </div>
    );
}

export default LanguageFlag;
