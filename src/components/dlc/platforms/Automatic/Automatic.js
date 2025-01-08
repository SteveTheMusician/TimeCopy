export async function Automatic() {

    try {
        let currentURL
        let automaticValue
        let queryOptions = { active: true, lastFocusedWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        if (!tab.url) {
            throw ({ errorstatus: 'error', errorheadline: 'Chrome Window URL', errortext: '"Automatisch" konnte nicht auf die Chrome-Tab API zugreifen. Vermutlich ist ein leeres Fenster geöffnet oder es gibt andere Probleme mit der URL.' })
        }
        currentURL = tab.url
        let tc_s_dlcplatforminformations = localStorage.getItem('tc_s_dlcplatforminformations')
        tc_s_dlcplatforminformations = JSON.parse(tc_s_dlcplatforminformations)
        let foundPlatformInformationObject = tc_s_dlcplatforminformations.find(platformObj => {
            let key = Object.keys(platformObj)[0];
            if (currentURL.includes(platformObj[key].platform_url)) {
                return platformObj[key].platform_url
            }
        });
        try {
            if (foundPlatformInformationObject) {
                automaticValue = Object.keys(foundPlatformInformationObject)[0]
            } else {
                throw ({ errorstatus: 'error', errorheadline: '"Automatisch" konnte die URL nicht zuweisen.', errortext: '"Es gibt keine übereinstimmung zwischen deiner aktuellen Web-URL und einer der Buchungsplattformen. Das DLC "Automatisch" kann so keine Zuweisung treffen.' })
            }
        } catch (error) {
            throw error
        }
        return automaticValue
    } catch (error) {
        throw error
    }
}

