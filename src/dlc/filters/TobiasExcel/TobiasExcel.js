import { debugStick } from "../../../utils/appDebugStick";
import { createFilterObject } from "../filters.dlc";

export function filter_TobiasExcel(clipboardString) {

  let fullDateString = ''
  // check if cell typical space exist and none of the t-cells from cryptosheet exists
  if(clipboardString.includes('	') && !clipboardString.includes('\t\t')) {
    fullDateString = clipboardString.split('	')[0];
  }
  if(clipboardString.includes('""')) {
    // replace all "" with empty
    clipboardString = clipboardString.replace(/""/g, "")
  }
  let allTickets = clipboardString.split('"')[1]?? clipboardString.split('	');
  debugStick(allTickets,'🧩 Tobias Excel - AllTickets')
  if(Array.isArray(allTickets)) {
    // cuz the special excel is generating an arry with ",,," at the end, we check if it happens
    // if we have a date copied, the second object in the array has our main data aka a length -> we can extract the date from the first one
    if(allTickets.length > 1 && allTickets[1].length > 1) {
      fullDateString = allTickets[0]
      allTickets = allTickets[1]
    }
    allTickets = allTickets.toString()
    allTickets = allTickets.replaceAll(',,,','')
    allTickets = allTickets.split('\t')[0]
    allTickets.trim()
  }
  // the regexp to get all needed informations
  const regExp_Ticket = /([^\n]+)/g
  const regExp_squareBrakets = /(?<=\[).*?(?=\])/g;
  const regExp_ticketDiscription = /(?<=\]).*(?=\:)/g;
  const regExp_ticketTime = /.*[\s]*?:[\s]*?(\d{1,2}[\.\,]?[\d]{0,2})/
  const regExp_ticketNumber = /^[^\s#°]+/
  const regExp_ticketMasterNumber = /(?<=°)[^\s#°]+/
  const regExp_ticketCutomBookingNumber = /(?<=#)[^\s#°]+/
  const regExp_ticketDateDay = /([\d]{1,2})\./
  let matches = []
  let match
  let bookingData = []
  // push into matches
  while ((match = regExp_Ticket.exec(allTickets)) !== null) {
    matches.push(match[1]);
  }
  debugStick(matches,'🧩 Tobias Excel - Matches')
  matches.forEach(function(ticket, i) {
    
    let item_bookingNumber = ''
    let item_additionalTag = ''
    let item_ticketNumberAll = ticket.match(regExp_squareBrakets)[0].trim();
    let item_ticketNumber = item_ticketNumberAll.match(regExp_ticketNumber)[0];
    let item_ticketCustomBookingNumber = item_ticketNumberAll.match(regExp_ticketCutomBookingNumber) ? 
    item_ticketNumberAll.match(regExp_ticketCutomBookingNumber)[0] 
    : '';
    let item_ticketMasterNomber = item_ticketNumberAll.match(regExp_ticketMasterNumber) ? 
    item_ticketNumberAll.match(regExp_ticketMasterNumber)[0] 
    : ''
    let item_ticketDisc = ticket.match(regExp_ticketDiscription)[0].trim();
    let item_ticketTime = ticket.match(regExp_ticketTime)[1].trim();
    item_ticketTime = item_ticketTime.replaceAll(",",".")
    let item_date = fullDateString.trim()
    let item_dateDay = ''
    if(item_date){
      item_dateDay = item_date.match(regExp_ticketDateDay)[1]
    }
    // remove first 0
    if(item_dateDay.startsWith('0')){
      item_dateDay = item_dateDay.replaceAll('0','')
    }
    
    if(item_ticketCustomBookingNumber) {
      item_bookingNumber = item_ticketCustomBookingNumber;
    }

    let itemObject = createFilterObject(item_bookingNumber,
      item_ticketMasterNomber,item_ticketNumber,item_ticketDisc,
      item_additionalTag,item_ticketTime,item_date,item_dateDay
    )
    bookingData.push(itemObject)
  })
  return bookingData
}