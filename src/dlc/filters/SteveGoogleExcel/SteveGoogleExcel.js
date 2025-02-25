export function filter_SteveGoogleExcel(clipboarsString) {

  let allTickets
  // the regExp to get all needed Informations
  const regExp_fullDateString = /(Mo\.|Di\.|Mi\.|Do\.|Fr\.|Sa\.|So\.)\s*\d{2}\.\d{2}\.\d{4}/
  const regExp_dateString = /^(\d{2}\.\d{2}\.\d{4})/
  const regExp_statusLetters = /^[a-zA-Z\s]{1,3}\s+/g
  const regExp_workBeginTime = /^\d{1,2}[:.]\d{2}\s*/g
  const regExp_markerSymbol = /^(\p{So})?/u
  const regExp_markerSymbolTwo = /^(\s*)(.)(\s+)/gmu
  const regExp_Ticket = /(\w.*[\s]{1}\d{1,2}[,\.]?\d{0,2})(?=\s|$)/g
  const regExp_ticketNumber = /(?:^|\n)\s*([A-Z0-9]+(?:-[A-Z0-9]+)?(?:>[A-Z0-9]+)?)/i
  const regExp_ticketMasterNumber = />(.+)/
  const regExp_ticketAddInformation = /\[([^\]]+)\](?=[^\[]*$)/
  const regExp_ticketCustomBookingNumberAll = /\[#([^\]]+)\](?=[^\[]*$)/
  const regExp_ticketCustomBookingNumber = /(?<=\#).*?(?=\])/
  const regExp_ticketTime = /\d+[.,]?\d*$/

  let fullDateString = ''
  let workingBeginTime = ''
  let matches = []
  let match
  let bookingData = []

  // if clipboard contains fulldatestring (Day and date)
  if (clipboarsString.match(regExp_fullDateString)) {
    fullDateString = clipboarsString.match(regExp_fullDateString)[0].trim()
    allTickets = clipboarsString.replace(regExp_fullDateString, '').trim()
  } else if (clipboarsString.match(regExp_dateString)) {
    // if clipboard contains datestring (only number)
    fullDateString = clipboarsString.match(regExp_dateString)[0].trim()
    allTickets = clipboarsString.replace(regExp_dateString, '').trim()
  } else {
    allTickets = clipboarsString.trim()
  }

  allTickets = allTickets.replaceAll("\t", " ")

  // if working time is in string
  if (allTickets.match(regExp_workBeginTime)) {
    workingBeginTime = allTickets.match(regExp_workBeginTime)[0].trim()
    allTickets = allTickets.replace(regExp_workBeginTime, '').trim()
  }
  // remove any marker symbols
  if (allTickets.match(regExp_markerSymbol)) {
    allTickets = allTickets.replace(regExp_markerSymbol, '').trim()
  }
  // remove status letters
  if (allTickets.match(regExp_statusLetters)) {
    allTickets = allTickets.replace(regExp_statusLetters, '').trim()
  }

  let markerSymbolTwoMatchesAll = allTickets.matchAll(regExp_markerSymbolTwo);
  for (const markerSym of markerSymbolTwoMatchesAll) {
    if (markerSym[2] && markerSym[2] !== ' ') {
      allTickets = allTickets.replace(markerSym[2], '').trim()
    }
  }

  // push into matches
  while ((match = regExp_Ticket.exec(allTickets)) !== null) {
    matches.push(match[1]);
  }
  matches.forEach(function (ticket, i) {

    ticket = ticket.replaceAll("\t", " ")

    let item_date = ''
    let item_bookingNumber = ''
    let item_ticketNumber = ''
    let item_ticketMasterNomber = ''
    let item_ticketCustomBookingNumber = ''
    let item_hiddenTag = ''
    let item_ticketNumberAll = ticket.match(regExp_ticketNumber)[0].trim();

    if (item_ticketNumberAll.match(regExp_ticketMasterNumber)) {
      item_ticketNumber = item_ticketNumberAll.replace(regExp_ticketMasterNumber, '').trim()
      item_ticketMasterNomber = item_ticketNumberAll.replace(item_ticketNumber + ">", '').trim()
    } else {
      item_ticketNumber = item_ticketNumberAll.trim()
    }
    //custom bookingnumber
    if (ticket.match(regExp_ticketAddInformation)) {
      if (ticket.match(regExp_ticketCustomBookingNumberAll)) {
        item_ticketCustomBookingNumber = ticket.match(regExp_ticketCustomBookingNumberAll)[0].trim()
        item_ticketCustomBookingNumber = item_ticketCustomBookingNumber.match(regExp_ticketCustomBookingNumber)[0].trim()
        item_bookingNumber = item_ticketCustomBookingNumber;
        ticket = ticket.replace(regExp_ticketCustomBookingNumberAll, '')
      } else {
        item_hiddenTag = ticket.match(regExp_ticketAddInformation)[1].trim()
        ticket = ticket.replace(regExp_ticketAddInformation, '')
      }
    }
    //ticket time 
    let item_ticketTime = ticket.match(regExp_ticketTime)[0]
    item_ticketTime = item_ticketTime.replaceAll(",", ".")
    // ticket discription
    let item_ticketDisc = ticket.replace(item_ticketNumberAll, '').trim()
    item_ticketDisc = item_ticketDisc.replace(item_ticketCustomBookingNumber, '').trim()
    item_ticketDisc = item_ticketDisc.replace(regExp_ticketTime, '').trim()
    // item date from global
    item_date = fullDateString.replace("\t", "").trim()
    // define object
    let itemObject = {
      "item_bookingnumber": item_bookingNumber,
      "item_ticketmasternumber": item_ticketMasterNomber,
      "item_ticketnumber": item_ticketNumber,
      "item_ticketdisc": item_ticketDisc,
      "item_hiddentag": item_hiddenTag,
      "item_tickettime": item_ticketTime,
      "item_date": item_date
    }
    bookingData.push(itemObject)
  })
  return bookingData
}