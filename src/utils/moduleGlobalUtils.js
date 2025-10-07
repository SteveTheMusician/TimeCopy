import { importPlatformsData } from "../module/platforms/platforms.import.js"
import { importFiltersData } from "../module/filters/filters.import.js"

export async function reimportModuleStorageData(moduleCategoryName){
    let importNewData = ''

    if(moduleCategoryName === 'platforms') {
        importNewData = await importPlatformsData()
    }
    if(moduleCategoryName === 'filters') {
        importNewData = await importFiltersData()
    }     
    try {
      if (importNewData) {
        console.log('Module '+moduleCategoryName+' data created. Restart Time Copy.')
        window.location.reload()
      } else {
        throw new Error('Unable to import Module '+moduleCategoryName+' data')
      }
    } catch (error) {
      console.log(error)
      window.location.reload()
    }
}

export function changeModuleEEWidgetHeightHandler() {
  setTimeout(function() {
    let eEWidgetElem = document.getElementsByClassName('module-timeEEWidget')[0]
    if(localStorage.getItem('tc_c_showStatusBar') === 'true' && !window.configOpen){
      eEWidgetElem.classList.add('module-timeEEWidget--statusBarActive')
    } else {
      eEWidgetElem.classList.remove('module-timeEEWidget--statusBarActive')
    }
  },50)
}

export function showHideEEWidget(Event,elemId,lStorageName) {
  if (Event.target.checked === true) {
    document.getElementById(elemId).classList.remove('dNone')
    localStorage.setItem(lStorageName, 'true')
  } else {
    document.getElementById(elemId).classList.add('dNone')
    localStorage.setItem(lStorageName, 'false')
  }
}

