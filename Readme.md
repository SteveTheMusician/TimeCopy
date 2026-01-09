# Time Copy
#### V 1.3.XX (Sidebar Version)
By Steve Pietrowski / EmptySoul
</br>
04.07.2023 - 01.2026

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
https://github.com/SteveTheMusician/TimeCopy/blob/main/documentation/TimeCopy-Dokumentation.pdf

### Changelog
https://github.com/SteveTheMusician/TimeCopy/blob/main/documentation/Changelog.md

### Datenschutz
https://github.com/SteveTheMusician/TimeCopy/blob/main/documentation/Datenschutz/Datenschutz.md

### Lizens (EN)
https://github.com/SteveTheMusician/TimeCopy/blob/main/LICENSE

### Downloads

#### Test Profile
Profil-Dateien zum selbst anpassen, weiter entwickeln oder Testen.
Importierbar über den Einstellungspunkt "Import" im Profilbereich unter
Einstellungen.

- [Profile V1.1](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Test-Profiles/timecopy-profile_V1.1.tcprofile)
- [Profile V1.2](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Test-Profiles/timecopy-profile_V1.2.tcprofile)
- [Profile V1.3](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Test-Profiles/timecopy-profile_V1.3.tcprofile)
- [Profile V1.6-2024](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Test-Profiles/timecopy-profile_V1.6-2024.tcprofile)
- [Profile V1.7](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Test-Profiles/timecopy-profile_V1.7.tcprofile)
- [Profile V1.8](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Test-Profiles/timecopy-profile_V1.8.tcprofile)
- [Profile V2.0](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Test-Profiles/timecopy-profile_V2.0.TCP1)
- [Profile V2.1](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Test-Profiles/timecopy-profile_V2.1.TCP1)
- [Profile V2.1 (Encodced)](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Test-Profiles/timecopy-profile_V2.1(Encoded).TCP1)

#### Time Copy Chrome Extension (als Datei)
- [Time Copy V 0.9.63 (Chrome)](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Extensions/Chrome/Time-Copy-Chrome-V0.9.63.crx)
- [Time Copy V 0.9.81 (Chrome)](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Extensions/Chrome/Time-Copy-Chrome-V0.9.81.crx)

#### Time Copy Chrome Extension Builds (Compiled Code als Zip)
- [Time Copy V 0.9.62 (Chrome)](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Builds/Chrome/TimeCopy_V0.9.62.zip)
- [Time Copy V 0.9.63 (Chrome)](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Builds/Chrome/TimeCopy_V0.9.63.zip)
- [Time Copy V 0.9.80 - Not Released (Chrome)](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Builds/Chrome/TimeCopy_V0.9.80_NotReleased.zip)
- [Time Copy V 0.9.81 (Chrome)](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Builds/Chrome/TimeCopy_V0.9.81.zip)
- [Time Copy V 1.0.00 (Chrome)](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Builds/Chrome/TimeCopy_V1.0.00.zip)
- [Time Copy V 1.0.21 (Chrome - Old but most stable)](https://github.com/SteveTheMusician/TimeCopy/blob/main/downloads/Builds/Chrome/TimeCopy_V1.0.21.zip)

### Reporting
Bei Anfragen, Bedenken oder Bug-Reports kannst du dich an folgende Adressen wenden

- E-Mail-Adresse: [contact@emptysoul.de](mailto:contact@emptysoul.de)
- Bugs/Probleme melden: [Issues auf Github](https://github.com/SteveTheMusician/TimeCopy/issues)

## Technische Informationen

### Unterstützte Profil-Versionen
- *.tcprofile V 1.6
- *.tcprofile V 1.7
- *.tcprofile V 1.8
- *.tcprofile V 1.9 / 2.0

### Node Version
Empfohlen: V 22.16.0

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
  Stelle die Node-Version auf die oben empfohlene.
- Vulnerabilities nach dem Ausführen von "npm i":
  Zum fixen der Findings, mit der empfohlenen Node-Version "npm audit fix" ausführen.
