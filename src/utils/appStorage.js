
import { platform_bookingPlatformPreValue,filter_timesheetFilterPreValue,platform_functionName_automatic } from "../module/module.js"
import { defaultProfileName, defaultTheme, defaultShowAllMessages,defaultShowStatusBar,default_e } from "./defaults/defaultVariables.js"
import { notification } from "../components/ui/notification/notification.js"
import { message } from "../components/ui/message/message.js"
import { loadModuleStorage, clearmoduleLocalStorages } from "./moduleStorage.js"
import { exportProfile, setUnsetProfilePicture } from "./profileManager.js"
import { setScoreValues } from "./setScorevalues.js"
import { firstStartDisplay } from "../components/content/firstStartDisplay/firstStartDisplay.js"
import { showHideStatusBar,markTabButtons } from "./elementChangers.js"

let defaultBookingPlatform = platform_functionName_automatic
let lstorage_cProfileName = localStorage.getItem('tc_c_profileName')
let lstorage_appVersion = localStorage.getItem('tc_appVersion')
export let lstorage_eeTheme = localStorage.getItem('tc_ee_exoticTheme')
export let lstorage_cThemes = localStorage.getItem('tc_c_theme')
export let lstorage_cLanguage = localStorage.getItem('tc_c_language')
export let lstorage_cDetectionItems = localStorage.getItem('tc_c_projectDetection')
export let lstorage_cShowAllMessages = localStorage.getItem('tc_c_showAllMessages')
let lstorage_cShowAllMessagesParsed = ''
export let lstorage_cShowStatusBar = localStorage.getItem('tc_c_showStatusBar')
let lstorage_cShowStatusBarParsed = ''
export let lstorage_cFilter = localStorage.getItem('tc_c_filter')
export let lstorage_cBookingPlatform = localStorage.getItem('tc_c_bookingPlatform')
export let lstorage_cProfilePicture = localStorage.getItem('tc_c_profilePicture')
export let lstorage_cBookingScore = localStorage.getItem('tc_c_bookingScore')
let lstorage_cBookingScoreParsed = ''
let lstorage_tcFirstStart = localStorage.getItem('tc_firstStart')
// catch parse problems with show all message value
if(lstorage_cShowAllMessages !== null && lstorage_cShowAllMessages !== '' && lstorage_cShowAllMessages !== 'undefined'){
  lstorage_cShowAllMessagesParsed = JSON.parse(lstorage_cShowAllMessages)
}
if(lstorage_cShowStatusBar !== null && lstorage_cShowStatusBar !== '' && lstorage_cShowStatusBar !== 'undefined'){
  lstorage_cShowStatusBarParsed = JSON.parse(lstorage_cShowStatusBar)
}
if(lstorage_cBookingScore !== null && lstorage_cBookingScore !== '' && lstorage_cBookingScore !== 'undefined'){
  lstorage_cBookingScoreParsed = JSON.parse(lstorage_cBookingScore)
}

