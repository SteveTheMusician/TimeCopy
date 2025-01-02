# Time Copy
#### V 0.9.8*
By Steve Pietrowski / EmptySoul
</br>
04.07.2023

## Benutzerinformationen

### Allgemein
Time Copy ist dazu gedacht, den Workflow zum Buchen der Zeiten 
bei verschiedenen Kunden zu erleichtern.
Als Nutzer kann man so Zeit-Informationen aus z.B. einer Excel-Tabelle
in einem Online-Formular (Web-Platform) per "Copy Paste" übertragen.

### Download Chrome Store
https://chromewebstore.google.com/detail/time-copy/gdjoddopmbcdgginieddfecabkhfidbf

### Kurzeinweisung
- Installiere die Extension entweder via Chrome Store oder importiere es als Git-Projekt
- Öffne die Extension und gehe in die Einstellungen.
- **_Allgemein_** : Allgemeine Einstellungen, wie z.B. Design-Auswahl.
- **_Erkennungs-Items_** : Ertselle hier neue Erkennungsmerkmale.
- **_Timesheet Filter_** : Wähle aus, welche Excel-Tabelle / Input-Daten du selbst verwendest.
Diese dienen dazu, deine Daten vom Clipboard richtig zu zu ordnen bzw. zu filtern.
- **_Buchungsplatform_** : Sagt dem PlugIn, auf welche Seite / Programm diene Daten eingefügt / verarbeitet werden.
(Automatisch wählt Buchungsplatformen nach der Web-Url aus)

> [!TIP] 
> Um Änderungen zu übernehmen, klicke nach einem Change einfach auf den Zurück-Button oben Links oder öffne das PlugIn erneut

### Shortcuts


- Time Copy öffnen / schließen (Windows): Strg+b
- Time Copy öffnen / schließen (MacOS): Cmd+b

> [!TIP] 
> Du kannst die Shortcuts in den Chrome-Einstellungen ändern.
> chrome://extensions/shortcuts

### Plugin aus Git in Chrome importieren
- Git Projekt clonen
- Das Projekt in den gewünschten Branch auschecken.
- In Chrome oder Brave-Browser in die Erweiterungs-Einstellungen (chrome://extensions/) gehen und dort
  oben "Entwicklermodus" einschalten.
- Auf "Entpackte Erweiterung laden" klicken, in den geklonten Ordner navigieren und anschließend
  in den Ordner "dist" gehen und diesen auswählen.
- Extension erscheint in Chrome
- Oben rechts im Browser auf das PlugIn Icon klicken und PlugIn über das Pin-Icon anpinnen
- Nun ist es per One-Klick erreichbar.
- Über das Shortcut "Strg+b" oder "cmd+b" kann es geöffnet bzw geschlossen werden

### Plugin aus Chrome entfernen
- In den Erweiterungs-Einstellungen das Plugin aufsuchen und über den kleinen Switch ausschalten.
- Wenn du es komplett entfernen willst, klicke auf den großen Button "Entfernen" in der 
  angezeigten Kachel.

### Time Copy Berechtigungen
- <b>clipboardRead</b> : Daten die du am Rechner über die Kopieren-Funktion kopiert hast,  
                  kann das Plugin beim klicken auf Einfügen oder Test-Funktion lesen
- <b>storage</b> : Um deine Einstellungen zu speichern/exportieren, 
            wird der Zugriff auf dein Browser-Storage benötigt (localStorage und SessionStorage)
- <b>activeTab</b> : Erlaubt dem Plugin deinen Aktiven Tab zu leses, um z.B. die Zeiten auf einer Webseite einzutragen.
- <b>scripting</b> : Erlaubt das Ausführen von Scripts auf Webseiten, die du in deinem aktuellen Tab offen hast.
- <b>sidePane</b> : Dadurch kann das PlugIn als Side-Window angezeigt werden.

### Dokumentation
Detailierte Informationen findest du hier:
https://github.com/EmptySoulOfficial/TimeCopy/blob/main/accesories/documentation/TimeCopy-Dokumentation.pdf

### Lizens (EN)
https://github.com/EmptySoulOfficial/TimeCopy/blob/main/LICENSE.md

### Reporting
Bei Anfragen, Bedenken oder Bug-Reports kannst du dich an folgende E-Mail wenden:
steveemptysoul.official@gmail.com

## Technische Informationen

### Node Version
Empfohlen: V 20.11.0

### Packages Installieren
npm i

### Build / Run
npm run build

Npm run build läuf in Produktions-Modus zusammen mit einem Watcher. 
Solange dieser aktiv ist, werden alle Änderungen aus "src" oder "public" erfasst.
Wenn du nur die App bauen möchtest, kannst du nach erfolgreichem "Compiled", den Prozess einfach mit Strg+C beenden.

Die Extension an sich kann über den "dist" Ordner in Chrome reingeladen werden.

### Bekannte Fehlermeldungen

- "Unexpected token '??='" im Build-Prozess: 
  Es wird eine zu alte Node-version für den Build verwendet.
  Stelle die Node-version auf die oben empfohlene.