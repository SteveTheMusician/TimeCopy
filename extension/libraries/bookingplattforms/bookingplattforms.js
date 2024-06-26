import { automatic } from "./automatic/automatic.js";
import { amagProTime } from "./amagProtime/amagProtime.js";
import { dzbankProRes } from "./dzBankProRes/dzBankProres.js";

export async function bookingplattforms(bookingPlattformSelectValue,bookingData,detectionItems) {

    let bookingFunctionName = bookingPlattformSelectValue.split("_").pop()
    let functionNameAutomatic = 'automatic'
    let bookingFunctions = {
        // automatic: function (bookingData){return automatic(bookingData)},
        amagProTime: async function (bookingData,detectionItems){return await amagProTime(bookingData,detectionItems)},
        dzbankProRes: async function (bookingData,detectionItems){return await dzbankProRes(bookingData,detectionItems)}
    };

    if(bookingFunctionName === functionNameAutomatic) {
        bookingFunctionName = await automatic()
        bookingPlattformSelectValue = bookingPlattformSelectValue.replace(functionNameAutomatic ,bookingFunctionName )
    }
    // filter detection items for booking plattforms
    let allDetectionFilters = JSON.parse(detectionItems)
    let detectionFiltersMatch_booking = []
    let bookingsheetSearchValue = "select_"+bookingPlattformSelectValue

    for (let i= 0; i<allDetectionFilters.length; i++) {
        if (allDetectionFilters[i].bookingsheet ===  bookingsheetSearchValue) {
            detectionFiltersMatch_booking = [...detectionFiltersMatch_booking, allDetectionFilters[i]];
        }
    }
 
    return bookingFunctionName ? bookingFunctions[bookingFunctionName](bookingData,detectionFiltersMatch_booking): null
}
