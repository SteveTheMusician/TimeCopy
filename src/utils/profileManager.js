import { appStorage } from "./appStorage.js";
import { notification } from "../components/ui/notification/notification.js";
import { lstorage_cBookingPlatform,lstorage_cFilter,lstorage_cShowAllMessages,
    lstorage_cDetectionItems,lstorage_cLanguage,lstorage_cThemes } from "./appStorage.js";
import { defaultTheme,defaultLanguage,defaultShowAllMessages } from "./defaults/defaultVariables.js";

export function profileManager(appGlobalArgs,appVersionData,dlcGlobalArgs) {
  let tcprofileVersion = appVersionData.profileVersion
  let supportedTcprofileVersions = appVersionData.supportedProfileVersions
  // import time copy profile
  let button_importConfigs = document.getElementById('button_importConfigs');
  button_importConfigs.addEventListener("click", function () {
      button_importConfigs.value = null // reset import button value to null before loading file, so we can reimport the same file again
  }, false);
  button_importConfigs.addEventListener("change", importProfile, false);
  
  async function importProfile(event) {
    let importErrorMessage = ""; 
    try {
        const fileData = await new Promise((resolve, reject) => {
            const files = event.target.files;
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                try {
                    const parsedData = JSON.parse(this.result);
                    resolve(parsedData);
                } catch (e) {
                    reject(new Error(window.language.notification_importError+': '+window.language.notification_fileNotRead));
                }
            });
            reader.addEventListener("error", function () {
                reject(new Error(window.language.notification_importError+': '+window.language.notification_fileNotLoad));
            });
            reader.readAsText(files[0]);
        });
        const validProfileVersion = checkImportProfileVersion(fileData);
        if (validProfileVersion.validated) {
          if(validProfileVersion.version < '1.8'){
            localStorage.setItem('tc_c_showAllMessages', fileData.tcprofile.cfg.show_all_messages)
            localStorage.setItem('tc_c_profileName', fileData.tcprofile.profile_name)
          }else {
            localStorage.setItem('tc_c_showAllMessages', fileData.tcprofile.cfg.showAllMessages)
            localStorage.setItem('tc_c_profileName', fileData.tcprofile.profileName)
          }
          localStorage.setItem('tc_c_theme', fileData.tcprofile.cfg.theme)
          localStorage.setItem('tc_c_language', fileData.tcprofile.cfg.language)
          localStorage.setItem('tc_c_filter', fileData.tcprofile.cfg.filter)
          localStorage.setItem('tc_c_projectDetection', JSON.stringify(fileData.tcprofile.cfg.detections))
          localStorage.setItem('tc_c_bookingPlatform', fileData.tcprofile.cfg.platform)
          appStorage(appGlobalArgs,appVersionData,dlcGlobalArgs)
          sessionStorage.setItem('tc_c_messageImported', 'true')
          window.location.reload()    
          setTimeout(function () {}, 2000)
        } else {
            throw new Error(window.language.notification_importError+': '+window.language.notification_fileVersionNotMatch)
        }
    } catch (e) {
      importErrorMessage = e.message
    } finally {
      if (importErrorMessage) {
        notification(true, false, importErrorMessage)
      }
    }
  }
  function checkImportProfileVersion(fileData) {
    let versionValidated
    let validateResponse = {}
    if (fileData.tcprofile.version === tcprofileVersion || supportedTcprofileVersions.includes(fileData.tcprofile.version)) {
      versionValidated = true
    } else {
      versionValidated = false
    }
    validateResponse = {"validated": versionValidated, "version":fileData.tcprofile.version}
    return validateResponse
  }
  // export user configs as json
  let button_exportConfigs = document.getElementById('button_exportConfigs')
  button_exportConfigs.addEventListener('click', exportProfile.bind(null,appVersionData,appGlobalArgs),false)
}

export function exportProfile(appVersionData,appGlobalArgs) {
  let configUserChanges = window.configUserChanges
  if (configUserChanges === true) {
    sessionStorage.setItem('tc_c_exportProfile_afterChange', 'true')
    window.location.reload()
    return
  } else {
    let detectionItems = lstorage_cDetectionItems
    detectionItems = JSON.parse(detectionItems)
    const fileNameFixed = "-TimeCopy.tcprofile"
    if (detectionItems === null) {
      detectionItems = []
    }
    let saveObj = { "tcprofile": 
      { 
        "author": "steve", "version": appVersionData.profileVersion, 
        "appVersion": appVersionData.version, "appVersionName": appVersionData.versionName,"appBuild": appVersionData.buildVersion, 
        "profileName": appGlobalArgs.configprofilename.value 
      } 
    }
    let themeExport = lstorage_cThemes ?? defaultTheme
    let languageExport = lstorage_cLanguage ?? defaultLanguage
    let showAllMessagesExport = lstorage_cShowAllMessages ?? defaultShowAllMessages
    let filterExport = lstorage_cFilter ?? ''
    Object.assign(
      saveObj.tcprofile, 
      { "cfg": 
        { "theme": themeExport, "language": languageExport, 
          "showAllMessages": showAllMessagesExport, "filter": filterExport, 
          "platform": lstorage_cBookingPlatform, "detections": detectionItems 
        } 
      }
    )
    // file setting
    const data = JSON.stringify(saveObj);
    const name = appGlobalArgs.configprofilename.value + fileNameFixed;
    const type = "text/plain";
    // create file
    const a = document.createElement("a");
    const file = new Blob([data], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}