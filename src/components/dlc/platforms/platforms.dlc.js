import { Automatic } from "./Automatic/Automatic.js";
import { AmagProTime } from "./AmagProTime/AmagProTime.js";
import { DZBankProRes } from "./DZBankProRes/DZBankProres.js";
import { importPlatformsData } from "./platforms.import.js";
import { importPlatformCustomContent } from "./platforms.import.js";

export async function platformsContent() {
  let platformInfoData = await importPlatformsData()
  for (let plInfo of platformInfoData) {
    let plInfoKey = Object.keys(plInfo)
    let platformCustomContent = ''
    let platformCustomFunction
    let loadCustomFunction = false
    let platformCustomImports
    // if dlc has custom function true import html and funcktion
    if(plInfo[plInfoKey].platform_content === 'true') {
      platformCustomImports = await importPlatformCustomContent(plInfoKey)
      platformCustomContent = platformCustomImports.customContent
      loadCustomFunction = true
    }
    console.log(plInfo)
    // dlc array (Foldername aso used as ID for saving)
    // for new items, just make a new dls, add it here to the array, make logo in assets folder and add css in style/dlc folder
    let platformChild = `<label class="config-item dFlex">
                <div class="config-item-main-container dFlex">
                  <div class="config-item-radio-container dFlex">
                    <label class="radio-custom-container dFlex">
                      <input type="radio" class="radio-default" name="booking-platform"
                        value="bookingPlatform_`+ (plInfoKey) + `" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="config-item-logo-container flex config-item-logo-container--`+ (plInfo[plInfoKey].platform_id) + `">
                    <img src="assets/gfx/dlc/platforms/logos/`+ (plInfoKey) + `.png" class="icon-bookingItem" />
                  </div>
                  <div class="config-item-main flex">
                    <p class="text-label">`+ (plInfo[plInfoKey].platform_name) + `</p>
                  </div>
                </div>
                <div class="config-item-action-container flex">
                  <button class="button-primary" id="bookingPlatform_`+ (plInfoKey) + `">
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
              </label>`+(platformCustomContent)
    document.getElementById('window_bookingplatforms').innerHTML += platformChild
    if(loadCustomFunction){platformCustomContent = platformCustomImports.CustomFunction()}
  }
}

export async function platforms(bookingPlatformSelectValue, bookingData, detectionItems, dev_pttest) {

  let bookingFunctionName = bookingPlatformSelectValue.split("_").pop()
  let functionNameAutomatic = 'Automatic'
  let bookingFunctions = {
    AmagProTime: async function (bookingData, detectionItems, dev_pttest) { return await AmagProTime(bookingData, detectionItems, dev_pttest) },
    DZBankProRes: async function (bookingData, detectionItems, dev_pttest) { return await DZBankProRes(bookingData, detectionItems, dev_pttest) }
  };

  if (bookingFunctionName === functionNameAutomatic) {
    bookingFunctionName = await Automatic()
    bookingPlatformSelectValue = bookingPlatformSelectValue.replace(functionNameAutomatic, bookingFunctionName)
  }
  // filter detection items for booking platforms
  let allDetectionFilters = JSON.parse(detectionItems)
  let detectionFiltersMatch_booking = []
  let bookingsheetSearchValue = "select_" + bookingPlatformSelectValue

  for (let i = 0; i < allDetectionFilters.length; i++) {
    if (allDetectionFilters[i].bookingsheet === bookingsheetSearchValue) {
      detectionFiltersMatch_booking = [...detectionFiltersMatch_booking, allDetectionFilters[i]];
    }
  }

  return bookingFunctionName ? bookingFunctions[bookingFunctionName](bookingData, detectionFiltersMatch_booking, dev_pttest) : null
}