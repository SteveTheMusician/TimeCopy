export function setStatusBarText(statusText,state) {

        let defaultText = "Bereit"
        let statusTextElem = document.getElementById('statusBarStatusText')

        if(statusTextElem.innerHTML !== defaultText && state !== 'reset') {
            setTimeout(function(){
                statusTextElem.innerHTML = statusText
            },300)
        } else {
            statusTextElem.innerHTML = statusText
        }

        if(state === 'timeout') {
            setTimeout(function(){
                statusTextElem.innerHTML = defaultText
            },900)
        }
        if(state === 'reset') {
            statusTextElem.innerHTML = defaultText
        }
}