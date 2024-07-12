// automatic functions
import { notification } from "../../../components/notification/notification.js";

export async function automatic(){

    let currentURL
    let automaticValue
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    currentURL = tab.url

    if(currentURL.includes('s4.amag.ch/protime')){
        automaticValue = "amagProTime"
    }else if(currentURL.includes('DZBANK-TEST')) {
        automaticValue = "DZ Bank TEST"
        // something
    }else {
        notification(true,false,"Buchung abgebrochen: Unbekannte URL")
        automaticValue = null
    } 
    return automaticValue  
}

