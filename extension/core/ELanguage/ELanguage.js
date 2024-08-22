// ELanguage for Time Copy
import languageData from "./lang/lang.json" with { type: "json" };
import AutoLang from './AutoLanguage.js'

const langISOCode = AutoLang()
const jsonObj = languageData
const langObj = jsonObj[langISOCode] ? jsonObj[langISOCode]: jsonObj["en"];

//set html lang attr to readed iso
// document.documentElement.lang = langISOCode;

export const getLang = () => langObj;
export const getLangVar = (key) => langObj[key]
