import { highLatency } from "../../../module/platforms/AmagProTime/variables/AmagProTime.variables";

export function contextMenu(e,itemId,optionsObject) {
    let x = e.clientX
    let y = e.clientY
    let optionsArray = []

    console.log('passed data', x, y, itemId, optionsObject)

    Object.keys(optionsObject).forEach(function(key, index){
        console.log('value',optionsObject[key])
        const contextMenuOptionHtml = '<div>'+optionsObject[key]+'</div>'
        optionsArray.push(contextMenuOptionHtml)
    })
    let optionsHtml = optionsArray.join("")
    const html = '<div class="detectionItem-ContexMenu">'+optionsHtml+'</div>'
    if(!document.getElementById('detectionItem_contexMenu').classList.contains('detectionItem_contexMenu-container--open')) {
        document.getElementById('detectionItem_contexMenu').innerHTML += html
        document.getElementById('detectionItem_contexMenu').classList.add('detectionItem_contexMenu-container--open')
        return html
    } else {
        document.getElementById('detectionItem_contexMenu').classList.remove('detectionItem_contexMenu-container--open')
        setTimeout(function(){
            document.getElementById('detectionItem_contexMenu').innerHTML = ''
        },300)
        setTimeout(function(){
            document.getElementById('detectionItem_contexMenu').innerHTML += html
            document.getElementById('detectionItem_contexMenu').classList.add('detectionItem_contexMenu-container--open')
        },400)
    }

}