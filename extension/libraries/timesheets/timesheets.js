import { timesheet_SteveGoogleExcel } from "./SteveGoogleExcel/timesheet.js"
import { timesheet_TobiasExcel } from "./TobiasExcel/timesheet.js"

export function timesheetFilter(bookingPlattform, filter,clipboarsString,dev_pttest) {
   // console.log('Filter: '+filter+' Daten: '+clipboarsString+' Developer Mode: '+dev_pttest)
   if(filter === 'timesheetfilter-tobiasexcel') {
      timesheet_TobiasExcel(bookingPlattform ,clipboarsString,dev_pttest)
   }else if(filter === 'timesheetfilter-stevegoogleexcel') {
            timesheet_SteveGoogleExcel(bookingPlattform, clipboarsString,dev_pttest)
   }
}