
import { detectionItem } from "../../../ui/detectionItem/detectionItem.js"
import { selectBookingPlatformPreName,detectionItemID_Prefix, selectProtimeService_defaultValue } from "../../../../utils/defaults/defaultVariables.js"

const button_addDetection = document.getElementById('button_add_projectDetection')
let detectionItems = localStorage.getItem('tc_c_projectDetection')
detectionItems = JSON.parse(detectionItems)
const window_detection = document.getElementById('window_detection')

export function projectDetection() {
  detectionItem(detectionItems)
  loadDetectionItems()
  button_addDetection.removeEventListener('click', addNewProjectDetection)
  button_addDetection.addEventListener('click', addNewProjectDetection)
}

function updateDetectionItems(detectionItems) {
  localStorage.setItem('tc_c_projectDetection', JSON.stringify(detectionItems))
}

function addNewProjectDetection(e) {

  if (e.shiftKey) {
    button_addDetection.innerHTML = "🍌"
  }

  let currentDate = new Date().getTime().toString()
  let newDetectionItemId = detectionItemID_Prefix + currentDate
  let detectionItemMainObject = { "id": newDetectionItemId, "bookingsheet": "" }
  if (detectionItems === null) {
    detectionItems = []
  }
  detectionItems.push(detectionItemMainObject)
  updateDetectionItems(detectionItems)
  detectionItem(detectionItems)
  loadDetectionItems()
  document.getElementById(newDetectionItemId).classList.add('item--new')
  window_detection.parentElement.scroll({ top: 0, behavior: 'smooth' })
}

function loadDetectionItems() {
  let buttons_removeDetection = document.getElementsByClassName('button_deleteDetection')

  // Remove Deletion Listeners fist
  for (let i = 0, iLen = buttons_removeDetection.length; i < iLen; i++) {
    buttons_removeDetection[i].addEventListener('click', removeProjectDetectionItem)
  }
  // add new deletion listener
  for (let i = 0, iLen = buttons_removeDetection.length; i < iLen; i++) {
    buttons_removeDetection[i].addEventListener('click', removeProjectDetectionItem)
  }
  // add Item change-listeners
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
// get Items current object to change
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

function setDetectionBookingPlatform(itemId, selected_bookingPlatform) {
  let currentObject = getCurrentObject(itemId)
  let selected_bookingPlatformName =  selected_bookingPlatform.split(selectBookingPlatformPreName)[1]
  let newData = {}
  // Create new objects for the selected Platforms
  if (selected_bookingPlatform === selectBookingPlatformPreName + "AmagProTime") {
    newData = { "ticketprefix": "", "addprefix": "", "protimeservice": selectProtimeService_defaultValue, "projectnomber": "", "protimeactivity": "" }
  } else if (selected_bookingPlatform === selectBookingPlatformPreName + "DZBankProRes") {
    newData = { "ticketprefix": "", "addprefix": "" }
  }
  let newObject = { ...currentObject, "bookingsheet": selected_bookingPlatformName, ...newData }
  let indexOfObject = detectionItems.indexOf(currentObject)
  detectionItems[indexOfObject] = newObject
  updateDetectionItems(detectionItems)
  detectionItem(detectionItems)
  loadDetectionItems()
}

function changeDetectionItemData(itemId, objectKey, objectValue) {
  setDetectionItemValueToObject(itemId, objectKey, objectValue)
  updateDetectionItems(detectionItems)
  detectionItem(detectionItems)
  loadDetectionItems()
}

// Remove Item
function removeProjectDetectionItem(i) {
  let currentItemID = i.target.closest("div").parentNode.id
  // console.log(currentItemID)
  let currentItem = document.getElementById(currentItemID)
  currentItem.classList.add('configItem--remove')
  setTimeout(function () {
    currentItem.remove()
  }, 500)
  i.target.closest("button").removeEventListener('click', removeProjectDetectionItem);
  detectionItems = detectionItems.filter(detectionItems => detectionItems.id !== currentItemID);
  updateDetectionItems(detectionItems)
}