export function timesheet_TobiasExcel(clipboarsString) {

  let fullDateString = clipboarsString.split('"')[0];
  let allTickets = clipboarsString.split('"')[1]?? clipboarsString.split('	');
  // get all tickets before and after a line break
  let regex = /([^\n]+)/g
  let matches = []
  let match
  let bookingData = []
  
  // push into matches
  while ((match = regex.exec(allTickets)) !== null) {
    matches.push(match[1]);
  }
   
  matches.forEach(function(ticket, i) {

    let item_ticketNumber = ticket.split('[').pop().split(']')[0];
    let item_ticketDisc = ticket.split(']').pop().split(':')[0];
    let item_ticketTime = ticket.split(':')[1];
    let item_bookingNumber = ""
    let item_service

    let item_ticketCustomBookingNumber = item_ticketNumber.split('#')[1]
   
    if(item_ticketCustomBookingNumber) {
      item_bookingNumber = item_ticketCustomBookingNumber;
      item_ticketNumber = item_ticketNumber.split('#')[0]
    }
    // TODO: checken ob strings mit leerzeichen anfangen
    
    let itemObject = {"item_bookingnumber":item_bookingNumber, "item_ticketnumber":item_ticketNumber, "item_ticketdisc":item_ticketDisc, "item_tickettime":item_ticketTime}
    bookingData.push(itemObject)
  })
  return bookingData
}