import { lstorage_c_dlcProTimeTest,lstorage_c_dlcProTimeForceLatencyMode,lstorage_c_dlcProTimeUseLatencyMode,
  lstorage_c_dlcProtimeTicketNomberInText,lstorage_c_dlcProtimeUseAutoSelectDay,lstorage_c_dlcProtimeUseMatchBookingDay
 } from "./dlcStorage"

export function dlcProfileExport() {

  let amagProTimeUseForceLatencyMode = lstorage_c_dlcProTimeForceLatencyMode !== null ? lstorage_c_dlcProTimeForceLatencyMode : ''
  amagProTimeUseForceLatencyMode = amagProTimeUseForceLatencyMode.toString()
  let amagProTimeUseLatencyMode = lstorage_c_dlcProTimeUseLatencyMode !== null ? lstorage_c_dlcProTimeUseLatencyMode : ''
  amagProTimeUseLatencyMode = amagProTimeUseLatencyMode.toString()
  let amagProTimeUseTicketNomberInText = lstorage_c_dlcProtimeTicketNomberInText !== null ? lstorage_c_dlcProtimeTicketNomberInText : ''
  amagProTimeUseTicketNomberInText = amagProTimeUseTicketNomberInText.toString()
  let amagProTimeUseMatchDays = lstorage_c_dlcProtimeUseMatchBookingDay !== null ? lstorage_c_dlcProtimeUseMatchBookingDay : ''
  amagProTimeUseMatchDays = amagProTimeUseMatchDays.toString()
  let amagProTimeUseAutoSelectDay = lstorage_c_dlcProtimeUseAutoSelectDay !== null ? lstorage_c_dlcProtimeUseAutoSelectDay : ''
  amagProTimeUseAutoSelectDay = amagProTimeUseAutoSelectDay.toString()
  let amagProTimeUseTestMode = lstorage_c_dlcProTimeTest !== null ? lstorage_c_dlcProTimeTest : ''
  amagProTimeUseTestMode = amagProTimeUseTestMode.toString()

  let dlcProfileObj = {
    "dlccfg": {
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
  return dlcProfileObj
}

export function dlcProfileImport(fileData) {
  localStorage.setItem('tc_c_dlc_proTimeForceLatencyMode', fileData.tcprofile.dlccfg.platforms.AmagProTime.useForceLatencyMode)
  localStorage.setItem('tc_c_dlc_proTimeUseLatencyMode', fileData.tcprofile.dlccfg.platforms.AmagProTime.useLatencyMode)
  localStorage.setItem('tc_c_dlc_proTimeTicketNomberInText', fileData.tcprofile.dlccfg.platforms.AmagProTime.useTicketNomberInText)
  localStorage.setItem('tc_c_proTimeMatchBookingDay', fileData.tcprofile.dlccfg.platforms.AmagProTime.useMatchDays)
  localStorage.setItem('tc_c_proTimeAutoSelectDay', fileData.tcprofile.dlccfg.platforms.AmagProTime.useAutoSelectDay)
  localStorage.setItem('tc_c_dlc_proTimeTest', fileData.tcprofile.dlccfg.platforms.AmagProTime.useTestMode)
}