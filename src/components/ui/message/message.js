import { generateDateId } from "../../../utils/generateDateId"
import { setStatusBarText } from "../../../utils/setStatusBarText"
import { notificationErrorIconHtml,notificationWarningIconHtml,notificationInformationIconHtml } from "../notificationIcon/notificationIcon.js"

export function message(messageShow,messageType,messageTextOverview,messageTextDetails,blockApp){

    if(messageTextDetails === '' || !messageTextDetails){
        messageTextDetails = window.language.message_noDetailsAvailable
    }

    if(!messageType || messageType === '') {
        messageType = 'information'
    }

    if(messageType === 'error' && !blockApp) {
        setStatusBarText(window.language.statusbartext_stby,'timeout')
    }

    let currentMessageID = generateDateId()
    let messageSection = document.getElementById('messages-section')
    let messageHTML = `<div class="message dFlex message--hidden configItem message-`+ (messageType) +`" id="message_`+ (currentMessageID) +`" title="Nachricht löschen.">
                            <div class="icon-container message-icon-container configItem-icon-container">
                                ` + ( messageType === 'information'? notificationInformationIconHtml: messageType === 'warning'? notificationWarningIconHtml : messageType === 'error'? notificationErrorIconHtml : '' ) + `
                                
                            </div>
                            <div class="message-text-container">
                                <p class="text-label text-message text-message-overview">${messageTextOverview}</p>
                                <p class="subtext text-message text-message-details">${messageTextDetails}</p>
                            </div>  
                        </div>`
    
    messageSection.insertAdjacentHTML('beforeend', messageHTML)
    let thisMessageElement = document.getElementById('message_'+currentMessageID)
    thisMessageElement.addEventListener('click', closeMessage);
    thisMessageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    if(messageSection.children.length > 20) {
        messageSection.firstElementChild.remove()
    }

    if(messageShow) {
        let currentMessage = document.getElementById('message_'+currentMessageID)
        setTimeout(function(){
            currentMessage.classList.remove('message--hidden')
        },300)
    }

    if(blockApp){
        document.body.style.pointerEvents = 'none'
        setStatusBarText(window.language.statusbartext_stby)
    }
}

function closeMessage(e){
    let thisMessageId = e.target.closest(".message").id
    let thisMessage = document.getElementById(thisMessageId)
    thisMessage.classList.add('message--hiddenremove')
    setTimeout(function(){
        thisMessage.remove()
    },400)
}