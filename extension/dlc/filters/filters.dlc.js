import { filter_SteveGoogleExcel } from "./SteveGoogleExcel/SteveGoogleExcel.js"
import filterInfo_SteveGoogleExcel from "./SteveGoogleExcel/info.json" with { type: "json" };
import { filter_TobiasExcel } from "./TobiasExcel/TobiasExcel.js"
import filterInfo_TobiasExcel from "./TobiasExcel/info.json" with { type: "json" };

export async function filters(filter,clipboarsString) {
   let filteredTimesheetData = []
   if(filter === 'timesheetfilter-tobiasexcel') {
      filteredTimesheetData = filter_TobiasExcel(clipboarsString)
   }else if(filter === 'timesheetfilter-stevegoogleexcel') {
      filteredTimesheetData = filter_SteveGoogleExcel(clipboarsString)
   }
   return filteredTimesheetData
}