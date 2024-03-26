// PopUp Elements
const main = document.querySelector('main');

// PupUp Buttons
const testButton = document.querySelector('button#pasteTicketData');
const fillButton = document.querySelector('button#fillButton');
const configButton = document.querySelector('button#configButton');
// PupUp Button Trigger
// fillButton.addEventListener('click', readClipboardText);
testButton.addEventListener('click', testProTime);
configButton.addEventListener('click', openConfigs);

// some vars
let configOpen = false


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
    fillButton.classList.remove('button--hidden')
    configOpen = false
  }else{
    main.classList.add('main-extended')
    configButton.classList.add('button--active')
    fillButton.classList.add('button--hidden')
    configOpen = true
  }
  
}

async function readClipboardText() {
  let clipboarsString = await navigator.clipboard.readText();
  timesheetTobias(clipboarsString)
}

function timesheetTobias(clipboarsString) {

  let fullDateString = clipboarsString.split('"')[0];
  let allTickets = clipboarsString.split('"')[1]?? clipboarsString.split('	');

  var regex = /\[(.*?)\h/g;
  var matches = []
  var match

  while ((match = regex.exec(allTickets)) !== null) {
    matches.push(match[1]);
  }

  matches.forEach(ticket => {
    let item_ticketNumber = ticket.split(']')[0];
    let item_ticketDisc = ticket.split(/\](.*?)\:/g)[1];
    let item_ticketTime = ticket.split(':')[1];
    
    let item_bookingNumber = ""
    let item_service = ""

    let item_ticketCustomBookingNumber = item_ticketNumber.split('-')[2];
    if(item_ticketCustomBookingNumber) {
      item_bookingNumber = item_ticketCustomBookingNumber;
      item_ticketNumber = item_ticketNumber.split('-')[0] + "-"+ item_ticketNumber.split('-')[1]
    }

    item_bookingNumber = bookingNumbers(item_bookingNumber, item_ticketNumber)

    if(!item_bookingNumber){
      alert('WARNING: Undefined Booking Number @ '+item_ticketNumber)
    } else {
      execBookingScript(item_bookingNumber)
    }

    alert("Ticketnummer: "+item_ticketNumber+" Beschreibung: "+item_ticketDisc+" Zeit: "+item_ticketTime + " BuchungsNummer: "+item_bookingNumber)
    
  }
  )
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

async function execBookingScript(item_bookingNumber){

  let [tab] = await chrome.tabs.query ({active: true, currentWindow: true});
    // Execute script to parse emails on page
    chrome.scripting.executeScript({
    target: {tabId: tab.id},
    args: [item_bookingNumber],
    func: (...args) => bookTicket(...args),
    });
}

function bookTicket(item_bookingNumber) {
  //Enter Key 
  const keyEventEnter = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    which: 13,
    keyCode: 13,
  })
  
  // Protime Element Ids
  const protime_Innenauftrag = document.getElementById('WD0172')?? document.getElementById('WD02B1')
  // clicks step by step :)
  protime_Innenauftrag.value = item_bookingNumber
  protime_Innenauftrag.dispatchEvent(keyEventEnter)
  // Wait till dropdown appears -- mit async ma verbessern

    const protime_Leistung = document.getElementById('WD02B3-r') ?? document.getElementById('WD0207-r')
    // Services Dropdown
    const protime_Leistungen_CSITExtST = document.querySelector("[data-itemkey='ZCHN0730070']")
    const protime_Leistungen_CSITExtNT = document.querySelector("[data-itemkey='ZCHN0730080']")
    const protime_Leistungen_ITDNT = document.querySelector("[data-itemkey='ZCHN0730005']")
    const protime_Leistungen_ITD = document.querySelector("[data-itemkey='ZCHN0730001']")

    protime_Leistung.click()
    setTimeout(function(){ protime_Leistungen_CSITExtST.click() }, 500 );
}