import { xmasDlc } from "./xmas/xmas.import.js"
import { platform_functionName_automatic, platform_bookingPlatformPreValue } from "./platforms/platforms.import.js"
import { platforms, platformsContent } from "./platforms/platforms.dlc.js"
import { filters, filtersContent } from "./filters/filters.dlc.js"
import { filter_timesheetFilterPreValue } from "./filters/filters.import.js"

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



export {platform_functionName_automatic, 
        platformsContent, platforms, platform_bookingPlatformPreValue, filters, 
        filtersContent, filter_timesheetFilterPreValue, xmasDlc}
