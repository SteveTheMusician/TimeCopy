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



## Maintance updates
- amagprotime module: text der click fläche ändern+ warnung
- security: 
    - pattern für alle inputs??
- auf latest node version
- Code clean up:
    - Local Storages vereinheitlichen
    - Funktionen / Listener zusammen fassen
- code clean up -> groß und kleinschreibung einheitlich, klassennamen und IDs einheitlich
    (Alles noch mal genau checken)
- Silver Fox Theme
- texte noch mal checken ggf als json strings in language
- app storages zu einem profile-object zusammenfassen, dass gleichzeitig 1zu1 exportiert werden kann
- Datum Stimmt nicht überein fix: Wenn Protime lahm ist, wird nach einem auto-klick das datum nicht erkannt. -> Funktion ist experimentell daher in zukunft ggf ein Observer einbauen