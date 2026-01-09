import { lstorage_c_moduleProTimeTest,lstorage_c_moduleProTimeForceLatencyMode,lstorage_c_moduleProTimeUseLatencyMode,
  lstorage_c_moduleProtimeTicketNomberInText,lstorage_c_moduleProtimeUseAutoSelectDay,lstorage_c_moduleProtimeUseMatchBookingDay
 } from "./moduleStorage"
 import { debugStick } from "../appDebugStick"
 import { moduleStorage_preValueConfiguration } from "./defaults/defaultModuleVariables"

export function moduleProfileExport() {

  let amagProTimeUseForceLatencyMode = lstorage_c_moduleProTimeForceLatencyMode !== null ? lstorage_c_moduleProTimeForceLatencyMode : ''
  amagProTimeUseForceLatencyMode = amagProTimeUseForceLatencyMode.toString()
  let amagProTimeUseLatencyMode = lstorage_c_moduleProTimeUseLatencyMode !== null ? lstorage_c_moduleProTimeUseLatencyMode : ''
  amagProTimeUseLatencyMode = amagProTimeUseLatencyMode.toString()
  let amagProTimeUseTicketNomberInText = lstorage_c_moduleProtimeTicketNomberInText !== null ? lstorage_c_moduleProtimeTicketNomberInText : ''
  amagProTimeUseTicketNomberInText = amagProTimeUseTicketNomberInText.toString()
  let amagProTimeUseMatchDays = lstorage_c_moduleProtimeUseMatchBookingDay !== null ? lstorage_c_moduleProtimeUseMatchBookingDay : ''
  amagProTimeUseMatchDays = amagProTimeUseMatchDays.toString()
  let amagProTimeUseAutoSelectDay = lstorage_c_moduleProtimeUseAutoSelectDay !== null ? lstorage_c_moduleProtimeUseAutoSelectDay : ''
  amagProTimeUseAutoSelectDay = amagProTimeUseAutoSelectDay.toString()
  let amagProTimeUseTestMode = lstorage_c_moduleProTimeTest !== null ? lstorage_c_moduleProTimeTest : ''
  amagProTimeUseTestMode = amagProTimeUseTestMode.toString()

  let moduleProfileObj = {
    "modulecfg": {
      "filters": {
        "TobiasExcel":{},"SteveGoogleExcel": {}
      },
      "platforms": {
        "AmagProTime":{
          "useForceLatencyMode":amagProTimeUseForceLatencyMode,
          "useLatencyMode": amagProTimeUseLatencyMode,
          "useTicketNomberInText": amagProTimeUseTicketNomberInText,
          "useMatchDays":amagProTimeUseMatchDays,
          "useAutoSelectDay":amagProTimeUseAutoSelectDay,
          "useTestMode":amagProTimeUseTestMode
        }
      }
    }
  }
  return moduleProfileObj
}

export function moduleProfileImport(fileData,version) {
  debugStick(fileData,'Imported profile data')
  const moduleObjectSelect = version === '2.1' ? 'modulecfg' : 'dlccfg'
  localStorage.setItem(moduleStorage_preValueConfiguration+'_proTimeForceLatencyMode', fileData.tcprofile[moduleObjectSelect].platforms.AmagProTime.useForceLatencyMode)
  localStorage.setItem(moduleStorage_preValueConfiguration+'_proTimeUseLatencyMode', fileData.tcprofile[moduleObjectSelect].platforms.AmagProTime.useLatencyMode)
  localStorage.setItem(moduleStorage_preValueConfiguration+'_proTimeTicketNomberInText', fileData.tcprofile[moduleObjectSelect].platforms.AmagProTime.useTicketNomberInText)
  localStorage.setItem(moduleStorage_preValueConfiguration+'_proTimeMatchBookingDay', fileData.tcprofile[moduleObjectSelect].platforms.AmagProTime.useMatchDays)
  localStorage.setItem(moduleStorage_preValueConfiguration+'_proTimeAutoSelectDay', fileData.tcprofile[moduleObjectSelect].platforms.AmagProTime.useAutoSelectDay)
  localStorage.setItem(moduleStorage_preValueConfiguration+'_proTimeTest', fileData.tcprofile[moduleObjectSelect].platforms.AmagProTime.useTestMode)
}