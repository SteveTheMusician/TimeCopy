
import { detectionItem } from "../../../ui/detectionItem/detectionItem.js"
import { selectBookingPlatformPreName,detectionItemID_Prefix, selectProtimeService_defaultValue } from "../../../../utils/defaults/defaultVariables.js"
import { generateDateId } from "../../../../utils/generateDateId.js"
import { eventListenerHandler } from "../../../../utils/functionHandlers.js"
import { debugStick } from "../../../../utils/appDebugStick.js"

const button_addDetection = document.getElementById('button_add_projectDetection')
let detectionItems = localStorage.getItem('tc_c_projectDetection')
detectionItems = JSON.parse(detectionItems)
const window_detection = document.getElementById('window_detection')

export async function projectDetection() {
  await detectionItem(detectionItems)
  loadDetectionItems()
  button_addDetection.removeEventListener('click', addNewProjectDetection)
  button_addDetection.addEventListener('click', addNewProjectDetection)
}

function updateDetectionItems(detectionItems) {
  let detectionItemsString = JSON.stringify(detectionItems)
  if(detectionItemsString === '[]') {
    localStorage.removeItem('tc_c_projectDetection')
  } else {
    localStorage.setItem('tc_c_projectDetection', detectionItemsString)
  }
  window.configUserChanges = true
}

async function addNewProjectDetection(e) {
  if (e.shiftKey) {
    button_addDetection.innerHTML = "🍌"
  }
  let currentDate = generateDateId()
  let newDetectionItemId = detectionItemID_Prefix + currentDate
  let detectionItemMainObject = { "id": newDetectionItemId, "title":"", "viewall":"","bookingsheet": "" }
  if (detectionItems === null || detectionItems === '') {
    detectionItems = []
  }
  detectionItems.push(detectionItemMainObject)
  updateDetectionItems(detectionItems)
  await detectionItem(detectionItems)
  loadDetectionItems()
  document.getElementById(newDetectionItemId).classList.add('item--new')
  window_detection.parentElement.scroll({ top: 0, behavior: 'smooth' })
}

function loadDetectionItems() {
  // add item change-listeners
  let detectionItemsHtml = document.getElementsByName('item_detection')
  for (let i = 0, iLength = detectionItemsHtml.length; i < iLength; i++) {
    let detectionItemId = detectionItemsHtml[i].id
    let select_bookingPlatform = document.getElementById(selectBookingPlatformPreName + detectionItemId)
    let loaded_select_bookingPlatform = detectionItems.find(x => x.id === detectionItemId).bookingsheet
    //Actions 
    let button_thisDetectionDelete = document.getElementById('deleteDetection_'+detectionItemId)
    let button_thisDetectionMinimize = document.getElementById('minimizeDetection_'+detectionItemId)
    let input_thisDetectionName = document.getElementById('detectionName_'+detectionItemId)
    input_thisDetectionName.addEventListener('change', () => {changeDetectionItemData(detectionItemId,'title',input_thisDetectionName.value)})
    if(loaded_select_bookingPlatform !== '' && loaded_select_bookingPlatform !== null){
      select_bookingPlatform.value = selectBookingPlatformPreName+loaded_select_bookingPlatform
    }else {
      select_bookingPlatform.value = loaded_select_bookingPlatform
    }
    select_bookingPlatform.addEventListener('change', () => { setDetectionBookingPlatform(detectionItemId, select_bookingPlatform.value) });
    debugStick(select_bookingPlatform.value,'Detection Item '+detectionItemId+' set to')
    // init listeners for elems
    // eventListenerHandler(input_thisDetectionName,'change',changeProjectDetectionItemName,{detectionItemId,input_thisDetectionName})
    eventListenerHandler(button_thisDetectionDelete,'click',removeProjectDetectionItem,{detectionItemId,button_thisDetectionDelete})
    if(!!button_thisDetectionMinimize) {
      eventListenerHandler(button_thisDetectionMinimize,'click',minimizeProjectDetectionItem,{detectionItemId,button_thisDetectionMinimize})
    }
    // AMAGCH Platform abfrage -> Listener Modular umbauen
    if(select_bookingPlatform.value === 'select_bookingPlatform_AmagProTime') {
      let input_ticketPrefix = document.getElementById("input_ticketPrefix" + detectionItemId)
      input_ticketPrefix.addEventListener('change', () => { changeDetectionItemData(detectionItemId, "ticketprefix", input_ticketPrefix.value) });
      let input_additionalPrefix = document.getElementById("input_additionalPrefix" + detectionItemId)
      input_additionalPrefix.addEventListener('change', () => { changeDetectionItemData(detectionItemId, "addprefix", input_additionalPrefix.value) });
      let select_proTimeService = document.getElementById("select_proTimeService_" + detectionItemId)
      let loaded_select_proTimeService = detectionItems.find(x => x.id === detectionItemId).protimeservice
      select_proTimeService.value = loaded_select_proTimeService
      select_proTimeService.addEventListener('change', () => { changeDetectionItemData(detectionItemId, "protimeservice", select_proTimeService.value) });
      let input_projectNomber = document.getElementById("input_projectNomber" + detectionItemId)
      input_projectNomber.addEventListener('change', () => { changeDetectionItemData(detectionItemId, "projectnomber", input_projectNomber.value) });
      let input_activity = document.getElementById("input_activity" + detectionItemId)
      let loaded_input_activity = detectionItems.find(x => x.id === detectionItemId).protimeactivity
      input_activity.value = loaded_input_activity
      input_activity.addEventListener('change', () => { changeDetectionItemData(detectionItemId, "protimeactivity", input_activity.value) });
    }
  }
  debugStick(detectionItems,'Detection-Item function loaded')
}
// get items current object to change
function getCurrentObject(itemId) {
  let currentObject = detectionItems.find(x => x.id === itemId)
  return currentObject
}
// change value in current item object
function setDetectionItemValueToObject(itemId, objectKey, objectValue) {
  let currentObject = getCurrentObject(itemId)
  let newObject = { ...currentObject, [objectKey]: objectValue }
  let indexOfObject = detectionItems.indexOf(currentObject)
  detectionItems[indexOfObject] = newObject
}

