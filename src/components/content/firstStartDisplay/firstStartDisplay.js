import { configWelcomeTitle,configWelcomeText,configDesignTitle,configDesignText,configFilterTitel,configFilterText,
    configPlatformTitel,configPlatformText,configEndTitel,configEndText,mainHtml
  } from "./contentHtmls/firstStartDisplayHtml";
export function firstStartDisplay() {
    
    if (document.body && !sessionStorage.getItem('tc_c_messageProfileRemoved')) {
        document.body.insertAdjacentHTML('afterbegin',mainHtml)
        document.querySelectorAll('.main-window').forEach(elem => {
            elem.style.opacity = '0'
        });
        // document.getElementsByTagName('main')[0].style.opacity = "0"
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
    document.querySelectorAll('.main-window').forEach(elem => {
            elem.classList.add('main--fadeIn')
        });
    setTimeout(function(){
        document.getElementById('firstStartScreen').remove()
        document.querySelectorAll('.main-window').forEach(elem => {
            elem.classList.remove('main--fadeIn')
        });
        localStorage.removeItem('tc_appVersion')
        window.location.reload()
    },1020)
    document.querySelectorAll('.main-window').forEach(elem => {
            elem.style.opacity = ''
        });
    localStorage.setItem('tc_firstStart', 'done')
}