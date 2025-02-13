// Enter here the Filder/File Names of the dlcs
export const importFilters = ["TobiasExcel", "SteveGoogleExcel"]
export const filter_timesheetFilterPreValue = 'timesheetfilter_'

async function generateFilterData() {
    return new Promise(async (resolve) => { 
        let dlcFiltersData = []
        for (let importedFilter of importFilters) {
            let infoData = Promise.resolve(import(`./${importedFilter}/info.json`))
            await infoData.then(plInfo => {
                let filterStorageObject = { [importedFilter]: { ...plInfo } }
                // let lstorage_sDLCFilterInformations = 
                dlcFiltersData.push(filterStorageObject)
            })
        }
        resolve(dlcFiltersData)
    })
}

export async function importFiltersData() {
    return new Promise(async (resolve) => { 
        let tc_s_dlcfilterinformations = localStorage.getItem('tc_s_dlcfilterinformations')
        if (!tc_s_dlcfilterinformations) {
            let dlcFiltersData = await generateFilterData()
            try {
                if (dlcFiltersData) {
                    // push all informations about the filter dlcs into ls
                    tc_s_dlcfilterinformations = localStorage.setItem('tc_s_dlcfilterinformations', JSON.stringify(dlcFiltersData))
                    resolve(tc_s_dlcfilterinformations)
                } else {
                    throw new Error('unable to create dlc (filters) import data')
                }
            } catch (error) {
            }
        }else {
            resolve(tc_s_dlcfilterinformations)
        }
    })
}