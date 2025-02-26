import { defaultLanguage } from "./defaults/defaultVariables";

export async function getLanguage(userlanguage) {
    let language = userlanguage ?? defaultLanguage;
    try {
        let languageData = await import(`../../public/static/Language/${language}.json`);
        return languageData.default;
    } catch (error) {
        throw error 
    }
}

export async function useLanguage(userLanguage) {
    try {
        let getlang = await getLanguage(userLanguage);
        return getlang; 
    } catch (error) {
        // console.error("Error using language: ", e);
        throw error; 
    }
}
