import { Automatic } from "./Automatic/Automatic.js";
import { AmagProTime } from "./AmagProTime/AmagProTime.js";
import { DZBankProRes } from "./DZBankProRes/DZBankProres.js";
import { importPlatforms } from "./platforms.import.js";
import { importPlatformCustomContent } from "./platforms.import.js";
import { importPlatformsData } from "./platforms.import.js";
import { platform_functionName_automatic } from "./platforms.import.js";

export async function platformsContent() {
  return new Promise(async (resolve) => { 
  let platformInfoData = localStorage.getItem('tc_s_dlcplatforminformations')
  if (!platformInfoData) {
    let importNewPlatformData = await importPlatformsData()
    try {
      if (importNewPlatformData) {
        console.log('dlc data created, restart time copy...')
        window.location.reload()
      } else {
        throw new Error('unable to import dlc platform data')
      }
    } catch (error) {
      console.log(error)
      window.location.reload()
    }
  } else {
    platformInfoData = JSON.parse(platformInfoData)
  }

  for (let plKey of importPlatforms) {
    let plDataObject = platformInfoData.find(item => item[plKey])[plKey]
    let platformCustomContent = ''
    let platformCustomImports
    let plattformImageFormat = '.png'
    if (plKey === platform_functionName_automatic) {
      plattformImageFormat = '.gif'
    }
    // if dlc has custom function true import html and function
    if (plDataObject.platform_content === 'true') {
      platformCustomImports = await importPlatformCustomContent(plKey)
      platformCustomContent = platformCustomImports.customContent
    }
    // dlc array (Foldername aso used as ID for saving)
    // for new items, just make a new dls, add it here to the array, make logo in assets folder and add css in style/dlc folder
    let platformChild = `<label class="config-item dlc-item dlc-item-platform dFlex">
                <div class="dlc-item-main-container dFlex">
                  <div class="config-item-main-container dFlex">
                    <div class="config-item-radio-container dFlex">
                      <label class="radio-custom-container dFlex">
                        <input type="radio" class="radio-default" name="booking-platform"
                          value="bookingPlatform_`+ (plKey) + `" />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <div class="config-item-logo-container flex config-item-logo-container--`+ (plDataObject.platform_id) + `">
                      <img src="assets/gfx/dlc/platforms/logos/`+ (plKey + plattformImageFormat) + `" class="icon-bookingItem" />
                    </div>
                    <div class="config-item-main flex">
                      <p class="text-label">`+ (plDataObject.platform_name) + `</p>
                    </div>
                  </div>
                  <div class="config-item-action-container flex">
                    <button class="button-primary button-dropdown" id="bookingPlatform_DropDown`+ (plKey) + `">
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
                </div>
                <div class="dlc-item-details-container dlc-details--hidden">
                  <div class="dlc-item-details_information-container">
                    <p class="text-label">Infos</p>
                    <p class="subtext">`+ (plDataObject.platform_description) +`</p>
                    <div class="dlc-item-details_information_version-container">
                      <p class="text-label">Version</p>
                      <div class="dlc-item-details_information_version-row dFlex">
                        <p class="subtext dlc-item-versionText-left">DLC-Version</p><p class="subtext dlc-item-versionText-right">`+ (plDataObject.platform_version) +`</p>
                      </div>
                      <div class="dlc-item-details_information_version-row dFlex">
                        <p class="subtext dlc-item-versionText-left">Erkennungs URL</p><p class="subtext dlc-item-versionText-right">`+ (plDataObject.platform_url) +`</p>
                      </div>
                    </div>
                  </div>
                  <div class="dlc-item-actions-container">
                  `+ (platformCustomContent) +`
                  </div>
                </div>
              </label>`
    document.getElementById('window_bookingplatforms').innerHTML += platformChild
  }
      resolve("DLC Content ready")
  })
}

export async function platforms(bookingPlatformSelectValue, bookingData, detectionItems, dev_pttest) {

  let dlc_bookingPlatformFunctions = []
  let bookingFunctionName = bookingPlatformSelectValue
  // create dynamic function array
  importPlatforms.forEach((plKey) => {
    dlc_bookingPlatformFunctions[plKey] = async function (bookingData, detectionItems, dev_pttest) { 
      return await AmagProTime(bookingData, detectionItems, dev_pttest); 
    };
  });

  if (bookingFunctionName === platform_functionName_automatic) {
    bookingFunctionName = await Automatic()
    bookingPlatformSelectValue = bookingPlatformSelectValue.replace(platform_functionName_automatic, bookingFunctionName)
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
  return bookingFunctionName ? dlc_bookingPlatformFunctions[bookingFunctionName](bookingData, detectionFiltersMatch_booking, dev_pttest) : null
}