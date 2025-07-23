import { Automatic } from "./Automatic/Automatic.js";
import { AmagProTime } from "./AmagProTime/AmagProTime.js";
import { importPlatforms } from "./platforms.import.js";
import { importPlatformCustomContent } from "./platforms.import.js";
import { importPlatformsData } from "./platforms.import.js";
import { platform_functionName_automatic } from "./platforms.import.js";

// dlc function import / static map cuz eval is unsave
const platformFunctionsMap = {
  "AmagProTime": AmagProTime,
  "Automatic": Automatic,
};

async function importNewPlatformData(){
  let importNewPlatformData = await importPlatformsData()
  try {
    if (importNewPlatformData) {
      console.log('DLC Platform data created. Restart Time Copy.')
      window.location.reload()
    } else {
      throw new Error('Unable to import DLC Platform data')
    }
  } catch (error) {
    console.log(error)
    window.location.reload()
  }
}

export async function platformsContent() {
  let loadedPlatformsFeedbackArray = []
  return new Promise(async (resolve) => { 
    let platformInfoData = localStorage.getItem('tc_s_dlcPlatformInformations')
    if (!platformInfoData) {
      await importNewPlatformData()
    } else {
      platformInfoData = JSON.parse(platformInfoData)
    }
    for (let plKey of importPlatforms) {
      // generate dlc items for each platform
      // if a new dlc is imported, it would crash, cuz there is no cached data for it.
      // to slove this: if error -> throw it and try to restart plugin (with cleaned dlc cache and new data)
      let plDataObject = ''
      try{
        plDataObject = platformInfoData.find(item => item[plKey])[plKey]
        if(!plDataObject){
          throw new Error('[DLC: Platforms] ERROR')
        }
      }catch(error){
        console.log(error)
        console.log('Restart Time Copy Extension.')
        localStorage.removeItem('tc_s_dlcPlatformInformations')
        importNewPlatformData()
        return
      }
      let platformCustomContent = ''
      let platformCustomAppFunctions = ''
      let platformCustomImports
      let platformImageFormat = '.png'
      if (plKey === platform_functionName_automatic) {
        platformImageFormat = '.gif'
      }
      // if dlc has custom function true import html and function
      if (plDataObject.platform_content === 'true') {
        platformCustomImports = await importPlatformCustomContent(plKey)
        platformCustomContent = platformCustomImports.customContent
        platformCustomImports.customAppFunctions ? platformCustomAppFunctions = platformCustomImports.customAppFunctions: ''
      }
      // dlc item
      let platformChild = `<label class="configItem dlcItem dlcItem-platform dlcItem-clickable dFlex" title="Platform wählen" id="dlcItemPlatform_`+ (plDataObject.platform_id) +`">
                  <div class="dlcItem-main-container dFlex">
                    <div class="dlcItem-main dFlex">
                      <div class="configItem-radio-container dFlex">
                        <label class="radio-custom-container dFlex">
                          <input type="radio" class="radio-default" name="booking-platform"
                            value="bookingPlatform_`+ (plKey) + `" />
                          <span class="checkmark"></span>
                        </label>
                      </div>
                      <div class="configItem-logo-container flex configItem-logo-container--`+ (plDataObject.platform_id) + `">
                        <img src="static/DLC/Platforms/`+ (plKey) + '/logo/' + (plKey + platformImageFormat) + `" class="icon-bookingItem" />
                      </div>
                      <div class="dlcItem-headline-container flex">
                        <p class="text-label">`+ (plDataObject.platform_name) + `</p>
                      </div>
                    </div>
                    <div class="configItem-action-container flex">
                      <button class="button-primary button-dropdown" id="bookingPlatform_DropDown`+ (plKey) + `">
                        <?xml version="1.0" encoding="utf-8"?>
                        <svg version="1.1" xmlns:serif="http://www.serif.com/"
                        	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1200 1200"
                        	 style="enable-background:new 0 0 1200 1200;" xml:space="preserve">
                        <path id="downarrow_smooth" class="st0" d="M671.2,910.4l502.1-502.1c35.1-35.1,35.1-92.2,0-127.3c-35.1-35.1-92.2-35.1-127.3,0
                        	L599.6,727.3L153.4,281.1c-35.1-35.1-92.2-35.1-127.3,0C-9,316.3-9,373.3,26.2,408.4l510.3,510.3c35.1,35.1,92.2,35.1,127.3,0
                        	C666.4,916.1,668.9,913.3,671.2,910.4z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="dlcItem-details-container dlc-details--hidden `+(platformCustomContent ? 'scrollableVisible' : '')+`" tabindex="-1">
                    <div class="dlcItem-details_information-container">
                      <p class="text-label">Infos</p>
                      <p class="subtext">`+ (plDataObject.platform_description) +`</p>
                      <div class="dlcItem-details_information_version-container">
                        <p class="text-label">Version</p>
                        <div class="dlcItem-details_information_version-row dFlex">
                          <p class="subtext dlcItem-versionText-left">DLC-Version</p><p class="subtext dlcItem-versionText-right">`+ (plDataObject.platform_version) +`</p>
                        </div>
                        <div class="dlcItem-details_information_version-row dFlex">
                          <p class="subtext dlcItem-versionText-left">Erkennungs URL</p><p class="subtext dlcItem-versionText-right">`+ (plDataObject.platform_url) +`</p>
                        </div>
                      </div>
                    </div>
                    <div class="dlcItem-actions-container">
                    `+ (platformCustomContent) +`
                    </div>
                  </div>
                </label>`
      document.getElementById('window_bookingplatforms').innerHTML += platformChild
      loadedPlatformsFeedbackArray.push(plDataObject.platform_id)
      platformCustomAppFunctions
    }
    resolve({success:true,feedback:"🧩 [DLC: Pltforms] Content for "+loadedPlatformsFeedbackArray+" loaded.",ids:loadedPlatformsFeedbackArray})
  })
}

export async function platforms(bookingPlatformSelectValue, bookingData, detectionItems) {
  let bookingFunctionName = bookingPlatformSelectValue
  // if "Automatic" then wait for new Value
  if (bookingFunctionName === platform_functionName_automatic) {
    try {
      bookingFunctionName = await Automatic()
      if(!bookingFunctionName) {
        throw ({ errorstatus: 'error', errorheadline: 'Automatische Zuweisung fehlgeschlagen', errortext: 'Automatisch hat keinen Wert zurückgegeben. Bitte Starten Sie das PlugIn erneut.' })
      }
    } catch(error){
      console.error(error.errortext+"| platforms .133")
      throw error
    }
    bookingPlatformSelectValue = bookingPlatformSelectValue.replace(platform_functionName_automatic, bookingFunctionName)
  }
  // filter detection items for booking platforms
  let allDetectionFilters = JSON.parse(detectionItems)
  let detectionFiltersMatch_booking = []
  let bookingsheetSearchValue = bookingPlatformSelectValue
  for (let i = 0; i < allDetectionFilters.length; i++) {
    if (allDetectionFilters[i].bookingsheet === bookingsheetSearchValue) {
      detectionFiltersMatch_booking = [...detectionFiltersMatch_booking, allDetectionFilters[i]];
    }
  }
  return bookingFunctionName ? platformFunctionsMap[bookingFunctionName](bookingData, detectionFiltersMatch_booking) : null
}

