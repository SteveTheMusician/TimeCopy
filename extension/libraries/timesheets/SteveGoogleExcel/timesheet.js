import { bookingplattforms } from "../../bookingplattforms/bookingplattforms.js"

export function timesheet_SteveGoogleExcel(clipboarsString) {
    alert('Steve Google Excel: '+clipboarsString)
    
    let bdOk = true
    let bsp = "beispielData"
    let bookingData = {"ok": bdOk, "data": bsp}

    return bookingData
}