
let lstorage_c_dlcProTimeTest = localStorage.getItem('tc_c_dlc_protimetest')
let lstorage_c_dlcProTimeForceLatencyMode = localStorage.getItem('tc_c_dlc_protimeforcelatencymode')
let lstorage_c_dlcProTimeUseLatencyMode = localStorage.getItem('tc_c_dlc_protimeuselatencymode')

// local storage for dlcs
export function loadDLCStorage(dlcGlobalArgs) {
  if (lstorage_c_dlcProTimeTest === 'true') {
    dlcGlobalArgs.dlcProTime_config_check_usePTTest.checked = true
    dlcGlobalArgs.dlcItem_platform_amagProTime.classList.add('dlcItem-amagProTime-TestMode')
    window.dlcProTime_usePTTest = true
  }
  if(lstorage_c_dlcProTimeForceLatencyMode === 'true') {
    dlcGlobalArgs.dlcProTime_config_check_forceLatencyMode.checked = true
  }
  if(lstorage_c_dlcProTimeUseLatencyMode === 'false') {
    dlcGlobalArgs.dlcProTime_config_check_useLatencyMode.checked = false
  }else {
    dlcGlobalArgs.dlcProTime_config_check_useLatencyMode.checked = true
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
  }
}
  
export function reloadDLCCache() {
  clearDlcLocalStorages()
  sessionStorage.setItem('tc_c_messageDLCCacheReloaded', 'true')
  window.location.reload()
}
