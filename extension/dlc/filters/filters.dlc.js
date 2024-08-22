import { timesheet_SteveGoogleExcel } from "./SteveGoogleExcel/SteveGoogleExcel.js"
import { timesheet_TobiasExcel } from "./TobiasExcel/TobiasExcel.js"

export async function filters(filter,clipboarsString) {
   let filteredTimesheetData = []
   if(filter === 'timesheetfilter-tobiasexcel') {
      filteredTimesheetData = timesheet_TobiasExcel(clipboarsString)
   }else if(filter === 'timesheetfilter-stevegoogleexcel') {
      filteredTimesheetData = timesheet_SteveGoogleExcel(clipboarsString)
   }
   return filteredTimesheetData
}