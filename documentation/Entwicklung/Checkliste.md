# Checkliste bei neuen Änderungen in TimeCopy

## Version Update
- mainfest.json -> Version
- version.json -> Version, Build-version, Overview- & Details-Text 
- package.json -> Version
- package.lock.json -> version 2x
- alle letzte Versionsnummer muss immer eine "1" sein
- updateHelper in den Utils checken und Funktionen ggf umschreiben

## Documentation
- documentation -> version, updates
- changelog

## Build
- über npm run build, die Extension bauen und dann mit strg+c terminal stoppen
- inhalt des "dist"-Ordners in zip verpacken

## upload
- Beim verpacken in zip darauf achten, dass keine anderen Fremd-Dateien enthalten sind (wie z.B. Mac-Hidden-Files)