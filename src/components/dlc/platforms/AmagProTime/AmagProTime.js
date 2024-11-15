import { TestPageLoadPerformance,filterPrefix,filterAddPrefix,filterAllPrefixes,filterBookingNomber } from "./services/AmagProTime.services.js";
import { message } from "../../../ui/message/message.js";
import { notification } from "../../../ui/notification/notification.js";

let anyProjectNomber = "*"
let bookingLoopCount = 0
let lowLatency = false
let forceLowLatency = false

export async function AmagProTime(bookingData, detectionItemsProTime, dev_pttest) {

  let valideTickets = [];
  let failedTickets = [];
  let errorDetailMessage = ''

  // extra force-wert übergeben der dann den anderen auf true setzt, doppelte ID verhindern
  if(localStorage.getItem('tc_c_dlc_protimeforcelatencymode') === 'true') {
    lowLatency = true
    forceLowLatency = true
    message(true,'warning','Low Latency Mode' , 'Force Low Latency Modus ist in den ProTime DLC-Funktionen aktiviert. Time Copy wird die Daten langsamer, dafür sicherer übertragen.')
  }

  try {
    bookingData.forEach((ticket) => {
      let ticketPrefixMatches = filterPrefix(ticket, detectionItemsProTime);
      let ticketAddPrefixMatches = filterAddPrefix(ticket, ticketPrefixMatches);
      let ticketRefinePrefixesMatches = filterAllPrefixes(ticket, ticketAddPrefixMatches);
      let ticketRefineBookingNomber = filterBookingNomber(ticket, ticketRefinePrefixesMatches);

      if (ticket.item_ticketdisc.length < 2) {
        throw ({ errorstatus: 'error', errorheadline: "Ticket hat keine Discription", errortext: ticket.item_ticketnumber + ' ' + ticket.item_bookingnumber })
      }
      if (ticketRefineBookingNomber.length > 1) {
        throw ({ errorstatus: 'error', errorheadline: "Ticket Mehrfachmatches", errortext: "Ticket hat mehrfache Matches | " + ticket.item_ticketnumber + " " + ticket.item_ticketdisc });
      } else if (ticketRefineBookingNomber.length === 1) {
        valideTickets.push([ticket, ticketRefineBookingNomber[0]]);
      } else if (ticketRefineBookingNomber.length === 0) {
        failedTickets.push(ticket);
      }
      if (/\p{L}/u.test(ticket.item_tickettime)) {
        errorDetailMessage = 'Fehler im folgendem Ticket: ' + ticket.item_ticketnumber + ', ' + ticket.item_ticketdisc
        throw ({ errorstatus: 'error', errorheadline: "Ticket hat ungewöhnliche Zeitangabe", errortext: errorDetailMessage })
      }
      if (ticket.item_bookingnumber.length < 1 && ticketRefineBookingNomber.length > 0) {
        if (ticketRefineBookingNomber[0].projectnomber.length < 1) {
          errorDetailMessage = '[' + ticket.item_ticketnumber + ticket.item_ticketdisc + ' -> Die Buchungsnummer fehlt entweder im Ticket oder den Erkennsungs-Filter.'
          throw ({ errorstatus: 'error', errorheadline: "Buchungsnummer fehlt", errortext: errorDetailMessage })
        }
      }
    });
  } catch (error) {
    throw error
  }

  if (failedTickets.length) {
    let notificationTimeOut = 0
    console.log("⛔️ failed tickets ", failedTickets);
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
      notificationTimeOut += 150
      setTimeout(function () {
        message(true, 'warning', 'Ticket nicht übernommen', ticketnumber + ': ' + ticketdisc)
      }, notificationTimeOut)
    });
    notificationTimeOut = 0
  }
  console.log("🔄 valid tickets ", valideTickets);
  try {
    if (valideTickets.length) {
      const iChrTab = await injectChromeTabScriptProTime(valideTickets, dev_pttest, bookingLoopCount)
      bookingLoopCount++
      console.log('iChrTab:', iChrTab);
      if (iChrTab.result !== null && iChrTab.result.success === false) {
        throw ({ errorstatus: 'error', errorheadline: iChrTab.result.message.text, errortext: iChrTab.result.message.textdetails })
      }
    } else {
      throw ({ errorstatus: 'error', errorheadline: 'Keine Validen Daten', errortext: 'Die kopierten Informationen konnten nicht validiert bzw. keinen Filter zugeordnet werden. Bitte Prüfe ob: - die richtigen Informationen kopiert wurden  - der richtige Filter ausgewählt wurde  - die Erkennungs-Items stimmen' })
    }
  } catch (error) {
    bookingLoopCount = 0
    throw error
  }
  bookingLoopCount = 0
  return "ProTime Buchung beendet";
}

