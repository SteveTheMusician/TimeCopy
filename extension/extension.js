import data_version from "./version.json" with { type: "json" };
import { timesheetFilter } from "./libraries/timesheets/timesheets.js";
import { notification } from "./components/notification/notification.js";

const link_cssTheme = document.querySelector('link#link-theme'); 
const main = document.querySelector('main');
const configurations = document.querySelector('div.configurations');
const configurationsContainer = document.getElementById('config-container')
const configWindow_getAll = document.getElementsByClassName('configuration-window');
const configWindow_General = document.getElementById('config-win-general');
const configWindow_Timesheets = document.getElementById('config-win-timesheets');
const configWindow_Bookingsheets = document.getElementById('config-win-bookingsheet');
const configWindow_Projects = document.getElementById('config-win-projects');
const configProfileName = document.getElementById('configProfileName')

// tab buttons
const buttonsTab_getAll = document.getElementsByClassName('button-config-tab');
const buttonTab_General = document.querySelector('button#button-tab-general');
const buttonTab_Timesheets = document.querySelector('button#button-tab-timesheets');
const buttonTab_Bookingsheets = document.querySelector('button#button-tab-bookingsheets');
const buttonTab_Projects = document.querySelector('button#button-tab-projects');

// WAS SCHAUST DU IN MEIN CODE REIN?? DER WIRD NOCH AUFGERÄUMT!!

// Main Buttons
const button_dev_pttest = document.querySelector('button#button_test_pasteTicketData');
const fillButton = document.querySelector('button#fillButton');
const configButton = document.querySelector('button#configButton');
const configFooterLabel = document.getElementById('footer-label-config');

// Configuration Buttons
const themeSelect = document.querySelector('select#select-themes');
const button_clearConfigs = document.getElementById('button_clearConfigs')
const radios_filter = document.getElementsByName('timesheet-filter');
const button_openHelp = document.getElementById('button_openHelp')
const button_openHelpTimesheetTobias = document.getElementById('tobiasFilterInfo')
const radio_timesheetFilters = document.getElementsByName('timesheet-filter')
const radio_bookingPlattforms = document.getElementsByName('booking-plattform')

// local storages
let lstorage_cThemes = localStorage.getItem('tc_c_theme')
let lstorage_cFilter = localStorage.getItem('tc_c_filter')
let lstorage_cDetectionItems = localStorage.getItem('tc_c_projectDetection')
let lstorage_cProfileName = localStorage.getItem('tc_c_profileName')
let lstorage_cBookingPlattform = localStorage.getItem('tc_c_bookingPlattform')

// Some vars
let configOpen = false
let dev_pttest = false
let helpUrl = "https://github.com/EmptySoulOfficial/TimeCopy/blob/main/documentation/Help.md"
let helpUrl_timesheet_tobias = helpUrl+"#timesheet-tobias"
let helpUrl_timesheet_steve = helpUrl+"#timesheet-steve-google-excel"
let extensionVersion = data_version.extension_version


// Extension load up
window.addEventListener("load", (event) => {
  // Display version
  label_version.insertAdjacentHTML('beforeend', extensionVersion);
  // Main Buttons Listener
  fillButton.addEventListener('click', readClipboardText);
  button_dev_pttest.addEventListener('click', testProTime);
  configButton.addEventListener('click', openConfigs);
  // Configuration tabs listener
  buttonTab_General.addEventListener('click', configTabOpenGeneral);
  buttonTab_Projects.addEventListener('click', configTabOpenProjects);
  buttonTab_Timesheets.addEventListener('click', configTabOpenTimesheets);
  buttonTab_Bookingsheets.addEventListener('click', configTabOpenBookingsheets);
  configProfileName.addEventListener('change', configSetProfileName)
  // Configs Listener
  button_clearConfigs.addEventListener('click', clearLocalStorage);
  button_openHelp.addEventListener('click', openHelp)
  button_openHelpTimesheetTobias.addEventListener('click', openHelp_timesheet_tobias)
  themeSelect.addEventListener('change', switchTheme);
  // filter radios listener
  for (var i=0, iLen=radios_filter.length; i<iLen; i++) {
    radios_filter[i].addEventListener('click', switchFilter);
  }
  for (var index=0, indexLen=radio_timesheetFilters.length; index<indexLen; index++) {
    radio_timesheetFilters[index].addEventListener('click', timesheetFilterChange);
  }
  for (var index=0, indexLen=radio_bookingPlattforms.length; index<indexLen; index++) {
    radio_bookingPlattforms[index].addEventListener('click', bookingPlattformsChange);
  }
  // Load local storages
  loadStorage()
});

