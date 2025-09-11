// enter the folder/file-names of the modules here
export const importFilters = ["TobiasExcel", "SteveGoogleExcel","None"]
export const filter_timesheetFilterPreValue = 'timesheetfilter_'

async function generateFilterData() {
    return new Promise(async (resolve) => { 
        let moduleFiltersData = []
        for (let importedFilter of importFilters) {
            let infoData = Promise.resolve(import(`../../../public/static/Module/Filters/${importedFilter}/info.json`))
            await infoData.then(plInfo => {
                let filterStorageObject = { [importedFilter]: { ...plInfo } }
                // let lstorage_sModuleFilterInformations = 
                moduleFiltersData.push(filterStorageObject)
            })
        }
        resolve(moduleFiltersData)
    })
}

export async function importFiltersData() {
    return new Promise(async (resolve) => { 
        let tc_s_moduleFilterInformations = localStorage.getItem('tc_s_moduleFilterInformations')
        if (!tc_s_moduleFilterInformations) {
            let moduleFiltersData = await generateFilterData()
            try {
                if (moduleFiltersData) {
                    // push all informations about the filter modules into ls
                    tc_s_moduleFilterInformations = localStorage.setItem('tc_s_moduleFilterInformations', JSON.stringify(moduleFiltersData))
                    resolve(tc_s_moduleFilterInformations)
                } else {
                    throw new Error('unable to create module (filters) import data')
                }
            } catch (error) {
            }
        }else {
            resolve(tc_s_moduleFilterInformations)
        }
    })
}