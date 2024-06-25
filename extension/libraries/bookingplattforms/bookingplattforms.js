import { automatic } from "./automatic/automatic.js";
import { amagProTime } from "./amagProtime/amagProtime.js";
import { dzbankProRes } from "./dzBankProRes/dzBankProres.js";

export async function bookingplattforms(bookingPlattformSelectValue,bookingData,detectionItems) {

    let bookingFunctionName = bookingPlattformSelectValue.split("_").pop()
    let bookingFunctions = {
        // automatic: function (bookingData){return automatic(bookingData)},
        amagProTime: function (bookingData,detectionItems){return amagProTime(bookingData,detectionItems)},
        dzbankProRes: function (bookingData,detectionItems){return dzbankProRes(bookingData,detectionItems)}
    };

    if(bookingFunctionName === 'automatic') {
        bookingFunctionName = await automatic()
    }
    // filter detection items for booking plattforms
    let allDetectionFilters = JSON.parse(detectionItems)
    let detectionFiltersMatch_booking = []
    let bookingsheetSearchValue = "select_"+bookingPlattformSelectValue

    for (let i= 0; i<allDetectionFilters.length; i++) {
        console.log(allDetectionFilters[i].bookingsheet)
        if (allDetectionFilters[i].bookingsheet ===  bookingsheetSearchValue) {
            detectionFiltersMatch_booking = [...detectionFiltersMatch_booking, allDetectionFilters[i]];
        }
    } 
 
    return bookingFunctionName ? bookingFunctions[bookingFunctionName](bookingData,detectionFiltersMatch_booking): null
}
