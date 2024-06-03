import { amagProtime } from "./amagProtime/amagProtime.js";
import { automatic } from "./automatic/automatic.js";

export function bookingsheets(bookingplattform,bookingData) {
    if(bookingplattform === 'bookingplattform-protime') {
        amagProtime(bookingData)
    } else if(bookingplattform === 'bookingplattform-automatic') {
        automatic(bookingData)
    } else if(bookingplattform === '' || bookingplattform === null){
        console.log('No bookingsheet')
    }
}