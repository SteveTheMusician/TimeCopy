import { filter_SteveGoogleExcel } from "./SteveGoogleExcel/SteveGoogleExcel.js"
import { filter_TobiasExcel } from "./TobiasExcel/TobiasExcel.js"
import { importFilters } from "./filters.import.js"
import { importFiltersData } from "./filters.import.js"

// map filters
const filterFunctionsMap = {
  "SteveGoogleExcel": filter_SteveGoogleExcel,
  "TobiasExcel": filter_TobiasExcel
};

export async function filters(filter,clipboarsString) {
   let filteredTimesheetData = []
   filteredTimesheetData = filterFunctionsMap[filter](clipboarsString)
   return filteredTimesheetData
}

export async function filtersContent() {
  let loadedFiltersFeedbackArray = []
   return new Promise(async (resolve) => { 
   let filterInfoData = localStorage.getItem('tc_s_dlcFilterInformations')
   if (!filterInfoData) {
     let importNewFilterData = await importFiltersData()
     try {
       if (importNewFilterData) {
         console.warn('DLC Filters data created. Restart Time Copy.')
         window.location.reload()
       } else {
         throw new Error('Unable to import DLC Filter data')
       }
     } catch (error) {
       console.error(error)
       window.location.reload()
     }
   } else {
     filterInfoData = JSON.parse(filterInfoData)
   }
 
   for (let plKey of importFilters) {
     let plDataObject = filterInfoData.find(item => item[plKey])[plKey]
     let filterImageFormat = '.jpg'

     // dlc array (Foldername aso used as id for saving)
     // for new items, just make a new dlc, add it here to the array, make logo in static folder and add css in style/dlc folder
     let filterChild = `<label class="configItem dlcItem dlcItem-filter dlcItem-clickable dFlex" title="Filter wählen" id="dlcItemFilter_`+ (plDataObject.filter_id) +`">
                <div class="dlcItem-main-container dFlex">
                  <div class="dlcItem-main dFlex">
                    <div class="configItem-radio-container dFlex">
                        <label class="radio-custom-container dFlex">
                          <input type="radio" class="radio-default" value="timesheetfilter_`+ (plKey) + `" name="timesheet-filter" />
                          <span class="checkmark"></span>
                        </label>
                    </div>
                    <div class="configItem-icon-container flex configItem-icon-container--`+ (plDataObject.filter_id) + `">
                     <img src="static/DLC/Filters/`+ (plKey) + "/icon/" + (plKey + filterImageFormat) + `" class="icon-filterItem" />
                    </div>
                    <div class="dlcItem-headline-container flex">
                      <p class="text-label">`+ (plDataObject.filter_name) + `</p>
                    </div>
                  </div>
                  <div class="configItem-action-container flex">
                    <button class="button-primary button-dropdown" id="filter_DropDown`+ (plKey) + `">
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
                <div class="dlcItem-details-container dlc-details--hidden" tabindex="-1">
                  <div class="dlcItem-details_information-container">
                    <p class="text-label">Infos</p>
                    <p class="subtext">`+ (plDataObject.filter_description) +`</p>
                    <div class="dlcItem-details_information_version-container">
                      <p class="text-label">Version</p>
                      <div class="dlcItem-details_information_version-row dFlex">
                        <p class="subtext dlcItem-versionText-left">DLC-Version</p><p class="subtext dlcItem-versionText-right">`+ (plDataObject.filter_version) +`</p>
                      </div>
                    </div>
                  </div>
                </div>
              </label>`
     document.getElementById('window_timesheetfilters').innerHTML += filterChild
     loadedFiltersFeedbackArray.push(plDataObject.filter_id)
   }
    resolve({success:true,feedback:"🧩 [DLC: Filters] Content for "+loadedFiltersFeedbackArray+" loaded.",ids:loadedFiltersFeedbackArray})
   })
 }