async function injectChromeTabScriptProTime(valideTickets, dev_pttest, bookingLoopCount) {
  // Check Page Latency
  try{
  let proTimeJSPageTime = await TestPageLoadPerformance()
  console.log("current Page Time:" + proTimeJSPageTime)
  proTimeJSPageTime = Math.round(proTimeJSPageTime / 1000)
  if (proTimeJSPageTime > 60) {
    forceLowLatency ? '' : notification(true, false, "Webseite hat niedige Latenz. ("+proTimeJSPageTime+" ms) Buchungen werden länger brauchen.")
    forceLowLatency ? console.log('ProTime force low latency activated') : console.log("warning: ProTime Page low latency " + proTimeJSPageTime + " ms")
  }
  chrome.windows.getCurrent(function (window) {
    chrome.windows.update(window.id, { focused: true });
  });
  }catch(error){
    console.log('ProTime Chrome Window Error:',error)
    throw ({ errorstatus: 'error', errorheadline: 'Chrome Window URL', errortext: '"Amag ProTime" hat keinen zugriff auf eine gültige Chrome URL' })
  }
  try {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let chromeExecScript = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: AmagProTimeBookTickets,
      args: [valideTickets, dev_pttest, bookingLoopCount]
    });

    if (chromeExecScript[0].result && chromeExecScript[0].result.error) {
      console.log('chrome error', chromeExecScript);
      throw new Error(chromeExecScript[0].result.error);
    }
    return chromeExecScript[0];
  } catch (errObj) {
    console.log(errObj);
    console.error("Error in chromeTabScript execution: ", errObj);
    bookingLoopCount = 0
    throw ({ errorstatus: 'error', errorheadline: 'Chrome Tab Execution', errortext: errObj })
  }
}