// Load localstorage
function loadStorage() {  
  let defaultTheme = "oceanswave"
  let defaultFilter = ""
  let defaultProfileName = "Default"
  let defaultBookingPlattform = "bookingplattform-automatic"

  if (lstorage_cThemes){
    themeSelect.value = lstorage_cThemes
    link_cssTheme.setAttribute('href', 'style/themes/'+lstorage_cThemes+'/'+lstorage_cThemes+'.css' )
  } else {
    themeSelect.value = defaultTheme
    link_cssTheme.setAttribute('href', 'style/themes/'+defaultTheme+'/'+defaultTheme+'.css' )
  }
  if (lstorage_cFilter){
    document.querySelector('input[value="'+lstorage_cFilter+'"]').checked = true
  }
  if (lstorage_cProfileName){
    configProfileName.value = lstorage_cProfileName
  } else {
    configProfileName.value = defaultProfileName
  }
  if (lstorage_cBookingPlattform){
    document.querySelector('input[value="'+lstorage_cBookingPlattform+'"]').checked = true
  } else {
    document.querySelector('input[value="'+defaultBookingPlattform+'"]').checked = true
  }
}
// Clear local storage
function clearLocalStorage(){
  localStorage.removeItem('tc_c_theme')
  localStorage.removeItem('tc_c_filter')
  localStorage.removeItem('tc_c_projectDetection')
  localStorage.removeItem('tc_c_profileName')
  localStorage.removeItem('tc_c_BookingPlattform')
  notification(true,'Data deleted! Please restart.')
}

function openHelp() {
  window.open(helpUrl)
}

function openHelp_timesheet_tobias() {
  window.open(helpUrl_timesheet_tobias)
}

// Test functions protime
async function testProTime(){
  dev_pttest = true
  alert(dev_pttest)
  readClipboardText(dev_pttest)
// let [tab] = await chrome.tabs.query ({active: true, currentWindow: true});
  // chrome.scripting.executeScript({
  //  target: {tabId: tab.id}, func: testFunction,
  // });
}
// test Function triggered by test button to check if protime works
function testFunction () {

  const keyEventEnter = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    which: 13,
    keyCode: 13,
  })

  // get booking number field
  let protime_Innenauftrag = document.getElementsByClassName('lsField--f4')[0].childNodes[0]

  if(protime_Innenauftrag){
    protime_Innenauftrag.value = "21348"
    protime_Innenauftrag.dispatchEvent(keyEventEnter)
  }else {
    alert('TimeCopy   ERROR: unable to get Order-Input')
  }

  setTimeout(function(){
    // so we get here the td which contains the services dropdown and click it
    let protime_Leistung = document.getElementsByClassName('lsField--list')[1].childNodes[0]
    const protime_Leistungen_CSITExtST = document.querySelector("[data-itemkey='ZCHN0730070']")
    const protime_Leistungen_CSITExtNT = document.querySelector("[data-itemkey='ZCHN0730080']")
    const protime_Leistungen_ITDNT = document.querySelector("[data-itemkey='ZCHN0730005']")
    const protime_Leistungen_ITD = document.querySelector("[data-itemkey='ZCHN0730001']")
    protime_Leistung.click()
    protime_Leistungen_CSITExtST.click()
  },500)

  setTimeout(function(){ 
    let protime_hours = document.getElementsByClassName('lsField--right')[0].childNodes[0]
    protime_hours.value = "0.5"
    // ggf ein await für dieses element
    let protime_ticketNumber = document.getElementsByClassName('lsField--empty')[2].childNodes[0]
    protime_ticketNumber.value = "Test-Ticket"
  
    let protime_ticketText = document.getElementsByTagName('textarea')[0]
    protime_ticketText.value = "Test-Ticket-Text"
  
  }, 700 );
}

function openConfigs(){
  if(configOpen) {
    main.classList.remove('main-extended')
    configButton.classList.remove('button--active')
    fillButton.classList.remove('object--hidden')
    configFooterLabel.classList.add('object--hidden')
    configurations.classList.add('dNone')
    configOpen = false
  }else{
    main.classList.add('main-extended')
    configButton.classList.add('button--active')
    fillButton.classList.add('object--hidden')
    configFooterLabel.classList.remove('object--hidden')
    configurations.classList.remove('dNone')
    configOpen = true
  }
}

// config tabs functions

function removeTabActiveClass(){
  [].forEach.call(buttonsTab_getAll, function(buttonsTab_getAll) {
    buttonsTab_getAll.classList.remove('button-tab--active');
  });
  [].forEach.call(configWindow_getAll, function(configWindow_getAll) {
    configWindow_getAll.classList.add('dNone');
  });
}

function configTabOpenGeneral(){
  // buttonsTab_getAll configWindow_getAll
  removeTabActiveClass()
  buttonTab_General.classList.add('button-tab--active')
  configWindow_General.classList.remove('dNone')
  configurationsContainer.classList.add('configuration-container-first-tab-selected')
}

