import {
  TestPageLoadPerformance,
  filterPrefix,
  filterAddPrefix,
  filterAllPrefixes,
  filterBookingNomber
} from "./services/AmagProTime.services.js";
import { message } from "../../../components/ui/message/message.js";
import {
  bookingLoopCount,
  highLatency,
  useHighLatency,
  forceHighLatency,
  useTicketNomberInText,
  useAutoSelectDay,
  noTicketNomberFill,
  noTicketDiscFill
} from "./variables/AmagProTime.variables.js";
import { lstorage_c_dlcProTimeUseLatencyMode,lstorage_c_dlcProTimeForceLatencyMode,
  lstorage_c_dlcProtimeTicketNomberInText,lstorage_c_dlcProTimeTest, lstorage_c_dlcProtimeUseMatchBookingDay, lstorage_c_dlcProtimeUseAutoSelectDay } from "../../../utils/dlcStorage.js";
import { debugStick } from "../../../utils/appDebugStick.js";

// 🍎 initial script to filter data and start the booking process
export async function AmagProTime(bookingData, detectionItemsProTime) {
  let valideTickets = [];
  let failedTickets = [];
  let errorDetailMessage = ''
  let dev_pttest = lstorage_c_dlcProTimeTest
  let matchDateDay = lstorage_c_dlcProtimeUseMatchBookingDay
  // use force latency mode
  if (lstorage_c_dlcProTimeForceLatencyMode === true) {
    highLatency = true
    forceHighLatency = true
    message(true, 'warning', 'High Latency Modus', '"Erzwinge High Latency-Modus" ist in den ProTime DLC-Funktionen aktiviert. Time Copy wird die Daten langsamer, dafür sicherer übertragen.')
  }
  if(lstorage_c_dlcProTimeTest === true){
    message(true, 'warning', 'Test Modus', 'Das Amag ProTime DLC befindet sich im Testmodus. Daten werden übertragen aber nicht gebucht.')
    console.warn('DLC Amag ProTime: Test Mode activated')
  }
  // set use High Latency
  useHighLatency = lstorage_c_dlcProTimeUseLatencyMode ?? useHighLatency
  useAutoSelectDay = lstorage_c_dlcProtimeUseAutoSelectDay ?? useAutoSelectDay
  // check if to use ticketnomber in the discription
  useTicketNomberInText = lstorage_c_dlcProtimeTicketNomberInText
  if (useTicketNomberInText === false) {
    console.warn('DLC Amag ProTime: Use Ticketnomber in description is deaktivated')
    useTicketNomberInText = false
  }
  // match tickets to the given filters (functions in service.js)
  try {
    bookingData.forEach((ticket) => {
      let ticketPrefixMatches = filterPrefix(ticket, detectionItemsProTime);
      let ticketAddPrefixMatches = filterAddPrefix(ticket, ticketPrefixMatches);
      let ticketRefinePrefixesMatches = filterAllPrefixes(ticket, ticketAddPrefixMatches);
      let ticketRefineBookingNomber = filterBookingNomber(ticket, ticketRefinePrefixesMatches);
      debugStick({ticketPrefixMatches,ticketAddPrefixMatches,ticketRefinePrefixesMatches,ticketRefineBookingNomber},'AmagProTime Services')
      if (ticket.item_ticketdisc.length < 2) {
        throw ({ errorstatus: 'error', errorheadline: "Ticket hat keine Beschreibung", errortext: ticket.item_ticketnumber + ' ' + ticket.item_bookingnumber })
      }
      if (ticketRefineBookingNomber.length > 1) {
        throw ({ errorstatus: 'error', errorheadline: "Ticket Mehrfachmatches", errortext: "Ticket hat mehrfache Ergebnisse | " + ticket.item_ticketnumber + " " + ticket.item_ticketdisc });
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
          errorDetailMessage = '[' + ticket.item_ticketnumber + '] ' + ticket.item_ticketdisc + ' : Die Buchungsnummer fehlt entweder im Ticket oder den Erkennsungs-Filter.'
          throw ({ errorstatus: 'error', errorheadline: "Buchungsnummer fehlt", errortext: errorDetailMessage })
        }
      }
    });
  } catch (error) {
    throw error
  }
  // put all missmatch tickets in to an array 
  if (failedTickets.length) {
    let notificationTimeOut = 0
    console.warn("⛔️ [DLC Platforms: AmagProTime] failed tickets: ", failedTickets);
    failedTickets.forEach((failedTicketItem) => {
      let ticketnumber;
      let ticketdisc;
      if (!failedTicketItem.item_ticketnumber.length) {
        ticketnumber = noTicketNomberFill;
      } else {
        ticketnumber = failedTicketItem.item_ticketnumber;
      }
      if (!failedTicketItem.item_ticketdisc.length) {
        ticketdisc = noTicketDiscFill;
      } else {
        ticketdisc = failedTicketItem.item_ticketdisc;
      }
      // message feedback
      notificationTimeOut += 150
      setTimeout(function () {
        message(true, 'warning', 'Ticket nicht übernommen', ticketnumber + ': ' + ticketdisc)
      }, notificationTimeOut)
    });
    notificationTimeOut = 0
  }
  // pass valide tickets to chrome-tab script and give feedback
  try {
    if (valideTickets.length) {
      const iChrTab = await injectChromeTabScriptProTime(valideTickets, dev_pttest, bookingLoopCount, highLatency, useHighLatency,useTicketNomberInText,matchDateDay,useAutoSelectDay)
      bookingLoopCount++
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

// 🍎 chrom tab scripts
async function injectChromeTabScriptProTime(valideTickets, dev_pttest, bookingLoopCount, highLatency, useHighLatency,useTicketNomberInText,matchDateDay,useAutoSelectDay) {
  // check latency in current tab + only when use high latency is aktivated
  if (useHighLatency) {
    try {
      let proTimeJSPageTime = await TestPageLoadPerformance()
      proTimeJSPageTime = Math.round(proTimeJSPageTime / 1000)
      // use high latency only when page ping is low
      if (proTimeJSPageTime > 150) {
        console.warn("[Time Copy][DLC Platforms: AmagProTime] ⚠️ Warning: ProTime Page has low ping (" + proTimeJSPageTime + " ms )")
        message(true, 'warning', 'ProTime hat hohen Ping', 'ProTime wurde mit einem Ping von '+ proTimeJSPageTime +'ms gemessen. Ein hoher Ping kann unter umständen zu Buchungsfehler führen. Bei Problemen wird TimeCopy automatisch den High-Latency-Mode aktivieren.')
        // highLatency = true
      }
      chrome.windows.getCurrent(function (window) {
        chrome.windows.update(window.id, { focused: true });
      });
    } catch (error) {
      console.log('❌ [DLC Platforms: AmagProTime] TestPageLoadPerformance Error:', error)
      throw ({ errorstatus: 'error', errorheadline: 'Chrome Performance Test', errortext: '"Amag ProTime" hat Probleme, einen Performance-Test im aktuellem Tab durchzuführen.' })
    }
  }
  // inject booking script to current chrome tab
  try {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let chromeExecScript = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: AmagProTimeBookTickets,
      args: [valideTickets, dev_pttest, bookingLoopCount, highLatency, useHighLatency,useTicketNomberInText,matchDateDay,useAutoSelectDay]
    });

    if (chromeExecScript[0].result && chromeExecScript[0].result.error) {
      throw new Error(chromeExecScript[0].result.error);
    }
    return chromeExecScript[0];
  } catch (errObj) {
    console.error("Error in chromeTabScript execution: ", errObj);
    bookingLoopCount = 0
    throw ({ errorstatus: 'error', errorheadline: 'Chrome Tab Execution', errortext: errObj })
  }
}
// 🍎 main booking logic
async function AmagProTimeBookTickets(valideTickets,dev_pttest,bookingLoopCount, highLatency, useHighLatency,useTicketNomberInText,matchDateDay,useAutoSelectDay) {
  let crossObserver_mutationObserver
  function crossObserver(elementSelector) {
    let appearanceCount = 0;
    // return if observer is already running
    if (crossObserver_mutationObserver) {
      return crossObserver_mutationObserver;
    }
    const element = document.querySelector(elementSelector);
    crossObserver_mutationObserver = new MutationObserver(() => {
      const isVisible = element && element.style.display !== 'none' && element.style.visibility !== 'hidden';
      if (isVisible) {
        appearanceCount++;
        if (appearanceCount === 2) {
          highLatency = true
          crossObserver_mutationObserver.disconnect()
          }
        }
    });
    crossObserver_mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      attributes: true,
      attributesList: ["style"], 
    });
    return crossObserver_mutationObserver;
  }

  function stopCrossObserver() {
    if (crossObserver_mutationObserver) {
      crossObserver_mutationObserver.disconnect();
    }
  }
  // element change observer
  async function observeElement(selector, boolean, selectorNumber) {
    const checkInterval = 500;
    const timeout = 8000;
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject({
          text: 'ProTime Element Timeout',
          textdetails: "Ein Element in ProTime wurde nicht gefunden oder hat nicht die gewünschten Änderungen übernommen. Lade die Webseite neu und versuche es noch einmal. | "+selector + " #" + boolean
        });
      }, timeout);

      const checkAndObserve = () => {
        const element = document.querySelectorAll(selector)[selectorNumber];
        if (element) {
          if ((boolean && element.value) || (!boolean && !element.value) || (boolean && element) || (!boolean && !element)) {
            clearTimeout(timeoutId);
            resolve('[Time Copy] 👀 🟢 [Element Observer] Element found immediately');
            return;
          }
          const observer = new MutationObserver(() => {
            if (boolean) {
              if (element.value) {
                clearTimeout(timeoutId);
                observer.disconnect();
                resolve('[Time Copy] 👀 🟢 [Time Copy] [Element Observer] Element found after waiting for mutation');
              }
            } else {
              if (!element.value) {
                clearTimeout(timeoutId);
                observer.disconnect();
                resolve('[Time Copy] 👀 🟢 [Element Observer] Element gone after waiting for mutation');
              }
            }
          });
          observer.observe(element, {
            childList: true,
            subtree: true,
            attributes: true,
            attributesList: ["style"],
          });
        }
      };
      checkAndObserve();
      const existenceCheck = setInterval(() => {
        const element = document.querySelectorAll(selector)[selectorNumber];
        if (element) {
          clearInterval(existenceCheck);
          checkAndObserve();
        }
      }, checkInterval);
    });
  }
  // element visibility observer (more for the loading dots on pt)
  async function observeVisibility(selector, shouldBeVisible) {
    const checkInterval = 500;
    const timeout = 8000;
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject({
          text: 'ProTime Element Timeout',
          textdetails: `Timeout: Die Sichtbarkeitsbedingung für das Element mit dem Selektor "${selector}" wurde nicht innerhalb der Zeit erfüllt.`,
        });
      }, timeout);

      const checkAndObserve = () => {
        const element = document.querySelector(selector);
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
  // variables 
  const proTimeElem_loadingBox = '#ur-loading'
  // timing variables for wait timer
  const bookingWaitingTimerDefault = "250"
  const bookingWaitingTimer500 = "500"
  const bookingWaitingTimer1000 = "1000"
  // wait timer function
  async function waitTimer(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Timer done")
      }, ms)
    })
  }
  // enter key event
  const keyEventEnter = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    which: 13,
    keyCode: 13,
  })
  // mouse over event
  let mover = new MouseEvent('mouseover', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
  // 🏁 loading dots checkpoint function
  // use a boolean for a quick-check without timer
  async function checkpointLoadingDots(forceQuickCheckLoadingDots) {
    if (highLatency === true) {
      try {
        await waitTimer(bookingWaitingTimer1000)
        await waitTimer(bookingWaitingTimer1000)
        await waitTimer(bookingWaitingTimer1000)
        await waitTimer(bookingWaitingTimerDefault)
      } catch (error) {
        alert('Time Copy ' + error)
        return
      }
      try {
        await observeVisibility(proTimeElem_loadingBox, false)
      } catch (error) {
        return result = { success: false, message: error };
      }
    } else if (forceQuickCheckLoadingDots) {
      try {
        await observeVisibility(proTimeElem_loadingBox, false)
      } catch (error) {
        return result = { success: false, message: error };
      }
    }
  }
  // 🟩 check booking loop and place overlay functions
  function checkFirstBookingLoop(bookingLoopCount) {
    if(dev_pttest){
      console.warn('[Time Copy] ## ProTime Test-Mode ##')
    }
    return new Promise((resolve,reject) => {
      // if click-overlay already exists duo error / plugin reload - remove it
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
        if(!document.getElementById('timeCopyProTimeClick')){
          resolve('first booking loop ok')
        } else {
          reject({
            text: 'Overlay nicht geschlossen',
            textdetails: `Das Overlay konnte nicht geschlossen werden, was zu folge hat, dass der Buchungsprozess stehen geblieben ist. Überprüfe, ob du dich auf der richtigen Seite befindest.`,
          });
        }
      }
    })
  }
  let retryTicketList = []
  async function ticketBookingLoop(valideTickets) {
    try {
      // all functions executed for each valide ticket
      for (const ticket of valideTickets) {
        try {
          try {
            // use the booking-loop function to check where we are at the process and if we need the overlay
            await checkFirstBookingLoop(bookingLoopCount)
          } catch (error) {
            console.error("[Time Copy] Error in checkFirstBookingLoop: ", error);
            return result = { success: false, message: error };
          }
          console.log('---->')
          // start observing loading dots for the whole process
          crossObserver(proTimeElem_loadingBox);
          // wait for empty textarea (true only when page is reloaded or ticket was booked)
          try {
            await observeElement('textarea', false, '0');
          } catch (error) {
            return result = { success: false, message: error };
          }
          // checkpoint loading dots (quick-check)
          await checkpointLoadingDots(true)
          const eventChange = new Event("change")
          const ticketObject = ticket[0]
          const detectionObject = ticket[1]
          // Auto-Select Day
          if(useAutoSelectDay === true && ticketObject.item_dateday) {
            let allDays = document.querySelectorAll('.lsCalItemText')
            allDays.forEach(async (day) => { 
              if(day.innerHTML === ticketObject.item_dateday && day.parentNode.dataset.isclickable === 'true')
                {
                  day.parentNode.click()
                }
              }
            )
            await waitTimer(bookingWaitingTimer500)
          }

          let protime_hours
          let protime_ticketNumber
          let protime_activityDropdown
          let protime_activityDropdownList
          let protime_ticketElemNom
          let protime_Innenauftrag = document.getElementsByClassName('lsField--f4')[0]
          let proTime_projectNomber = ticketObject.item_bookingnumber || detectionObject.projectnomber
          let proTime_activeDateElement = document.querySelector(`[design="SELECTED5"]`)
          let proTime_activeDate = proTime_activeDateElement.getElementsByClassName('lsCalItemText')[0].innerHTML
          // If Days not match
          if(ticketObject.item_dateday && proTime_activeDate !== ticketObject.item_dateday && matchDateDay === true) {
            return result = { success: false, message: {text: "Falsches Datum",textdetails: "Das Datum des ausgewählten Tages stimmt nicht mit deinem Eintrag überein."} };
          }
          if (protime_Innenauftrag && protime_Innenauftrag.childNodes && protime_Innenauftrag.childNodes.length > 0) {
            if (proTime_projectNomber) {
              protime_Innenauftrag.childNodes[0].value = proTime_projectNomber
              protime_Innenauftrag.childNodes[0].dispatchEvent(keyEventEnter)
            } else {
              return
            }
          } else {
            return
          }
          await waitTimer(bookingWaitingTimer500)
          // checkpoint loading dots (loaw-latency)
          await checkpointLoadingDots(false)
          // service dropdown
          try {
            await observeElement('.lsField--list [aria-roledescription="Auswählen"]', true, '0');
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
          } catch (error) {
            return result = { success: false, message: error };
          }
          await waitTimer(bookingWaitingTimerDefault)
          // if detection item has activity book it
          try {
            if (detectionObject.protimeactivity.length > 1) {
              let protime_activityDropdownSelector = '.lsField--list [aria-roledescription="Auswählen"]'
              await observeElement(protime_activityDropdownSelector, true, '0');
              // checkpoint loading dots (loaw-latency)
              await checkpointLoadingDots(false)
              await observeElement('.lsListbox__items', true, '1')
              // checkpoint loading dots (loaw-latency)
              await checkpointLoadingDots(false)
              protime_activityDropdown = document.querySelectorAll(protime_activityDropdownSelector)[1]
              protime_activityDropdown.click()
              protime_activityDropdownList = document.getElementsByClassName('lsListbox__items')[1].childNodes[0]
              let protime_activityDropdownItems = protime_activityDropdownList.childNodes
              for (let i = 0, ilen = protime_activityDropdownItems.length; i < ilen; i++) {
                if (protime_activityDropdownItems[i].textContent.includes(detectionObject.protimeactivity)) {
                  protime_activityDropdownItems[i].click()
                }
              }
              // set ticket nomber child nom to get next feeld correctly
              protime_ticketElemNom = 4
            } else {
              protime_ticketElemNom = 3
            }
          } catch (error) {
            return result = { success: false, message: error };
          }

          await waitTimer(bookingWaitingTimer500)

          // 1s break on high latency mode
          if (highLatency === true) {
            await waitTimer(bookingWaitingTimer1000)
            await checkpointLoadingDots(true)
          }
          // empty textarea when retryList has length
          if(retryTicketList.length) {
            document.getElementsByTagName('textarea')[0].value = ''
          }
          protime_hours = document.getElementsByClassName('lsField--right')[0].childNodes[0]
          protime_hours.focus()
          protime_hours.click()
          protime_hours.value = ticketObject.item_tickettime

          await waitTimer(bookingWaitingTimerDefault)

          // press enter on protime hours-field only on booking-mode and if list has no length to prevent wrong entries
          if(!dev_pttest && !retryTicketList.length){
            protime_hours.dispatchEvent(keyEventEnter)
          }
          await checkpointLoadingDots(false)
          await checkpointLoadingDots(true)

          // if a "master number" is there, take this as ticket number for protime and let the original ticket number for the discription later
          let bookingItem_TicketNumber = ticketObject.item_ticketmasternumber ? ticketObject.item_ticketmasternumber : ticketObject.item_ticketnumber
          protime_ticketNumber = document.getElementsByClassName('lsField--list')[protime_ticketElemNom].childNodes[0]
          protime_ticketNumber.focus()
          protime_ticketNumber.click()
          protime_ticketNumber.value = bookingItem_TicketNumber
          if (!dev_pttest) {
            protime_ticketNumber.dispatchEvent(keyEventEnter)
          }

          await waitTimer(bookingWaitingTimerDefault)

          await checkpointLoadingDots(false)
          await checkpointLoadingDots(true)

          // join tickent number and discription if use ticket nomber in desc.
          let ticketItemDesc
          if(useTicketNomberInText){
            ticketItemDesc = "[" + ticketObject.item_ticketnumber + "] " + ticketObject.item_ticketdisc
          }else {
            ticketItemDesc = ticketObject.item_ticketdisc
          }
          let mdown = new Event('focus');
          let protime_ticketText = document.getElementsByTagName('textarea')[0];
          protime_ticketText.dispatchEvent(mover)
          protime_ticketText.dispatchEvent(mdown)
          protime_ticketText.focus()
          protime_ticketText.click()
          protime_ticketText.value = ticketItemDesc
          document.getElementsByTagName('textarea')[0].dispatchEvent(eventChange);
          // set focus to other textarea to accept befores area text
          document.getElementsByTagName('textarea')[1].focus();
          // set the cursor position to the end of the text
          document.getElementsByTagName('textarea')[1].setSelectionRange(document.getElementsByTagName('textarea')[1].value.length, document.getElementsByTagName('textarea')[1].value.length);

          await waitTimer(bookingWaitingTimerDefault)

          // last check of the main inputs
          // if values are incorrect (tickettime empty), put it into retry list
          if (document.getElementsByClassName('lsField--f4')[0].childNodes[0].value !== proTime_projectNomber ||
            document.getElementsByClassName('lsField--right')[0].childNodes[0].value === '' ||
            document.getElementsByTagName('textarea')[0].value !== ticketItemDesc ||
            document.getElementsByClassName('lsField--list')[protime_ticketElemNom].childNodes[0].value !== bookingItem_TicketNumber
          ) {
            console.warn('[Time Copy] 🎫 Retry Ticket: ',ticket)
            retryTicketList.push(ticket)
            // make text area empty on any errors, so we can move on with booking
            protime_ticketText.value = ''
            protime_ticketText.dispatchEvent(eventChange)
          } else {
            // press on book only when test-mode is unused and all fields are filled correctly
            if (!dev_pttest) {
              let bookingButton = document.getElementsByClassName('lsToolbar--item-button')[8]
              bookingButton.focus()
              bookingButton.click()
            } else {
              // clear elements when test is on (Values will be visibile on next ticket)
              // protime_ticketNumber.value = ''
              protime_ticketText.value = ''
            }
          }

          await waitTimer(bookingWaitingTimer500)
          await checkpointLoadingDots(false)
          await checkpointLoadingDots(true)

          try {
            await observeElement('textarea', false, '0');
          } catch (error) {
            return result = { success: false, message: error };
          }

          // disconnect cross observer
          stopCrossObserver()
          bookingLoopCount++
        } catch (error) {
          throw error
        }
      }
      // end of bookingloop
      if (retryTicketList.length) {
        return result = { success: true, retryBooking: true };
      }else {
        return result = { success: true, retryBooking: false };
      }
    } catch (error) {
      throw error
    }
  }
  // 🟦 run main booking proccess
  try {
    let ticketBookingLoopResult = await ticketBookingLoop(valideTickets)
    if(!ticketBookingLoopResult.success){
      return ticketBookingLoopResult
    }
    if(ticketBookingLoopResult.retryBooking){
      console.log('[Time Copy] 🕤 🟡 Retry process started')
      for ( let i = 0; i < 4 ; i++ ) {
        try {
          // activate high latency, after 1st retry failed
          if(i > 0 && useHighLatency) {
            highLatency = true
          }
          // error after 3 tries
          if(i >= 3) {
            console.error('[Time Copy] 🕤 🔴 Retry process max count reached')
            highLatency = false
            return result = { success: false, message: {text: 'Maximale Retries erreicht',textdetails: `Time Copy konnte nach mehrfache Versuche einige Tickets nicht buchen und hat den Prozess desshalb unterbrochhen.`}}
          }
          // try to re-book tickets from retrylist
          try {
            let newTicketList = retryTicketList
            retryTicketList = []
            ticketBookingLoopResult = await ticketBookingLoop(newTicketList)
            if(!ticketBookingLoopResult.success){
              highLatency = false
              return ticketBookingLoopResult
            }
            // succsess
            if(ticketBookingLoopResult.success && !ticketBookingLoopResult.retryBooking) {
              highLatency = false
              console.log('[Time Copy] 🕤 🟢 Retry process finished')
              return { success: true }
            }
          }catch (error) {
            throw error
          }
        } catch (error) {
          throw error
        }
      }
    }
  } catch (error) {
    throw error
  }
  return bookingLoopCount
}

