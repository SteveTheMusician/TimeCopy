import { lstorage_c_moduleProTimeTest,lstorage_c_moduleProTimeForceLatencyMode,lstorage_c_moduleProTimeUseLatencyMode,
  lstorage_c_moduleProtimeTicketNomberInText,lstorage_c_moduleProtimeUseAutoSelectDay,lstorage_c_moduleProtimeUseMatchBookingDay
 } from "./moduleStorage"

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

export function moduleProfileImport(fileData) {
  localStorage.setItem('tc_c_module_proTimeForceLatencyMode', fileData.tcprofile.modulecfg.platforms.AmagProTime.useForceLatencyMode)
  localStorage.setItem('tc_c_module_proTimeUseLatencyMode', fileData.tcprofile.modulecfg.platforms.AmagProTime.useLatencyMode)
  localStorage.setItem('tc_c_module_proTimeTicketNomberInText', fileData.tcprofile.modulecfg.platforms.AmagProTime.useTicketNomberInText)
  localStorage.setItem('tc_c_proTimeMatchBookingDay', fileData.tcprofile.modulecfg.platforms.AmagProTime.useMatchDays)
  localStorage.setItem('tc_c_proTimeAutoSelectDay', fileData.tcprofile.modulecfg.platforms.AmagProTime.useAutoSelectDay)
  localStorage.setItem('tc_c_module_proTimeTest', fileData.tcprofile.modulecfg.platforms.AmagProTime.useTestMode)
}