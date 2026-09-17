import { debugStick } from "../../../utils/appDebugStick";

export function contextMenu(e,itemId,optionsObject,dNegative) {
    let x = e.clientX + "px"
    let y = e.clientY + "px"
    let optionsArray = []
    let detectionItem_contextMenu = document.getElementById('detectionItem_contextMenu')
    let detectionItem_contextMenuOverlay = document.getElementById('detectionItem_contextMenuOverlay')

    debugStick({x,y,itemId,optionsObject}, "Context Menu Props")

    function generateContextMenuItems (optionsObject) {
        Object.keys(optionsObject).forEach(function(key, index){
            // console.log('value',optionsObject[key])
            const contextMenuOptionHtml = '<div>'+optionsObject[key]+'</div>'
            optionsArray.push(contextMenuOptionHtml)
        })
    }

    function contextMenuOverlayShowhide() {
        if(window.contextMenuOpen) {
            detectionItem_contextMenuOverlay.style.display = "block"
            setTimeout(function(){
                detectionItem_contextMenuOverlay.style.opacity = "1"
            },10)
            detectionItem_contextMenuOverlay.addEventListener('click',() => {console.log('click');  window.contextMenuOpen = false; contextMenuOpenClose()})
        } else {
            detectionItem_contextMenuOverlay.style.opacity = "0"
            setTimeout(function(){
                detectionItem_contextMenuOverlay.style.display = ""
            },310)
        }
    }

    function contextMenuOpenClose (dNegative) {
        if(window.contextMenuOpen) {
            let contextMenuWidth = detectionItem_contextMenu.offsetWidth
            dNegative === true ? detectionItem_contextMenu.style.left = e.clientX  - contextMenuWidth + 20 + "px" :
            detectionItem_contextMenu.style.left = x
            detectionItem_contextMenu.style.top = y
            
            generateContextMenuItems(optionsObject)
            
            let optionsHtml = optionsArray.join("")
            let html = `<div class="configItem detectionItem-ContextMenu">`+optionsHtml+`</div>`
            
            if(document.querySelectorAll('.detectionItem-ContextMenu') !== null) {
                // clear item box, if some already exists
                detectionItem_contextMenu.innerHTML = ''
            }
            detectionItem_contextMenu.innerHTML += html
            setTimeout(function(){
                document.getElementById('detectionItem_contextMenu').classList.add('detectionItem_contextMenu-container--open')
                contextMenuOverlayShowhide()
            },10)
        } else {
            document.getElementById('detectionItem_contextMenu').classList.add('detectionItem_contextMenu-container--closing')
            setTimeout(function(){
                document.getElementById('detectionItem_contextMenu').classList.remove('detectionItem_contextMenu-container--open')
                document.getElementById('detectionItem_contextMenu').classList.remove('detectionItem_contextMenu-container--closing')
                contextMenuOverlayShowhide()
            })
        }
    }
    contextMenuOpenClose(dNegative)
}