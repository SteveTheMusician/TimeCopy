export function firstStartDisplay() {
    console.log('started')
    // create allways reset button
    let testHtml = `<div id="firstStartScreen">
        <div class="StartScreen-container configuration-container">
            <div class="firstStartScreen-titleRow">
                <h2>Willkommen</h2>
            </div>
            <div class="firstStartScreen-discriptionBlock">
                <p>
                    Schön dich hier zu sehen.
                    </br>
                    In den Folgenden Schritten wirst du die Basics von Time Copy einrichten.
                    </br>
                    </br>
                    Gib hier einen Namen/Pseudonym für dein Profil an und lade ein Profilbild hoch.
                    </br>
                    Diese Angaben werden nur innerhalb von TimeCopy verwendet.
                </p>
            </div>
            <div class="configItem">
                <div class="configItem-content" id="startScreenContent">
                    
                </div>
            </div>
            <div class="firstStartScreen-stepContainer flex">
                <button class="button-primary button-normal" id="button_nextStartScreen">Weiter</button>
                <button class="button-primary" id="button_skipStartScreen">Alles überspringen</button>
            </div>
        </div>
        
    </div>`
    
    if (document.body && !sessionStorage.getItem('tc_c_messageProfileRemoved')) {
        document.body.insertAdjacentHTML('afterbegin',testHtml)
        document.getElementsByTagName('main')[0].style.opacity = "0"
        setTimeout(function(){
        },400)

    }
    setTimeout(function(){
        if(document.getElementById('firstStartScreen')){
            document.getElementById('button_skipStartScreen').addEventListener('click', () => closeStartScreen())
            let startScreenContent = document.getElementById('startScreenContent')
            // insert first content

        }
    },330)

}

function closeStartScreen(){
    document.getElementById('firstStartScreen').classList.add('firstStartScreen--remove')
    document.getElementsByTagName('main')[0].classList.add('main--fadeIn')
    setTimeout(function(){
        document.getElementById('firstStartScreen').remove()
        document.getElementsByTagName('main')[0].classList.remove('main--fadeIn')
    },1020)
    document.getElementsByTagName('main')[0].style.opacity = ""
    localStorage.setItem('tc_firstStart', 'done')
}