export function message(messageShow,messageType,messageTextOverview,messageTextDetails,blockApp){

    if(messageTextDetails === '' || !messageTextDetails){
        messageTextDetails = window.languag.message_noDetailsAvailable
    }

    let currentMessageID = new Date().getTime().toString()
    let messageSection = document.getElementById('messages-section')
    let messageInformationIconHtml = `<?xml version="1.0" encoding="utf-8"?>
                                        <svg version="1.1" xmlns:serif="http://www.serif.com/"
                                          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                          viewBox="0 0 1200 1200" style="enable-background:new 0 0 1200 1200;" xml:space="preserve">
                                          <circle cx="600" cy="216.1" r="108" />
                                          <path d="M676.4,463.7c19.5,19.5,31.6,46.5,31.6,76.4v443.8c0,59.6-48.3,108-108,108s-108-48.4-108-108V540.1c0-59.6,48.3-108,108-108C629.8,432.1,656.8,444.2,676.4,463.7z" />
                                        </svg>`
    let messageWarningIconHtml = `<?xml version="1.0" encoding="utf-8"?>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    	 viewBox="0 0 1000 1000" style="enable-background:new 0 0 1000 1000;" xml:space="preserve">
                                    <path d="M983.7,777.7L637.4,84.9C611.2,32.5,558.5,0,500,0S388.8,32.5,362.6,84.9L16.3,777.7c-24,48-21.5,103.9,6.7,149.5
                                    	s77,72.9,130.6,72.9h692.6c53.6,0,102.4-27.2,130.6-72.9S1007.6,825.6,983.7,777.7z M889.8,873.3c-4.5,7.3-17.8,24.3-43.5,24.3
                                    	H153.7c-25.8,0-39-17-43.5-24.3c-4.5-7.3-13.8-26.8-2.2-49.8L400,239.2v159.2c0,27.6,11.2,52.6,29.3,70.7
                                    	c18.1,18.1,43.1,29.3,70.7,29.3c55.2,0,100-44.8,100-100V239.2l292.1,584.3C903.6,846.5,894.3,866,889.8,873.3z"/>
                                    <circle cx="500" cy="697.9" r="100"/>
                                    </svg>`
    let messageErrorIconHtml = `<?xml version="1.0" encoding="UTF-8"?>
                                <svg id="Error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 765.68 765.69">
                                  <path d="m736.4,736.4c-19.53,19.53-45.12,29.29-70.71,29.29s-51.19-9.76-70.71-29.29l-212.13-212.13-212.03,212.02c-39.05,39.05-102.36,39.05-141.42,0-39.05-39.06-39.05-102.37,0-141.42l212.03-212.02L29.29,170.71c-39.05-39.05-39.05-102.36,0-141.42,39.05-39.05,102.37-39.05,141.42,0l212.14,212.14.11-.12c39.05-39.05,102.37-39.05,141.42,0,19.52,19.52,29.29,45.12,29.29,70.71s-9.77,51.19-29.29,70.71l-.11.12,212.13,212.13c39.05,39.05,39.05,102.37,0,141.42Z"/>
                                  <path d="m736.4,170.71c-39.06,39.06-102.37,39.06-141.42,0-39.06-39.05-39.06-102.36,0-141.42s102.36-39.05,141.42,0c39.05,39.06,39.05,102.37,0,141.42Z"/>
                                </svg>`

    let messageHTML = `<div class="message dFlex message--hidden configItem message-`+ (messageType) +`" id="message_`+ (currentMessageID) +`" title="Nachricht löschen.">
                            <div class="message-icon-container configItem-icon-container">
                                ` + ( messageType === 'information'? messageInformationIconHtml: messageType === 'warning'? messageWarningIconHtml : messageType === 'error'? messageErrorIconHtml : '' ) + `
                                
                            </div>
                            <div class="message-text-container">
                                <p class="text-label text-message text-message-overview">`+(messageTextOverview) +`</p>
                                <p class="subtext text-message text-message-details">`+(messageTextDetails) +`</p>
                            </div>  
                        </div>`
    
    messageSection.insertAdjacentHTML('beforeend', messageHTML)
    let thisMessageElement = document.getElementById('message_'+currentMessageID)
    thisMessageElement.addEventListener('click', closeMessage);
    thisMessageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if(messageShow) {
        let currentMessage = document.getElementById('message_'+currentMessageID)
        setTimeout(function(){
            currentMessage.classList.remove('message--hidden')
        },300)
    }
    if(blockApp){
        document.body.style.pointerEvents = 'none'
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