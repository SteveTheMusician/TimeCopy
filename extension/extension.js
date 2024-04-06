// PopUp Elements
const link_cssTheme = document.querySelector('link#link-theme'); 
const main = document.querySelector('main');
const configurations = document.querySelector('div.configurations');
const configurationsContainer = document.getElementById('config-container')
const configWindow_getAll = document.getElementsByClassName('configuration-window');
const configWindow_General = document.getElementById('config-win-general');
const configWindow_Timesheets = document.getElementById('config-win-timesheets');
const configWindow_Bookingsheets = document.getElementById('config-win-bookingsheet');
const configWindow_Projects = document.getElementById('config-win-projects');

// tab buttons
const buttonsTab_getAll = document.getElementsByClassName('button-config-tab');
const buttonTab_General = document.querySelector('button#button-tab-general');
const buttonTab_Timesheets = document.querySelector('button#button-tab-timesheets');
const buttonTab_Bookingsheets = document.querySelector('button#button-tab-bookingsheets');
const buttonTab_Projects = document.querySelector('button#button-tab-projects');


// Main Buttons
// const testButton = document.querySelector('button#pasteTicketData');
const fillButton = document.querySelector('button#fillButton');
const configButton = document.querySelector('button#configButton');
const configFooterLabel = document.getElementById('footer-label-config');

// Configuration Buttons
const themeSelect = document.querySelector('select#select-themes');
const button_clearConfigs = document.getElementById('button_clearConfigs')
const radios_filter = document.getElementsByName('timesheet-filter');

// Main Button Trigger
fillButton.addEventListener('click', readClipboardText);
// testButton.addEventListener('click', testProTime);
configButton.addEventListener('click', openConfigs);

// configuration tabs listener
buttonTab_General.addEventListener('click', configTabOpenGeneral);
buttonTab_Projects.addEventListener('click', configTabOpenProjects);
buttonTab_Timesheets.addEventListener('click', configTabOpenTimesheets);
buttonTab_Bookingsheets.addEventListener('click', configTabOpenBookingsheets);

// configurations listener
themeSelect.addEventListener('change', switchTheme);
// filter radios listener
for (var i=0, iLen=radios_filter.length; i<iLen; i++) {
  radios_filter[i].addEventListener('click', switchFilter);
}
button_clearConfigs.addEventListener('click', clearLocalStorage);

// some vars
let configOpen = false

// local storages
let lstorage_cThemes = localStorage.getItem('tc_c_theme')
let lstorage_cFilter = localStorage.getItem('tc_c_filter')

// some app specific text templates
const alertWarning = "WARNING: "


// load up functions
window.addEventListener("load", (event) => {
  loadStorage()
});

function loadStorage() {  
  let defaultTheme = "oceanswave"
  let defaultFilter = ""

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
}

function clearLocalStorage(){
  localStorage.removeItem('tc_c_theme')
  localStorage.removeItem('tc_c_filter')
  alert('Data deleted')
}



