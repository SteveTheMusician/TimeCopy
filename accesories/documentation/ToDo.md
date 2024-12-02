# ToDo

## V 0.9.7
 - ❗️ ProTime DLC: checken, wenn Textarea leer ist, dann erst weiter + ggf auf andere elemente warten ->ProTime Loop Logik ändern
        +wenn inputs nicht da sind = warte (mit wait for elem aus utils)
        - Alle inputs am ende abgleichen -> wenn leer neu auffüllen
        - wenn felder zu oft falsch befüllt sind oder der ladebalken auftaucht -> low latency mode ✅
 - DLC ProTime: Wenn Loading Screen -> Warte mit dem Eintragen/Buchen (:before element in "#ur-loading-box")
 - Buchungsfunktionen noch einmal genau testen ✅
 - Checken ob Buchungsfehler bei merh als 4 verschiedenen Buchungsnummern hintereinander auftritt ✅
 - Kurzer Loadingscreen oder farbfläche, während die Page sich nach einer config änderung neu lädt (damit man den aufbau nicht sieht) ?
 
 - Protime dlc: funktion - force delay modus ✅
 - So lange Buchung läuft, wird der einfügen Button mit einer loading animation blockiert ✅

 
## V 0.9.8
 - dlc: stevegoogleexcel - wenn urhzeit im string filtern / raus löschen ? macht schon?
 - Switches zentriert zu den Texten ✅
 - Alle Texte und Titles genau checken ✅
 - Test auf Windows ✅
 
 - style: mr white theme überarbeiten ✅
 - Responsive Feature: small & kacheln nebeneinander auf large ✅
 - "Zum Store" Link in den Infos ✅
 - EE Golden Theme ✅
 - EE Snowfall ✅
 - DLC Items in erkennungs select rendern ✅
 - Ultra-wide auflösung auch für Detection Items (1fr 1fr 1fr 1fr) ✅
 
## V 1.0.0

 - dlc: amagprotime - aboard button einfügen  ✅
 - dlc: amagProtime - wenn datum vom clipboard und platform nicht stimmen
 - CSS Variabeln verbessern und auslagern
 - Notification fix: beim öfteren betätigen oder schließen wird der timer nicht zurück gesetzt
 - Benachrichtigungen: Fehlerhafte Tickets werden als einzel nachricht im Benachrichtigungsfeld angezeigt bzw gelistet (Ohne Time Out und werden nach reopen gelöscht) ✅
 - Timesheet Items und BookingItems als extra Components auslagern ✅
 - buchung abgeschlossen notification ✅
 - Code Cleanup: error message in app.js / anzeigen ✅
 - In fehler meldungen den "Namen" der DLCs statt ID anzeigen ✅

 - dlc: amagprotime - detection items - mehrere string match parameter mit kommas oder anderem symbol trennbar
 - 10px abstand zwichen einzelnen Zeilen mit Inputs, die direkt übereinander sind in den einstellungen
 - better element namings und h-Tags für headlines und überschriften
 - Benachrichtigungen optionen in den einstellungen (z.b. Warnungen ausschalten)
 - json mit eigener sprache ? (Auslagerung vorallem der Benachrichtigungstexte in eine json)
 
 
 ## Features & Fixes für die Zukunft

 - Firefox & Opera Version
 - erkennungs items zusammenklappbar ?
 - components unterteilen ?
 - EE: count total booked tickets ❌
 - latency timer für protime ❌