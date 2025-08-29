import { filter_SteveGoogleExcel } from "./SteveGoogleExcel/SteveGoogleExcel.js"
import { filter_TobiasExcel } from "./TobiasExcel/TobiasExcel.js"
import { filter_None } from "./None/None.js"
import { importFilters } from "./filters.import.js"
import { importFiltersData } from "./filters.import.js"
import { reimportModuleStorageData } from "../../utils/moduleGlobaUtils.js"

const selfId = 'filters'
// map filters
const filterFunctionsMap = {
  "SteveGoogleExcel": filter_SteveGoogleExcel,
  "TobiasExcel": filter_TobiasExcel,
  "None": filter_None
};

export async function filters(filter,clipboarsString) {
   let filteredTimesheetData = []
   filteredTimesheetData = filterFunctionsMap[filter](clipboarsString)
   return filteredTimesheetData
}

export async function filtersContent() {
  let loadedFiltersFeedbackArray = []
  return new Promise(async (resolve, reject) => { 
  let filterInfoData = localStorage.getItem('tc_s_moduleFilterInformations')
  if (!filterInfoData) {
    importFiltersData()
  } else {
    filterInfoData = JSON.parse(filterInfoData)
  }
 
  for (let plKey of importFilters) {
    let plDataObject = ''
    try {
      plDataObject = filterInfoData.find(item => item[plKey])[plKey] ?? ''
      if(!plDataObject){
        throw new Error('[Module: Filters] ERROR')
      }
    } catch (error) {
      console.log(error)
      localStorage.removeItem('tc_s_moduleFilterInformations')
      reimportModuleStorageData(selfId)
      return
    }
    if(plDataObject === '') {
      console.log('---ERROR')
    }
    let filterImageFormat = '.jpg'
    // module array (Foldername aso used as id for saving)
    // for new items, just make a new module, add it here to the array, make logo in static folder and add css in style/module folder
    let filterChild = `<label class="configItem moduleItem moduleItem-filter moduleItem-clickable dFlex" title="Filter wählen" id="moduleItemFilter_`+ (plDataObject.filter_id) +`">
               <div class="moduleItem-main-container dFlex">
                 <div class="moduleItem-main dFlex">
                   <div class="configItem-radio-container dFlex">
                       <label class="radio-custom-container dFlex">
                         <input type="radio" class="radio-default" value="timesheetfilter_`+ (plKey) + `" name="timesheet-filter" />
                         <span class="checkmark"></span>
                       </label>
                   </div>
                   <div class="configItem-icon-container flex configItem-icon-container--`+ (plDataObject.filter_id) + `">
                    <img src="static/Module/Filters/`+ (plKey) + "/icon/" + (plKey + filterImageFormat) + `" class="icon-filterItem" />
                   </div>
                   <div class="moduleItem-headline-container flex">
                     <p class="text-label">`+ (plDataObject.filter_name) + `</p>
                   </div>
                 </div>
                 <div class="configItem-action-container flex">
                   <button class="button-primary button-dropdown" id="filter_DropDown`+ (plKey) + `">
                     <?xml version="1.0" encoding="utf-8"?>
                     <svg version="1.1" xmlns:serif="http://www.serif.com/"
                     	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1200 1200"
                     	 style="enable-background:new 0 0 1200 1200;" xml:space="preserve">
                     <path class="st0" d="M671.2,910.4l502.1-502.1c35.1-35.1,35.1-92.2,0-127.3c-35.1-35.1-92.2-35.1-127.3,0
                     	L599.6,727.3L153.4,281.1c-35.1-35.1-92.2-35.1-127.3,0C-9,316.3-9,373.3,26.2,408.4l510.3,510.3c35.1,35.1,92.2,35.1,127.3,0
                     	C666.4,916.1,668.9,913.3,671.2,910.4z"/>
                     </svg>
                   </button>
                 </div>
               </div>
               <div class="moduleItem-details-container" tabindex="-1">
                 <div class="moduleItem-details_information-container">
                   <p class="text-label">Infos</p>
                   <p class="subtext">`+ (plDataObject.filter_description) +`</p>
                   <div class="moduleItem-details_information_version-container">
                     <p class="text-label">Version</p>
                     <div class="moduleItem-details_information_supportedsources-row dFlex">
                       <p class="subtext moduleItem-versionText-left">Unterstützte Formate</p><p class="subtext moduleItem-versionText-right">`+ (plDataObject.filter_supportedsources) +`</p>
                     </div>
                     <div class="moduleItem-details_information_version-row dFlex">
                       <p class="subtext moduleItem-versionText-left">Module-Version</p><p class="subtext moduleItem-versionText-right">`+ (plDataObject.filter_version) +`</p>
                     </div>
                   </div>
                 </div>
               </div>
             </label>`
    document.getElementById('window_timesheetfilters').innerHTML += filterChild
    loadedFiltersFeedbackArray.push(plDataObject.filter_id)
  }
  resolve({success:true,feedback:"🧩 [Module: Filters] Content for "+loadedFiltersFeedbackArray+" loaded.",ids:loadedFiltersFeedbackArray})
 })
}


export function createFilterObject(
    item_bookingnumber,
    item_ticketmasternumber,
    item_ticketnumber,
    item_ticketdisc,
    item_hiddentag,
    item_tickettime,
    item_date,
    item_dateday
  ) {
  let itemObject = {
      "item_bookingnumber":item_bookingnumber,
      "item_ticketmasternumber": item_ticketmasternumber,
      "item_ticketnumber":item_ticketnumber, 
      "item_ticketdisc":item_ticketdisc,
      "item_hiddentag": item_hiddentag,
      "item_tickettime":item_tickettime,
      "item_date":item_date,
      "item_dateday": item_dateday
  }

  return itemObject
}