async function setDetectionBookingPlatform(itemId, selected_bookingPlatform) {
  let currentObject = getCurrentObject(itemId)
  let selected_bookingPlatformName =  selected_bookingPlatform.split(selectBookingPlatformPreName)[1]
  let newData = {}
  // create new objects for the selected platforms
  if (selected_bookingPlatform === selectBookingPlatformPreName + "AmagProTime") {
    newData = { "ticketprefix": "", "addprefix": "", "protimeservice": selectProtimeService_defaultValue, "projectnomber": "", "protimeactivity": "" }
  }
  if (selected_bookingPlatform === selectBookingPlatformPreName + "Any") {
    newData = { "anytrigger": "", "anyaddword": "" }
  }
  let newObject = { ...currentObject, "bookingsheet": selected_bookingPlatformName,"viewall": "true", ...newData }
  let indexOfObject = detectionItems.indexOf(currentObject)
  detectionItems[indexOfObject] = newObject
  updateDetectionItems(detectionItems)
  await detectionItem(detectionItems)
  loadDetectionItems()
}

async function changeDetectionItemData(itemId, objectKey, objectValue) {
  setDetectionItemValueToObject(itemId, objectKey, objectValue)
  updateDetectionItems(detectionItems)
  await detectionItem(detectionItems)
  loadDetectionItems()
}
// remove item
function removeProjectDetectionItem(obj) {
  debugStick(obj.detectionItemId,'Delete detection item with id')
  let currentItem = document.getElementById(obj.detectionItemId)
  currentItem.classList.add('configItem--remove')
  setTimeout(function () {
    currentItem.remove()
  }, 500)
  obj.button_thisDetectionDelete.removeEventListener('click', removeProjectDetectionItem);
  detectionItems = detectionItems.filter(detectionItems => detectionItems.id !== obj.detectionItemId);
  updateDetectionItems(detectionItems)
}

function minimizeProjectDetectionItem (obj) {
  let buttonDropdownActiveClass = 'button-dropdown--active'
  let thisButtonDropdown = obj.button_thisDetectionMinimize
  let currentItem = document.getElementById(obj.detectionItemId)

  if(thisButtonDropdown.classList.contains(buttonDropdownActiveClass)) {
    thisButtonDropdown.classList.remove(buttonDropdownActiveClass)
    currentItem.getElementsByClassName('detectionItem-module')[0].classList.add('detectionItem-module--hidden')
    setTimeout(function(){
      currentItem.getElementsByClassName('detectionItem-module')[0].classList.add('dNone')
    },350)
      setDetectionItemValueToObject(obj.detectionItemId, 'viewall', 'false')
      updateDetectionItems(detectionItems)
  } else {
    thisButtonDropdown.classList.add(buttonDropdownActiveClass)
    currentItem.getElementsByClassName('detectionItem-module')[0].classList.remove('dNone')
    setTimeout(function(){
      currentItem.getElementsByClassName('detectionItem-module')[0].classList.remove('detectionItem-module--hidden')
    },10)
    setDetectionItemValueToObject(obj.detectionItemId, 'viewall', 'true')
    updateDetectionItems(detectionItems)
  }
  
}