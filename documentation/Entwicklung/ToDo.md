# ToDo

### Features & Fixes für die Zukunft
 
- sprache in modules und html integrieren
- eigene farbthemen importieren/ generieren
- willkommens screen mit anleitung (✅)
- detectionItems von den platformen rendern
- Firefox & Opera Version
- Generell mehr dynamisches html
- module: stevegoogleexcel - fixen: wenn datum und zusatzzeichen kopiert werden, kann in bestimmten fällen nicht richtig gefiltert werden - ohne schon
- Yosha Update: im Ticketname akzeptiert Leere Ticketnummer bzw Tickets ohne Nummer / Tobias Excel FIlter anpassen 
(GGF eigenes Module Nötig)
- app storages zu einem profile-object zusammenfassen, dass gleichzeitig 1zu1 exportiert werden kann
- feature: fehlermeldung bei erstellen identischer detection items (oder text: ist identisch mit ...)


## Maintance updates
- security: 
    - Pattern für Eingabe Felder (Sonderzeichen nicht erlauben ausser z.B. * in Filter)
- ee themes: notifications anpassen (style)
- Node version checken ggf updaten

- Wenn Ticket bereits gebucht soll dieser übersprungen werden (Kann schwer bzw unmöglich sein, da diese Infos in protime nicht genau bekommen werden können - ticketnummer nich da, beschreibung nur teilweise)

---------- Silver Fox Update -----------
- Dokumentation
    - Alle Details Pflegen
    - Technische Details
    - Beispiel Profil

- Oktober Module (Kürbis und blätter)
- Code clean up:
    - Local Storages vereinheitlichen
    - Funktionen / Listener zusammen fassen
- code clean up -> groß und kleinschreibung einheitlich, klassennamen und IDs einheitlich
    (Alles noch mal genau checken)
- Silver Fox Theme
- texte überarbeiten
- "Inventierte" Farbthemen (Strawberry Icecream ect)


--- done ---

- ✅ message auf toast umbenennen
- ✅ fix app reset error ggf schließe app (message)
- ✅ fix: changeDetectionProjectName is not defined - wenn nur keine items vorhanden und ein neues erstellt wird
- ✅ feature: wenn z.b. detections erstellt werden müssen, werden die buttons/der weg zu den einstellungen rot umrandet
- ✅ profil bild wird nicht importiert/export -> checken 
- ✅ Automatisch Url-Zuweisung checken
- ✅ Module configs in profil speichern
- ✅ Status bar timing verbessern,
- ✅ Notification timing verbessern (manchmal bleiben errors mit hidden hängen wenn 3 oder mehr nachrichten gleichzeitig erscheinen)
- ✅ detection items modular machen (acuh für any notwändig)


- ✅detection items objects verschachteln (content wie amag protime wird zum extra object) und benennungen ggf verbessern
    !! Achtung Profile Import und export muss dann auch angepasst werden
    - ggf deci id prefix ändern und beim generieren checken ob neu oder alt. wenn alt dann importiere die objecte und convertiere sie

- ✅ alte profil imports comaptibility aufbauen (namings der variabeln sind noch auf dlc) oder funktion skippen (cuz dl wurde glaube nicht verwendet oder einfach compatibiliyt nur auf v3 lassen)
- ✅ update mit eigenem profil nach beendigung testen
- ✅ 1-Ticket Meldung fixen, wenn z.B. 16 übertragen werden, einer aber ein retry war