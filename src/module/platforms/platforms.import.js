// enter the folder/file Name of the modules in the following array
// import the module also as function in the platform.module
export const importPlatforms = ["Automatic", "AmagProTime", "Any"]
export const platform_functionName_automatic = 'Automatic'
export const platform_bookingPlatformPreValue = 'bookingPlatform_'

async function generatePlatformData() {
    return new Promise(async (resolve) => { 
        let modulePlatformsData = []
        for (let importedPlatform of importPlatforms) {
            let infoData = Promise.resolve(import(`../../../public/static/Module/Platforms/${importedPlatform}/info.json`))
            await infoData.then(plInfo => {
                let platformStorageObject = { [importedPlatform]: { ...plInfo } }
                // let lstorage_sModulePlatformInformations = 
                modulePlatformsData.push(platformStorageObject)
            })
        }
        resolve(modulePlatformsData)
    })
}

export async function importPlatformsData() {
    return new Promise(async (resolve) => { 
        let tc_s_modulePlatformInformations = localStorage.getItem('tc_s_modulePlatformInformations')
        if (!tc_s_modulePlatformInformations) {
            let modulePlatformsData = await generatePlatformData()
            try {
                if (modulePlatformsData) {
                    // push all informations about the platform modules into ls
                    tc_s_modulePlatformInformations = localStorage.setItem('tc_s_modulePlatformInformations', JSON.stringify(modulePlatformsData))
                    resolve(tc_s_modulePlatformInformations)
                } else {
                    throw new Error('unable to create module (platforms) import data')
                }
            } catch (error) {
                console.error(error)
            }
        }else {
            resolve(tc_s_modulePlatformInformations)
        }
    })
}

export async function importPlatformCustomContent(contentName) {
    try {
        const importContent = await import(`./${contentName}/${contentName}.content.js`)
        return importContent
    } catch (error) {
        console.error(`Failed to load module: ${contentName}`, error);
        throw error;
    }
}


export async function importPlatformDetectionContent(platformName) {
    try {
        const importDetectionHTML = await import(`./${platformName}/detection/${platformName}.detection.js`)
        return importDetectionHTML
    } catch (error) {
        console.error(`Failed to load detection content from module: ${platformName}`, error);
        throw error;
    }
}
