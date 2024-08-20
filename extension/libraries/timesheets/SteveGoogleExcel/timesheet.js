export function timesheet_SteveGoogleExcel(clipboarsString) {

  

  if(clipboarsString.includes('""')) {
    // replace ALL "" with empty
    clipboarsString = clipboarsString.replace(/""/g, "")
  }
  
  let allTickets
//   clipboarsString.split('"')[1]?? clipboarsString.split('	');
  // the regExp to get all needed Informations
  const regExp_fullDateString = /(Mo\.|Di\.|Mi\.|Do\.|Fr\.|Sa\.|So\.)\s*\d{2}\.\d{2}\.\d{4}/
  const regExp_Ticket = /([^\n]+)/g
  const regExp_squareBrakets = /(?<=\[).*?(?=\])/g;
  const regExp_ticketDiscription = /(?<=\]).*(?=\:)/g;
  const regExp_ticketTime = /.*[\s]*?:[\s]*?(\d{1,2}[\.\,]?[\d]{0,2})/
  const regExp_ticketNumber = /^[^\s#°]+/
  const regExp_ticketMasterNumber = /(?<=°)[^\s#°]+/
  const regExp_ticketCutomBookingNumber = /(?<=#)[^\s#°]+/
  let fullDateString = ""
  let matches = []
  let match
  let bookingData = []


  if(clipboarsString.test(regExp_fullDateString)) {
    fullDateString = clipboarsString.match(regExp_fullDateString)[0].trim()
    allTickets = clipboarsString.replace(regExp_fullDateString, '').trim()
    console.log(fullDateString)
  }
  
  // push into matches
  while ((match = regExp_Ticket.exec(allTickets)) !== null) {
    matches.push(match[1]);
  }
  
  matches.forEach(function(ticket, i) {

    let item_bookingNumber = ''
    let item_ticketNumberAll = ticket.match(regExp_squareBrakets)[0];
    item_ticketNumberAll = item_ticketNumberAll.trim()
    let item_ticketNumber = item_ticketNumberAll.match(regExp_ticketNumber)[0];
    let item_ticketCustomBookingNumber = item_ticketNumberAll.match(regExp_ticketCutomBookingNumber) ? 
                                          item_ticketNumberAll.match(regExp_ticketCutomBookingNumber)[0] 
                                            : '';
    let item_ticketMasterNomber = item_ticketNumberAll.match(regExp_ticketMasterNumber) ? 
                                    item_ticketNumberAll.match(regExp_ticketMasterNumber)[0] 
                                      : ''
    let item_ticketDisc = ticket.match(regExp_ticketDiscription)[0];
    item_ticketDisc = item_ticketDisc.trim()
    let item_ticketTime = ticket.match(regExp_ticketTime)[1];
    item_ticketTime = item_ticketTime.trim()
    item_ticketTime = item_ticketTime.replaceAll(",",".")
    let item_date = fullDateString.trim()
   
    if(item_ticketCustomBookingNumber) {
      item_bookingNumber = item_ticketCustomBookingNumber;
    }

    let itemObject = {
      "item_bookingnumber":item_bookingNumber,
      "item_ticketmasternumber": item_ticketMasterNomber,
      "item_ticketnumber":item_ticketNumber, 
      "item_ticketdisc":item_ticketDisc,
      "item_tickettime":item_ticketTime,
      "item_date":item_date
    }
    bookingData.push(itemObject)
  })
  return bookingData
}