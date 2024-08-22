// ELanguage for Time Copy
import languageData from "./lang/lang.json" with { type: "json" };
import AutoLang from './AutoLanguage.js'

export function getLang(langISOCode) {
    const jsonObj = languageData
    const langObj = jsonObj[langISOCode] ? jsonObj[langISOCode]: jsonObj["en"];
    return langObj
}

