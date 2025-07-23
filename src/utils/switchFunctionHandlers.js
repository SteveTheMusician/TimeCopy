export function showHideStatusBar(showHideState,appGlobalArgs) {
  if(showHideState) {
    appGlobalArgs.elem_statusBar.classList.remove('statusBar--hidden')
  }else {
    appGlobalArgs.elem_statusBar.classList.add('statusBar--hidden')
  }
}