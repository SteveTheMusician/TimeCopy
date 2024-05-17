import { bookingsheets } from "../../bookingsheets/bookingsheets.js";
export function timesheet_TobiasExcel(clipboarsString,dev_pttest) {

   let fullDateString = clipboarsString.split('"')[0];
   let allTickets = clipboarsString.split('"')[1]?? clipboarsString.split('	');
 
   // get all tickets before and after a line break
   let regex = /([^\n]+)/g
   var matches = []
   var match
   // push into matches
   while ((match = regex.exec(allTickets)) !== null) {
     matches.push(match[1]);
   }
 
   let forEachTimer = "100"
  
   matches.forEach(function(ticket, index){
     setTimeout(function(){
       let item_ticketNumber = ticket.split('[').pop().split(']')[0];
       let item_ticketDisc = ticket.split(']').pop().split(':')[0];
       let item_ticketTime = ticket.split(':')[1];
       
       let item_bookingNumber = ""
       let item_service = ""
 
       let item_ticketCustomBookingNumber = item_ticketNumber.split('#').pop();
       
       if(item_ticketCustomBookingNumber) {
         item_bookingNumber = item_ticketCustomBookingNumber;
         item_ticketNumber = item_ticketNumber.split('#')[0]
       }
 
       item_bookingNumber = bookingsheets("amag-protime",{item_bookingNumber, item_ticketNumber, item_ticketDisc})
 
       if(!item_bookingNumber){
         alert(alertWarning+ 'No order number @ '+item_ticketNumber)
       } else if(!item_ticketDisc){
         alert(alertWarning+ 'Unable to get Ticket discription @ '+item_ticketNumber)
       } else if(!item_ticketTime){
         alert(alertWarning+ 'Unable to get working time @ '+item_ticketNumber)
       }else{
         execBookingScript(item_bookingNumber,item_ticketTime,item_ticketNumber,item_ticketDisc,dev_pttest)
       }
     },forEachTimer * (index + 1))
     // set intervall after first run
     forEachTimer = "300"
   })
 }