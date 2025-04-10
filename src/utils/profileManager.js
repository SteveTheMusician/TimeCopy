import { appStorage } from "./appStorage.js";
import { notification } from "../components/ui/notification/notification.js";
import { lstorage_cBookingPlatform,lstorage_cFilter,lstorage_cShowAllMessages,
    lstorage_cDetectionItems,lstorage_cLanguage,lstorage_cThemes,lstorage_cProfilePicture } from "./appStorage.js";
import { defaultTheme,defaultLanguage,defaultShowAllMessages,defaultProfileAuthor } from "./defaults/defaultVariables.js";

export function profileManager(appGlobalArgs,appVersionData,dlcGlobalArgs) {
  let tcprofileVersion = appVersionData.profileVersion
  let supportedTcprofileVersions = appVersionData.supportedProfileVersions
  appGlobalArgs.elem_profilePicture.addEventListener('click', checkProfilePicture.bind(null,appGlobalArgs), false)
  appGlobalArgs.elem_button_importProfilePicture.addEventListener('change', importProfilePicture.bind(null,appGlobalArgs), false)
  // import time copy profile
  let button_importConfigs = document.getElementById('button_importConfigs');
  button_importConfigs.addEventListener("click", function () {
      button_importConfigs.value = null // reset import button value to null before loading file, so we can reimport the same file again
  }, false);
  button_importConfigs.addEventListener("change", importProfile, false);
  
  async function importProfile(event) {
    let importErrorMessage = "";
    let currentFileExtension = button_importConfigs.value.split('.')[1]
    try {
        const fileData = await new Promise((resolve, reject) => {
            const files = event.target.files;
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                try {
                  let readableFile = this.result
                  // new profile 2.0 import
                  if("."+currentFileExtension === appVersionData.profileType){
                    const base64Decoded = atob(this.result);
                    readableFile = decodeURIComponent(base64Decoded);
                  }
                  const parsedData = JSON.parse(readableFile);
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
          // profile 1.6 and lower support: check profile name breakin changes
          if(validProfileVersion.version < '1.8'){
            localStorage.setItem('tc_c_showAllMessages', fileData.tcprofile.cfg.show_all_messages)
            localStorage.setItem('tc_c_profileName', fileData.tcprofile.profile_name)
          }else {
            localStorage.setItem('tc_c_showAllMessages', fileData.tcprofile.cfg.showAllMessages)
            localStorage.setItem('tc_c_profileName', fileData.tcprofile.profileName)
          }
          // profile 1.8 support: if theme value is the old ee
          let importedThemevalue = fileData.tcprofile.cfg.theme
          if(importedThemevalue === 'exotic'){
            importedThemevalue = defaultTheme
          }
          // set profile picture only when object exists
          if(fileData.tcprofile.profilePicture !== null && typeof fileData.tcprofile.profilePicture !== 'undefined' && fileData.tcprofile.profilePicture !== ''){
            localStorage.setItem('tc_c_profilePicture',fileData.tcprofile.profilePicture)
          }
          localStorage.setItem('tc_c_theme', importedThemevalue)
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

  function checkProfilePicture (appGlobalArgs){
    if(!appGlobalArgs.elem_profilePictureUser.classList.contains('dNone')) {
      setUnsetProfilePicture(false,'',appGlobalArgs)
      window.configUserChanges = true
    }else {
      appGlobalArgs.elem_button_importProfilePicture.click()
    }
  }

  function importProfilePicture(appGlobalArgs) {
    const imageFile = appGlobalArgs.elem_button_importProfilePicture.files[0];
    if (!imageFile || !imageFile.type.startsWith('image/')) {
      notification(true, false, "Datei Import fehlgeschlagen. Nur Bilddateien erlaubt.");
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64 = e.target.result;
      const img = new Image();
      img.onload = function () {
        if (img.width > 1200 || img.height > 1200) {
          console.error('maximalgröße überschritten')
          notification(true, false, "Das Bild darf maximal 1200x1200 Pixel groß sein.");
          return;
        }
        setUnsetProfilePicture(true,base64,appGlobalArgs)
        window.configUserChanges = true
      };
      img.src = base64;
    };
    reader.readAsDataURL(imageFile);
  }
}

export function exportProfile(appVersionData, appGlobalArgs) {
  let configUserChanges = window.configUserChanges;
  if (configUserChanges === true) {
    sessionStorage.setItem('tc_c_exportProfile_afterChange', 'true');
    window.location.reload();
    return;
  }

  let detectionItems = lstorage_cDetectionItems;
  detectionItems = JSON.parse(detectionItems) || [];
  
  const fileNameFixed = "-TimeCopy"+appVersionData.profileType;
  let themeExport = lstorage_cThemes ?? defaultTheme;
  let languageExport = lstorage_cLanguage ?? defaultLanguage;
  let showAllMessagesExport = lstorage_cShowAllMessages ?? defaultShowAllMessages;
  let filterExport = lstorage_cFilter ?? '';
  let platformExport = lstorage_cBookingPlatform ?? '';
  let profilePictureExport = lstorage_cProfilePicture ?? '';

  let tcProfileObj = {
    "tcprofile": {
      "author": defaultProfileAuthor,
      "version": appVersionData.profileVersion,
      "appVersion": appVersionData.version,
      "appVersionName": appVersionData.versionName,
      "appBuild": appVersionData.buildVersion,
      "profileName": appGlobalArgs.configprofilename.value
    }
  };
  Object.assign(tcProfileObj.tcprofile, {
    "cfg": {
      "theme": themeExport,
      "language": languageExport,
      "showAllMessages": showAllMessagesExport,
      "filter": filterExport,
      "platform": platformExport,
      "detections": detectionItems
    },"profilePicture":profilePictureExport
  });

  const jsonString = JSON.stringify(tcProfileObj);
  const base64Data = btoa((encodeURIComponent(jsonString)));
  const name = appGlobalArgs.configprofilename.value + fileNameFixed;
  const tcPackageType = "text/plain";
  const tcPackageFile = new Blob([base64Data], { type: tcPackageType });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(tcPackageFile);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function setUnsetProfilePicture(boolean,base64src,appGlobalArgs){
  if(boolean){
    localStorage.setItem('tc_c_profilePicture', base64src);
    appGlobalArgs.elem_profilePictureUser.classList.remove('dNone')
    appGlobalArgs.elem_profilePictureUser.src = base64src;
    appGlobalArgs.elem_profileSVG.classList.add('dNone')
    appGlobalArgs.elem_profilePicture.classList.add('profileFrame--full')
  }else{
    localStorage.removeItem('tc_c_profilePicture');
    appGlobalArgs.elem_profilePictureUser.classList.add('dNone')
    appGlobalArgs.elem_profilePictureUser.src = '';
    appGlobalArgs.elem_profileSVG.classList.remove('dNone')
    appGlobalArgs.elem_profilePicture.classList.remove('profileFrame--full')
    appGlobalArgs.elem_button_importProfilePicture.value = ''
  }
}

