export function contexMenu(event,itemId,optionsObject) {
    let e = event
    console.log('x = ',e.clientX)
    const html = '<div class="detectionItem-ContexMenu">Test</div>'
    console.log('menu clicked',itemId)
    document.getElementById('detectionItem_contexMenu').innerHTML += html
    document.getElementById('detectionItem_contexMenu').classList.add('detectionItem_contexMenu-container--open')
    return html
}