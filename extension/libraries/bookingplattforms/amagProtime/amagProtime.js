// Call the correct booking numbers for the specific tickets
export function amagProtime(bookingsheet,bookingData){
  alert("Bookingsheet: "+bookingsheet+" Data: "+bookingData+" ExampleData: "+bookingData.item_bookingNumber)
}


function bookingNumbers(item_bookingNumber, item_ticketNumber, item_ticketDisc){
    // All Known Booking Numbers
    let booking_BBP3 = "21037"
    let booking_AMAG43 = "21344"
    let allDetectionFilter = JSON.parse(lstorage_cDetectionItems)
  
    let new_bookingNumber = ""
  
  
    allDetectionFilter.forEach((obj) => {
      // Object.keys(obj).forEach((key) => {
          // alert("key : " + key + " - value : " + obj[key]);
      // });
      let currentFilterObject_addprefix = obj.addprefix
      let filterMatches = []
      let ticketMatch = []
      
      if(currentFilterObject_addprefix.length <= 0){
        // alert('kein length')
        if(currentFilterObject_addprefix.ticketprefix = item_ticketNumber) {
          alert('MATCH Ohne length'+item_ticketNumber)
        }
      }else if(item_ticketDisc.includes(currentFilterObject_addprefix)){
        // filterMatches.push(obj);
        if(currentFilterObject_addprefix.ticketprefix = item_ticketNumber) {
          alert('MATCH mit Add prefix'+item_ticketNumber)
        }
  
        alert('includes'+ filterMatches)
      }else {
        alert('no includes')
      }
    });
  
    
    if(!item_bookingNumber) {
      // booking nomber detection
     
  
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
  // function to pass variables from extension to tab
  
  async function execBookingScript(item_bookingNumber,item_ticketTime,item_ticketNumber,item_ticketDisc,dev_pttest){
    // alert(item_bookingNumber+item_ticketTime+item_ticketNumber+item_ticketDisc)
    let [tab] = await chrome.tabs.query ({active: true, currentWindow: true});
      // Execute script to parse emails on page
      chrome.scripting.executeScript({
      target: {tabId: tab.id},
      args: [item_bookingNumber,item_ticketTime,item_ticketNumber,item_ticketDisc,dev_pttest],
      func: (...args) => bookTicket(...args),
      });
  }
  
  function bookTicket(item_bookingNumber,item_ticketTime,item_ticketNumber,item_ticketDisc) {
    //Enter Key 
    const keyEventEnter = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      which: 13,
      keyCode: 13,
    })
  
    // get booking number field
    let protime_Innenauftrag = document.getElementsByClassName('lsField--f4')[0].childNodes[0]
  
    if(protime_Innenauftrag){
      protime_Innenauftrag.value = item_bookingNumber
      protime_Innenauftrag.dispatchEvent(keyEventEnter)
    }else {
      alert('TimeCopy   ERROR: unable to get Order-Input')
    }
  
    setTimeout(function(){
      // service dropdown
      let protime_Leistung = document.getElementsByClassName('lsField--list')[1].childNodes[0]
      const protime_Leistungen_CSITExtST = document.querySelector("[data-itemkey='ZCHN0730070']")
      const protime_Leistungen_CSITExtNT = document.querySelector("[data-itemkey='ZCHN0730080']")
      const protime_Leistungen_ITDNT = document.querySelector("[data-itemkey='ZCHN0730005']")
      const protime_Leistungen_ITD = document.querySelector("[data-itemkey='ZCHN0730001']")
      protime_Leistung.click()
      protime_Leistungen_CSITExtST.click()
    },500)
  
    setTimeout(function(){ 
      let protime_hours = document.getElementsByClassName('lsField--right')[0].childNodes[0]
      protime_hours.value = item_ticketTime
      // ggf ein await für dieses element
      let protime_ticketNumber = document.getElementsByClassName('lsField--empty')[2].childNodes[0]
      protime_ticketNumber.value = item_ticketNumber
    
      let protime_ticketText = document.getElementsByTagName('textarea')[0]
      protime_ticketText.value = item_ticketDisc
    
    }, 700 );
  
    if(dev_pttest === true)
      {
        console.log('PT Test -- dev: true')
      }else{
        // click booking button here!
      }
  
    // sleep(2000)
    // return new Promise((resolve) => {
      // resolve('resolved')
    // })
  }