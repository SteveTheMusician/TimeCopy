# Time Copy
#### V 0.9.1*
By Steve P.
start: 04.07.2023

## Allgemein
Time Copy ist dazu gedacht, Zeitangaben aus Tabellen in andere bestimmte Plattformen zu übertragen.

## Kurzeinweisung
- Öffne die Extension und gehe in die Einstellungen.
- 👁️ **Erkennungs-Items** : Ertselle hier neue Erkennungsmerkmale.
- ▽ **Timesheet Filter** : Wähle aus, welche Excel-Tabelle / Input-Daten du selbst verwendest.
Diese dienen dazu, deine Daten richtig zu zu ordnen und anschließend Buchen zu können.
Wähle unte
- 📆 **Buchungsplattform** : Sagt dem PlugIn, auf welche Seite/Programm diene Daten eingefügt werden. Hier finden die essenziellen Buchungs-Funktionen statt.

> [!TIP] Um Änderungen zu übernehmen, klicke nach einem Change einfach auf den Zurück-Button oben Links oder Re-Open das PlugIn

## Shortcuts
> [!NOTE]
> **Time Copy öffnen/schließen**: [Windows] Strg+b [MacOS] Cmd+b

Du kannst die Shortcuts in den Chrome-Einstellungen ändern.
chrome://extensions/shortcuts

## Plugin aus Git in Chrome importieren
- Git Projekt clonen
- Das Projekt in den "test_version"-Branch auschecken (Stand 16.08.2024)
- In Chrome oder Brave-Browser in die Erweiterungs-Einstellungen (chrome://extensions/) gehen und dort
  oben "Entwicklermodus" einschalten.
- Auf "Entpackte Erweiterung laden" klicken, in den geklonten Ordner navigieren und anschließend
  in den "extension" Ordner gehen und diesen auswählen.
- PlugIn erschein - ggf einschalten
- Oben rechts im Browser auf das PlugIn Icon klicken und PlugIn über das Pin-Icon anpinnen
- Nun ist es per one-klick errreichbar.
- Über das Shortcut "Strg+b" oder "cmd+b" kann es geöffnet bzw geschlossen werden

## Plugin aus Chrome entfernen
- In den Erweiterungs-Einstellungen das plugin aufsuchen und über den kleinen Switch ausschalten.
- Wenn du es komplett entfernen willst, dann auf den großen Button "Entfernen" in der 
  angezeigten Kachel klicken

## Time Copy Berechtigungen
- <b>clipboardRead</b> : Daten die du am Rechner über die Kopieren-Funktion kopiert hast,  
                  kann das Plugin beim klicken auf Einfügen oder Test-Funktion lesen
- <b>storage</b> : Um deine Einstellungen zu speichern/exportieren, 
            wird der Zugriff auf dein Browser-Storage benötigt (localStorage und SessionStorage)
- <b>declarativeContent</b> : Erlaubt Time Copy das lesen deiner Web-URL, 
                       damit diese z.B. automatisch erkennen kann, ob du dich auf der richtigen Buchungsseite befindest (Plattform: automatisch) 
- <b>activeTab</b> : Erlaubt dem Plugin deinen Aktiven Tab zu leses, um z.B. die Zeiten auf einer Webseite einzutragen.
- <b>scripting</b> : Erlaubt das Ausführen von Scripts auf Webseiten, die du in deinem aktuellen Tab offen hast.
- <b>sidePane</b> : Dadurch kann das PlugIn als Side-Window angezeigt werden.

## Hilfe
Für detailierte Hilfe findest du Hier:
https://github.com/EmptySoulOfficial/TimeCopy/blob/main/documentation/Help.pdf

## Reporting
Bei Anfragen oder Bug-Reports kannst du dich an folgende E-Mail wenden:
steveemptysoul.official@gmail.com

## Node Version
V.20.11.0