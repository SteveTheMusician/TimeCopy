// automatic functions
import { notification } from "../../../ui/notification/notification.js";

export async function Automatic(){

    let currentURL
    let automaticValue
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    currentURL = tab.url

    if(currentURL.includes('s4.amag.ch/protime')){
        automaticValue = "AmagProTime"
    }else if(currentURL.includes('DZBANK-TEST')) {
        automaticValue = "DZ Bank TEST"
        // something
    }else {
        notification(true,false,"Buchung abgebrochen: Unbekannte URL")
        automaticValue = null
    } 
    return automaticValue  
}

