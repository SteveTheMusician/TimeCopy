import { buttonTabPreValue } from "./defaults/defaultVariables"

export function showHideStatusBar(showHideState,appGlobalArgs) {
  if(showHideState) {
    appGlobalArgs.elem_statusBar.classList.remove('statusBar--hidden')
  }else {
    appGlobalArgs.elem_statusBar.classList.add('statusBar--hidden')
  }
}

export function markTabButtons(markState, ElementNamePart){
  if(markState === 'true') {
    document.getElementById(buttonTabPreValue+ElementNamePart).classList.add('button-tab--marked')
  } else {
    document.getElementById(buttonTabPreValue+ElementNamePart).classList.remove('button-tab--marked')
  }
}
