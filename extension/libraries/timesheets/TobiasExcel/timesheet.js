import { bookingplattforms } from "../../bookingplattforms/bookingplattforms.js";
export function timesheet_TobiasExcel(bookingPlattform,clipboarsString,dev_pttest) {

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
        let platformData = {item_bookingNumber, item_ticketNumber, item_ticketDisc}
        bookingplattforms(bookingPlattform,platformData)
 
      //  item_bookingNumber = bookingsheets(bookingPlattform,{item_bookingNumber, item_ticketNumber, item_ticketDisc})
//  
      //  if(!item_bookingNumber){
        //  alert('Keine Buchungsnummer @ '+item_ticketNumber)
      //  } else if(!item_ticketDisc){
        //  alert('Keine Ticketbeschreibung @ '+item_ticketNumber)
      //  } else if(!item_ticketTime){
        //  alert('Arbeitszeit nicht gefunden @ '+item_ticketNumber)
      //  }else{
        //  execBookingScript(item_bookingNumber,item_ticketTime,item_ticketNumber,item_ticketDisc,dev_pttest)
      //  }
     },forEachTimer * (index + 1))
     // set intervall after first run
     forEachTimer = "300"
   })
 }