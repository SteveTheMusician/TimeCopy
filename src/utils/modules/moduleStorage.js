import { pAmagProTime_defaultUseTicketNomberInText, pAmagProTime_defaultHighLatencyMode, pAmagProTime_defaultForceHighLatencyMode, 
  pAmagProTime_defaultUseProTimeTestMode, pAmagProTime_defaultUseMatchBookingDay,pAmagProTime_defaultUseAutoSelectDay,moduleStorage_preValueConfiguration, moduleStorage_preValueSystem } from "./defaults/defaultModuleVariables"
  import { removeLocalStoragesByKey } from "../functionHandlers"
export let lstorage_c_moduleProTimeTest = JSON.parse(localStorage.getItem(moduleStorage_preValueConfiguration+'_proTimeTest'))
export let lstorage_c_moduleProTimeForceLatencyMode = JSON.parse(localStorage.getItem(moduleStorage_preValueConfiguration+'_proTimeForceLatencyMode'))
export let lstorage_c_moduleProTimeUseLatencyMode = JSON.parse(localStorage.getItem(moduleStorage_preValueConfiguration+'_proTimeUseLatencyMode'))
export let lstorage_c_moduleProtimeTicketNomberInText = JSON.parse(localStorage.getItem(moduleStorage_preValueConfiguration+'_proTimeTicketNomberInText'))
export let lstorage_c_moduleProtimeUseMatchBookingDay = JSON.parse(localStorage.getItem(moduleStorage_preValueConfiguration+'_proTimeMatchBookingDay'))
export let lstorage_c_moduleProtimeUseAutoSelectDay = JSON.parse(localStorage.getItem(moduleStorage_preValueConfiguration+'_proTimeAutoSelectDay'))

// local storage for modules
export function loadModuleStorage(moduleGlobalArgs) {
  if (lstorage_c_moduleProTimeTest !== null) {
    moduleGlobalArgs.moduleProTime_config_check_usePTTest.checked = lstorage_c_moduleProTimeTest
  }else {
    moduleGlobalArgs.moduleProTime_config_check_usePTTest.checked = pAmagProTime_defaultUseProTimeTestMode
    localStorage.setItem(moduleStorage_preValueConfiguration+'_proTimeTest',pAmagProTime_defaultUseProTimeTestMode)
  }
  setModuleAmagProTimeTestStyle(moduleGlobalArgs.moduleProTime_config_check_usePTTest.checked,moduleGlobalArgs)
  if(lstorage_c_moduleProTimeForceLatencyMode !== null) {
    moduleGlobalArgs.moduleProTime_config_check_forceLatencyMode.checked = lstorage_c_moduleProTimeForceLatencyMode
  } else {
    moduleGlobalArgs.moduleProTime_config_check_forceLatencyMode.checked = pAmagProTime_defaultForceHighLatencyMode
    localStorage.setItem(moduleStorage_preValueConfiguration+'_proTimeForceLatencyMode',pAmagProTime_defaultForceHighLatencyMode)
  }
  if(lstorage_c_moduleProTimeUseLatencyMode !== null) {
    moduleGlobalArgs.moduleProTime_config_check_useLatencyMode.checked = lstorage_c_moduleProTimeUseLatencyMode
  }else {
    moduleGlobalArgs.moduleProTime_config_check_useLatencyMode.checked = pAmagProTime_defaultHighLatencyMode
    localStorage.setItem(moduleStorage_preValueConfiguration+'_proTimeUseLatencyMode',pAmagProTime_defaultHighLatencyMode)
  }
  if(lstorage_c_moduleProtimeTicketNomberInText !== null) {
    moduleGlobalArgs.moduleProTime_config_check_useTicketnomberInText.checked = lstorage_c_moduleProtimeTicketNomberInText
  }else {
    moduleGlobalArgs.moduleProTime_config_check_useTicketnomberInText.checked = pAmagProTime_defaultUseTicketNomberInText
    localStorage.setItem(moduleStorage_preValueConfiguration+'_proTimeTicketNomberInText',pAmagProTime_defaultUseTicketNomberInText)
  }
  if(lstorage_c_moduleProtimeUseMatchBookingDay !== null) {
    moduleGlobalArgs.moduleProTime_config_check_useMatchBookingDay.checked = lstorage_c_moduleProtimeUseMatchBookingDay
  }else {
    moduleGlobalArgs.moduleProTime_config_check_useMatchBookingDay.checked = pAmagProTime_defaultUseMatchBookingDay
    localStorage.setItem(moduleStorage_preValueConfiguration+'_proTimeMatchBookingDay',pAmagProTime_defaultUseMatchBookingDay)
  }
  if(lstorage_c_moduleProtimeUseAutoSelectDay !== null) {
    moduleGlobalArgs.moduleProTime_config_check_useAutoSelectDay.checked = lstorage_c_moduleProtimeUseAutoSelectDay
  } else {
    localStorage.setItem(moduleStorage_preValueConfiguration+'_proTimeAutoSelectDay',pAmagProTime_defaultUseAutoSelectDay)
    moduleGlobalArgs.moduleProTime_config_check_useAutoSelectDay.checked = pAmagProTime_defaultUseAutoSelectDay
  }
  // catch edge case, when the app should be updated at the same time, when the user do a change
  // reset version and reload app
  if(localStorage.getItem(moduleStorage_preValueSystem+'PlatformInformations') === null ) {
    localStorage.removeItem('tc_appVersion')
    window.location.reload()
  }
}

export function clearmoduleLocalStorages(onlyImportantModule) {
  // module storages
  if(onlyImportantModule) {
    removeLocalStoragesByKey(moduleStorage_preValueSystem)
  } else {
    removeLocalStoragesByKey(moduleStorage_preValueConfiguration) 
  }
}
  
export function reloadModuleCache() {
  clearmoduleLocalStorages()
  sessionStorage.setItem('tc_c_messageModuleCacheReloaded', 'true')
  window.location.reload()
}

export function setModuleAmagProTimeTestStyle (PTTestBoolean,moduleGlobalArgs){
  if(PTTestBoolean){ 
    moduleGlobalArgs.moduleItem_platform_amagProTime.classList.add('moduleItem-amagProTime-TestMode')
  }else {
    moduleGlobalArgs.moduleItem_platform_amagProTime.classList.remove('moduleItem-amagProTime-TestMode')
  }
}
