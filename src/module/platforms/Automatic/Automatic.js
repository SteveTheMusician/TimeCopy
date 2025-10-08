import { setStatusBarText } from "../../../utils/setStatusBarText";
import { anyPlatformUrl } from "./variables/Automatic.variables";
export async function Automatic() {
    try {
        setStatusBarText(window.language.statusbartext_moduleAutomatic_isSelectingPlatform)
        let currentURL
        let automaticValue
        let queryOptions = { active: true, lastFocusedWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        if (!tab.url) {
            throw ({ errorstatus: 'error', errorheadline: 'Chrome Window URL', errortext: '"Automatisch" konnte nicht auf die Chrome-Tab API zugreifen. Vermutlich ist ein leeres Fenster geöffnet oder es gibt andere Probleme mit der URL.' })
        }
        currentURL = tab.url
        let tc_s_moduleplatforminformations = localStorage.getItem('tc_s_modulePlatformInformations')
        if(tc_s_moduleplatforminformations === null || tc_s_moduleplatforminformations === '') {
            throw ({ errorstatus: 'error', errorheadline: 'Automatisch konnte Storage nicht finden', errortext: 'Platforminformations Storage konnte nicht gelesen werden oder ist leer. (Bitte Entwickler kontaktieren)' })
        }
        tc_s_moduleplatforminformations = JSON.parse(tc_s_moduleplatforminformations)
        let foundPlatformInformationObject = tc_s_moduleplatforminformations.find(platformObj => {
            let key = Object.keys(platformObj)[0];
            if (currentURL.includes(platformObj[key].platform_url) || platformObj[key].platform_url === anyPlatformUrl) {
                return platformObj[key].platform_url
            } 
        });
        try {
            if (foundPlatformInformationObject) {
                automaticValue = Object.keys(foundPlatformInformationObject)[0]
            } else {
                throw ({ errorstatus: 'error', errorheadline: '"Automatisch" konnte die URL nicht zuweisen.', errortext: '"Es gibt keine übereinstimmung zwischen deiner aktuellen Web-URL und einer der Buchungsplattformen. Das Module "Automatisch" kann so keine Zuweisung treffen.' })
            }
        } catch (error) {
            throw error
        }
        return automaticValue
    } catch (error) {
        throw error
    }
}

