import { debugStick } from "../../../utils/appDebugStick";
import { eventListenerHandler } from '../../../utils/functionHandlers';

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
            const contextMenuOptionHtml = '<button id="contextOption_'+optionsObject[key].id+'" class="button-primary button-contextOptions" '+optionsObject[key].disabled+'>'+optionsObject[key].label+'</button>'
            optionsArray.push(contextMenuOptionHtml)
        })
    }

    function contextMenuOverlayShowhide() {
        if(window.contextMenuOpen) {
            detectionItem_contextMenuOverlay.style.display = "block"
            setTimeout(function(){
                detectionItem_contextMenuOverlay.style.opacity = "1"
            },10)
            detectionItem_contextMenuOverlay.addEventListener('click',() => {window.contextMenuOpen = false; contextMenuOpenClose()})
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
            const contextMenuMaxWidth = 200
            const contextMenuMinWidth = 80
            // contet menu max and min width
            if(contextMenuWidth > contextMenuMaxWidth) {
                contextMenuWidth = contextMenuMaxWidth
            } else if (contextMenuWidth < contextMenuMinWidth) {
                contextMenuWidth = contextMenuMinWidth
            }
            console.log('width: ',contextMenuWidth)
            dNegative === true ? detectionItem_contextMenu.style.left = (e.clientX - contextMenuWidth + 20)  + "px" :
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
            let allEnabledOptions = document.querySelectorAll('.button-contextOptions:not(:disabled)')
            eventListenerHandler(allEnabledOptions,'click',(e) => {clickOption(e)})
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
    function clickOption(e) {
        console.log('click ',e.target.id)
        window.contextMenuOpen = false; 
        contextMenuOpenClose()
        return e.target.id
    }
}