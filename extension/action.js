


document.getElementById('pasteTicketData').addEventListener('click', function(){


  document.getElementById('WD0172').value = "21053";

  alert('click')

});


const button = document.querySelector('button#fill');




async function readClipboardText() {
  let clipboarsString = await navigator.clipboard.readText();
  timesheetTobias(clipboarsString)
}

function timesheetTobias(clipboarsString) {

  let fullDateString = clipboarsString.split('"')[0];
  let allTickets = clipboarsString.split('"')[1];

  var regex = /\[(.*?)\h/g;
  var matches = []
  var match

  while ((match = regex.exec(allTickets)) !== null) {
    matches.push(match[1]);
  }

  matches.forEach(ticket => {
    let item_ticketNumber = ticket.split(']')[0];
    let item_ticketDisc = ticket.split(/\](.*?)\:/g)[1];
    let item_ticketTime = ticket.split(':')[1];
    let item_bookingNumber = ""

    let item_ticketCustomBookingNumber = item_ticketNumber.split('-')[2];
    if(item_ticketCustomBookingNumber) {
      item_bookingNumber = item_ticketCustomBookingNumber;
      item_ticketNumber = item_ticketNumber.split('-')[0] + "-"+ item_ticketNumber.split('-')[1]
    }

    item_bookingNumber = bookingNumbers(item_bookingNumber, item_ticketNumber)

    if(!item_bookingNumber){
      alert('WARNING: Undefined Booking Number @ '+item_ticketNumber)
    } else {
      bookTicket(item_bookingNumber)
    }

    alert("Ticketnummer: "+item_ticketNumber+" Beschreibung: "+item_ticketDisc+" Zeit: "+item_ticketTime + " BuchungsNummer: "+item_bookingNumber)

    
  }
  )
}

button.addEventListener('click', readClipboardText);


function bookingNumbers(item_bookingNumber, item_ticketNumber){

  let booking_BBP3 = "21037"
  let booking_AMAG43 = "21344"

  let new_bookingNumber = ""

  if(!item_bookingNumber) {
    if(item_ticketNumber.includes("BBP")){
      new_bookingNumber = booking_BBP3
      // alert(new_bookingNumber)
      return new_bookingNumber
    }
  } else {
    new_bookingNumber = item_bookingNumber
    return new_bookingNumber
  }
}

function bookTicket() {

}