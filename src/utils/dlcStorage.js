
import { pAmagProTime_defaultUseTicketNomberInText, pAmagProTime_defaultHighLatencyMode, pAmagProTime_defaultForceHighLatencyMode, 
  pAmagProTime_defaultUseProTimeTestMode, pAmagProTime_defaultUseMatchBookingDay } from "./defaults/defaultDLCVariables"

export let lstorage_c_dlcProTimeTest = JSON.parse(localStorage.getItem('tc_c_dlc_protimetest'))
export let lstorage_c_dlcProTimeForceLatencyMode = JSON.parse(localStorage.getItem('tc_c_dlc_protimeforcelatencymode'))
export let lstorage_c_dlcProTimeUseLatencyMode = JSON.parse(localStorage.getItem('tc_c_dlc_protimeuselatencymode'))
export let lstorage_c_dlcProtimeTicketNomberInText = JSON.parse(localStorage.getItem('tc_c_dlc_protimeticketnomberintext'))
export let lstorage_c_dlcProtimeUseMatchBookingDay = JSON.parse(localStorage.getItem('tc_c_protimematchbookingday'))

// local storage for dlcs
export function loadDLCStorage(dlcGlobalArgs) {
  if (lstorage_c_dlcProTimeTest !== null) {
    dlcGlobalArgs.dlcProTime_config_check_usePTTest.checked = lstorage_c_dlcProTimeTest
  }else {
    dlcGlobalArgs.dlcProTime_config_check_usePTTest.checked = pAmagProTime_defaultUseProTimeTestMode
  }
  setDLCAmagProTimeTestStyle(dlcGlobalArgs.dlcProTime_config_check_usePTTest.checked,dlcGlobalArgs)
  if(lstorage_c_dlcProTimeForceLatencyMode !== null) {
    dlcGlobalArgs.dlcProTime_config_check_forceLatencyMode.checked = lstorage_c_dlcProTimeForceLatencyMode
  } else {
    dlcGlobalArgs.dlcProTime_config_check_forceLatencyMode.checked = pAmagProTime_defaultForceHighLatencyMode
  }
  if(lstorage_c_dlcProTimeUseLatencyMode !== null) {
    dlcGlobalArgs.dlcProTime_config_check_useLatencyMode.checked = lstorage_c_dlcProTimeUseLatencyMode
  }else {
    dlcGlobalArgs.dlcProTime_config_check_useLatencyMode.checked = pAmagProTime_defaultHighLatencyMode
  }
  if(lstorage_c_dlcProtimeTicketNomberInText !== null) {
    dlcGlobalArgs.dlcProTime_config_check_useTicketnomberInText.checked = lstorage_c_dlcProtimeTicketNomberInText
  }else {
    dlcGlobalArgs.dlcProTime_config_check_useTicketnomberInText.checked = pAmagProTime_defaultUseTicketNomberInText
  }
  if(lstorage_c_dlcProtimeUseMatchBookingDay !== null) {
    dlcGlobalArgs.dlcProTime_config_check_useMatchBookingDay.checked = lstorage_c_dlcProtimeUseMatchBookingDay
  }else {
    dlcGlobalArgs.dlcProTime_config_check_useMatchBookingDay.checked = pAmagProTime_defaultUseMatchBookingDay
  }
}

export function clearDlcLocalStorages(onlyImportantDLC) {
  // dlc storages
  if(onlyImportantDLC) {
    localStorage.removeItem('tc_s_dlcplatforminformations')
    localStorage.removeItem('tc_s_dlcfilterinformations')
  } else {
    localStorage.removeItem('tc_s_dlcplatforminformations')
    localStorage.removeItem('tc_s_dlcfilterinformations')
    localStorage.removeItem('tc_c_dlc_protimetest')
    localStorage.removeItem('tc_c_dlc_xmassnowflakes')
    localStorage.removeItem('tc_c_dlc_xmastree')
    localStorage.removeItem('tc_c_dlc_protimeforcelatencymode')
    localStorage.removeItem('tc_c_dlc_protimeuselatencymode')
    localStorage.removeItem('tc_c_dlc_protimeticketnomberintext')
    localStorage.removeItem('tc_c_protimematchbookingday')
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
