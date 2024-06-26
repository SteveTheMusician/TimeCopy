import { timesheet_SteveGoogleExcel } from "./SteveGoogleExcel/timesheet.js"
import { timesheet_TobiasExcel } from "./TobiasExcel/timesheet.js"

export async function timesheetFilter(filter,clipboarsString) {
   let bookingData = []
   // console.log('Filter: '+filter+' Daten: '+clipboarsString+' Developer Mode: '+dev_pttest)
   if(filter === 'timesheetfilter-tobiasexcel') {
      bookingData = timesheet_TobiasExcel(clipboarsString)
   }else if(filter === 'timesheetfilter-stevegoogleexcel') {
      bookingData = timesheet_SteveGoogleExcel(clipboarsString)
   }
   return bookingData
}