import { notification } from "../../../components/notification/notification.js";
import { waitTimer } from "../../../utils/waitTimer.js";

let anyProjectNomber = "*"
let bookingLoopCount = 0

// Call the correct booking numbers for the specific tickets
export async function amagProTime(bookingData, detectionItemsProTime, dev_pttest) {

  let valideTickets = [];
  let failedTickets = [];

  bookingData.forEach((ticket) => {
    let ticketPrefixMatches = filterPrefix(ticket, detectionItemsProTime);
    let ticketAddPrefixMatches = filterAddPrefix(ticket, ticketPrefixMatches);
    let ticketRefinePrefixesMatches = filterAllPrefixes(ticket, ticketAddPrefixMatches);
    let ticketRefineBookingNomber = filterBookingNomber(ticket, ticketRefinePrefixesMatches);

    if (ticketRefineBookingNomber.length > 1) {
      notification(true, false, "Abgebrochen: Ticket hat mehrfache Matches | " + ticket.item_ticketnumber + " " + ticket.item_ticketdisc);
      return;
    } else if (ticketRefineBookingNomber.length === 1) {
      valideTickets.push([ticket, ticketRefineBookingNomber[0]]);
    } else if (ticketRefineBookingNomber.length === 0) {
      failedTickets.push(ticket);
    }

    if(/\p{L}/u.test(ticket.item_tickettime)){
      notification(true, false, "Abgebrochen: Ticket hat ungewöhnliche Zeit-Einheit | " + ticket.item_ticketnumber + " " + ticket.item_ticketdisc);
      return;
    }

    console.log("ticket filter matches ", ticket, ticketRefineBookingNomber);
  });

  if (failedTickets.length) {
    notification(true, false, "⚠️ " + failedTickets.length + `<span id="fail-link">Ticket(s)</span> wurden nicht übernommen.`);
    console.log("failed tickets ", failedTickets);
    var logFailedTicketList = [];
    failedTickets.forEach((failedTicketItem) => {
      let ticketnumber;
      let ticketdisc;
      if (!failedTicketItem.item_ticketnumber.length) {
        ticketnumber = "NO NOMBER";
      } else {
        ticketnumber = failedTicketItem.item_ticketnumber;
      }
      if (!failedTicketItem.item_ticketdisc.length) {
        ticketdisc = "NO DISCRIPTION";
      } else {
        ticketdisc = failedTicketItem.item_ticketdisc;
      }
      logFailedTicketList.push(" -> ", ticketnumber, ": ", ticketdisc, " ");
    });
    let logFailedTicketsString = JSON.stringify(logFailedTicketList);
    let failedTicketsLink = document.getElementById('fail-link');
    failedTicketsLink.addEventListener('click', () => alert('Ignorierte Tickets: ' + logFailedTicketsString.replace(/]|[[",]/g, '')));
  }
  console.log("valide ", valideTickets);
  if (valideTickets.length) {
    for (let i = 0; i < valideTickets.length; i++) {
      let ticket = valideTickets[i]
      try {
        await chromeTabScript(ticket, dev_pttest, bookingLoopCount)
        bookingLoopCount++
         // async/await hier hinzufügen
        console.log('--> valid tickets loop')
      } catch (err) {
        console.error("Error in chromeTabScript: ", err)
        return Promise.reject(new Error(400)) // Hier wird der Fehler ausgelöst
      }
    }
  }
  return "ProTime Booked";
}


function filterPrefix(ticket, detectionItemsProTime) {
  let filterPrefix_prefixMatches = [];
  detectionItemsProTime.forEach((detectionItemProTime) => {
    if (detectionItemProTime.ticketprefix.length > 0 && ticket.item_ticketnumber.includes(detectionItemProTime.ticketprefix) ||
      detectionItemProTime.ticketprefix.length === 0 && ticket.item_ticketnumber.length === 0) {
      filterPrefix_prefixMatches.push(detectionItemProTime)
    }
  })
  return filterPrefix_prefixMatches ? filterPrefix_prefixMatches : null
}

function filterAddPrefix(ticket, detectionItems_ticketPrefixMatches) {
  let filterAddPrefix_addPrefixMatches = []
  detectionItems_ticketPrefixMatches.forEach((detectionItemPrefixMatch) => {
    if (detectionItemPrefixMatch.addprefix.length > 0 && ticket.item_ticketdisc.includes(detectionItemPrefixMatch.addprefix) || detectionItemPrefixMatch.addprefix.length === 0) {
      filterAddPrefix_addPrefixMatches.push(detectionItemPrefixMatch)
    }
  });
  return filterAddPrefix_addPrefixMatches ? filterAddPrefix_addPrefixMatches : null
}

function filterAllPrefixes(ticket, ticketAddPrefixMatches) {
  let refinePrefix_Matches = []
  if (ticketAddPrefixMatches.length > 1) {
    ticketAddPrefixMatches.forEach((detectionItemRefineMatch) => {
      if (detectionItemRefineMatch.addprefix.length > 0 && ticket.item_ticketdisc.includes(detectionItemRefineMatch.addprefix) && ticket.item_ticketnumber.includes(detectionItemRefineMatch.ticketprefix)) {
        refinePrefix_Matches.push(detectionItemRefineMatch)
      }
    });
  } else {
    refinePrefix_Matches = ticketAddPrefixMatches
  }
  return refinePrefix_Matches
}

function filterBookingNomber(ticket, ticketRefinePrefixesMatches) {
  let refineBookingNomber_Matches = []

  if (ticketRefinePrefixesMatches.length > 1) {
    ticketRefinePrefixesMatches.forEach((detectionItemRefineBookingNomber) => {
      if (ticket.item_bookingnumber && detectionItemRefineBookingNomber.projectnomber === ticket.item_bookingnumber || ticket.item_bookingnumber && detectionItemRefineBookingNomber.projectnomber === anyProjectNomber) {
        refineBookingNomber_Matches.push(detectionItemRefineBookingNomber)
      } else if (!ticket.item_bookingnumber && detectionItemRefineBookingNomber.projectnomber.length && detectionItemRefineBookingNomber.projectnomber !== anyProjectNomber) {
        refineBookingNomber_Matches.push(detectionItemRefineBookingNomber)
      }
    })
  } else {
    refineBookingNomber_Matches = ticketRefinePrefixesMatches
  }
  return refineBookingNomber_Matches
}

async function chromeTabScript(ticket, dev_pttest,bookingLoopCount) {
  chrome.windows.getCurrent(function (window) {
    chrome.windows.update(window.id, { focused: true })
  });
  // console.log('--chrome script', ticket, dev_pttest)
  try {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: bookTicket,
      args: [ticket, dev_pttest, bookingLoopCount]
    })
    // console.log('--script executed')
  } catch (err) {
    console.error("Error in chromeTabScript execution: ", err)
    throw err
  }
}

async function bookTicket(ticket, dev_pttest, bookingLoopCount) {

  function waitTimer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Timer done")
      }, 250)
    })
  }
  
  function checkFirstBookingLoop(bookingLoopCount) {
    // !document.getElementById('timeCopyProTimeClick')
    return new Promise((resolve) => {
      if (bookingLoopCount === 0) {
        // alert(bookingLoopCount)
        let dom_clickContainer = document.createElement("div")
        let dom_clickContainerInner = document.createElement("div")
        dom_clickContainer.setAttribute('id', 'timeCopyProTimeClick')
        dom_clickContainer.setAttribute('class', 'TimeCopy-ProtTime-clickArea')
        dom_clickContainer.setAttribute('style', 'position: fixed; width: 100%; height: 100%; z-index: 9999; background-color: #031a21ee; top: 0; left: 0; display: flex; justify-content: center; align-items: center; cursor: pointer;')
        dom_clickContainer.setAttribute('onClick', 'document.getElementById("timeCopyProTimeClick").remove()')
        dom_clickContainerInner.setAttribute('style', 'width: 30%; height: 12%; border: 2px dashed #5ecac3; font-size: 24px; color: #5ecac3; padding: 20px; border-radius: 20px; display: flex; justify-content: center; align-items: center;')
        dom_clickContainerInner.innerHTML = "Click here to focus window"
        dom_clickContainer.appendChild(dom_clickContainerInner)
        document.getElementsByTagName('body')[0].appendChild(dom_clickContainer)
        dom_clickContainer.addEventListener("click", test);
      }else {
        test()
      }

      function test(){
        // alert('testfunc')
        resolve('ok')
      }
    })
  }

  try {
    let firstBookingLoop = await checkFirstBookingLoop(bookingLoopCount)
    console.log(firstBookingLoop)
  } catch (error) {
    alert(error)
    console.error("Error in checkFirstBookingLoop: ", error);
    return
  }
    const keyEventEnter = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      which: 13,
      keyCode: 13,
    })

    const eventChange = new Event("change")
    const ticketObject = ticket[0]
    const detectionObject = ticket[1]
    let protime_hours
    let protime_ticketNumber
    let protime_activityDropdown
    let protime_activityDropdownList
    let protime_ticketElemNom
    let protime_Innenauftrag = document.getElementsByClassName('lsField--f4')[0]
    if (protime_Innenauftrag && protime_Innenauftrag.childNodes && protime_Innenauftrag.childNodes.length > 0) {
      let proTime_projectNomber = ticketObject.item_bookingnumber || detectionObject.projectnomber
      if (proTime_projectNomber) {
        protime_Innenauftrag.childNodes[0].value = proTime_projectNomber
        protime_Innenauftrag.childNodes[0].dispatchEvent(keyEventEnter)
      } else {
        return
      }
    } else {
      return
    }

    try {
      const result = await waitTimer()
      // console.log(result)
    } catch (error) {
      alert(error)
      console.error("Error in waitTimer: ", error);
      return
    }
    // service dropdown
    let protime_leistung = document.getElementsByClassName('lsField--list')[1].childNodes[0];
    let protime_leistungenOption;
    const protime_leistungenArray = [{
      "select_proTime_service_CSITEST": "[data-itemkey='ZCHN0730070']",
      "select_proTime_service_CSITENT": "[data-itemkey='ZCHN0730080']",
      "select_proTime_service_ITDNT": "[data-itemkey='ZCHN0730005']",
      "select_proTime_service_ITD": "[data-itemkey='ZCHN0730001']"
    }]
    protime_leistung.click()
    protime_leistungenOption = document.querySelector(protime_leistungenArray[0][detectionObject.protimeservice]);

    if (!protime_leistungenOption) {
      return
    }

    protime_leistungenOption.click()

    try {
      const result = await waitTimer()
    } catch (error) {
      alert(error)
      console.error("Error in waitTimer: ", error)
      return;
    }
    // if detection item has activity book it
    if (detectionObject.protimeactivity.length > 1) {
      protime_activityDropdown = document.getElementsByClassName('lsField--list')[2].childNodes[0]
      protime_activityDropdown.click()
      protime_activityDropdownList = document.getElementsByClassName('lsListbox__items')[1].childNodes[0]
      let protime_activityDropdownItems = protime_activityDropdownList.childNodes
      for (let i = 0, ilen = protime_activityDropdownItems.length; i < ilen; i++) {
        if (protime_activityDropdownItems[i].textContent.includes(detectionObject.protimeactivity)) {
          protime_activityDropdownItems[i].click()
        }
      }
      // set Ticket Nomber Child Nom
      protime_ticketElemNom = 4
    } else {
      protime_ticketElemNom = 3
    }

    try {
      const result = await waitTimer()
      // console.log(result)
    } catch (error) {
      alert(error)
      console.error("Error in waitTimer: ", error)
      return
    }

    // Entry Ticket Data
    protime_hours = document.getElementsByClassName('lsField--right')[0].childNodes[0]
    protime_hours.focus()
    protime_hours.click()
    protime_hours.value = ticketObject.item_tickettime
    if (!dev_pttest) {
      protime_hours.dispatchEvent(keyEventEnter)
    }

    try {
      const result = await waitTimer()
      // console.log(result)
    } catch (error) {
      alert(error)
      console.error("Error in waitTimer: ", error)
      return
    }

    protime_ticketNumber = document.getElementsByClassName('lsField--list')[protime_ticketElemNom].childNodes[0]
    protime_ticketNumber.focus()
    protime_ticketNumber.click()
    protime_ticketNumber.value = ticketObject.item_ticketnumber
    if (!dev_pttest) {
    protime_ticketNumber.dispatchEvent(keyEventEnter)
    }

    try {
      const result = await waitTimer()
      // console.log(result)
    } catch (error) {
      alert(error)
      console.error("Error in waitTimer: ", error)
      return
    }

    let protime_ticketText = document.getElementsByTagName('textarea')[0];
    let mover = new MouseEvent('mouseover', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    // If ticket number is "Scrum" put "Scrum" also in the discription
    let ticketItemDisc = ticketObject.item_ticketdisc
    if(ticketObject.item_ticketnumber.includes("SCRUM")){
      ticketItemDisc = "[SCRUM] " + ticketObject.item_ticketdisc
    }

    let mdown = new Event('focus');
    protime_ticketText.dispatchEvent(mover)
    protime_ticketText.dispatchEvent(mdown)
    protime_ticketText.focus()
    protime_ticketText.click()
    protime_ticketText.value = ticketItemDisc
    document.getElementsByTagName('textarea')[0].dispatchEvent(eventChange);
    // set focus to other textarea to accept befores area text
    document.getElementsByTagName('textarea')[1].focus();
    // Set the cursor position to the end of the text
    document.getElementsByTagName('textarea')[1].setSelectionRange(document.getElementsByTagName('textarea')[1].value.length, document.getElementsByTagName('textarea')[1].value.length);

    try {
      const result = await waitTimer()
      // console.log(result)
    } catch (error) {
      alert(error)
      console.error("Error in waitTimer: ", error)
      return
    }

    console.log("DEV-TestMode: " + dev_pttest)
    if (!dev_pttest) {
      let bookingButton = document.getElementsByClassName('lsToolbar--item-button')[8]
      bookingButton.focus()
      bookingButton.click()
    } else {
      // document.getElementsByClassName('lsToolbar--item-button')[9].click()
    }
    try {
      const result = await waitTimer()
      // console.log(result)
    } catch (error) {
      alert(error)
      console.error("Error in waitTimer: ", error)
      return
    }
    try {
      const result = await waitTimer()
      // console.log(result)
    } catch (error) {
      alert(error)
      console.error("Error in waitTimer: ", error)
      return
    }
    try {
      const result = await waitTimer()
      // console.log(result)
    } catch (error) {
      alert(error)
      console.error("Error in waitTimer: ", error)
      return
    }
    return bookingLoopCount
}
