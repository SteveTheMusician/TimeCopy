export function firstStartDisplay() {

    let configWelcomeTitle = 'Willkommen'
    let configWelcomeText = ` <p>
                    Schön dich hier zu sehen.
                    </br>
                    In den Folgenden Schritten wirst du die Basics von Time Copy einrichten.
                    </br>
                    </br>
                    Gib hier einen Namen/Pseudonym für dein Profil an und lade ein Profilbild hoch.
                    </br>
                    Diese Angaben werden nur innerhalb von TimeCopy verwendet.
                    </p>`
    let configDesignTitle = 'Anpassen'
    let configDesignText = ` <p>
                Wähle ein Farbthema für Time Copy aus.
                </br>
                </br>
                Du kannst die Farbe, wie auch alle anderen Einstellungen
                </br>
                nacher noch in der App anpassen.
            </p>`
    let configFilterTitel = 'Filter auswählen'
    let configFilterText = ` <p>
                    Klicke den Filter an, welcher zu den Daten, die du kopierst, passt.
                    </br>
                    </br>
                    Time Copy muss zum Verarbeiten der daten, die aus der Zwischenablage kommen wissen,
                    </br>
                    wie diese gefiltert werden müssen.
                    </br>
                    </br>
                    Du kannst die Filter über den Pfeil rechts aufklappen um Informationen zu bekommen.
                    </p>`
    let configPlatformTitel = 'Platformen'
    let configPlatformText = ` <p>
                    Wo möchtest du deine Informationen einfügen?
                    </br>
                    Wenn du verschiedene Seiten benutzt oder nicht sicher bist, lass einfach "Automatisch" eingeschaltet.
                    </br>
                    </br>
                    Die Platform-DLCs verarbeiten alle Daten und fügen sie auf die jeweilige Seite ein.
                    </br>
                    Wenn du eine Platform ausgewählt hast, kann Time Copy nur mit dieser Seite operieren und für eine andere musst du
                    </br>
                    dann manuell die Platform ändern.
                    </br>
                    Automatich wählt hingegen eine Platform automatisch nach der Web-Url aus.
                    </br>
                    </br>
                    Informationen und zusätzliche Funktionen findest du unter dem Pfeil rechts eines platform-DLCs.
                    </p>`
    let configEndTitel = 'Wichtig!'
    let configEndText = ` <p>
                    Damit du loslegen kannst, gehe nach der Einrichtung bitte in die Einstellungen und
                    </br>
                   erstelle "Erkennungen" unter Erkennung (Augen-Icon).
                    </br>
                    </br>
                    Erkennungs-Parameter sortieren deine Informationen und leiten es
                    </br>
                    an die richtige Platform weiter.
                    </br>
                    </br>
                    Danach bist du ready to go!
                    </p>`

    let mainHtml = `<div id="firstStartScreen">
        <div class="StartScreen-container configuration-container">
            <div class="firstStartScreen-titleRow">
                <h2 id="startScreenTitle"></h2>
            </div>
            <div class="firstStartScreen-discriptionBlock" id="startScreenTextBlock" >
               <!-- text here -->
            </div>
            <div id="startScreenMain">
                <div class="configItem">
                    <div class="configItem-content" id="startScreenContent">

                    </div>
                </div>
            </div>
            <div class="firstStartScreen-stepContainer flex">
                <button class="button-primary button-normal" id="button_nextStartScreen">Weiter</button>
                <button class="button-primary" id="button_skipStartScreen">Alles überspringen</button>
            </div>
        </div>
        
    </div>`
    
    if (document.body && !sessionStorage.getItem('tc_c_messageProfileRemoved')) {
        document.body.insertAdjacentHTML('afterbegin',mainHtml)
        document.getElementsByTagName('main')[0].style.opacity = "0"
        setTimeout(function(){
        },400)

    }
    let nextCounter = 0
    setTimeout(function(){
        if(document.getElementById('firstStartScreen')){
            document.getElementById('button_skipStartScreen').addEventListener('click', () => closeStartScreen())
            document.getElementById('button_nextStartScreen').addEventListener('click', () => nextStartScreen())
           nextStartScreen()

        }
    },330)

    function nextStartScreen() {
        
        let startScreenTitle = document.getElementById('startScreenTitle')
        let startScreenTextBlock = document.getElementById('startScreenTextBlock')
        let startScreenContent = document.getElementById('startScreenContent')
        let startScreenMain = document.getElementById('startScreenMain')
        // get original elements
        let profile_picture = document.getElementById('profile_picture')
        let configProfileName = document.getElementById('configProfileName')
        let designThemes = document.getElementById('configItem-design-themes')
        let filterWindow = document.getElementById('window_timesheetfilters')
        let platformWindow = document.getElementById('window_bookingplatforms')

        if(nextCounter === 0){
            // insert first content
            startScreenTitle.innerHTML = configWelcomeTitle
            startScreenTextBlock.innerHTML = configWelcomeText
            startScreenContent.appendChild(profile_picture)
            startScreenContent.appendChild(configProfileName)
        }

        if(nextCounter === 1) {
            startScreenTitle.innerHTML = configDesignTitle
            startScreenTextBlock.innerHTML = configDesignText
            startScreenContent.innerHTML = ''
            startScreenContent.appendChild(designThemes)
        }

         if(nextCounter === 2) {
            startScreenTitle.innerHTML = configFilterTitel
            startScreenTextBlock.innerHTML = configFilterText
            startScreenContent.innerHTML = ''
            startScreenContent.parentNode.style.display = "none";
            startScreenMain.appendChild(filterWindow)
        }

        if(nextCounter === 3) {
            startScreenTitle.innerHTML = configPlatformTitel
            startScreenTextBlock.innerHTML = configPlatformText
            startScreenContent.innerHTML = ''
            startScreenMain.innerHTML = ''
            startScreenMain.appendChild(platformWindow)
        }

        if(nextCounter === 4) {
            startScreenTitle.innerHTML = configEndTitel
            startScreenTextBlock.innerHTML = configEndText
            startScreenMain.innerHTML = ''
            document.getElementById('button_skipStartScreen').style.display = 'none'
            document.getElementById('button_nextStartScreen').textContent = "Abschließen"
        }

        if(nextCounter === 5) {
            closeStartScreen()
        }
        nextCounter ++
    }
}

function closeStartScreen(){
    document.getElementById('firstStartScreen').classList.add('firstStartScreen--remove')
    document.getElementsByTagName('main')[0].classList.add('main--fadeIn')
    setTimeout(function(){
        document.getElementById('firstStartScreen').remove()
        document.getElementsByTagName('main')[0].classList.remove('main--fadeIn')
        localStorage.removeItem('tc_appVersion')
        window.location.reload()
    },1020)
    document.getElementsByTagName('main')[0].style.opacity = ""
    localStorage.setItem('tc_firstStart', 'done')
}