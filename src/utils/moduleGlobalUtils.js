import { importPlatformsData } from "../module/platforms/platforms.import"
import { importFiltersData } from "../module/filters/filters.import"

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

