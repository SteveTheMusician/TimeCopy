
import { pAmagProTime_defaultUseTicketNomberInText, pAmagProTime_defaultHighLatencyMode, pAmagProTime_defaultForceHighLatencyMode, 
  pAmagProTime_defaultUseProTimeTestMode, pAmagProTime_defaultUseMatchBookingDay,pAmagProTime_defaultUseAutoSelectDay } from "./defaults/defaultDLCVariables"
export let lstorage_c_dlcProTimeTest = JSON.parse(localStorage.getItem('tc_c_dlc_proTimeTest'))
export let lstorage_c_dlcProTimeForceLatencyMode = JSON.parse(localStorage.getItem('tc_c_dlc_proTimeForceLatencyMode'))
export let lstorage_c_dlcProTimeUseLatencyMode = JSON.parse(localStorage.getItem('tc_c_dlc_proTimeUseLatencyMode'))
export let lstorage_c_dlcProtimeTicketNomberInText = JSON.parse(localStorage.getItem('tc_c_dlc_proTimeTicketNomberInText'))
export let lstorage_c_dlcProtimeUseMatchBookingDay = JSON.parse(localStorage.getItem('tc_c_proTimeMatchBookingDay'))
export let lstorage_c_dlcProtimeUseAutoSelectDay = JSON.parse(localStorage.getItem('tc_c_proTimeAutoSelectDay'))

// local storage for dlcs
export function loadDLCStorage(dlcGlobalArgs) {
  if (lstorage_c_dlcProTimeTest !== null) {
    dlcGlobalArgs.dlcProTime_config_check_usePTTest.checked = lstorage_c_dlcProTimeTest
  }else {
    dlcGlobalArgs.dlcProTime_config_check_usePTTest.checked = pAmagProTime_defaultUseProTimeTestMode
    localStorage.setItem('tc_c_dlc_proTimeTest',pAmagProTime_defaultUseProTimeTestMode)
  }
  setDLCAmagProTimeTestStyle(dlcGlobalArgs.dlcProTime_config_check_usePTTest.checked,dlcGlobalArgs)
  if(lstorage_c_dlcProTimeForceLatencyMode !== null) {
    dlcGlobalArgs.dlcProTime_config_check_forceLatencyMode.checked = lstorage_c_dlcProTimeForceLatencyMode
  } else {
    dlcGlobalArgs.dlcProTime_config_check_forceLatencyMode.checked = pAmagProTime_defaultForceHighLatencyMode
    localStorage.setItem('tc_c_dlc_proTimeForceLatencyMode',pAmagProTime_defaultForceHighLatencyMode)
  }
  if(lstorage_c_dlcProTimeUseLatencyMode !== null) {
    dlcGlobalArgs.dlcProTime_config_check_useLatencyMode.checked = lstorage_c_dlcProTimeUseLatencyMode
  }else {
    dlcGlobalArgs.dlcProTime_config_check_useLatencyMode.checked = pAmagProTime_defaultHighLatencyMode
    localStorage.setItem('tc_c_dlc_proTimeUseLatencyMode',pAmagProTime_defaultHighLatencyMode)
  }
  if(lstorage_c_dlcProtimeTicketNomberInText !== null) {
    dlcGlobalArgs.dlcProTime_config_check_useTicketnomberInText.checked = lstorage_c_dlcProtimeTicketNomberInText
  }else {
    dlcGlobalArgs.dlcProTime_config_check_useTicketnomberInText.checked = pAmagProTime_defaultUseTicketNomberInText
    localStorage.setItem('tc_c_dlc_proTimeTicketNomberInText',pAmagProTime_defaultUseTicketNomberInText)
  }
  if(lstorage_c_dlcProtimeUseMatchBookingDay !== null) {
    dlcGlobalArgs.dlcProTime_config_check_useMatchBookingDay.checked = lstorage_c_dlcProtimeUseMatchBookingDay
  }else {
    dlcGlobalArgs.dlcProTime_config_check_useMatchBookingDay.checked = pAmagProTime_defaultUseMatchBookingDay
    localStorage.setItem('tc_c_proTimeMatchBookingDay',pAmagProTime_defaultUseMatchBookingDay)
  }
  if(lstorage_c_dlcProtimeUseAutoSelectDay !== null) {
    dlcGlobalArgs.dlcProTime_config_check_useAutoSelectDay.checked = lstorage_c_dlcProtimeUseAutoSelectDay
  } else {
    localStorage.setItem('tc_c_proTimeAutoSelectDay',pAmagProTime_defaultUseAutoSelectDay)
    dlcGlobalArgs.dlcProTime_config_check_useAutoSelectDay.checked = pAmagProTime_defaultUseAutoSelectDay
  }
  // catch edge case, when the app should be updated at the same time, when the user do a change
  // reset version and reload app
  if(localStorage.getItem('tc_s_dlcPlatformInformations') === null ) {
    localStorage.removeItem('tc_appVersion')
    window.location.reload()
  }
}

export function clearDlcLocalStorages(onlyImportantDLC) {
  // dlc storages
  if(onlyImportantDLC) {
    localStorage.removeItem('tc_s_dlcPlatformInformations')
    localStorage.removeItem('tc_s_dlcFilterInformations')
  } else {
    localStorage.removeItem('tc_s_dlcPlatformInformations')
    localStorage.removeItem('tc_s_dlcFilterInformations')
    localStorage.removeItem('tc_c_dlc_proTimeTest')
    localStorage.removeItem('tc_c_dlc_xMasSnowFlakes')
    localStorage.removeItem('tc_c_dlc_xMasTree')
    localStorage.removeItem('tc_c_dlc_proTimeForceLatencyMode')
    localStorage.removeItem('tc_c_dlc_proTimeUseLatencyMode')
    localStorage.removeItem('tc_c_dlc_proTimeTicketNomberInText')
    localStorage.removeItem('tc_c_proTimeMatchBookingDay')
    localStorage.removeItem('tc_c_proTimeAutoSelectDay')
  }
}
  
export function reloadDLCCache() {
  clearDlcLocalStorages()
  sessionStorage.setItem('tc_c_messageDLCCacheReloaded', 'true')
  window.location.reload()
}

export function setDLCAmagProTimeTestStyle (PTTestBoolean,dlcGlobalArgs){

  if(PTTestBoolean){ 
    dlcGlobalArgs.dlcItem_platform_amagProTime.classList.add('dlcItem-amagProTime-TestMode')
  }else {
    dlcGlobalArgs.dlcItem_platform_amagProTime.classList.remove('dlcItem-amagProTime-TestMode')
  }
}
