import { defaultLanguage } from "./defaults/defaultVariables";

export async function getLanguage(userlanguage) {
    let language = userlanguage ?? defaultLanguage;
    
    try {
        let languageData = await import(`../../public/static/Language/${language}.json`);
        return languageData.default;
    } catch (error) {
        console.error("Error loading language: ", error);
        return {}; 
    }
}

export async function useLanguage(userLanguage) {
    try {
        let getlang = await getLanguage(userLanguage);
        return getlang; 
    } catch (e) {
        console.error("Error using language: ", e);
        return {}; 
    }
}
