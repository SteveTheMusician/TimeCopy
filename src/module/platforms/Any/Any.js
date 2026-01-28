import { checkForTrigger } from "./services/Any.services"
import { setStatusBarText } from "../../../utils/setStatusBarText"
// This Module is more like an quick and dirty demo for developer to understand how the platform-modules are working
// You can find the html, which is inherit to the detection property in the detection folder of the any-module
export async function Any (dataObj,detectionItemsAny,appMetaToBrowser) {
    // we just taking the description from the object, cuz this is the only one good for testing and also the only which we gets from the "none-filter"
    let data
    // FILTER FUNCTIONS
    try {
        if(!dataObj[0].item_ticketdesc || dataObj[0].item_ticketdesc === ''){
            throw ('Es wurden keine Datein an das Modul weitergegeben. Grund dafür kann sein, dass du keinen passenden Filter ausgewählt hast.')
        } else {
            data = dataObj[0].item_ticketdesc
        }
        let matchedTriggers = await checkForTrigger(data,detectionItemsAny,appMetaToBrowser)
        if(matchedTriggers.length === 0) {
            throw ('Es wurden keine Filter-Matches in deinem String gefunden')
        }
        if(matchedTriggers.length > 1) {
            throw ("Du hast mehrere Erkennungsmerkmale mit den gleichen Parameter.")
        }
        if(matchedTriggers[0].anyaddword) {
            data = data + ' ' +matchedTriggers[0].anyaddword
        }
    } catch(e) {
        throw ({errorstatus: 'error', errorheadline: 'Prozess abgebrochen', errortext:e})
    }
    try {
        if (data) {
            // DATA MUSS ZU FILTERED DATA WERDEN
            setStatusBarText(window.language.statusbartext_passDataToPlatform)
            const iChrTab = await injectChromeTabScript(data)
            if (iChrTab.result !== null && iChrTab.result.success === false ) {
                throw ({ errorstatus: 'error', errorheadline: iChrTab.result.message.text, errortext: iChrTab.result.message.textdetails })
            }else if (iChrTab.result === null) {
                setStatusBarText(window.lanuage.tatusbartext_error+': Prozess beendet','timeout')
                throw ({errorstatus: 'error', errorheadline: 'Prozess abgebrochen', errortext:'Es kam kein Ergebnis von der Übertragung an die Platform zurück.'})
            }
        } else {
          throw ({ errorstatus: 'error', errorheadline: 'Keine Validen Daten', errortext: 'Die kopierten Informationen konnten nicht validiert bzw. keinen Filter zugeordnet werden. Bitte Prüfe ob: - die richtigen Informationen kopiert wurden  - der richtige Filter ausgewählt wurde  - die Erkennungs-Items stimmen' })
        }
        setStatusBarText('Übertragung erfolgreich','timeout')
        return {success: true, successMessage:"String wurde übertragen!"}
      } catch (error) {
        throw error
      }
    // chrome tab script to give function to platform
    async function injectChromeTabScript (data) {
         try {
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            let chromeExecScript = await chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: pasteString,
              args: [data]
            });
        if (chromeExecScript[0].result && chromeExecScript[0].result.error) {
            throw new Error(chromeExecScript[0].result.error);
        }
        return chromeExecScript[0];
        } catch (errObj) {
            throw ({ errorstatus: 'error', errorheadline: 'Übertragung fehlerhaft', errortext: errObj })
        }
    }
    // on platform function
    async function pasteString(data) {
        let textarea = document.querySelectorAll('textarea')[0]
        let input = document.querySelectorAll('input[type="text"]')[0]
        if(!textarea || textarea == undefined) {
            if(!input  || input == undefined) {
                return result = { success: false,error: 'Es wurde kein Textarea oder Input Type Text gefunden' };
            } else {
                input.value = data
            }
        } else {
            textarea.value = data
        }
        return result = { success: true,successMessage: 'Inhalt wurde in Element gestreamt.' };
    }
}