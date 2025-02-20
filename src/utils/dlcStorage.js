
let lstorage_c_dlcProTimeTest = localStorage.getItem('tc_c_dlc_protimetest')
let lstorage_c_dlcProTimeForceLatencyMode = localStorage.getItem('tc_c_dlc_protimeforcelatencymode')
let lstorage_c_dlcProTimeUseLatencyMode = localStorage.getItem('tc_c_dlc_protimeuselatencymode')


// local storage for dlcs
export function loadDLCStorage(appGlobalArgs) {
  
  if (lstorage_c_dlcProTimeTest === 'true') {
    appGlobalArgs.config_check_showprotimetestbutton.checked = true
    dlcShowProTimeTestButtonDisplay()
  }
  if(lstorage_c_dlcProTimeForceLatencyMode === 'true') {
    appGlobalArgs.config_check_forcelatencymodeprotime.checked = true
  }
  if(lstorage_c_dlcProTimeUseLatencyMode === 'false') {
    appGlobalArgs.config_check_uselatencymodeprotime.checked = false
  }else {
    appGlobalArgs.config_check_uselatencymodeprotime.checked = true
  }
}

export function clearDlcLocalStorages(onlyImportantDLC) {
  // DLC Storages
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
  }
}
  
export function reloadDLCCache() {
  clearDlcLocalStorages()
  sessionStorage.setItem('tc_c_messageDLCCacheReloaded', 'true')
  window.location.reload()
}