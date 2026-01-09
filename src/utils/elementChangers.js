import { buttonTabPreValue } from "./defaults/defaultVariables"

export function showHideStatusBar(showHideState,appGlobalArgs) {
  if(showHideState) {
    appGlobalArgs.elem_statusBar.classList.remove('statusBar--hidden')
  }else {
    appGlobalArgs.elem_statusBar.classList.add('statusBar--hidden')
  }
}

export function markTabButtons(markState, ElementNamePart){
  let elem = document.getElementById(buttonTabPreValue+ElementNamePart)
  let elemMarkedClass ='button-tab--marked'
  if(markState === 'true') {
    elem.classList.add(elemMarkedClass)
  } else {
    elem.classList.remove(elemMarkedClass)
  }
}
