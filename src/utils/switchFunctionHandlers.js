export function showHideStatusBar(showHideState,appGlobalArgs) {
  if(showHideState) {
    appGlobalArgs.elem_statusBar.classList.remove('statusBar--hidden')
  }else {
    appGlobalArgs.elem_statusBar.classList.add('statusBar--hidden')
  }
}

export function changeAppFontSize(rangeValue, appGlobalArgs) {

  let h1Elem = appGlobalArgs.elem_h1
  let h2Elements = appGlobalArgs.elems_h2

  if(rangeValue === '0') {
    h1Elem.classList.remove('font-large')
    h1Elem.classList.remove('font-xLarge')
    for (let index = 0, elemLength = h2Elements.length; index < elemLength; index ++) {
      h2Elements[index].classList.remove('font-large')
      h2Elements[index].classList.remove('font-xLarge')
    }
  }
  if(rangeValue === '1') {
    h1Elem.classList.add('font-large')
    for (let index = 0, elemLength = h2Elements.length; index < elemLength; index ++) {
      h2Elements[index].classList.add('font-large')
    }
  }
  if(rangeValue === '2') {
    h1Elem.classList.add('font-xLarge')
    for (let index = 0, elemLength = h2Elements.length; index < elemLength; index ++) {
      h2Elements[index].classList.add('font-xLarge')
    }
  }

}