async function AmagProTimeBookTickets(valideTickets, dev_pttest, bookingLoopCount) {

  // function for checking if loader exists / disappears
  async function observeElement(selector, boolean, selectorNumber) {
    const checkInterval = 500; // Intervall für wiederholte Checks
    const timeout = 8000; // maximale Wartezeit
    console.log('🟡 [Element Observer] Wait Element Started, Element Boolean:' + boolean);
  
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject({
          text: 'ProTime Element Timeout',
          textdetails: selector + " #" + boolean + ": Element wurde nicht gefunden oder hat nicht die gewünschten Änderungen übernehmen können. Grund dafür können Verbindungsprobleme sein."
        });
      }, timeout);
  
      // Funktion zur Prüfung und Beobachtung des Elements
      const checkAndObserve = () => {
        const element = document.querySelectorAll(selector)[selectorNumber];
        console.log('Element: ', element);
  
        if (element) {
          // Sofortige Prüfung, ob das Element bereits den gewünschten Zustand erfüllt
          if ((boolean && element.value) || (!boolean && !element.value) || (boolean && element) || (!boolean && !element)) {
            clearTimeout(timeoutId);
            resolve('🟢 [Element Observer] Element found immediately');
            return;
          }
  
          // MutationObserver starten, um auf Änderungen zu reagieren
          const observer = new MutationObserver(() => {
            if (boolean) {
              if (element.value) {
                clearTimeout(timeoutId);
                observer.disconnect();
                resolve('🟢 [Element Observer] Element found after waiting for mutation');
              }
            } else {
              if (!element.value) {
                clearTimeout(timeoutId);
                observer.disconnect();
                resolve('🟢 [Element Observer] Element gone after waiting for mutation');
              }
            }
          });
  
          // Starten des Observers für Änderungen am Element
          observer.observe(element, {
            childList: true,
            subtree: true,
            attributes: true,
            attributesList: ["style"],
          });
        }
      };
  
      // Einmalige Prüfung beim Start, um vorhandene Elemente sofort zu erkennen
      checkAndObserve();
  
      // Intervall-Check, falls das Element später hinzugefügt wird
      const existenceCheck = setInterval(() => {
        const element = document.querySelectorAll(selector)[selectorNumber];
        if (element) {
          clearInterval(existenceCheck);
          checkAndObserve();
        }
      }, checkInterval);
    });
  }

  async function observeVisibility(selector, shouldBeVisible) {
    const checkInterval = 500; // Intervall für wiederholte Checks in Millisekunden
    const timeout = 8000; // Timeout in Millisekunden
  
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject({
          text: 'ProTime Element Timeout',
          textdetails: `Timeout: Die Sichtbarkeitsbedingung für das Element mit dem Selektor "${selector}" wurde nicht innerhalb der Zeit erfüllt.`,
        });
      }, timeout);
  
      const checkAndObserve = () => {
        const element = document.querySelector(selector);
  
        // Prüft, ob das Element sichtbar ist
        const isVisible = element && element.style.display !== 'none' && element.style.visibility !== 'hidden';
  
        if (shouldBeVisible && isVisible) {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          resolve(`Element "${selector}" ist sichtbar.`);
        } else if (!shouldBeVisible && (!element || !isVisible)) {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          resolve(`Element "${selector}" ist unsichtbar oder wurde entfernt.`);
        }
      };
  
      const intervalId = setInterval(checkAndObserve, checkInterval);
    });
  }
  
  
  
  // timing variables for wait timer
  const bookingWaitingTimerDefault = "250"
  const bookingWaitingTimer500 = "500"
  const bookingWaitingTimer1000 = "1000"
  // wait timer
  async function waitTimer(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Timer done")
      }, ms)
    })
  }

  // Booking Proccess
  try {
    for (const ticket of valideTickets) {
      try {
        console.log(bookingLoopCount)
        function checkFirstBookingLoop(bookingLoopCount) {
          return new Promise((resolve) => {
            // If Click-Overlay already exists duo error / plugin reload - remove it
            if (document.getElementById('timeCopyProTimeClick')) {
              document.getElementById('timeCopyProTimeClick').remove()
            }
            if (bookingLoopCount === 0) {
              if (!document.getElementById('timeCopyProTimeClick')) {
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
                dom_clickContainer.addEventListener("click", resolveFirstBookingLoop);
              }
            } else {
              resolveFirstBookingLoop()
            }
            function resolveFirstBookingLoop() {
              resolve('first booking loop ok')
            }
          })
        }

        try {
          await checkFirstBookingLoop(bookingLoopCount)
          // console.log(firstBookingLoop)
        } catch (error) {
          alert('Time Copy ' + error)
          console.error("[Time Copy] Error in checkFirstBookingLoop: ", error);
          return
        }
        const keyEventEnter = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          which: 13,
          keyCode: 13,
        })

        // Wait for empty textarea (true only when page is reloaded or ticket was booked)
        try {
          await observeElement('textarea', false,'0');
        } catch (error) {
          console.log("result error: ", error);
          let errorMessage = error
          return result = { success: false, message: errorMessage };
        }
        // check if loadingspinner is gone
        try{
          await observeVisibility('#ur-loading', false)
        }catch(error){
          return result = { success: false, message: error };
        }

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
          await waitTimer(bookingWaitingTimer500)
        } catch (error) {
          alert('Time Copy ' + error)
          console.error("[Time Copy] WaitTimer Error: ", error);
          return
        }

        if(lowLatency === true){
          console.log('lowLatency activated')
          await waitTimer(bookingWaitingTimer1000)
          await waitTimer(bookingWaitingTimer1000)
          await waitTimer(bookingWaitingTimer1000)
          console.log('lowLatency activated - 1000')
          // wait till spinner is gone - low latency
          try{
            let x = await observeVisibility('#ur-loading', false)
            console.log('lowLatency observer ready',x)
          }catch(error){
            return result = { success: false, message: error };
          }
        }

        // service dropdown
        try {
          await observeElement('.lsField--list [aria-roledescription="Auswählen"]', true, '0');
          console.log('Leistung Dropdown ready')
          let protime_leistung = document.querySelectorAll('.lsField--list [aria-roledescription="Auswählen"]')[0]
          let protime_leistungenOption;
          const protime_leistungenArray = [{
            "select_proTime_service_CSITEST": "[data-itemkey='ZCHN0730070']",
            "select_proTime_service_CSITENT": "[data-itemkey='ZCHN0730080']",
            "select_proTime_service_ITDNT": "[data-itemkey='ZCHN0730005']",
            "select_proTime_service_ITD": "[data-itemkey='ZCHN0730001']"
          }]
          protime_leistung.click()
          protime_leistungenOption = document.querySelector(protime_leistungenArray[0][detectionObject.protimeservice]);
          protime_leistungenOption.click()
          console.log('Leistung dropdown selected')
        } catch (error) {
          console.log("result error: ", error);
          return result = { success: false, message: error };
        }
        //old --> let protime_leistung = document.getElementsByClassName('lsField--list')[1].childNodes[0];
        try {
          await waitTimer(bookingWaitingTimerDefault)
        } catch (error) {
          alert('Time Copy ' + error)
          console.error("[Time Copy] WaitTimer Error: ", error);
          return
        }
        // if detection item has activity book it
        // protime_activityDropdown = document.getElementsByClassName('lsField--list')[2].childNodes[0]
        try {
            if (detectionObject.protimeactivity.length > 1) {
              let protime_activityDropdownSelector = '.lsField--list [aria-roledescription="Auswählen"]'
              await observeElement(protime_activityDropdownSelector, true, '0');
              if(lowLatency === true){
                try{
                  await waitTimer(bookingWaitingTimer1000)
                  await waitTimer(bookingWaitingTimer1000)
                  await observeVisibility(protime_activityDropdownSelector, true)
                  await observeVisibility('#ur-loading', false)
                }catch(error){
                  console.error('[Time Copy] WaitTimmer Error: ', error)
                }
                console.log('--> Activity low latency')
              }
              await observeElement('.lsListbox__items', true, '1')
              try {
                await observeVisibility('#ur-loading', false)
              }catch(error){
                console.error('[Time Copy] Element Error: ', error)
              }
              protime_activityDropdown = document.querySelectorAll(protime_activityDropdownSelector)[1]
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
            }else {
              protime_ticketElemNom = 3
            }
        } catch (error) {
          console.log("result error: ", error);
          let errorMessage = error
          return result = { success: false, message: errorMessage };
        }
        try {
          await waitTimer(bookingWaitingTimerDefault)
        } catch (error) {
          alert('Time Copy ' + error)
          console.error("[Time Copy] WaitTimer Error: ", error);
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
          await waitTimer(bookingWaitingTimer500)
        } catch (error) {
          alert('Time Copy ' + error)
          console.error("[Time Copy] WaitTimer Error: ", error);
          return
        }
        // if a "master number" is there, take this as ticket number for protime and let the original ticket number for the discription later
        let bookingItem_TicketNumber = ticketObject.item_ticketmasternumber ? ticketObject.item_ticketmasternumber : ticketObject.item_ticketnumber

        protime_ticketNumber = document.getElementsByClassName('lsField--list')[protime_ticketElemNom].childNodes[0]
        protime_ticketNumber.focus()
        protime_ticketNumber.click()
        protime_ticketNumber.value = bookingItem_TicketNumber
        // if (!dev_pttest) {
          // protime_ticketNumber.dispatchEvent(keyEventEnter)
        // }

        try {
          await waitTimer(bookingWaitingTimerDefault)
        } catch (error) {
          alert('Time Copy ' + error)
          console.error("[Time Copy] WaitTimer Error: ", error);
          return
        }


        let mover = new MouseEvent('mouseover', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        });
        // Join tickent number and discription
        let ticketItemDisc = "[" + ticketObject.item_ticketnumber + "] " + ticketObject.item_ticketdisc

        let mdown = new Event('focus');

        let protime_ticketText = document.getElementsByTagName('textarea')[0];
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
          await waitTimer(bookingWaitingTimerDefault)
        } catch (error) {
          alert('Time Copy ' + error)
          console.error("[Time Copy] WaitTimer Error: ", error);
          return
        }

        console.log("ProTime Testmode: " + dev_pttest)
        if (!dev_pttest) {
          let bookingButton = document.getElementsByClassName('lsToolbar--item-button')[8]
          bookingButton.focus()
          bookingButton.click()
        }
        try {
          await waitTimer(bookingWaitingTimer500)
        } catch (error) {
          alert('Time Copy ' + error)
          console.error("[Time Copy] WaitTimer Error: ", error);
          return
        }

        try {
          console.log('--> Last Textarea Check')
          await elementObserver('textarea', true, '','0');
        } catch (error) {
          console.log("result error: ", error);
          let errorMessage = error
          return result = { success: false, message: errorMessage };
        }
        bookingLoopCount++
      } catch (error) {
        throw error
      }
    }

  } catch (error) {
    throw error
  }
  return bookingLoopCount
}

