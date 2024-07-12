import { notification } from "../../../components/notification/notification.js";

let anyProjectNomber = "*"
// Call the correct booking numbers for the specific tickets
export async function amagProTime(bookingData, detectionItemsProTime, dev_pttest) {

  let valideTickets = []
  let failedTickets = []

  bookingData.forEach((ticket) => {
    let ticketPrefixMatches = filterPrefix(ticket, detectionItemsProTime)
    let ticketAddPrefixMatches = filterAddPrefix(ticket, ticketPrefixMatches)
    let ticketRefinePrefixesMatches = filterAllPrefixes(ticket, ticketAddPrefixMatches)
    let ticketRefineBookingNomber = filterBookingNomber(ticket, ticketRefinePrefixesMatches)

    if (ticketRefineBookingNomber.length > 1) {
      notification(true, false, "Abgebrochen: Ticket hat mehrfache Matches | " + ticket.item_ticketnumber + " " + ticket.item_ticketdisc)
      return
    } else if (ticketRefineBookingNomber.length === 1) {
      valideTickets.push([ticket, ticketRefineBookingNomber[0]])
    } else if (ticketRefineBookingNomber.length === 0) {
      failedTickets.push(ticket)
    }

    console.log("ticket filter matches ", ticket, ticketRefineBookingNomber)
  });

  if (failedTickets.length) {
    notification(true, false, "⚠️ " + failedTickets.length + `<span id="fail-link">Ticket(s)</span> wurden nicht übernommen.`)
    console.log("failed tickets ", failedTickets)
    var logFailedTicketList = []
    failedTickets.forEach((failedTicketItem) => {
      let ticketnumber
      let ticketdisc
      if (!failedTicketItem.item_ticketnumber.length) {
        ticketnumber = "NO NOMBER"
      } else {
        ticketnumber = failedTicketItem.item_ticketnumber
      }
      if (!failedTicketItem.item_ticketdisc.length) {
        ticketdisc = "NO DISCRIPTION"
      } else {
        ticketdisc = failedTicketItem.item_ticketdisc
      }
      logFailedTicketList.push(" -> ", ticketnumber, ": ", ticketdisc, " ")
    })
    let logFailedTicketsString = JSON.stringify(logFailedTicketList)
    let failedTicketsLink = document.getElementById('fail-link')
    failedTicketsLink.addEventListener('click', () => alert('Ignorierte Tickets: ' + logFailedTicketsString.replace(/]|[[",]/g, '')))
  }
  console.log("valide ", valideTickets)
  if (valideTickets.length) {
    for (let i = 0; i < valideTickets.length; i++) {
      let ticket = valideTickets[i]
      try {
        await chromeTabScript(ticket, dev_pttest) // async/await hier hinzufügen
        console.log('--> valid tickets loop')
      } catch (err) {
        return Promise.reject(new Error(400));
      }

    }
  }
  return "ProTime Booked"
}

function filterPrefix(ticket, detectionItemsProTime) {
  let filterPrefix_prefixMatches = []
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
  })
  return filterAddPrefix_addPrefixMatches ? filterAddPrefix_addPrefixMatches : null
}

function filterAllPrefixes(ticket, ticketAddPrefixMatches) {
  let refinePrefix_Matches = []
  if (ticketAddPrefixMatches.length > 1) {
    ticketAddPrefixMatches.forEach((detectionItemRefineMatch) => {
      if (detectionItemRefineMatch.addprefix.length > 0 && ticket.item_ticketdisc.includes(detectionItemRefineMatch.addprefix) && ticket.item_ticketnumber.includes(detectionItemRefineMatch.ticketprefix)) {
        refinePrefix_Matches.push(detectionItemRefineMatch)
      }
    })
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

async function chromeTabScript(ticket, dev_pttest) {
  console.log('--chrome script');
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: bookTicket,
    args: [ticket, dev_pttest]
  });
}

async function bookTicket(ticket, dev_pttest) {
  const keyEventEnter = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    which: 13,
    keyCode: 13,
  });
  const eventChange = new Event("change");

  const ticketObject = ticket[0];
  const detectionObject = ticket[1];
  let protime_hours
  let protime_ticketNumber
  let protime_activityDropdown
  let protime_activityDropdownList
  let protime_ticketElemNom
  //This function has to be defined here, cuz we are in the chrome script 
  // If u want to use it in other components, just import them from utils
  function waitTimer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Timer done");
      }, 2000);  // Set the appropriate delay
    });
  }
  function waitForElm(selector) {
    alert(selector)
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
  }
    
      let protime_Innenauftrag = document.getElementsByClassName('lsField--f4')[0];
      if (protime_Innenauftrag && protime_Innenauftrag.childNodes && protime_Innenauftrag.childNodes.length > 0) {
        let proTime_projectNomber = ticketObject.item_bookingnumber || detectionObject.projectnomber;
        if (proTime_projectNomber) {
          protime_Innenauftrag.childNodes[0].value = proTime_projectNomber;
          protime_Innenauftrag.childNodes[0].dispatchEvent(keyEventEnter);
        } else {
          return;
        }
      } else {
        return;
      }
      try {
        const result = await waitTimer();  // Await the waitTimer function
          console.log(result)
      } catch (error) {
        alert(error)
        console.error("Error in waitTimer: ", error);  // Handle any potential errors
        return;  // Early return in case of error
      }

  // service dropdown
      let protime_leistung = document.getElementsByClassName('lsField--list')[1].childNodes[0];
      let protime_leistungenOption;
      const protime_leistungenArray = [{
        "select_proTime_service_CSITEST": "[data-itemkey='ZCHN0730070']",
        "select_proTime_service_CSITENT": "[data-itemkey='ZCHN0730080']",
        "select_proTime_service_ITDNT": "[data-itemkey='ZCHN0730005']",
        "select_proTime_service_ITD": "[data-itemkey='ZCHN0730001']"
      }];
      protime_leistungenOption = document.querySelector(protime_leistungenArray[0][detectionObject.protimeservice]);
      protime_leistung.click();
      protime_leistungenOption.click();


      try {
        const result = await waitTimer();  // Await the waitTimer function
          console.log(result)
      } catch (error) {
        alert(error)
        console.error("Error in waitTimer: ", error);  // Handle any potential errors
        return;  // Early return in case of error
      }


      //if detection item has activity book it
      if (detectionObject.protimeactivity.length > 1) {
        protime_activityDropdown = document.getElementsByClassName('lsField--list')[2].childNodes[0];
        protime_activityDropdown.click();
        protime_activityDropdownList = document.getElementsByClassName('lsListbox__items')[1].childNodes[0]
        let protime_activityDropdownItems = protime_activityDropdownList.childNodes
        for (let i = 0, ilen = protime_activityDropdownItems.length; i < ilen; i++) {
          if (protime_activityDropdownItems[i].textContent.includes(detectionObject.protimeactivity)) {
            protime_activityDropdownItems[i].click();
          }
        }
        // set Ticket Nomber Child Nom
        protime_ticketElemNom = 4
      } else {
        protime_ticketElemNom = 3  
      }
      try {
        const result = await waitTimer();  // Await the waitTimer function
          console.log(result)
      } catch (error) {
        alert(error)
        console.error("Error in waitTimer: ", error);  // Handle any potential errors
        return;  // Early return in case of error
      }
  // Entry Ticket Data

    
    protime_hours = document.getElementsByClassName('lsField--right')[0].childNodes[0]
    protime_hours.focus()
    protime_hours.click()
    protime_hours.value = ticketObject.item_tickettime;
    protime_hours.dispatchEvent(keyEventEnter)
    // protime_hours.dispatchEvent(keyEventEnter);
    try {
      const result = await waitTimer();  // Await the waitTimer function
        console.log(result)
    } catch (error) {
      alert(error)
      console.error("Error in waitTimer: ", error);  // Handle any potential errors
      return;  // Early return in case of error
    }
    protime_ticketNumber = document.getElementsByClassName('lsField--list')[protime_ticketElemNom].childNodes[0]
    protime_ticketNumber.focus()
    protime_ticketNumber.click()
    protime_ticketNumber.value = ticketObject.item_ticketnumber
    protime_ticketNumber.dispatchEvent(keyEventEnter)
    try {
      const result = await waitTimer();  // Await the waitTimer function
        console.log(result)
    } catch (error) {
      alert(error)
      console.error("Error in waitTimer: ", error);  // Handle any potential errors
      return;  // Early return in case of error
    } 
    let protime_ticketText = document.getElementsByTagName('textarea')[0];
      protime_ticketText.focus()
      protime_ticketText.value = ticketObject.item_ticketdisc;

    try {
      const result = await waitTimer();  // Await the waitTimer function
        console.log(result)
    } catch (error) {
      alert(error)
      console.error("Error in waitTimer: ", error);  // Handle any potential errors
      return;  // Early return in case of error
    }
    document.getElementsByTagName('textarea')[0].dispatchEvent(eventChange)

    document.getElementsByTagName('textarea')[1].focus();
        // Set the cursor position to the end of the text
        document.getElementsByTagName('textarea')[1].setSelectionRange(document.getElementsByTagName('textarea')[1].value.length, document.getElementsByTagName('textarea')[1].value.length);

    try {
      const result = await waitTimer();  // Await the waitTimer function
        console.log(result)
    } catch (error) {
      alert(error)
      console.error("Error in waitTimer: ", error);  // Handle any potential errors
      return;  // Early return in case of error
    }

    document.getElementsByClassName('lsToolbar--item-button')[9].click()
  if (!dev_pttest) {
    let bookingButton = document.getElementsByClassName('lsToolbar--item-button')[8]
    bookingButton.focus()
    bookingButton.click()
  }

  // If Test Mode is deactivated, book it
  // if (!dev_pttest) {
    // await new Promise((resolveBooking, reject) => {
      // setTimeout(function () {
        // let bookingButton = document.getElementsByClassName('lsToolbar--item-button')[8]
        // bookingButton.click()
      // resolveBooking();
      // }, 400)
    // })
  // }

}

