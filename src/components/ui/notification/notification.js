export function notification(notificationShow, notificationStatus, notificationText) {
    let main = document.getElementsByTagName('main')[0]
    let notificationHTML = `<div class="notification flex notification--hidden" id="notification">
                                <p class="text-label text-notification" id="notification-text"></p>
                                <button class="button-primary" id="button_close-notification" title="PopUp schließen.">
                                    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
                                    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                                    <svg width="100%" height="100%" viewBox="0 0 1000 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                                        <g transform="matrix(0.924519,-0.924519,0.924519,0.924519,-424.346,499.846)">
                                            <path id="addsmooth_path" d="M999.7,500.2C999.7,525 989.6,547.5 973.4,563.7C957.1,580 934.7,590 909.9,590L588.6,590L588.6,909.8C588.6,959.4 548.4,999.7 498.7,999.7C473.9,999.7 451.4,989.6 435.2,973.4C418.9,957.1 408.9,934.7 408.9,909.9L408.9,590.1L89.9,590.1C40.2,590.1 0,549.8 0,500.2C0,475.4 10.1,452.9 26.3,436.7C42.6,420.4 65,410.4 89.8,410.4L408.8,410.4L408.8,89.8C408.8,40.2 449,-0.1 498.7,-0.1C523.5,0 546,10 562.2,26.3C578.5,42.6 588.5,65 588.5,89.8L588.5,410.4L909.8,410.4C959.5,410.4 999.7,450.6 999.7,500.2Z" style="fill-rule:nonzero;"/>
                                        </g>
                                    </svg>
                                </button>
                            </div>`
    if(!document.getElementById('notification')) {
        main.insertAdjacentHTML('beforeend', notificationHTML);
    }                        
    let notification = document.getElementById('notification')
    let text_notification = document.getElementById('notification-text')
    if (notificationShow === true) {
        text_notification.innerHTML = notificationText
        if (notificationStatus) {
            notification.classList.add('notification--ok')
            autoHideNotification_timerDefault(notification,notificationShow,notificationText)
        } else {
            notification.classList.remove('notification--ok')
            autoHideNotification_timerError(notification,notificationShow,notificationText)
        }
        setTimeout(function () {
            notification.classList.remove('notification--hidden')
        }, 300)
    } else if (notificationShow === false || notificationShow === null) {
        setTimeout(function () {
            notification.classList.add('notification--hidden')
        }, 300)
    }
    let button_notificationClose = document.getElementById('button_close-notification')
    button_notificationClose.addEventListener('click', function () {
        hideNotification(notification,notificationShow,notificationText)
    })
}

function hideNotification(notification,notificationShow,notificationText){
    notification.classList.add('notification--hidden')
    notificationShow = false
    notificationText = null
}

function autoHideNotification_timerDefault(notification,notificationShow,notificationText) {
    setTimeout(function(){
        hideNotification(notification,notificationShow,notificationText)
    },3000)
}

function autoHideNotification_timerError(notification,notificationShow,notificationText) {
    setTimeout(function(){
        hideNotification(notification,notificationShow,notificationText)
    },4500)
}