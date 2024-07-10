# Time Copy
#### V 0.8.4*
### By Steve P.
### start: 04.07.2023


### Before Build

Delete script link to developer js and also the file itselfs

    chrome.scripting.executeScript({
    target: {tabId: tab.id},
    args: [item_bookingNumber,item_ticketTime,item_ticketNumber,item_ticketDisc,dev_pttest],
    func: (...args) => bookTicket(...args),
    });