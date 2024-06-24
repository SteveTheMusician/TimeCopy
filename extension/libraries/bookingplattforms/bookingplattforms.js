import { automatic } from "./automatic/automatic.js";
import { amagProTime } from "./amagProtime/amagProtime.js";
import { dzbankProRes } from "./dzBankProRes/dzBankProres.js";

export function bookingplattforms(bookingPlattform,bookingData) {
    // alert entfernen
    console.log("Plattform: "+bookingPlattform,bookingData)
    let bookingFunctionName = bookingPlattform.split("_").pop()
    let bookingFunctions = {
        automatic: function (bookingData){return automatic(bookingData)},
        amagProTime: function (bookingData){return amagProTime(bookingData)},
        dzbankProRes: function (bookingData){return dzbankProRes(bookingData)}
    };
    return bookingFunctions[bookingFunctionName](bookingData);
}

