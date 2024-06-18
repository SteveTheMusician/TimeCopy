// automatic functions
import { notification } from "../../../components/notification/notification.js";
import { amagProtime } from "../amagProtime/amagProtime.js";

export function automatic(bookingData){
    alert('automatic')
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
        var url = tabs[0].url;
        url = url.toString()
        if(url.includes('s4.amag.ch/protime')){
            amagProtime(bookingData)
        }else if(url.includes('DZBANK')) {
            // something
        }else {
            notification(true,"Buchung abgebrochen: Unbekannte URL")
        }
    });
    
}