// Test functions protime
async function testProTime(){

let [tab] = await chrome.tabs.query ({active: true, currentWindow: true});
  chrome.scripting.executeScript({
   target: {tabId: tab.id}, func: testFunction,
  });
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
 function switchTheme() {
  let currentThemeValue = themeSelect.value
  link_cssTheme.setAttribute('href', 'style/themes/'+currentThemeValue+'/'+currentThemeValue+'.css' )
  localStorage.setItem('tc_c_theme', currentThemeValue)
 }
// load json config (not ready - chrome.extension.getURL
 let button_importConfigs = document.getElementById('button_importConfigs');
 button_importConfigs.addEventListener('change', (event) => {
  // let selectedProfileFile = button_importConfigs.value  
  if (button_importConfigs.files.length > 0) 
      {
        var reader = new FileReader(); // File reader to read the file 
        // This event listener will happen when the reader has read the file
        reader.addEventListener('load', function() {
          var result = JSON.parse(reader.result); // Parse the result into an object 
          
          alert(result);
        });
        
        // reader.readAsText(result); // Read the uploaded file
      }

 });
 function switchFilter(e) {
  localStorage.setItem('tc_c_filter', e.target.value)
 }



async function readClipboardText() {
  let clipboarsString = await navigator.clipboard.readText();
  // check whitch filter to use
  if(lstorage_cFilter === 'filter-tobiasexcel'){
    timesheetTobias(clipboarsString)
  }else if(lstorage_cFilter === 'filter-stevegoogleexcel'){
    timesheetSteve(clipboarsString)
  }else {
    alert('No filter selected')
  }
}

function timesheetSteve(){
  alert('Steve')
}


function timesheetTobias(clipboarsString) {

  let fullDateString = clipboarsString.split('"')[0];
  let allTickets = clipboarsString.split('"')[1]?? clipboarsString.split('	');

  // get all tickets before and after a line break
  let regex = /([^\n]+)/g
  var matches = []
  var match
  // push into matches
  while ((match = regex.exec(allTickets)) !== null) {
    matches.push(match[1]);
  }

  let forEachTimer = "100"
 
  matches.forEach(function(ticket, index){
    setTimeout(function(){
      let item_ticketNumber = ticket.split('[').pop().split(']')[0];
      let item_ticketDisc = ticket.split(']').pop().split(':')[0];
      let item_ticketTime = ticket.split(':')[1];
      
      let item_bookingNumber = ""
      let item_service = ""

      let item_ticketCustomBookingNumber = item_ticketNumber.split('#').pop();
      
      if(item_ticketCustomBookingNumber) {
        item_bookingNumber = item_ticketCustomBookingNumber;
        item_ticketNumber = item_ticketNumber.split('#')[0]
      }

      item_bookingNumber = bookingNumbers(item_bookingNumber, item_ticketNumber)

      if(!item_bookingNumber){
        alert(alertWarning+ 'No order number @ '+item_ticketNumber)
      } else if(!item_ticketDisc){
        alert(alertWarning+ 'Unable to get Ticket discription @ '+item_ticketNumber)
      } else if(!item_ticketTime){
        alert(alertWarning+ 'Unable to get working time @ '+item_ticketNumber)
      }else{
        execBookingScript(item_bookingNumber,item_ticketTime,item_ticketNumber,item_ticketDisc)
      }
    },forEachTimer * (index + 1))
    // set intervall after first run
    forEachTimer = "300"
  })
}

// Call the correct booking numbers for the specific tickets
function bookingNumbers(item_bookingNumber, item_ticketNumber){
  // All Known Booking Numbers
  let booking_BBP3 = "21037"
  let booking_AMAG43 = "21344"

  let new_bookingNumber = ""

  if(!item_bookingNumber) {
    if(item_ticketNumber.includes("BBP")){
      new_bookingNumber = booking_BBP3
      // alert(new_bookingNumber)
      return new_bookingNumber
    }
  } else {
    new_bookingNumber = item_bookingNumber
    return new_bookingNumber
  }
}
// function to pass variables from extension to tab

async function execBookingScript(item_bookingNumber,item_ticketTime,item_ticketNumber,item_ticketDisc){
  // alert(item_bookingNumber+item_ticketTime+item_ticketNumber+item_ticketDisc)
  let [tab] = await chrome.tabs.query ({active: true, currentWindow: true});
    // Execute script to parse emails on page
    chrome.scripting.executeScript({
    target: {tabId: tab.id},
    args: [item_bookingNumber,item_ticketTime,item_ticketNumber,item_ticketDisc],
    func: (...args) => bookTicket(...args),
    });
}

function bookTicket(item_bookingNumber,item_ticketTime,item_ticketNumber,item_ticketDisc) {
  //Enter Key 
  const keyEventEnter = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    which: 13,
    keyCode: 13,
  })

  // get booking number field
  let protime_Innenauftrag = document.getElementsByClassName('lsField--f4')[0].childNodes[0]

  if(protime_Innenauftrag){
    protime_Innenauftrag.value = item_bookingNumber
    protime_Innenauftrag.dispatchEvent(keyEventEnter)
  }else {
    alert('TimeCopy   ERROR: unable to get Order-Input')
  }

  setTimeout(function(){
    // service dropdown
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
    protime_hours.value = item_ticketTime
    // ggf ein await für dieses element
    let protime_ticketNumber = document.getElementsByClassName('lsField--empty')[2].childNodes[0]
    protime_ticketNumber.value = item_ticketNumber
  
    let protime_ticketText = document.getElementsByTagName('textarea')[0]
    protime_ticketText.value = item_ticketDisc
  
  }, 700 );

  // sleep(2000)
  // return new Promise((resolve) => {
    // resolve('resolved')
  // })
}