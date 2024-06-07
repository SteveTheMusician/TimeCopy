const button_addDetection = document.getElementById('button_add_projectDetection')
let detectionItems = localStorage.getItem('tc_c_projectDetection')
detectionItems = JSON.parse(detectionItems)
const window_detection = document.getElementById('window_detection')
// Some vars
const detectionItemID_Prefix = "deci"

window.addEventListener("load", (event) => {
  generateDetectionItem()
  loadDetectionItems()
  button_addDetection.removeEventListener('click', addNewProjectDetection)
  button_addDetection.addEventListener('click', addNewProjectDetection)
})

function addNewProjectDetection(){
  let currentDate = new Date().getTime().toString()
  let newDetectionItemId = detectionItemID_Prefix+currentDate
  let detectionItemMainObject = {"id":newDetectionItemId,"bookingsheet":""}
  if(detectionItems === null){
    detectionItems = []
  }
  detectionItems.push(detectionItemMainObject)
  localStorage.setItem('tc_c_projectDetection', JSON.stringify(detectionItems))
  generateDetectionItem()
  loadDetectionItems()
  document.getElementById(newDetectionItemId).classList.add('item--new')
  window_detection.parentElement.scroll({top:0,behavior:'smooth'})
}
// dublicate IDS löschen
function generateDetectionItem(){
  if(detectionItems) {
   document.getElementById('window_detection').innerHTML = detectionItems.map(detectionItem => 
     `<div class="config-item flex" name="item_detection" id="`+detectionItem.id+`">
   <div class="config-item-main-container">
     <div class="config-item-title-row flex">
       <p class="subtext subtext-top">Detection parameters</p>
     </div>
     <div>
       <select class="input-size--small" id="select_bookingPlatform_`+detectionItem.id+`">
         <option value="select_bookingPlatform_None" disabled>none</option>
         <option value="select_bookingPlatform_AmagProTime" >ProTime</option>
         <option value="select_bookingPlatform_DzBankProRes">ProRes</option>
       </select>
       <input type="text" class="input-size--default `+(detectionItem.bookingsheet ? '' : 'dNone')+`" name="input_ticketPrefix" placeholder="Ticket Prefix" value="`+detectionItem.ticketprefix+`" />
     </div>
     <div>
       <input type="text" class="input-size--large `+(detectionItem.bookingsheet ? '' : 'dNone')+`" name="input_additionalPrefix" placeholder="Additional (Title-)Prefix" value="`+detectionItem.addprefix+`"/>
     </div>
     <div class="config-item-title-row flex `+(detectionItem.bookingsheet === "select_bookingPlatform_AmagProTime" ? null : "dNone")+`">
       <p class="subtext subtext-top">Booking properties</p>
     </div>
     <div class="project-detection-item--amagprotime `+(detectionItem.bookingsheet === "select_bookingPlatform_AmagProTime" ? null : "dNone")+`">
        <div>
          <select class="input-size--default" name="select_proTimeService" id="select_proTimeService_`+detectionItem.id+`">
            <option value="select_proTime_service_ITD" `+("select_proTime_service_ITD" === detectionItem.protimeservice ? "selected":"")+`>IT Dienstleistungen</option>
            <option value="select_proTime_service_ITDST" `+("select_proTime_service_ITDST" === detectionItem.protimeservice ? "selected":"")+`>IT Dienstleistungen ST</option>
            <option value="select_proTime_service_CSITEST" `+("select_proTime_service_CSITEST" === detectionItem.protimeservice ? "selected":"")+`>Corporate Service IT Ext ST</option>
            <option value="select_proTime_service_CSITENT" `+("select_proTime_service_CSITENT" === detectionItem.protimeservice ? "selected":"")+`>Corporate Service IT Ext NT</option>
          </select>
          <input type="text" class="input-size--small" name="input_projectNomber" placeholder="Project No." value="`+detectionItem.projectnomber+`"/>
        </div>

        <input type="text" class="input-size--large" name="select_activity" list="amagprotimeActivity" placeholder="Activity"/>
        <datalist>
          <option>- WP2 - AEM Dashboard</option>
          <option>AP01 - Front-end</option>
        </datalist>
      </div>
      <div class="project-detection-item--dzbankprores">
        
      </div>
   </div>
   <div class="config-item-action-container">
     <button class="button-primary button-reset button_deleteDetection">
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
   </div>` ).join('')
  }else{
    console.log('Project Detection: No Items found')
  }
}

function loadDetectionItems(){
  let buttons_removeDetection = document.getElementsByClassName('button_deleteDetection')
 
  // Remove Deletion Listeners fist
  for (let i = 0, iLen=buttons_removeDetection.length; i<iLen; i++) {
    buttons_removeDetection[i].addEventListener('click', removeProjectDetectionItem)
  }
  // add new deletion listener
  for (let i = 0, iLen=buttons_removeDetection.length; i<iLen; i++) {
    buttons_removeDetection[i].addEventListener('click', removeProjectDetectionItem)
  }

  let detectionItemsHtml = document.getElementsByName('item_detection')
  for (let i = 0, iLength = detectionItemsHtml.length; i<iLength; i++){
    let select_bookingPlatform = document.getElementById("select_bookingPlatform_"+detectionItemsHtml[i].id)
    let loaded_select_bookingPlatform = detectionItems.find(x => x.id === detectionItemsHtml[i].id).bookingsheet
    select_bookingPlatform.value = loaded_select_bookingPlatform
    select_bookingPlatform.addEventListener('change', () => {setDetectionBookingPlattform(detectionItemsHtml[i].id,loaded_select_bookingPlatform,select_bookingPlatform.value)});
  }

}

function setDetectionBookingPlattform(itemId,loaded_select_bookingPlatform,selected_bookingPlatform){
  let currentObject = detectionItems.find(x => x.id === itemId)
  let newData = {}
  if(selected_bookingPlatform === "select_bookingPlatform_AmagProTime") {
    newData = {"ticketprefix": "","addprefix": "","protimeservice":"select_proTime_service_CSITEST","projectnomber":"","protimeactivity":""}
  } else if(selected_bookingPlatform === "select_bookingPlatform_DzBankProRes") {
    newData = {"ticketprefix": "","addprefix": ""}
  }
  let newObject = {...currentObject, "bookingsheet": selected_bookingPlatform,...newData}
  console.log(newObject)
  let indexOfObject = detectionItems.indexOf(currentObject)
  detectionItems[indexOfObject] = newObject
  localStorage.setItem('tc_c_projectDetection',JSON.stringify(detectionItems))
  generateDetectionItem()
  loadDetectionItems()
}

function removeProjectDetectionItem(i) {
  let currentItemID = i.target.closest("div").parentNode.id
  let currentItem = document.getElementById(currentItemID)
  currentItem.classList.add('config-item--remove')
  setTimeout(function(){
    currentItem.remove()
  },500)
  i.target.closest("button").removeEventListener('click',removeProjectDetectionItem );
  detectionItems = detectionItems.filter(detectionItems => detectionItems.id !== currentItemID);
}