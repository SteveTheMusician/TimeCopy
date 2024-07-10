import { notification } from "../../../components/notification/notification.js"

let anyProjectNomber = "*"

// Call the correct booking numbers for the specific tickets
export async function amagProTime(bookingData,detectionItemsProTime,dev_pttest){
  let valideTickets = []
  let failedTickets = []
  bookingData.forEach((ticket) => {

    let ticketPrefixMatches = filterPrefix(ticket,detectionItemsProTime)
    let ticketAddPrefixMatches = filterAddPrefix(ticket,ticketPrefixMatches)
    let ticketRefinePrefixesMatches = filterAllPrefixes(ticket, ticketAddPrefixMatches)
    let ticketRefineBookingNomber = filterBookingNomber(ticket, ticketRefinePrefixesMatches)

    if (ticketRefineBookingNomber.length >1) {
      notification(true, false, "Abgebrochen: Ticket hat mehrfache Matches | "+ticket.item_ticketnumber+" "+ticket.item_ticketdisc)
      return
    } else if(ticketRefineBookingNomber.length === 1) {
      valideTickets.push([ticket,ticketRefineBookingNomber[0]])
    } else if(ticketRefineBookingNomber.length === 0){
      failedTickets.push(ticket)
    }

    console.log("ticket filter matches ",ticket, ticketRefineBookingNomber)
  });
  
  if(failedTickets.length) {
    notification(true,false,failedTickets.length+`<span id="fail-link">Ticket(s)</span> wurden nicht übernommen.`)
    console.log("failed tickets ",failedTickets)
    var logFailedTicketList = []
    failedTickets.forEach((failedTicketItem) => {
      let ticketnumber
      let ticketdisc
      if(!failedTicketItem.item_ticketnumber.length){
        ticketnumber = "NO NOMBER"
      }else {
        ticketnumber = failedTicketItem.item_ticketnumber
      }
      if(!failedTicketItem.item_ticketdisc.length){
        ticketdisc = "NO DISCRIPTION"
      }else {
        ticketdisc = failedTicketItem.item_ticketdisc
      }
      logFailedTicketList.push(" -> ",ticketnumber,": ",ticketdisc," ")
    })
    let logFailedTicketsString = JSON.stringify(logFailedTicketList)
    let failedTicketsLink = document.getElementById('fail-link')
    failedTicketsLink.addEventListener('click', () => alert('Ignorierte Tickets: '+logFailedTicketsString.replace(/]|[[",]/g, '')))
  }
  console.log("valide ",valideTickets)
 if(valideTickets.length) {
  valideTickets.forEach((validTicket) => {
    execBookingScript(validTicket,dev_pttest)
  })
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


async function execBookingScript(validTicket,dev_pttest){
  let [tab] = await chrome.tabs.query ({active: true, currentWindow: true});
   chrome.scripting.executeScript({
     target: {tabId: tab.id},
     func: bookTicket,
     args: [validTicket, dev_pttest]
    });
}

function bookTicket(validTicket, dev_pttest) {
  // alert('book ticket',dev_pttest)
  let ticketObject = validTicket[0]
  let detectionObject = validTicket[1]
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
    if(ticketObject.item_bookingnumber || detectionObject.projectnomber) {
      protime_Innenauftrag.value = ticketObject.item_bookingnumber
      protime_Innenauftrag.dispatchEvent(keyEventEnter)
    }else {
      notification(true, false, 'No Bookingnomber found in '+ticketObject.item_ticketnumber+" "+ticketObject.item_ticketdisc)
      return
    }
  }else {
    notification(true, false, 'Unable to get ProTime Element: Order-Input')
    return
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
    protime_hours.value = ticketObject.item_tickettime

    // ggf ein await für dieses element
    let protime_ticketNumber = document.getElementsByClassName('lsField--empty')[2].childNodes[0]
    protime_ticketNumber.value = ticketObject.item_ticketnumber ?? ""
  
    let protime_ticketText = document.getElementsByTagName('textarea')[0]
    protime_ticketText.value = ticketObject.item_ticketdisc
  
  }, 700 );

  if(dev_pttest === true)
    {
      console.log("PTTestMode :"+dev_pttest)
    }else{
      // click booking button here!
    }

  // sleep(2000)
  // return new Promise((resolve) => {
    // resolve('resolved')
  // })
}