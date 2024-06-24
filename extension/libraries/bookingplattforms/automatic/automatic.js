// automatic functions
import { notification } from "../../../components/notification/notification.js";
import { bookingplattforms } from "../bookingplattforms.js";

export async function automatic(bookingData){
    console.log('automatic')
    let automatic_bookingPlattform = ""

    
    async function getCurrentTab() {
        let queryOptions = { active: true, currentWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        return tab.url;
    }
    let currentURL = await getCurrentTab()
    
    console.log(currentURL)
      
  
    if(currentURL.includes('s4.amag.ch/protime')){
        automatic_bookingPlattform = "bookingplattform_amagProTime"
    }else if(currentURL.includes('DZBANK')) {
        // something
    }else {
        notification(true,"Buchung abgebrochen: Unbekannte URL")
    }     
    // x wert returnen herausfinden
    console.log("SELECTED: "+automatic_bookingPlattform)

    let bookingFunctions = {
        callplattforms: function (automatic_bookingPlattform,bookingData){return bookingplattforms(automatic_bookingPlattform,bookingData)},
    };
    return bookingFunctions['callplattforms'](automatic_bookingPlattform,bookingData);
       
}