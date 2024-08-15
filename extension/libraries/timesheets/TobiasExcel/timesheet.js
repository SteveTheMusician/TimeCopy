import {replaceAllTokensBetween} from '../../../utils/replaceAllTokensBetween.js'

export function timesheet_TobiasExcel(clipboarsString) {

  let fullDateString = ""
  if(clipboarsString.includes('	')) {
    fullDateString = clipboarsString.split('	')[0];
  }

  if(clipboarsString.includes('""')) {
    // replace ALL "" with empty
    clipboarsString = clipboarsString.replace(/""/g, "")
  }
  
  let allTickets = clipboarsString.split('"')[1]?? clipboarsString.split('	');
  // get all tickets before and after a line break
  let regex_Ticket = /([^\n]+)/g
  let matches = []
  let match
  let bookingData = []
  
  // push into matches
  while ((match = regex_Ticket.exec(allTickets)) !== null) {
    matches.push(match[1]);
  }
   
  matches.forEach(function(ticket, i) {

    let regExp_squareBrakets = /(?<=\[).*?(?=\])/g;
    let regExp_ticketDiscription = /(?<=\]).*(?=\:)/g;
    let regExp_ticketTime = /.*[\s]*?:[\s]*?(\d{1,2}[\.\,]?[\d]{1,2})/
    let item_ticketNumber = ticket.match(regExp_squareBrakets)[0];
    item_ticketNumber = item_ticketNumber.trim()
    let item_ticketDisc = ticket.match(regExp_ticketDiscription)[0];
    item_ticketDisc = item_ticketDisc.trim()
    let item_ticketTime = ticket.match(regExp_ticketTime)[1];
    item_ticketTime = item_ticketTime.trim()
    item_ticketTime = item_ticketTime.replaceAll(",",".")
    let item_bookingNumber = ''
    let item_ticketCustomBookingNumber = item_ticketNumber.split('#')[1]
    let item_date = fullDateString.trim()
   
    if(item_ticketCustomBookingNumber) {
      item_bookingNumber = item_ticketCustomBookingNumber;
      item_ticketNumber = item_ticketNumber.split('#')[0]
    }

    let itemObject = {"item_bookingnumber":item_bookingNumber, "item_ticketnumber":item_ticketNumber, "item_ticketdisc":item_ticketDisc, "item_tickettime":item_ticketTime, "item_date":item_date}
    bookingData.push(itemObject)

  })
  return bookingData
}