function configTabOpenProjects(){
  removeTabActiveClass()
  buttonTab_Projects.classList.add('button-tab--active')
  configWindow_Projects.classList.remove('dNone')
  configurationsContainer.classList.remove('configuration-container-first-tab-selected')
}

function configTabOpenTimesheets(){
  removeTabActiveClass()
  buttonTab_Timesheets.classList.add('button-tab--active')
  configWindow_Timesheets.classList.remove('dNone')
  configurationsContainer.classList.remove('configuration-container-first-tab-selected')
}

function configTabOpenBookingsheets(){
  removeTabActiveClass()
  buttonTab_Bookingsheets.classList.add('button-tab--active')
  configWindow_Bookingsheets.classList.remove('dNone')
  configurationsContainer.classList.remove('configuration-container-first-tab-selected')
}


// configuration functions
function timesheetFilterChange(){
  notification(true,'Please reopen extension so the filters can be applied.')
}

function bookingPlattformsChange(e) {
  localStorage.setItem('tc_c_bookingPlattform', e.target.value)
}

function configSetProfileName(){
  localStorage.setItem('tc_c_profileName', configProfileName.value)
}

function switchTheme() {
  let currentThemeValue = themeSelect.value
  link_cssTheme.setAttribute('href', 'style/themes/'+currentThemeValue+'/'+currentThemeValue+'.css' )
  localStorage.setItem('tc_c_theme', currentThemeValue)
 }

 function switchFilter(e) {
  localStorage.setItem('tc_c_filter', e.target.value)
 }

// import time copy profile
let button_importConfigs = document.getElementById('button_importConfigs');
button_importConfigs.addEventListener("change", importFile, false);

function importFile(event){
  var files = event.target.files,
  reader = new FileReader();
  reader.addEventListener("load", function() {
    let fileData = this.result;
    fileData = JSON.parse(fileData)
    // set data
    localStorage.setItem('tc_c_theme', fileData.tcprofile.cfg.theme)
    localStorage.setItem('tc_c_filter', fileData.tcprofile.cfg.timesheet_filter)
    // alert(fileData.tcprofile.profile_name)
    localStorage.setItem('tc_c_projectDetection',JSON.stringify(fileData.tcprofile.cfg.detection_filter))
    localStorage.setItem('tc_c_profileName', fileData.tcprofile.profile_name)
    localStorage.setItem('tc_c_bookingPlattform', fileData.tcprofile.cfg.booking_platforms)
  });
  reader.readAsText(files[0])
  loadStorage()
  notification(true,'Please reopen extension to load profile.')
}

// Export Configs as Json
let button_exportConfigs = document.getElementById('button_exportConfigs');

button_exportConfigs.addEventListener('click', (event) => {
  let detectionItems = localStorage.getItem('tc_c_projectDetection')
  detectionItems = JSON.parse(detectionItems)
  let lstorage_cThemes = localStorage.getItem('tc_c_theme')
  let lstorage_cFilter = localStorage.getItem('tc_c_filter')
  let lstorage_cBookingPlattform = localStorage.getItem('tc_c_bookingPlattform')
  if(detectionItems === null) {
    detectionItems = []
  }
  let saveObj = {"tcprofile":{"author":"steve","version":"1.1","extension_version":extensionVersion,"profile_name":configProfileName.value}}

  // apply values
  Object.assign(saveObj.tcprofile, {"cfg":{"theme": lstorage_cThemes, "timesheet_filter": lstorage_cFilter, "booking_platforms":lstorage_cBookingPlattform,"detection_filter": detectionItems}})
  // file setting
  const data = JSON.stringify(saveObj);
  const name = configProfileName.value+"-TimeCopy.tcprofile";
  const type = "text/plain";
  // create file
  const a = document.createElement("a");
  const file = new Blob([data], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
 });
 
// Main Functions
async function readClipboardText(dev_pttest) {
  let clipboarsString = await navigator.clipboard.readText();
  let filter = lstorage_cFilter
  let bookingPlattform = lstorage_cBookingPlattform
  // check whitch filter to use
  if(filter === '' || filter === null){
    notification(true,'Please select a Timesheet Filter first!')
  } else if(bookingPlattform === '' || bookingPlattform === null) {
    notification(true,'Please select a booking plattform first!')
  } else {
    timesheetFilter(bookingPlattform,filter,clipboarsString,dev_pttest)
  }
  
  // if(lstorage_cFilter === 'filter-tobiasexcel'){
    // timesheetTobias(clipboarsString,dev_pttest)
  // }else if(lstorage_cFilter === 'filter-stevegoogleexcel'){
    // timesheetSteve(clipboarsString,dev_pttest)
  // }else {
    // alert('No filter selected')
  // }
}

function timesheetSteve(){
  
  timesheetFilter()
}




