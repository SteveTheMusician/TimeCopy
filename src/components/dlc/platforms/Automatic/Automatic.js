// automatic functions
import { notification } from "../../../ui/notification/notification.js";
import { message } from "../../../ui/message/message.js";

export async function Automatic(){

    let currentURL
    let automaticValue
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    currentURL = tab.url
    let tc_s_dlcplatforminformations = localStorage.getItem('tc_s_dlcplatforminformations')
    tc_s_dlcplatforminformations = JSON.parse(tc_s_dlcplatforminformations)
    let foundPlatformInformationObject = tc_s_dlcplatforminformations.find(platformObj => {
        let key = Object.keys(platformObj)[0];
        if(currentURL.includes(platformObj[key].platform_url)){
            return platformObj[key].platform_url
        }
    });
    try{
        if(foundPlatformInformationObject){ 
            automaticValue = Object.keys(foundPlatformInformationObject)[0]
        }else{
            throw new Error('"Automatisch" konnte die URL nicht zuweisen.')
        }
    }catch(error){
        message(true,'warning', error, 'Es gibt keine übereinstimmung zwischen deiner aktuellen Web-URL und einer der Buchungsplattformen. Das DLC "Automatisch" kann so keine Zuweisung treffen.')
        return
    }
    return automaticValue
}

