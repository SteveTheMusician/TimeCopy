import { notification } from "../components/ui/notification/notification.js"
import { message } from "../components/ui/message/message.js"
import { platform_bookingPlatformPreValue,filter_timesheetFilterPreValue,platform_functionName_automatic } from "../components/dlc/dlc.js"
import { defaultProfileName, defaultTheme } from "./defaults/defaultVariables.js"

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

export function appStorage(extensionVersion,extensionUpdateTextOverview,extensionUpdateTextDetails,themeSelect,configProfileName,
    link_cssTheme,switch_showAllMessages,showAllMessages,messageSection,messagesHeadline) 
    {

    // Load localstorage
    function loadStorage() {

        if (lstorage_appVersion) {
          if (lstorage_appVersion !== extensionVersion) {
            localStorage.setItem('tc_appVersion', extensionVersion)
            // reset dlc information cache
            // clearDlcLocalStorages(true)
            // show update message
            message(true, 'information', extensionUpdateTextOverview + extensionVersion, extensionUpdateTextDetails)
          }
        } else {
          // "First" app start
          localStorage.setItem('tc_appVersion', extensionVersion)
          message(true, 'information', extensionUpdateTextOverview + extensionVersion, extensionUpdateTextDetails)
        }

        if (lstorage_eeTheme === 'true') {
          document.getElementById('select-theme-exotic-categ').classList.remove('dNone');
          document.getElementById('select-theme-exotic').classList.remove('dNone');
        }

        if (lstorage_cThemes && lstorage_cThemes !== 'null' && lstorage_cThemes !== ' ') {
            themeSelect.value = lstorage_cThemes
          if (lstorage_cThemes === 'exotic' && lstorage_eeTheme === 'true') {
            link_cssTheme.setAttribute('href', './static/Style/themes/ee/exotisch/' + lstorage_cThemes + '.css')
          } else if (lstorage_cThemes === 'exotic' && lstorage_eeTheme !== 'true') {
            themeSelect.value = defaultTheme
            lstorage_cThemes = defaultTheme
          } else {
            link_cssTheme.setAttribute('href', './static/Style/themes/' + lstorage_cThemes + '/' + lstorage_cThemes + '.css')
          }
        } else {
          themeSelect.value = defaultTheme
          link_cssTheme.setAttribute('href', './static/Style/themes/' + defaultTheme + '/' + defaultTheme + '.css')
        }
        if (lstorage_cFilter) {
          document.querySelector('input[value="' + filter_timesheetFilterPreValue + lstorage_cFilter + '"]').checked = true
        }
        if (lstorage_cProfileName) {
          configProfileName.value = lstorage_cProfileName
        } else {
          configProfileName.value = defaultProfileName
        }
        if (lstorage_cBookingPlatform) {
          document.querySelector('input[value="' + platform_bookingPlatformPreValue + lstorage_cBookingPlatform + '"]').checked = true
        } else {
          document.querySelector('input[value="' + platform_bookingPlatformPreValue + defaultBookingPlatform + '"]').checked = true
          localStorage.setItem('tc_c_bookingPlatform', defaultBookingPlatform)
        }
        if(lstorage_cShowAllMessages === 'true') {
          switch_showAllMessages.checked = true
          showAllMessages = "true"
          messageSection.classList.remove('dNone')
          messagesHeadline.classList.remove('dNone')
        } else if (lstorage_cShowAllMessages === 'false') {
          switch_showAllMessages.checked = false
          showAllMessages = "false"
          messageSection.classList.add('dNone')
          messagesHeadline.classList.add('dNone')
        }else {
          switch_showAllMessages.checked = true
          showAllMessages = "true"
          messageSection.classList.remove('dNone')
          messagesHeadline.classList.remove('dNone')
        }
        // loadDLCStorage()
    }

    // sessionstorages for temp-messages and data
    function loadSessionStorages() {
        let sMessageImported = sessionStorage.getItem('tc_c_messageImported')
        let sMessageProfileRemoved = sessionStorage.getItem('tc_c_messageProfileRemoved')
        let sExportProfile_afterChange = sessionStorage.getItem('tc_c_exportProfile_afterChange')
        let sDLCCacheReloaded = sessionStorage.getItem('tc_c_messageDLCCacheReloaded')
        let sChangeLanguage = sessionStorage.getItem('tc_c_changeLanguage')
        if (sMessageImported === 'true') {
          notification(true, true, 'Profil wurde erfolgreich importiert!')
          sessionStorage.removeItem('tc_c_messageImported')
          configButton.click()
        }
        if (sMessageProfileRemoved === 'true') {
          notification(true, true, 'Profil wurde zurückgesetzt.')
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
          notification(true, true, 'DLC-Cache wurde neu geladen.')
          sessionStorage.removeItem('tc_c_messageDLCCacheReloaded')
          configButton.click()
        }
    }

    loadStorage()
    loadSessionStorages()
}
// Clear local storage
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
    // clearDlcLocalStorages()
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