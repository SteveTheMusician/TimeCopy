import { filter_SteveGoogleExcel } from "./SteveGoogleExcel/SteveGoogleExcel.js"
import filterInfo_SteveGoogleExcel from "./SteveGoogleExcel/info.json" with { type: "json" };
import { filter_TobiasExcel } from "./TobiasExcel/TobiasExcel.js"
import filterInfo_TobiasExcel from "./TobiasExcel/info.json" with { type: "json" };

export async function filters(filter,clipboarsString) {
   let filteredTimesheetData = []
   if(filter === 'timesheetfilter-tobiasexcel') {
      filteredTimesheetData = filter_TobiasExcel(clipboarsString)
   }else if(filter === 'timesheetfilter-stevegoogleexcel') {
      filteredTimesheetData = filter_SteveGoogleExcel(clipboarsString)
   }
   return filteredTimesheetData
}

export async function filtersContent() {
   return new Promise(async (resolve) => { 
   let filterInfoData = localStorage.getItem('tc_s_dlcfilterinformations')
   if (!filterInfoData) {
     let importNewPlatformData = await importPlatformsData()
     try {
       if (importNewPlatformData) {
         console.log('dlc data created, restart time copy...')
         window.location.reload()
       } else {
         throw new Error('unable to import dlc filter data')
       }
     } catch (error) {
       console.log(error)
       window.location.reload()
     }
   } else {
     filterInfoData = JSON.parse(filterInfoData)
   }
 
   for (let plKey of importPlatforms) {
     let plDataObject = filterInfoData.find(item => item[plKey])[plKey]
     let filterCustomContent = ''
     let filterCustomImports
     let plattformImageFormat = '.png'
     if (plKey === filter_functionName_automatic) {
       plattformImageFormat = '.gif'
     }
     // if dlc has custom function true import html and function
     if (plDataObject.filter_content === 'true') {
       filterCustomImports = await importPlatformCustomContent(plKey)
       filterCustomContent = filterCustomImports.customContent
     }
     // dlc array (Foldername aso used as ID for saving)
     // for new items, just make a new dls, add it here to the array, make logo in assets folder and add css in style/dlc folder
     let filterChild = `<label class="configItem dFlex">
                  <div class="configItem-main-container dFlex">
                    <div class="configItem-radio-container dFlex">
                      <label class="radio-custom-container dFlex">
                        <input type="radio" class="radio-default" value="timesheetfilter-tobiasexcel"
                          name="timesheet-filter" />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <div class="configItem-icon-container flex">
                      <img src="assets/gfx/dlc/filters/icons/TobiasExcel.jpg" class="icon-bookingItem" />
                    </div>
                    <div class="configItem-main flex">
                      <p class="text-label">FILTER NAME</p>
                    </div>
                  </div>
                  <div class="configItem-action-container flex">
                    <button class="button-primary" id="tobiasFilterInfo">
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
     document.getElementById('window_bookingfilters').innerHTML += filterChild
   }
       resolve("DLC Content ready")
   })
 }