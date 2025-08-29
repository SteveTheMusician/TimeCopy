# ToDo

### Features & Fixes für die Zukunft
 
- sprache in dlcs und html integrieren
- eigene farbthemen importieren/ generieren
- willkommens screen mit anleitung
- detectionItems von den platformen rendern
- Firefox & Opera Version
- Generell mehr dynamisches html
- dlc: stevegoogleexcel - fixen: wenn datum und zusatzzeichen kopiert werden, kann in bestimmten fällen nicht richtig gefiltert werden - ohne schon
- Yosha Update: im Ticketname akzeptiert Leere Ticketnummer bzw Tickets ohne Nummer / Tobias Excel FIlter anpassen 
(GGF eigenes Module Nötig)

- feature: wenn z.b. detections erstellt werden müssen, werden die buttons/der weg zu den einstellungen rot umrandet
- feature: amag protime dlc: warnung bei doubled tickets
- texte überarbeiten
- dlc: amagprotime: feedback wenn low latency auf grund von problemen aktiviert wird ❓
- "Inventierte" Farbthemen (Strawberry Icecream ect)
- Module configs in profil speichern
- code clean up -> groß und kleinschreibung einheitlich, klassennamen und IDs einheitlich
- app storages zu einem profile-object zusammenfassen, dass gleichzeitig 1zu1 exportiert werden kann
- dlc amagProTime: ProTime services updaten (aktuell gibt es nur 3) - ggf standard variabeln dafür machen und dynamishc rendern

-dlc amag protime: wenn inputs on first start noch values haben lösche alle und dann starten

## Maintance updates
- security: 
    - Pattern für Eingabe Felder (Sonderzeichen nicht erlauben ausser z.B. * in Filter)
- ee themes: notifications anpassen (style)
- Node version checken ggf updaten
- Code clean up:
    - Local Storages vereinheitlichen
    - Funktionen / Listener zusammen fassen
- Dokumentation
    - Alle Details Pflegen
    - Technische Details
    - Beispiel Profil

- Status bar timing verbessern,
- Notification timing verbessern (manchmal bleiben errors mit hidden hängen wenn 3 oder mehr nachrichten gleichzeitig erscheinen)
- detection items modular machen (acuh für any notwändig)

- Wenn Ticket bereits gebucht soll dieser übersprungen werden
- profil bild wird nicht importiert/export -> checken
-detection items objects verschachteln (content wie amag protime wird zum extra object) und benennungen ggf verbessern
    !! Achtung Profile Import und export muss dann auch angepasst werden
    - ggf deci id prefix ändern und beim generieren checken ob neu oder alt. wenn alt dann importiere die objecte und convertiere sie

- alte profil imports comaptibility aufbauen (namings der variabeln sind noch auf dlc) oder funktion skippen (cuz dl wurde glaube nicht verwendet oder einfach compatibiliyt nur auf v3 lassen)

- Oktober Module (Kürbis und blätter)

    update mit eigenem profil nach beendigung testen