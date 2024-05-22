import { amagProtime } from "./amagProtime/amagProtime.js";
import { automatic } from "./automatic/automatic.js";

export function bookingsheets(bookingsheet,bookingData) {
    if(bookingsheet === 'bookingplattform-protime') {
        amagProtime(bookingsheet,bookingData)
    } else if(bookingsheet === 'bookingplattform-automatic') {
        automatic(bookingsheet,bookingData)
    } else if(bookingsheet === '' || bookingsheet === null){
        console.log('No bookingsheet')
    }
}