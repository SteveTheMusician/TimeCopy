// enter the folder/file Name of the dlcs in the following array
// import the dlc also as function in the platform.dlc
export const importPlatforms = ["Automatic", "AmagProTime"]
export const platform_functionName_automatic = 'Automatic'
export const platform_bookingPlatformPreValue = 'bookingPlatform_'

async function generatePlatformData() {
    return new Promise(async (resolve) => { 
        let dlcPlatformsData = []
        for (let importedPlatform of importPlatforms) {
            let infoData = Promise.resolve(import(`../../../public/static/DLC/Platforms/${importedPlatform}/info.json`))
            await infoData.then(plInfo => {
                let platformStorageObject = { [importedPlatform]: { ...plInfo } }
                // let lstorage_sDLCPlatformInformations = 
                dlcPlatformsData.push(platformStorageObject)
            })
        }
        resolve(dlcPlatformsData)
    })
}

export async function importPlatformsData() {
    return new Promise(async (resolve) => { 
        let tc_s_dlcPlatformInformations = localStorage.getItem('tc_s_dlcPlatformInformations')
        if (!tc_s_dlcPlatformInformations) {
            let dlcPlatformsData = await generatePlatformData()
            try {
                if (dlcPlatformsData) {
                    // push all informations about the platform dlcs into ls
                    tc_s_dlcPlatformInformations = localStorage.setItem('tc_s_dlcPlatformInformations', JSON.stringify(dlcPlatformsData))
                    resolve(tc_s_dlcPlatformInformations)
                } else {
                    throw new Error('unable to create dlc (platforms) import data')
                }
            } catch (error) {
                console.error(error)
            }
        }else {
            resolve(tc_s_dlcPlatformInformations)
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
