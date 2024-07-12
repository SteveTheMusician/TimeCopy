import { automatic } from "./automatic/automatic.js";
import { amagProTime } from "./amagProTime/amagProTime.js";
import { dzbankProRes } from "./dzBankProRes/dzBankProres.js";

export async function bookingplattforms(bookingPlattformSelectValue,bookingData,detectionItems,dev_pttest) {

    let bookingFunctionName = bookingPlattformSelectValue.split("_").pop()
    let functionNameAutomatic = 'automatic'
    let bookingFunctions = {
        // automatic: function (bookingData){return automatic(bookingData)},
        amagProTime: async function (bookingData,detectionItems,dev_pttest){return await amagProTime(bookingData,detectionItems,dev_pttest)},
        dzbankProRes: async function (bookingData,detectionItems,dev_pttest){return await dzbankProRes(bookingData,detectionItems,dev_pttest)}
    };

    if(bookingFunctionName === functionNameAutomatic) {
        bookingFunctionName = await automatic()
        bookingPlattformSelectValue = bookingPlattformSelectValue.replace(functionNameAutomatic ,bookingFunctionName)
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
 
    return bookingFunctionName ? bookingFunctions[bookingFunctionName](bookingData,detectionFiltersMatch_booking,dev_pttest): null
}
