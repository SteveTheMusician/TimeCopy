import { amagProtime } from "./amagProtime/amagProtime.js";

export function bookingsheets(bookingsheet,bookingData) {
    if(bookingsheet === 'amag-protime') {
        amagProtime(bookingsheet,bookingData)
    } else if(bookingsheet === '' || bookingsheet === null){
        console.log('No bookingsheet')
    } 
}