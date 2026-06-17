# ToDo

### Features & Fixes für die Zukunft
 
- sprache in modules und html integrieren
- eigene farbthemen importieren/ generieren
- willkommens screen mit anleitung (✅)
- Firefox & Opera Version
- Generell mehr dynamisches html
- module: stevegoogleexcel - fixen: wenn datum und zusatzzeichen kopiert werden, kann in bestimmten fällen nicht richtig gefiltert werden - ohne schon
- Yosha Update: im Ticketname akzeptiert Leere Ticketnummer bzw Tickets ohne Nummer / Tobias Excel FIlter anpassen 
(GGF eigenes Module Nötig)
- feature: fehlermeldung bei erstellen identischer detection items (oder text: ist identisch mit ...)
- Wenn Ticket bereits gebucht soll dieser übersprungen werden (Kann schwer bzw unmöglich sein, da diese Infos in protime nicht genau bekommen werden können - ticketnummer nich da, beschreibung nur teilweise)
- Wenn ein Error am ende der buchung von Protime kommt - breche buchung ab (z.B. bei Projekt ist abgelaufen)
- Silver Fox Theme
- texte noch mal checken ggf als json strings in language
- app storages zu einem profile-object zusammenfassen, dass gleichzeitig 1zu1 exportiert werden kann
- Datum Stimmt nicht überein fix: Wenn Protime lahm ist, wird nach einem auto-klick das datum nicht erkannt. -> Funktion ist experimentell daher in zukunft ggf ein Observer einbauen
- language einbauen (ggf mit different htmls)
- language json für module auslagern in public module folder (Jedes Modul soll unabhängige sprache haben)

- Profilname und Bild auf Start sichtbar ?
- Detection Items sortierbar
- ee themes detection open/close anim jump fix, input fields sizings/length
- Erkennung anhand von Booking nomber
- Activity in der Tabelle pflegbar

## Wichtige Updates / Fixes
- Wenn ein Input leer ist und blau umrandet wird (z.B. bei nicht selectierter activity)
    Sollte das Plugin dem User die möglichkeit geben, dass im Prozess manuell anzuklicken.
    TimeCopy reagiert dann auf onChange, überprüft noch mal alles und geht dann weiter

- Farbliche Bookmarks die auf die Erkennungs-Items gesetzt werden können/Ganzes Item oder ein Teil Färben
- Mäglichkeit für Datum anzeigen oder Ablaufdatum für einen Filter
- Filter an/aus schalten (Dadurch kann man temporär durchläufe ignorieren)

- Ticketprefix als Pflichtfeld
- code clean up, createDocumentFragment() in startscreen benutzen
- Detection-Item auto backup: wenn ich einen input ändere, wird vor dem ERSTEN change ein backup von dem item gemacht, dass so lange bleibt, bis das fenster geschlossen wird.
Ein "Restore" icon taucht an dem item auf und kann bei falscher eintragung benutzt werden, um dieses Item wiederherzustellen

### BUGS

- Ticket gleiche trigger machen probleme
z.b. Ticket mit dem namen"SCA -  bla bla" und einem hidden Tag "AMAG XY" wird beim Filtern,  mit dem Filter der "am ehsten" mit "SCA" triggert gematched - unser Hidden trigger wird also ignoriert
- Twisted Buchungen werden bei fehledem filter erzeugt und nicht erkannt (Fehler alles bleibt stehen)

- Detection Leer wird beforzugt: Wenn ich z.B. 2 SCRUM Tickets habe - eines ohne addPrefix eins mit + aktivity und ein Ticket kopiere, welches eine Buchungsnumer hat + addprefix, wird es dem SCRUM Leer zugeordnet statt dem mit addprefix trigger

Optional:
    - Grund dafür sind z.B. scrums, die eine #Buchungsnummer in der Tabelle haben - dafür aber kein ErkennungsItem mit gepflegter Activity
    - Hier kluge logik ausdenken - vllt möglichkeit activity in die Tabelle zu schreiben mit ::activity: oder so
