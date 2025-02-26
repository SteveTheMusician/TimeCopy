
import { platform_bookingPlatformPreValue,filter_timesheetFilterPreValue,platform_functionName_automatic } from "../dlc/dlc.js"
import { defaultProfileName, defaultTheme } from "./defaults/defaultVariables.js"
import { notification } from "../components/ui/notification/notification.js"
import { message } from "../components/ui/message/message.js"
import { loadDLCStorage, clearDlcLocalStorages } from "./dlcStorage.js"

let defaultBookingPlatform = platform_functionName_automatic

let lstorage_cProfileName = localStorage.getItem('tc_c_profileName')
let lstorage_appVersion = localStorage.getItem('tc_appVersion')
let lstorage_eeTheme = localStorage.getItem('tc_ee_exoticTheme')

export let lstorage_cThemes = localStorage.getItem('tc_c_theme')
export let lstorage_cLanguage = localStorage.getItem('tc_c_language')
export let lstorage_cDetectionItems = localStorage.getItem('tc_c_projectDetection')
export let lstorage_cShowAllMessages = localStorage.getItem('tc_c_showAllMessages')
// dlc storage?
export let lstorage_cFilter = localStorage.getItem('tc_c_filter')
export let lstorage_cBookingPlatform = localStorage.getItem('tc_c_bookingPlatform')

export function appStorage(appGlobalArgs, appVersionData,dlcGlobalArgs) 
  {
    
    // Load localstorage
    function loadStorage() {
      
      if (lstorage_appVersion) {
        if (lstorage_appVersion !== appVersionData.version) {
          localStorage.setItem('tc_appVersion', appVersionData.version)
          // reset dlc information cache
          clearDlcLocalStorages(true)
          // show update message
          message(true, 'information', appVersionData.updateTextOverview + appVersionData.version, appVersionData.updateTextDetails)
        }
      } else {
        // "First" app start
        localStorage.setItem('tc_appVersion', appVersionData.version)
        message(true, 'information', appVersionData.updateTextOverview + appVersionData.version, appVersionData.updateTextDetails)
      }
      
      if (lstorage_eeTheme === 'true') {
        document.getElementById('select-theme-exotic-categ').classList.remove('dNone');
        document.getElementById('select-theme-exotic').classList.remove('dNone');
      }
      
      if (lstorage_cThemes && lstorage_cThemes !== 'null' && lstorage_cThemes !== ' ') {
        appGlobalArgs.elem_themeselect.value = lstorage_cThemes
        if (lstorage_cThemes === 'exotic' && lstorage_eeTheme === 'true') {
          appGlobalArgs.link_csstheme.setAttribute('href', './static/Style/themes/ee/exotisch/' + lstorage_cThemes + '.css')
        } else if (lstorage_cThemes === 'exotic' && lstorage_eeTheme !== 'true') {
          appGlobalArgs.elem_themeselect.value = defaultTheme
          lstorage_cThemes = defaultTheme
        } else {
          appGlobalArgs.link_csstheme.setAttribute('href', './static/Style/themes/' + lstorage_cThemes + '/' + lstorage_cThemes + '.css')
        }
      } else {
        appGlobalArgs.elem_themeselect.value = defaultTheme
        appGlobalArgs.link_csstheme.setAttribute('href', './static/Style/themes/' + defaultTheme + '/' + defaultTheme + '.css')
      }
      if (lstorage_cFilter) {
        document.querySelector('input[value="' + filter_timesheetFilterPreValue + lstorage_cFilter + '"]').checked = true
      }
      if (lstorage_cProfileName) {
        appGlobalArgs.configprofilename.value = lstorage_cProfileName
      } else {
        appGlobalArgs.configprofilename.value = defaultProfileName
      }
      if (lstorage_cBookingPlatform) {
        document.querySelector('input[value="' + platform_bookingPlatformPreValue + lstorage_cBookingPlatform + '"]').checked = true
      } else {
        document.querySelector('input[value="' + platform_bookingPlatformPreValue + defaultBookingPlatform + '"]').checked = true
        localStorage.setItem('tc_c_bookingPlatform', defaultBookingPlatform)
      }
      if(lstorage_cShowAllMessages === 'true') {
        appGlobalArgs.switch_showallmessages.checked = true
        appGlobalArgs.elem_messagesection.classList.remove('dNone')
        appGlobalArgs.messagesheadline.classList.remove('dNone')
      } else if (lstorage_cShowAllMessages === 'false') {
        appGlobalArgs.switch_showallmessages.checked = false
        appGlobalArgs.elem_messagesection.classList.add('dNone')
        appGlobalArgs.messagesheadline.classList.add('dNone')
      }else {
        appGlobalArgs.switch_showallmessages.checked = true
        appGlobalArgs.elem_messagesection.classList.remove('dNone')
        appGlobalArgs.messagesheadline.classList.remove('dNone')
      }
      loadDLCStorage(dlcGlobalArgs)
    }
    // sessionstorages for temp-messages and data
    function loadSessionStorages() {
        let sMessageImported = sessionStorage.getItem('tc_c_messageImported')
        let sMessageProfileRemoved = sessionStorage.getItem('tc_c_messageProfileRemoved')
        let sExportProfile_afterChange = sessionStorage.getItem('tc_c_exportProfile_afterChange')
        let sDLCCacheReloaded = sessionStorage.getItem('tc_c_messageDLCCacheReloaded')
        let sChangeLanguage = sessionStorage.getItem('tc_c_changeLanguage')
        if (sMessageImported === 'true') {
          notification(true, true, window.language.notification_profileImported)
          sessionStorage.removeItem('tc_c_messageImported')
          configButton.click()
        }
        if (sMessageProfileRemoved === 'true') {
          notification(true, true, window.language.notification_profileReset)
          sessionStorage.removeItem('tc_c_messageProfileRemoved')
          configButton.click()
        }
        if (sExportProfile_afterChange === 'true') {
          sessionStorage.removeItem('tc_c_exportProfile_afterChange')
          configButton.click()
          exportProfile()
        }
        if (sChangeLanguage === 'true') {
          sessionStorage.removeItem('tc_c_changeLanguage')
          configButton.click()
        }
        if (sDLCCacheReloaded === 'true') {
          notification(true, true, window.language.notification_dlcCacheReset)
          sessionStorage.removeItem('tc_c_messageDLCCacheReloaded')
          configButton.click()
        }
    }
    loadStorage()
    loadSessionStorages()
}
// clear local storage
export function clearLocalStorage() {
    localStorage.removeItem('tc_c_theme')
    localStorage.removeItem('tc_c_language')
    localStorage.removeItem('tc_c_filter')
    localStorage.removeItem('tc_c_projectDetection')
    localStorage.removeItem('tc_c_profileName')
    localStorage.removeItem('tc_c_bookingPlatform')
    localStorage.removeItem('tc_appVersion')
    localStorage.removeItem('tc_ee_exoticTheme')
    localStorage.removeItem('tc_c_showAllMessages')
    clearDlcLocalStorages()
}

export function clearSessionStorage() {
    sessionStorage.removeItem('tc_c_messageImported')
    sessionStorage.removeItem('tc_c_messageProfileRemoved')
    sessionStorage.removeItem('tc_c_changeLanguage')
    sessionStorage.removeItem('tc_c_messageDLCCacheReloaded')
}
// delete configs
export function removeProfile() {
    clearLocalStorage()
    clearSessionStorage()
    sessionStorage.setItem('tc_c_messageProfileRemoved', 'true')
    window.location.reload()
}