# Time Copy
#### V 0.8.9*
By Steve P.
start: 04.07.2023

## Inhalt

## Allgemein
Time Copy ist dazu gedacht, Zeitangaben aus Tabellen in andere bestimmte Plattformen zu übertragen.

## Shortcuts
> [!NOTE]
> **Time Copy öffnen/schließen**: [Windows] Strg+b [MacOS] Cmd+b


> [!TIP] Du kannst die Shortcuts in den Chrome-Einstellungen ändern
> chrome://extensions/shortcuts

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