import { importPlatformsData } from "../dlc/platforms/platforms.import"
import { importFiltersData } from "../dlc/filters/filters.import"

export async function reimportDLCStorageData(dlcCategoryName){
    let importNewData = ''

    if(dlcCategoryName === 'platforms') {
        importNewData = await importPlatformsData()
    }
    if(dlcCategoryName === 'filters') {
        importNewData = await importFiltersData()
    }     
    try {
      if (importNewData) {
        console.log('DLC '+dlcCategoryName+' data created. Restart Time Copy.')
        window.location.reload()
      } else {
        throw new Error('Unable to import DLC '+dlcCategoryName+' data')
      }
    } catch (error) {
      console.log(error)
      window.location.reload()
    }
}

