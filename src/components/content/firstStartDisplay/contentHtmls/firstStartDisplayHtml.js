    export const configWelcomeTitle = 'Willkommen'
    export const configWelcomeText = ` <p>
                    Schön dich hier zu sehen.
                    </br>
                    In den folgenden Schritten wirst du die Basics von Time Copy einrichten.
                    </br>
                    </br>
                    Gib hier einen Namen/Pseudonym für dein Profil an und lade ein Profilbild hoch.
                    </br>
                    Diese Angaben werden nur innerhalb von TimeCopy verwendet.
                    </p>`
    export const configDesignTitle = 'Anpassen'
    export const configDesignText = ` <p>
                Wähle ein Farbthema für Time Copy aus.
                </br>
                </br>
                Du kannst die Farbe, wie auch alle anderen Einstellungen
                </br>
                nacher noch in der App anpassen.
            </p>`
    export const configFilterTitel = 'Filter auswählen'
    export const configFilterText = ` <p>
                    Klicke den Filter an, welcher zu den Daten, die du kopierst, passt.
                    </br>
                    </br>
                    Time Copy muss zum Verarbeiten der Daten, die aus der Zwischenablage kommen wissen,
                    </br>
                    wie diese gefiltert werden müssen.
                    </br>
                    </br>
                    Du kannst die Filter über den Pfeil rechts aufklappen um Informationen zu bekommen.
                    </p>`
    export const configPlatformTitel = 'Platformen'
    export const configPlatformText = ` <p>
                    Wo möchtest du deine Informationen einfügen?
                    </br>
                    Wenn du verschiedene Seiten benutzt oder nicht sicher bist, lass einfach "Automatisch" eingeschaltet.
                    </br>
                    </br>
                    Die Platform-Module verarbeiten alle Informationen und fügen sie auf die jeweilige Seite ein.
                    </br>
                    Wenn du eine Platform ausgewählt hast, kann Time Copy nur mit dieser Seite operieren und für eine andere musst du
                    </br>
                    dann manuell die Platform ändern.
                    </br>
                    Automatich wählt hingegen eine Platform automatisch nach der Web-Url aus.
                    </br>
                    </br>
                    Informationen und zusätzliche Funktionen findest du unter dem Pfeil rechts eines Platform-Modules.
                    </p>`
    export const configEndTitel = 'Wichtig!'
    export const configEndText = ` <p>
                    Damit du loslegen kannst, gehe nach der Einrichtung bitte in die Einstellungen und
                    </br>
                   erstelle "Erkennungen" unter Erkennung (Auge-Icon).
                    </br>
                    </br>
                    Erkennungs-Parameter sortieren deine Informationen und leiten es
                    </br>
                    an die richtige Platform weiter.
                    </br>
                    </br>
                    Danach bist du ready to go!
                    </p>`

    export const mainHtml = `<div id="firstStartScreen">
        <div class="StartScreen-container configuration-container">
            <div class="firstStartScreen-titleRow">
                <h2 id="startScreenTitle"></h2>
            </div>
            <div class="firstStartScreen-descriptionBlock" id="startScreenTextBlock" >
               <!-- text here -->
            </div>
            <div id="startScreenMain">
                <div class="configItem">
                    <div class="configItem-content" id="startScreenContent">
                        <!-- Dynamic Content here-->
                    </div>
                </div>
            </div>
            <div class="firstStartScreen-stepContainer flex">
                <button class="button-primary button-normal" id="button_nextStartScreen">Weiter</button>
                <button class="button-primary" id="button_skipStartScreen">Alles überspringen</button>
            </div>
        </div>
    </div>`
