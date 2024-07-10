import { notification } from "../../../components/notification/notification.js"

let anyProjectNomber = "*"

// Call the correct booking numbers for the specific tickets
export async function amagProTime(bookingData,detectionItemsProTime,dev_pttest){
  let ticketFilterMatch = []
  bookingData.forEach((ticket) => {

    let ticketPrefixMatches = filterPrefix(ticket,detectionItemsProTime)
    let ticketAddPrefixMatches = filterAddPrefix(ticket,ticketPrefixMatches)
    let ticketRefinePrefixesMatches = filterAllPrefixes(ticket, ticketAddPrefixMatches)
    let ticketRefineBookingNomber = filterBookingNomber(ticket, ticketRefinePrefixesMatches)

    if (ticketRefineBookingNomber.length >1) {
      notification(true, false, "Abgebrochen: Ticket hat mehrfache Matches | "+ticket.item_ticketnumber+" "+ticket.item_ticketdisc)
      return
    } else if(ticketRefineBookingNomber.length === 1) {
      ticketFilterMatch.push([ticket,ticketRefineBookingNomber[0]])
    }

    console.log("ticket filter matches ",ticket, ticketRefineBookingNomber)
  });

  console.log("match ",ticketFilterMatch)
  if(dev_pttest){
    console.log('protime test '+dev_pttest)
  }
  return "ProTime OK"
}

function filterPrefix(ticket,detectionItemsProTime){
  let filterPrefix_prefixMatches = []
  detectionItemsProTime.forEach((detectionItemProTime) => {
    if (detectionItemProTime.ticketprefix.length > 0 && ticket.item_ticketnumber.includes(detectionItemProTime.ticketprefix) || 
          detectionItemProTime.ticketprefix.length === 0 && ticket.item_ticketnumber.length === 0 ) {
      filterPrefix_prefixMatches.push(detectionItemProTime)
    }
  })
  return filterPrefix_prefixMatches ? filterPrefix_prefixMatches : null
}

function filterAddPrefix(ticket, detectionItems_ticketPrefixMatches){
  let filterAddPrefix_addPrefixMatches = []
  detectionItems_ticketPrefixMatches.forEach((detectionItemPrefixMatch) => {
    if (detectionItemPrefixMatch.addprefix.length > 0 && ticket.item_ticketdisc.includes(detectionItemPrefixMatch.addprefix) || detectionItemPrefixMatch.addprefix.length === 0 ) {

        filterAddPrefix_addPrefixMatches.push(detectionItemPrefixMatch)
    }
  })
  return filterAddPrefix_addPrefixMatches ? filterAddPrefix_addPrefixMatches : null
}

function filterAllPrefixes(ticket, ticketAddPrefixMatches) {
  let refinePrefix_Matches = []
  if(ticketAddPrefixMatches.length > 1) {
    ticketAddPrefixMatches.forEach((detectionItemRefineMatch) => {
      if(detectionItemRefineMatch.addprefix.length > 0 && ticket.item_ticketdisc.includes(detectionItemRefineMatch.addprefix) && ticket.item_ticketnumber.includes(detectionItemRefineMatch.ticketprefix)){
        refinePrefix_Matches.push(detectionItemRefineMatch)
      }
    })
  } else {
    refinePrefix_Matches = ticketAddPrefixMatches
  }
  return refinePrefix_Matches
}

function filterBookingNomber(ticket, ticketRefinePrefixesMatches){
  let refineBookingNomber_Matches = []

  if(ticketRefinePrefixesMatches.length > 1) {
    ticketRefinePrefixesMatches.forEach((detectionItemRefineBookingNomber) => {
      if(ticket.item_bookingnumber && detectionItemRefineBookingNomber.projectnomber === ticket.item_bookingnumber || ticket.item_bookingnumber && detectionItemRefineBookingNomber.projectnomber === anyProjectNomber ){
        refineBookingNomber_Matches.push(detectionItemRefineBookingNomber)
      }else if(!ticket.item_bookingnumber && detectionItemRefineBookingNomber.projectnomber.length && detectionItemRefineBookingNomber.projectnomber !== anyProjectNomber){
        refineBookingNomber_Matches.push(detectionItemRefineBookingNomber)
      }
    })
  }else {
    refineBookingNomber_Matches = ticketRefinePrefixesMatches
  }
  return refineBookingNomber_Matches
}


// function to pass variables from extension to tab

async function execBookingScript(item_bookingNumber,item_ticketTime,item_ticketNumber,item_ticketDisc,dev_pttest){
  // alert(item_bookingNumber+item_ticketTime+item_ticketNumber+item_ticketDisc)
  let [tab] = await chrome.tabs.query ({active: true, currentWindow: true});
    // Execute script to parse emails on page
    chrome.scripting.executeScript({
    target: {tabId: tab.id},
    args: [item_bookingNumber,item_ticketTime,item_ticketNumber,item_ticketDisc,dev_pttest],
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

  if(dev_pttest === true)
    {
      console.log('PT Test -- dev: true')
    }else{
      // click booking button here!
    }

  // sleep(2000)
  // return new Promise((resolve) => {
    // resolve('resolved')
  // })
}