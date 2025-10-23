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


!!!!
- Datum Stimmt nicht überein fix: Wenn Protime lahm ist, wird nach einem auto-klick das datum nicht erkannt. Da dann einen timer oder observer einbauen, wenn die auto klick funktion aktiv ist, sonst nicht
- wenn alle felder zum buchungs beginn gefüllt sind, weild er user die seite nicht aktualisiert hat -> mach ein clear. (aber nur im aller ersten start nach dem screen click)
- wenn eine activity einen value hat, im nächsten ticket aber keins zum selecten ist, muss dass erkannt werden.
ggf ein klick in einer der leeren selects oder durch das erkennen der leeren items einfach skippen egal ob value da oder nicht
!!!!



## Maintance updates
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