export function appStorage(appGlobalArgs, appVersionData,moduleGlobalArgs) {
  
  // load localstorage
  function loadStorage() {
    let newUpdatetextVersion = appVersionData.updateTextDetails
    newUpdatetextVersion = newUpdatetextVersion.replace('${changeloglink}',`<a href="`+appVersionData.changelogUrl+`" target="_blank">Changelog</a>`)
    if (lstorage_appVersion) {
      if (lstorage_appVersion !== appVersionData.version) {
        localStorage.setItem('tc_appVersion', appVersionData.version)
        // reset module information cache
        clearmoduleLocalStorages(true)
        // show update message
        message(true, 'information', appVersionData.updateTextOverview + appVersionData.version, newUpdatetextVersion)
      }
    } else {
      // "First" app start
      localStorage.setItem('tc_appVersion', appVersionData.version)
      message(true, 'information', appVersionData.updateTextOverview + appVersionData.version, newUpdatetextVersion)
    }
    
    if (lstorage_cThemes && lstorage_cThemes !== 'null' && lstorage_cThemes !== ' ') {
      appGlobalArgs.elem_themeselect.value = lstorage_cThemes
      if (lstorage_cThemes.includes(default_e) && lstorage_eeTheme === 'true') {
        let newThemeValue = lstorage_cThemes.replace(default_e,'')
        appGlobalArgs.link_csstheme.setAttribute('href', './static/Style/themes/ee/exotic/' + newThemeValue + '.css')
      } else if (lstorage_cThemes.includes(default_e) && lstorage_eeTheme !== 'true' || lstorage_cThemes.includes(default_e) && lstorage_eeTheme !=='undefined') {
        appGlobalArgs.elem_themeselect.value = defaultTheme
        localStorage.setItem('tc_c_theme',defaultTheme)
        sessionStorage.setItem('tc_c_messageImported','false')
        window.location.reload()
        // MESSAGE TRIGGERN : Fehler mit theme
      } else {
        appGlobalArgs.link_csstheme.setAttribute('href', './static/Style/themes/' + lstorage_cThemes + '/' + lstorage_cThemes + '.css')
      }
    } else {
      appGlobalArgs.elem_themeselect.value = defaultTheme
      appGlobalArgs.link_csstheme.setAttribute('href', './static/Style/themes/' + defaultTheme + '/' + defaultTheme + '.css')
    }
    if (lstorage_cFilter) {
      document.querySelector('input[value="' + filter_timesheetFilterPreValue + lstorage_cFilter + '"]').checked = true
    } else {
      markTabButtons('true','timesheets')
    }
    if (lstorage_cProfileName) {
      appGlobalArgs.configprofilename.value = lstorage_cProfileName
    } else {
      appGlobalArgs.configprofilename.value = defaultProfileName
    }
    if (localStorage.getItem('tc_c_bookingPlatform')) {
      // alert(lstorage_cBookingPlatform)
      let lStorageBookingPlatform = localStorage.getItem('tc_c_bookingPlatform')
      document.querySelector('input[value="' + platform_bookingPlatformPreValue + lStorageBookingPlatform + '"]').checked = true
    } else {
      document.querySelector('input[value="' + platform_bookingPlatformPreValue + defaultBookingPlatform + '"]').click()
    }
    if(lstorage_cShowAllMessagesParsed !== '' && lstorage_cShowAllMessagesParsed !=='undefined') {
      showHideAllMessages(lstorage_cShowAllMessagesParsed)
      appGlobalArgs.switch_showallmessages.checked = lstorage_cShowAllMessagesParsed
    } else {
      appGlobalArgs.switch_showallmessages.checked = defaultShowAllMessages
      localStorage.setItem('tc_c_showAllMessages',defaultShowAllMessages)
      showHideAllMessages(defaultShowAllMessages)
    }
    if(lstorage_cShowStatusBarParsed !== '' && lstorage_cShowStatusBarParsed !=='undefined') {
      showHideStatusBar(lstorage_cShowStatusBarParsed,appGlobalArgs)
      appGlobalArgs.switch_showStatusBar.checked = lstorage_cShowStatusBarParsed
    } else {
      appGlobalArgs.switch_showStatusBar.checked = defaultShowStatusBar
      localStorage.setItem('tc_c_showStatusBar',defaultShowStatusBar)
      showHideStatusBar(defaultShowStatusBar,appGlobalArgs)
    }
    if(lstorage_cProfilePicture !== null) {
      setUnsetProfilePicture(true,lstorage_cProfilePicture,appGlobalArgs)
    }
    if(lstorage_cBookingScoreParsed !== '') {
      setScoreValues(lstorage_cBookingScoreParsed,appGlobalArgs)
    } else {
      setScoreValues('0',appGlobalArgs)
      localStorage.setItem('tc_c_bookingScore','0')
    }
    if(lstorage_tcFirstStart !== 'done' || lstorage_tcFirstStart === null) {
      firstStartDisplay()
    }
    if(lstorage_cDetectionItems === 'undefined' || lstorage_cDetectionItems === null || lstorage_cDetectionItems === '[]') {
      markTabButtons('true','projects')
    }
    loadModuleStorage(moduleGlobalArgs)
  }
  // sessionstorages for temp-messages and data
  function loadSessionStorages() {
    let sMessageImported = sessionStorage.getItem('tc_c_messageImported')
    let sMessageProfileRemoved = sessionStorage.getItem('tc_c_messageProfileRemoved')
    let sExportProfile_afterChange = sessionStorage.getItem('tc_c_exportProfile_afterChange')
    let sModuleCacheReloaded = sessionStorage.getItem('tc_c_messageModuleCacheReloaded')
    let sChangeLanguage = sessionStorage.getItem('tc_c_changeLanguage')
    if (sMessageImported === 'true') {
      notification(true, true, window.language.notification_profileImported)
      sessionReloadHandler('tc_c_messageImported')
    }
    if (sMessageImported === 'false') {
      notification(true, false, window.language.notification_profileNotFullyImported)
    }
    if (sMessageProfileRemoved === 'true') {
      notification(true, true, window.language.notification_profileReset)
      sessionReloadHandler('tc_c_messageProfileRemoved')
    }
    if (sExportProfile_afterChange === 'true') {
      exportProfile(appVersionData,appGlobalArgs)
      sessionReloadHandler('tc_c_exportProfile_afterChange')
    }
    if (sChangeLanguage === 'true') {
      sessionReloadHandler('tc_c_changeLanguage')
    }
    if (sModuleCacheReloaded === 'true') {
      notification(true, true, window.language.notification_moduleCacheReset)
      sessionReloadHandler('tc_c_messageModuleCacheReloaded')
    }
  }
  loadStorage()
  loadSessionStorages()
  function sessionReloadHandler(remItem){
    let configButton = appGlobalArgs.elem_configButton
    sessionStorage.removeItem(remItem)
    configButton.click()
  }
  function showHideAllMessages(showHideState){
    if(showHideState) {
      appGlobalArgs.elem_messagesection.classList.remove('dNone')
      appGlobalArgs.messagesheadline.classList.remove('dNone')
    } else {
      appGlobalArgs.elem_messagesection.classList.add('dNone')
      appGlobalArgs.messagesheadline.classList.add('dNone')
    }
  }
}
// clear local storage
export function clearLocalStorage() {
  localStorage.clear()
  clearmoduleLocalStorages()
}

export function clearSessionStorage() {
  sessionStorage.clear()
}
// delete configs
export function removeProfile() {
  clearLocalStorage()
  clearSessionStorage()
  sessionStorage.setItem('tc_c_messageProfileRemoved', 'true')
  window.location.reload()
}