// automatic functions
import { amagProtime } from "../amagProtime/amagProtime.js";

export function automatic(){
    alert('automatic')
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
        var url = tabs[0].url;
        if(url.toString().includes('s4.amag.ch/protime')){
            alert('protime')
        }else {
            alert('unknown url')
        }
    });
    
}