
import { detectionItem } from "../../../ui/detectionItem/detectionItem.js"
import { selectBookingPlatformPreName,detectionItemID_Prefix, selectProtimeService_defaultValue } from "../../../../utils/defaults/defaultVariables.js"
import { generateDateId } from "../../../../utils/generateDateId.js"
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
  let detectionItemMainObject = { "id": newDetectionItemId, "title":"", "bookingsheet": "", "viewall":"" }
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

function initDetectionItemsEventListener(elem,func) {
  // remove deletion listeners fist
  for (let i = 0, iLen = elem.length; i < iLen; i++) {
    elem[i].removeEventListener('click',func)
  }
  // add new deletion listener
  for (let i = 0, iLen = elem.length; i < iLen; i++) {
    elem[i].addEventListener('click', func)
  }
}

function loadDetectionItems() {
  let buttons_removeDetection = document.getElementsByClassName('button_deleteDetection')
  let buttons_minimizeDetection = document.getElementsByClassName('button_minimizeDetection')
  // init listeners for elems
  initDetectionItemsEventListener(buttons_removeDetection,removeProjectDetectionItem)
  initDetectionItemsEventListener(buttons_minimizeDetection,minimizeProjectDetectionItem)
  // add item change-listeners
  let detectionItemsHtml = document.getElementsByName('item_detection')
  for (let i = 0, iLength = detectionItemsHtml.length; i < iLength; i++) {
    let select_bookingPlatform = document.getElementById(selectBookingPlatformPreName + detectionItemsHtml[i].id)
    let loaded_select_bookingPlatform = detectionItems.find(x => x.id === detectionItemsHtml[i].id).bookingsheet
    if(loaded_select_bookingPlatform !== '' && loaded_select_bookingPlatform !== null){
      select_bookingPlatform.value = selectBookingPlatformPreName+loaded_select_bookingPlatform
    }else {
      select_bookingPlatform.value = loaded_select_bookingPlatform
    }
    select_bookingPlatform.addEventListener('change', () => { setDetectionBookingPlatform(detectionItemsHtml[i].id, select_bookingPlatform.value) });
    debugStick(select_bookingPlatform.value,'Detection Item '+detectionItemsHtml[i].id+' set to')
    
    // AMAGCH Platform abfrage -> Listener Modular umbauen
    if(select_bookingPlatform.value === 'select_bookingPlatform_AmagProTime') {
      let input_ticketPrefix = document.getElementById("input_ticketPrefix" + detectionItemsHtml[i].id)
      input_ticketPrefix.addEventListener('change', () => { changeDetectionItemData(detectionItemsHtml[i].id, "ticketprefix", input_ticketPrefix.value) });
      let input_additionalPrefix = document.getElementById("input_additionalPrefix" + detectionItemsHtml[i].id)
      input_additionalPrefix.addEventListener('change', () => { changeDetectionItemData(detectionItemsHtml[i].id, "addprefix", input_additionalPrefix.value) });
      let select_proTimeService = document.getElementById("select_proTimeService_" + detectionItemsHtml[i].id)
      let loaded_select_proTimeService = detectionItems.find(x => x.id === detectionItemsHtml[i].id).protimeservice
      select_proTimeService.value = loaded_select_proTimeService
      select_proTimeService.addEventListener('change', () => { changeDetectionItemData(detectionItemsHtml[i].id, "protimeservice", select_proTimeService.value) });
      let input_projectNomber = document.getElementById("input_projectNomber" + detectionItemsHtml[i].id)
      input_projectNomber.addEventListener('change', () => { changeDetectionItemData(detectionItemsHtml[i].id, "projectnomber", input_projectNomber.value) });
      let input_activity = document.getElementById("input_activity" + detectionItemsHtml[i].id)
      let loaded_input_activity = detectionItems.find(x => x.id === detectionItemsHtml[i].id).protimeactivity
      input_activity.value = loaded_input_activity
      input_activity.addEventListener('change', () => { changeDetectionItemData(detectionItemsHtml[i].id, "protimeactivity", input_activity.value) });
    }
  }
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
  } else if (selected_bookingPlatform === selectBookingPlatformPreName + "DZBankProRes") {
    newData = { "ticketprefix": "", "addprefix": "" }
  }
  let newObject = { ...currentObject, "bookingsheet": selected_bookingPlatformName, ...newData }
  let indexOfObject = detectionItems.indexOf(currentObject)
  detectionItems[indexOfObject] = newObject
  updateDetectionItems(detectionItems)
  await detectionItem(detectionItems)
  loadDetectionItems()
}

function changeDetectionItemData(itemId, objectKey, objectValue) {
  setDetectionItemValueToObject(itemId, objectKey, objectValue)
  updateDetectionItems(detectionItems)
  detectionItem(detectionItems)
  loadDetectionItems()
}
// remove item
function removeProjectDetectionItem(i) {
  debugStick(i.target.closest("div").parentNode.parentNode.id,'Delete detection item with id')
  let currentItemID = i.target.closest("div").parentNode.parentNode.id
  let currentItem = document.getElementById(currentItemID)
  currentItem.classList.add('configItem--remove')
  setTimeout(function () {
    currentItem.remove()
  }, 500)
  i.target.closest("button").removeEventListener('click', removeProjectDetectionItem);
  detectionItems = detectionItems.filter(detectionItems => detectionItems.id !== currentItemID);
  updateDetectionItems(detectionItems)
}

function minimizeProjectDetectionItem (i) {
  let buttonDropdownActiveClass = 'button-dropdown--active'
  let thisButtonDropdown = i.target.closest('button')
  let currentItemID = i.target.closest("div").parentNode.parentNode.id
  let currentItem = document.getElementById(currentItemID)

  if(thisButtonDropdown.classList.contains(buttonDropdownActiveClass)) {
    thisButtonDropdown.classList.remove(buttonDropdownActiveClass)
    currentItem.getElementsByClassName('detectionItem-module')[0].classList.add('detectionItem-module--hidden')
    setTimeout(function(){
      currentItem.getElementsByClassName('detectionItem-module')[0].classList.add('dNone')
    },350)
  } else {
    thisButtonDropdown.classList.add(buttonDropdownActiveClass)
    currentItem.getElementsByClassName('detectionItem-module')[0].classList.remove('dNone')
    setTimeout(function(){
      currentItem.getElementsByClassName('detectionItem-module')[0].classList.remove('detectionItem-module--hidden')
    },10)
  }
  
}