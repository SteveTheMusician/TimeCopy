# Time Copy
#### V 0.8.32
### By Steve P.
### 04.07.2023


### Before Build

Delete script link to developer js and also the file itselfs
Temp:
// opens a communication port
chrome.runtime.onConnect.addListener(function(port) {

    // listen for every message passing throw it
    port.onMessage.addListener(function(o) {

        // if the message comes from the popup
        if (o.from && o.from === 'popup' && o.start && o.start === 'Y') {

            // inserts a script into your tab content
            chrome.tabs.executeScript(null, {

                // the script will click the button into the tab content
                code: "document.getElementById('pageBtn').click();"
            });
        }
    });
});

logic info:
Projekt erkennung
wenn erkanntes wort existiert, checke prefix = buche unter eingetragene nummer
wenn keine erkennung vorhanden ist, nehme ticket mit #buchungsnummer