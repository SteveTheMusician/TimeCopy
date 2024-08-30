// Enter here the Filder/File Names of the dlcs
export const importPlatforms = ["Automatic", "AmagProTime", "DZBankProRes"]

async function generatePlatformData() {
    let dlcPlatformsData = []
    for (let importedPlatform of importPlatforms) {
        let infoData = Promise.resolve(import(`./${importedPlatform}/info.json`))
        await infoData.then(plInfo => {
            let platformStorageObject = { [importedPlatform]: { ...plInfo } }
            // let lstorage_sDLCPlatformInformations = 
            dlcPlatformsData.push(platformStorageObject)
        })
    }
    return dlcPlatformsData
}

export async function importPlatformsData() {
    let dlcPlatformsData = await generatePlatformData()
    try {
        if (dlcPlatformsData) {
            delete dlcPlatformsData['default']
            // push all informations about the platform dlcs into ls
            // localStorage.setItem('tc_s_dlcplatforminformations', JSON.stringify(dlcPlatformsData))
            return dlcPlatformsData
        } else {
            throw new Error('unable to create dlc import data')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function importPlatformCustomContent(contentName){
    contentName = contentName[0]
    console.log("importPlatformCont: ",contentName)
    try {
        const importContent = await import(`./${contentName}/${contentName}.content.js`)
        return importContent
    }catch(e){
        console.error(`Failed to load module: ${contentName}`, error);
        throw error;
    }
}
