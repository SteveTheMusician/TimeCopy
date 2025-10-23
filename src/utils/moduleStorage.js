import { pAmagProTime_defaultUseTicketNomberInText, pAmagProTime_defaultHighLatencyMode, pAmagProTime_defaultForceHighLatencyMode, 
  pAmagProTime_defaultUseProTimeTestMode, pAmagProTime_defaultUseMatchBookingDay,pAmagProTime_defaultUseAutoSelectDay } from "./defaults/defaultModuleVariables"
export let lstorage_c_moduleProTimeTest = JSON.parse(localStorage.getItem('tc_c_module_proTimeTest'))
export let lstorage_c_moduleProTimeForceLatencyMode = JSON.parse(localStorage.getItem('tc_c_module_proTimeForceLatencyMode'))
export let lstorage_c_moduleProTimeUseLatencyMode = JSON.parse(localStorage.getItem('tc_c_module_proTimeUseLatencyMode'))
export let lstorage_c_moduleProtimeTicketNomberInText = JSON.parse(localStorage.getItem('tc_c_module_proTimeTicketNomberInText'))
export let lstorage_c_moduleProtimeUseMatchBookingDay = JSON.parse(localStorage.getItem('tc_c_proTimeMatchBookingDay'))
export let lstorage_c_moduleProtimeUseAutoSelectDay = JSON.parse(localStorage.getItem('tc_c_proTimeAutoSelectDay'))

// local storage for modules
export function loadModuleStorage(moduleGlobalArgs) {
  if (lstorage_c_moduleProTimeTest !== null) {
    moduleGlobalArgs.moduleProTime_config_check_usePTTest.checked = lstorage_c_moduleProTimeTest
  }else {
    moduleGlobalArgs.moduleProTime_config_check_usePTTest.checked = pAmagProTime_defaultUseProTimeTestMode
    localStorage.setItem('tc_c_module_proTimeTest',pAmagProTime_defaultUseProTimeTestMode)
  }
  setModuleAmagProTimeTestStyle(moduleGlobalArgs.moduleProTime_config_check_usePTTest.checked,moduleGlobalArgs)
  if(lstorage_c_moduleProTimeForceLatencyMode !== null) {
    moduleGlobalArgs.moduleProTime_config_check_forceLatencyMode.checked = lstorage_c_moduleProTimeForceLatencyMode
  } else {
    moduleGlobalArgs.moduleProTime_config_check_forceLatencyMode.checked = pAmagProTime_defaultForceHighLatencyMode
    localStorage.setItem('tc_c_module_proTimeForceLatencyMode',pAmagProTime_defaultForceHighLatencyMode)
  }
  if(lstorage_c_moduleProTimeUseLatencyMode !== null) {
    moduleGlobalArgs.moduleProTime_config_check_useLatencyMode.checked = lstorage_c_moduleProTimeUseLatencyMode
  }else {
    moduleGlobalArgs.moduleProTime_config_check_useLatencyMode.checked = pAmagProTime_defaultHighLatencyMode
    localStorage.setItem('tc_c_module_proTimeUseLatencyMode',pAmagProTime_defaultHighLatencyMode)
  }
  if(lstorage_c_moduleProtimeTicketNomberInText !== null) {
    moduleGlobalArgs.moduleProTime_config_check_useTicketnomberInText.checked = lstorage_c_moduleProtimeTicketNomberInText
  }else {
    moduleGlobalArgs.moduleProTime_config_check_useTicketnomberInText.checked = pAmagProTime_defaultUseTicketNomberInText
    localStorage.setItem('tc_c_module_proTimeTicketNomberInText',pAmagProTime_defaultUseTicketNomberInText)
  }
  if(lstorage_c_moduleProtimeUseMatchBookingDay !== null) {
    moduleGlobalArgs.moduleProTime_config_check_useMatchBookingDay.checked = lstorage_c_moduleProtimeUseMatchBookingDay
  }else {
    moduleGlobalArgs.moduleProTime_config_check_useMatchBookingDay.checked = pAmagProTime_defaultUseMatchBookingDay
    localStorage.setItem('tc_c_proTimeMatchBookingDay',pAmagProTime_defaultUseMatchBookingDay)
  }
  if(lstorage_c_moduleProtimeUseAutoSelectDay !== null) {
    moduleGlobalArgs.moduleProTime_config_check_useAutoSelectDay.checked = lstorage_c_moduleProtimeUseAutoSelectDay
  } else {
    localStorage.setItem('tc_c_proTimeAutoSelectDay',pAmagProTime_defaultUseAutoSelectDay)
    moduleGlobalArgs.moduleProTime_config_check_useAutoSelectDay.checked = pAmagProTime_defaultUseAutoSelectDay
  }
  // catch edge case, when the app should be updated at the same time, when the user do a change
  // reset version and reload app
  if(localStorage.getItem('tc_s_modulePlatformInformations') === null ) {
    localStorage.removeItem('tc_appVersion')
    window.location.reload()
  }
}

export function clearmoduleLocalStorages(onlyImportantModule) {
  // module storages
  if(onlyImportantModule) {
    localStorage.removeItem('tc_s_modulePlatformInformations')
    localStorage.removeItem('tc_s_moduleFilterInformations')
  } else {
    localStorage.removeItem('tc_s_modulePlatformInformations')
    localStorage.removeItem('tc_s_moduleFilterInformations')
    localStorage.removeItem('tc_c_module_proTimeTest')
    localStorage.removeItem('tc_c_module_xMasSnowFlakes')
    localStorage.removeItem('tc_c_module_xMasTree')
    localStorage.removeItem('tc_c_module_proTimeForceLatencyMode')
    localStorage.removeItem('tc_c_module_proTimeUseLatencyMode')
    localStorage.removeItem('tc_c_module_proTimeTicketNomberInText')
    localStorage.removeItem('tc_c_proTimeMatchBookingDay')
    localStorage.removeItem('tc_c_proTimeAutoSelectDay')
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
