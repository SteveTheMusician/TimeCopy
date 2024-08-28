import { Automatic } from "./Automatic/Automatic.js";
import { AmagProTime } from "./AmagProtime/AmagProTime.js";
import { DZBankProRes } from "./DZBankProRes/DZBankProres.js";



export async function plattforms(bookingPlattformSelectValue, bookingData, detectionItems, dev_pttest) {

    let bookingFunctionName = bookingPlattformSelectValue.split("_").pop()
    let functionNameAutomatic = 'Automatic'
    let bookingFunctions = {
        AmagProTime: async function (bookingData, detectionItems, dev_pttest) { return await AmagProTime(bookingData, detectionItems, dev_pttest) },
        DZBankProRes: async function (bookingData, detectionItems, dev_pttest) { return await DZBankProRes(bookingData, detectionItems, dev_pttest) }
    };

    if (bookingFunctionName === functionNameAutomatic) {
        bookingFunctionName = await Automatic()
        bookingPlattformSelectValue = bookingPlattformSelectValue.replace(functionNameAutomatic, bookingFunctionName)
    }
    // filter detection items for booking plattforms
    let allDetectionFilters = JSON.parse(detectionItems)
    let detectionFiltersMatch_booking = []
    let bookingsheetSearchValue = "select_" + bookingPlattformSelectValue

    for (let i = 0; i < allDetectionFilters.length; i++) {
        if (allDetectionFilters[i].bookingsheet === bookingsheetSearchValue) {
            detectionFiltersMatch_booking = [...detectionFiltersMatch_booking, allDetectionFilters[i]];
        }
    }

    return bookingFunctionName ? bookingFunctions[bookingFunctionName](bookingData, detectionFiltersMatch_booking, dev_pttest) : null
}

export async function plattformsContent() {
    const importPlattforms = ["Automatic","AmagProTime","DZBankProRes"]

    for (let importedPlattform of importPlattforms) {
        let infoData = Promise.resolve(import(`./${importedPlattform}/info.json`))
        await infoData.then(plInfo => {
          let plattformChild = `<label class="config-item dFlex">
                <div class="config-item-main-container dFlex">
                  <div class="config-item-radio-container dFlex">
                    <label class="radio-custom-container dFlex">
                      <input type="radio" class="radio-default" name="booking-plattform"
                        value="bookingPlattform_`+(plInfo.plattform_id)+`" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="config-item-logo-container flex config-item-logo-container--`+(plInfo.plattform_id)+`">
                    <img src="assets/gfx/dlc/plattforms/logos/`+(importedPlattform)+`.png" class="icon-bookingItem" />
                  </div>
                  <div class="config-item-main flex">
                    <p class="text-label">`+(plInfo.plattform_name)+`</p>
                  </div>
                </div>
                <div class="config-item-action-container flex">
                  <button class="button-primary" id="bookingPlatform_`+(importedPlattform)+`">
                    <?xml version="1.0" encoding="utf-8"?>
                    <svg version="1.1" id="DownArrow" xmlns:serif="http://www.serif.com/"
                    	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1200 1200"
                    	 style="enable-background:new 0 0 1200 1200;" xml:space="preserve">
                    <path id="downarrow_smooth" class="st0" d="M671.2,910.4l502.1-502.1c35.1-35.1,35.1-92.2,0-127.3c-35.1-35.1-92.2-35.1-127.3,0
                    	L599.6,727.3L153.4,281.1c-35.1-35.1-92.2-35.1-127.3,0C-9,316.3-9,373.3,26.2,408.4l510.3,510.3c35.1,35.1,92.2,35.1,127.3,0
                    	C666.4,916.1,668.9,913.3,671.2,910.4z"/>
                    </svg>
                  </button>
                </div>
              </label>`
              document.getElementById('window_bookingplattforms').innerHTML += plattformChild
        });
    }}