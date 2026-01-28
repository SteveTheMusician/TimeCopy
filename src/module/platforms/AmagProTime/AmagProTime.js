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
  noTicketDescFill
} from "./variables/AmagProTime.variables.js";
import { lstorage_c_moduleProTimeUseLatencyMode,lstorage_c_moduleProTimeForceLatencyMode,
  lstorage_c_moduleProtimeTicketNomberInText,lstorage_c_moduleProTimeTest, lstorage_c_moduleProtimeUseMatchBookingDay, lstorage_c_moduleProtimeUseAutoSelectDay } from "../../../utils/modules/moduleStorage.js";
import { setStatusBarText } from "../../../utils/setStatusBarText.js";
import { debugStick } from "../../../utils/appDebugStick.js";
  
// 🍎 initial script to filter data and start the booking process
export async function AmagProTime(bookingData, detectionItemsProTime, appMetaToBrowser) {
  let valideTickets = [];
  let failedTickets = [];
  let errorDetailMessage = ''
  let dev_pttest = lstorage_c_moduleProTimeTest
  let matchDateDay = lstorage_c_moduleProtimeUseMatchBookingDay
  let bookedTicketCount = '-'
  // use force latency mode
  if (lstorage_c_moduleProTimeForceLatencyMode === true) {
    highLatency = true
    forceHighLatency = true
    message(true, 'warning', window.language.message_moduleProTime_highLatencyMode, window.language.message_moduleProTime_highLatencyMode_desc)
  }
  if(lstorage_c_moduleProTimeTest === true){
    message(true, 'warning', window.language.message_moduleProTime_testMode, window.language.message_moduleProTime_testMode_desc)
    console.warn('Module Amag ProTime: Test Mode activated')
  }
  // set use High Latency
  useHighLatency = lstorage_c_moduleProTimeUseLatencyMode ?? useHighLatency
  useAutoSelectDay = lstorage_c_moduleProtimeUseAutoSelectDay ?? useAutoSelectDay
  // check if to use ticketnomber in the description
  useTicketNomberInText = lstorage_c_moduleProtimeTicketNomberInText
  if (useTicketNomberInText === false) {
    console.warn('Module Amag ProTime: Use Ticketnomber in description is deaktivated')
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
      if (ticket.item_ticketdesc.length < 2) {
        throw ({ errorstatus: 'error', errorheadline: "Ticket hat keine Beschreibung", errortext: ticket.item_ticketnumber + ' ' + ticket.item_bookingnumber })
      }
      if (ticketRefineBookingNomber.length > 1) {
        throw ({ errorstatus: 'error', errorheadline: "Ticket Mehrfachmatches", errortext: "Ticket hat mehrfache Ergebnisse | " + ticket.item_ticketnumber + " " + ticket.item_ticketdesc });
      } else if (ticketRefineBookingNomber.length === 1) {
        valideTickets.push([ticket, ticketRefineBookingNomber[0]]);
      } else if (ticketRefineBookingNomber.length === 0) {
        failedTickets.push(ticket);
      }
      if(ticket.item_tickettime === '' || ticket.item_tickettime === '0' ){
        throw ({ errorstatus: 'error', errorheadline: "Arbeitszeit ist 0", errortext: ticket.item_ticketnumber+' hat eine eingetragene Arbeitszeit von 0h und kann nicht gebucht werden. Prozess wurde abgebrochen.' })
      }
      if (/\p{L}/u.test(ticket.item_tickettime)) {
        errorDetailMessage = 'Fehler im folgendem Ticket: ' + ticket.item_ticketnumber + ', ' + ticket.item_ticketdesc
        throw ({ errorstatus: 'error', errorheadline: "Ticket hat ungewöhnliche Zeitangabe", errortext: errorDetailMessage })
      }
      if (ticket.item_bookingnumber.length < 1 && ticketRefineBookingNomber.length > 0) {
        if (ticketRefineBookingNomber[0].projectnomber.length < 1) {
          errorDetailMessage = '[' + ticket.item_ticketnumber + '] ' + ticket.item_ticketdesc + ' : Die Buchungsnummer fehlt entweder im Ticket oder den Erkennsungs-Filter.'
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
    console.warn("✂︎ [Module Platforms: AmagProTime] removed tickets: ", failedTickets);
    failedTickets.forEach((failedTicketItem) => {
      let ticketnumber;
      let ticketdesc;
      if (!failedTicketItem.item_ticketnumber.length) {
        ticketnumber = noTicketNomberFill;
      } else {
        ticketnumber = failedTicketItem.item_ticketnumber;
      }
      if (!failedTicketItem.item_ticketdesc.length) {
        ticketdesc = noTicketDescFill;
      } else {
        ticketdesc = failedTicketItem.item_ticketdesc;
      }
      // message feedback
      notificationTimeOut += 150
      setTimeout(function () {
        message(true, 'warning', window.language.message_moduleAmagProTime_ticketNotAdopted, ticketnumber + ': ' + ticketdesc)
      }, notificationTimeOut)
    });
    notificationTimeOut = 0
  }
  // pass valide tickets to chrome-tab script and give feedback
  try {
    if (valideTickets.length) {
      setStatusBarText(window.language.statusbartext_moduleAmagProTime_sendTickets_partOne+valideTickets.length + window.language.statusbartext_moduleAmagProTime_sendTickets_partTwo)
      const iChrTab = await injectChromeTabScriptProTime(valideTickets, dev_pttest, bookingLoopCount, highLatency, useHighLatency,useTicketNomberInText,matchDateDay,useAutoSelectDay, appMetaToBrowser)
      bookingLoopCount++
      if (iChrTab.result !== null && iChrTab.result.success === false ) {
        throw ({ errorstatus: 'error', errorheadline: iChrTab.result.message.text, errortext: iChrTab.result.message.textdetails })
      }else if (iChrTab.result === null) {
        throw ({errorstatus: 'error', errorheadline: 'Prozess abgebrochen', errortext:'Die Verbindung zur Seite wurde unterbrochen. Grund dafür kann eine Änderung der Seite im offenen Tab sein.'})
      }
      bookedTicketCount = iChrTab.result.totalBookedTickets
    } else {
      throw ({ errorstatus: 'error', errorheadline: 'Keine Validen Daten', errortext: 'Die kopierten Informationen konnten nicht validiert bzw. keinen Filter zugeordnet werden. Bitte Prüfe ob: - die richtigen Informationen kopiert wurden  - der richtige Filter ausgewählt wurde  - die Erkennungs-Items stimmen' })
    }
  } catch (error) {
    bookingLoopCount = 0
    throw error
  }
  bookingLoopCount = 0
  setStatusBarText(window.language.statusbartext_moduleAmagProTime_bookingSuccess,'timeout')
  return {success: true, testMode: dev_pttest, successMessage:bookedTicketCount+" Ticket(s) erfolgreich gebucht"}
}

// 🍎 chrom tab scripts
async function injectChromeTabScriptProTime(valideTickets, dev_pttest, bookingLoopCount, highLatency, useHighLatency,useTicketNomberInText,matchDateDay,useAutoSelectDay,appMetaToBrowser) {
  // check latency in current tab + only when use high latency is aktivated
  if (useHighLatency) {
    try {
      let proTimeJSPageTime = await TestPageLoadPerformance()
      proTimeJSPageTime = Math.round(proTimeJSPageTime / 1000)
      // use high latency only when page ping is low
      if (proTimeJSPageTime > 150) {
        console.warn(appMetaToBrowser.appVisibleLogName+"[Module Platforms: AmagProTime] ⚠️ Warning: Page has low ping (" + proTimeJSPageTime + " ms )")
        message(true, 'warning', window.language.message_moduleAmagproTime_webHighPing, window.language.message_moduleAmagproTime_webHighPing_desc )
        // highLatency = true
      }
      chrome.windows.getCurrent(function (window) {
        chrome.windows.update(window.id, { focused: true });
      });
    } catch (error) {
      console.log('❌ [Module Platforms: AmagProTime] TestPageLoadPerformance Error:', error)
      throw ({ errorstatus: 'error', errorheadline: 'Chrome Performance Test', errortext: '"Amag ProTime" hat Probleme, einen Performance-Test im aktuellem Tab durchzuführen.' })
    }
  }
  // inject booking script to current chrome tab
  try {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let chromeExecScript = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: AmagProTimeBookTickets,
      args: [valideTickets, dev_pttest, bookingLoopCount, highLatency, useHighLatency,useTicketNomberInText,matchDateDay,useAutoSelectDay,appMetaToBrowser]
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
async function AmagProTimeBookTickets(valideTickets,dev_pttest,bookingLoopCount, highLatency, useHighLatency,useTicketNomberInText,matchDateDay,useAutoSelectDay,appMetaToBrowser) {
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
          crossObserver_mutationObserver.desconnect()
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
      crossObserver_mutationObserver.desconnect();
    }
  }
  // element change observer
  async function observeElement(selector, shouldHaveValue, selectorNumber) {
    const checkInterval = 200;
    const timeout = 8000;
    const getElement = () => document.querySelectorAll(selector)[selectorNumber];

    return new Promise((resolve, reject) => {
      let intervalId, timeoutId, observer;
      const cleanup = () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        if (observer) observer.desconnect();
      };

      const finish = (msg) => {
        cleanup();
        resolve(msg);
      };

      const fail = () => {
        cleanup();
        reject({
          text: "ProTime-Element timeout",
          textdetails: `Timeout: ${selector} @${shouldHaveValue ? "true" : "false"} | Bitte überprüfe deine Filter-Einstellungen. Der Fehler kann bei Problemen mit der Activity oder anderen Ticketeigenschaften zusammenhängen.`,
        });
      };

      const checkCondition = () => {
        const element = getElement();
        if (!element) return;
        let hasContent = false;

        if ("value" in element) {
          hasContent = !!element.value;
        } else if (element.children && element.children.length > 0) {
          hasContent = true;
        }

        if ((shouldHaveValue && hasContent) || (!shouldHaveValue && !hasContent)) {
          finish(appMetaToBrowser.appVisibleLogName+` 👀 🟢 Element "${selector}" erfüllt Bedingung`);
        }
      };
      // Start Interval-Polling
      intervalId = setInterval(checkCondition, checkInterval);
      // Timeout als Abbruch
      timeoutId = setTimeout(fail, timeout);
      // MutationObserver nur für Strukturänderungen (Bonus)
      const element = getElement();
      if (element) {
        observer = new MutationObserver(() => {
          checkCondition();
        });
        observer.observe(element, { attributes: true, childList: true, subtree: true });
      }
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

      const checkAndObserveVisibility = () => {
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
      const intervalId = setInterval(checkAndObserveVisibility, checkInterval);
    });
  }

  function setProTimeElementErrorStyle(selector, selectorNumber) {
    document.querySelectorAll(selector)[selectorNumber].style.border = "2px dashed #00ffd5"
    document.querySelectorAll(selector)[selectorNumber].style.backgroundColor = "2px dashed #00ffd555"
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
      console.warn(appMetaToBrowser.appVisibleLogName+' ## ProTime Test-Mode ##')
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
          let dom_clickContainerSubText = document.createElement('p')
          
          dom_clickContainer.setAttribute('id', 'timeCopyProTimeClick')
          dom_clickContainer.setAttribute('class', 'TimeCopy-ProtTime-clickArea')
          dom_clickContainer.setAttribute('style', 'position: fixed; width: 100%; height: 100%; z-index: 9999; background-color: #031a21ee; top: 0; left: 0; display: flex; justify-content: center; align-items: center; cursor: pointer;')
          dom_clickContainer.setAttribute('onClick', 'document.getElementById("timeCopyProTimeClick").remove()')
          dom_clickContainerSubText.setAttribute('style', 'background-color: #a2906f88; color: #e6d1ab; font-size: 14px; padding: 10px; border-radius: 100px; word-break: break-word; text-align: center; line-height: 1.2')
          dom_clickContainerInner.setAttribute('style', 'width: 30%; height: 12%; border: 2px dashed #5ecac3; font-size: 24px; color: #5ecac3; padding: 20px; border-radius: 20px; display: flex; justify-content: center; align-items: center; flex-flow: column;')
          dom_clickContainerInner.innerHTML = "Klicke hier zum Starten."
          dom_clickContainerSubText.innerHTML = "Während dem Prozess bitte den Tab offen, sowie Maus und Tastatur unbedient lassen."
          dom_clickContainerInner.appendChild(dom_clickContainerSubText)
          dom_clickContainer.appendChild(dom_clickContainerInner)
          document.getElementsByTagName('body')[0].appendChild(dom_clickContainer)
          dom_clickContainer.addEventListener("click", resolveFirstBookingLoop);
        }
      } else {
        resolve('first booking loop skipped')
      }
      function resolveFirstBookingLoop() {
        if(document.getElementsByTagName('textarea')[0].value !== '') {
          reject({
            text: 'Vorausgefüllte Felder',
            textdetails: `Time Copy hat bereits ausgefüllte Felder in ProTime gefunden. Um Probleme mit den Buchungen zu vermeiden, wurde die Seite neu geladen. Bitte klicke erneut auf einfügen.`,
          });
          window.location.reload()
        }
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
  let totalBookedTickets = 0
  async function ticketBookingLoop(valideTickets) {
    try {
      // all functions executed for each valide ticket
      for (const ticket of valideTickets) {
        try {
          try {
            // use the booking-loop function to check where we are at the process and if we need the overlay
            await checkFirstBookingLoop(bookingLoopCount)
          } catch (error) {
            console.error(appMetaToBrowser.appVisibleLogName+" Error in checkFirstBookingLoop: ", error);
            return result = { success: false, message: error };
          }
          // check if observer element exists
          try {
            if(document.querySelector(proTimeElem_loadingBox)) {
              // start observing loading dots for the whole process
              crossObserver(proTimeElem_loadingBox);
            } else {
              return result = { success: false, message: { text: "ProTime Element Fehlt", 
                textdetails :"TimeCopy konnte ein wichtiges Element von der ProTime Platform nicht finden und hat darum den prozess beendet. Stelle sicher, dass du dich auf der Seite befindest oder Kontaktiere den Entwickler."} }
            }
          } catch (error) {
            return result =  {success: false, message: error}
          }
          // wait for empty textarea (true only when page is reloaded or ticket was booked)
          try {
            await observeElement('textarea', false, '0');
          } catch (error) {
            setProTimeElementErrorStyle('textarea','0')
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
          let error_protimeactivity = false
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
              return result = { success: false, message: 'Protime Projectnomber fehlerhaft' };
            }
          } else {
            return result = { success: false, message: 'Protime Innenauftrag fehlerhaft' };
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
              "select_proTime_service_ITDPC": "[data-itemkey='ZCHN0730009']",
              "select_proTime_service_ITD": "[data-itemkey='ZCHN0730001']"
            }]
            protime_leistung.click()
            protime_leistungenOption = document.querySelector(protime_leistungenArray[0][detectionObject.protimeservice]);
            protime_leistungenOption.click()
          } catch (error) {
            setProTimeElementErrorStyle('.lsField--list [aria-roledescription="Auswählen"]','0')
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
            } else if(document.querySelectorAll('.lsField--list [aria-roledescription="Auswählen"]:not([value])')[0]){
              // check if a activity dropdown exists with no entries (cuz protime is an idiot) and then set the elemnom up to 4
              console.warn(appMetaToBrowser.appVisibleLogName+' Warning, ProTime has empty Activity')
              error_protimeactivity = true
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
          // if a "master number" is there, take this as ticket number for protime and let the original ticket number for the description later
          let bookingItem_TicketNumber = ticketObject.item_ticketmasternumber ? ticketObject.item_ticketmasternumber : ticketObject.item_ticketnumber
          bookingItem_TicketNumber = bookingItem_TicketNumber.toUpperCase()
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
          // join tickent number and description if use ticket nomber in desc.
          let ticketItemDesc
          if(useTicketNomberInText){
            ticketItemDesc = "[" + ticketObject.item_ticketnumber + "] " + ticketObject.item_ticketdesc
          }else {
            ticketItemDesc = ticketObject.item_ticketdesc
          }
          if(detectionObject.protimeaddtext.length > 0) {
            ticketItemDesc = ticketItemDesc + ' ' + detectionObject.protimeaddtext
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
            console.warn(appMetaToBrowser.appVisibleLogName+' 🎫 Retry Ticket: ',ticket)
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
              protime_ticketText.value = ''
            }
          }
          
          await waitTimer(bookingWaitingTimer500)
          await checkpointLoadingDots(false)
          await checkpointLoadingDots(true)
          
          try {
            if(error_protimeactivity === true) {
              setProTimeElementErrorStyle('.lsField--list [aria-roledescription="Auswählen"]:not([value])','0')
            }
            await observeElement('textarea', false, '0');
          } catch (error) {
            // if textarea is still filled and booking failed, push ticket in to retry array
            console.warn(appMetaToBrowser.appVisibleLogName+' 🎫 Retry Ticket: ',ticket, ' Error: ',error.text + ' ' + error.message)
            retryTicketList.push(ticket)
            protime_ticketText.value = ''
          } 
          // desconnect cross observer
          stopCrossObserver()
          totalBookedTickets ++
          bookingLoopCount++
        } catch (error) {
          throw error
        }
      }
      // end of bookingloop
      if (retryTicketList.length) {
        return result = { success: true, retryBooking: true, totalBookedTickets: totalBookedTickets };
      }else {
        return result = { success: true, retryBooking: false, totalBookedTickets: totalBookedTickets };
      }
    } catch (error) {
      throw error
    }
  }
  // 🟦 run main booking proccess
  let bookingLoopResult
  try {
    bookingLoopResult = await ticketBookingLoop(valideTickets)
    if(!bookingLoopResult.success){
      return bookingLoopResult
    }
    if(bookingLoopResult.retryBooking){
      console.log(appMetaToBrowser.appVisibleLogName+' 🕤 🟡 Retry process started')
      for ( let i = 0; i < 4 ; i++ ) {
        try {
          // activate high latency, after 1st retry failed
          if(i > 0 && useHighLatency) {
            highLatency = true
          }
          // error after 3 tries
          if(i >= 3) {
            console.error(appMetaToBrowser.appVisibleLogName+' 🕤 🔴 Retry process max count reached')
            highLatency = false
            return result = { success: false, message: {text: 'Maximale Retries erreicht',textdetails: `Time Copy konnte nach mehrfache Versuche einige Tickets nicht buchen und hat den Prozess desshalb unterbrochhen.`}}
          }
          // try to re-book tickets from retrylist
          try {
            let newTicketList = retryTicketList
            retryTicketList = []
            bookingLoopResult = await ticketBookingLoop(newTicketList)
            if(!bookingLoopResult.success){
              highLatency = false
              return bookingLoopResult
            }
            // succsess
            if(bookingLoopResult.success && !bookingLoopResult.retryBooking) {
              highLatency = false
              console.log(appMetaToBrowser.appVisibleLogName+' 🕤 🟢 Retry process finished')
              return bookingLoopResult 
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
  return bookingLoopResult
}

