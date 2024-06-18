import { amagProtime } from "./amagProtime/amagProtime.js";
import { automatic } from "./automatic/automatic.js";

export function bookingplattforms(bookingplattform,bookingData) {
    if(bookingplattform === 'bookingplattform-protime') {
        return amagProtime(bookingData)
    } else if(bookingplattform === 'bookingplattform-automatic') {
        automatic(bookingData)
    } else if(bookingplattform === '' || bookingplattform === null){
        console.log('No bookingsheet')
    }
}