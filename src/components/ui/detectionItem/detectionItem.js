import { importPlatforms } from "../../../module/platforms/platforms.import.js"
import { importPlatformDetectionContent } from "../../../module/platforms/platforms.import.js"
import { moduleStorage_preValueSystem } from "../../../utils/modules/defaults/defaultModuleVariables.js"

export async function generateDetectionItemSelectOptions() {
  let platformSelectItems = []
  let platformInfoData = localStorage.getItem(moduleStorage_preValueSystem+'PlatformInformations')
  platformInfoData = JSON.parse(platformInfoData)
  let plDataObject = ''
  for (let plKey of importPlatforms){
    plDataObject = platformInfoData.find(item => item[plKey])[plKey]
    if(plKey !== 'Automatic'){
      let platformSelectOption = `<option value="select_bookingPlatform_`+(plKey)+`" >`+ (plDataObject.platform_name) +`</option>`
      platformSelectItems.push(platformSelectOption)
    }
  }
  return platformSelectItems
}

export async function detectionItem(detectionItems) {
  return new Promise(async (resolve, reject) => {
    try {
      async function generateDetectionPlatformContent(detectionItem) {
        const currentBookingsheet = detectionItem.bookingsheet;
        if(currentBookingsheet !== 'Automatic' && currentBookingsheet !== '') {
          try {
            const module = await importPlatformDetectionContent(currentBookingsheet);
            const htmlString = module.detectionHTML(detectionItem);
            if(htmlString.length > 1) {
              return htmlString;
            } else {
              throw Error ('Detection HTML-Content-Module has no length')
            }
          } catch (error) {
            console.error("Fehler beim Generieren des Detection-HTML:", error);
            return;
          }
        }
      }

      if (detectionItems) {
        const windowDetection = document.getElementById('window_detection')
        const platformOptions = await generateDetectionItemSelectOptions()
        const detectionItemHtml = detectionItems.map(async (detectionItem) => {

          return `<div class="configItem detectionItem ${detectionItem.bookingsheet? '': 'dFlex'}" name="item_detection" id="` + detectionItem.id + `">
            <div class="detectionItem-body dFlex">
              <div class="detectionItem-main"
                <div class="detectionItem-content-container">
                  <div class="configItem-content-row dFlex">
                    <div class="detectionItem-content detectionItem-title-container">
                      <input class="title-detectionItem" placeholder="Erkennungsmerkmal" id="detectionName_${detectionItem.id}" value="${detectionItem.title ? detectionItem.title : ''}"/>
                    </div>
                  </div>
                  <div class="configItem-content-row dFlex">
                    <div class="detectionItem-content-larger">
                      <select id="select_bookingPlatform_${detectionItem.id}" title="Weise der Erkennung eine Buchungsplatform zu.">
                        <option value="" selected disabled hidden>Zuordnung wählen</option>${platformOptions}
                      </select>
                    </div>
                  </div>
                </div>
                <div class="detectionItem-action-container flex">
                  <button class="button-primary button-dropdown ${detectionItem.viewall === 'true' ? 'button-dropdown--active' : ''} button_minimizeDetection ${detectionItem.bookingsheet ? '' : 'dNone'}" id="minimizeDetection_${detectionItem.id}" title="Minimieren / Maximieren">
                    <?xml version="1.0" encoding="utf-8"?>
                    <svg version="1.1" xmlns:serif="http://www.serif.com/"
                    	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1200 1200"
                    	 style="enable-background:new 0 0 1200 1200;" xml:space="preserve">
                    <path class="st0" d="M671.2,910.4l502.1-502.1c35.1-35.1,35.1-92.2,0-127.3c-35.1-35.1-92.2-35.1-127.3,0
                    	L599.6,727.3L153.4,281.1c-35.1-35.1-92.2-35.1-127.3,0C-9,316.3-9,373.3,26.2,408.4l510.3,510.3c35.1,35.1,92.2,35.1,127.3,0
                    	C666.4,916.1,668.9,913.3,671.2,910.4z"/>
                    </svg>
                  </button>
                  <button class="button-primary button-reset button_deleteDetection" title="Löschen" id="deleteDetection_${detectionItem.id}">
                    <?xml version="1.0" encoding="utf-8"?>
                    <!-- Designed by Empty Soul  -->
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       viewBox="0 0 1000 1000" style="enable-background:new 0 0 1000 1000;" xml:space="preserve">
                    <g>
                      <path d="M200.3,269.8v602.4c0,71.7,58.3,130,130,130h333.6c71.7,0,130-58.3,130-130V269.8H200.3z M733.9,872.2
                        c0,38.6-31.4,70-70,70H330.3c-38.6,0-70-31.4-70-70V329.8h473.6V872.2z"/>
                    </g>
                    <g>
                      <rect x="326" y="400.4" width="60" height="480.3"/>
                    </g>
                    <g>
                      <path d="M670,143.8c-4.6-33-16.7-63.6-35.2-88.2c-26-34.4-61.3-53.4-99.4-53.4H459c-38.2,0-73.5,19-99.4,53.4
                        c-18.5,24.6-30.7,55.2-35.2,88.2h-126v60h597.7v-60H670z M385,143.8c3.8-19.7,11.5-37.6,22.4-52.1c14.3-19,32.6-29.5,51.5-29.5
                        h76.4c18.9,0,37.2,10.5,51.5,29.5c10.9,14.5,18.5,32.4,22.4,52.1H385z"/>
                    </g>
                    <g>
                      <rect x="612" y="400.4" width="60" height="480.3"/>
                    </g>
                    <g>
                      <rect x="467.2" y="400.4" width="60" height="480.3"/>
                    </g>
                    </svg>                  
                  </button>
                </div>
              </div>
              <div class="detectionItem-module dFlex detectionItem-module--${detectionItem.bookingsheet} ${detectionItem.viewall === 'true' ? '' : ' detectionItem-module--hidden'}">
                <!-- inividual content -->
                <div class="detectionItem-module-content ${detectionItem.bookingsheet? '': 'dNone'}">
                  ${detectionItem.bookingsheet? await generateDetectionPlatformContent(detectionItem):''}
                </div>
              </div>
          </div>
        </div>` 
        })
        const htmlArray = await Promise.all(detectionItemHtml)
        windowDetection.innerHTML = htmlArray.join('')
      }
      resolve({success:true,feedback:"Detection Items generated"})
    } catch (error){
      reject({success:false,feedback:"Failed to generate detection items | "+error})
    }
  })
}

