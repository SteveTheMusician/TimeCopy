import {
  appStorage,
  lstorage_cBookingPlatform,
  lstorage_cFilter,
  lstorage_cShowAllMessages,
  lstorage_cDetectionItems,
  lstorage_cLanguage,
  lstorage_cThemes,
  lstorage_cProfilePicture,
  lstorage_cBookingScore,
  lstorage_eeTheme
} from "./appStorage.js";
import { toast } from "../components/ui/toast/toast.js";
import {
  defaultTheme,
  defaultLanguage,
  defaultShowAllMessages,
  defaultProfileAuthor,
  appFirstStartDoneValue
} from "./defaults/defaultVariables.js";
import { moduleProfileExport, moduleProfileImport } from "./modules/moduleProfileManagerUtil.js";

export function profileManager(appGlobalArgs, appVersionData, moduleGlobalArgs) {
  const tcprofileVersion = appVersionData.profileVersion;
  const supportedVersions = appVersionData.supportedProfileVersions;

  appGlobalArgs.elem_profilePicture.addEventListener('click', () => checkProfilePicture(appGlobalArgs));
  appGlobalArgs.elem_button_importProfilePicture.addEventListener('change', () => importProfilePicture(appGlobalArgs));

  const button_importConfigs = document.getElementById('button_importConfigs');
  button_importConfigs.addEventListener("click", () => {
    button_importConfigs.value = null;
  });
  button_importConfigs.addEventListener("change", importProfile);

  async function importProfile(event) {
    let importErrorMessage = "";
    const currentFileExtension = button_importConfigs.value.split('.').pop();

    try {
      const fileData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onload = function () {
          try {
            let content = this.result;
            if ("." + currentFileExtension === appVersionData.profileType) {
              const base64Decoded = atob(content);
              content = decodeURIComponent(base64Decoded);
            }
            resolve(JSON.parse(content));
          } catch {
            reject(new Error(`${window.language.notification_importError}: ${window.language.notification_fileNotRead}`));
          }
        };

        reader.onerror = function () {
          reject(new Error(`${window.language.notification_importError}: ${window.language.notification_fileNotLoad}`));
        };

        reader.readAsText(file);
      });

      const versionInfo = checkImportProfileVersion(fileData);
      if (!versionInfo.validated) {
        throw new Error(`${window.language.notification_importError}: ${window.language.notification_fileVersionNotMatch}`);
      }

      const cfg = fileData.tcprofile.cfg;
      const profileNameKey = versionInfo.version < '1.8' ? 'profile_name' : 'profileName';
      const showMessagesKey = versionInfo.version < '1.8' ? 'show_all_messages' : 'showAllMessages';
      let theme = cfg.theme === 'exotic' ? defaultTheme : cfg.theme;
      let eeTheme = cfg.eeTheme
      let profileName = versionInfo.version < '2.1' ? fileData.tcprofile[profileNameKey] : fileData.tcprofile.cfg[profileNameKey];
      let profilePicture = ''
      if(versionInfo.version === '2.0') {
        profilePicture = fileData.tcprofile.profilePicture
      } else if (versionInfo.version === '2.1') {
        profilePicture = fileData.tcprofile.cfg.profilePicture
      }
      
      if(eeTheme !== 'true' || eeTheme === 'undefinden') {
        eeTheme === 'false'
      }
      
      localStorage.setItem('tc_c_showAllMessages', fileData.tcprofile.cfg[showMessagesKey]);
      localStorage.setItem('tc_c_profileName', profileName);
      localStorage.setItem('tc_c_bookingScore', cfg.bookingScore);
      localStorage.setItem('tc_c_theme', theme);
      localStorage.setItem('tc_ee_exoticTheme', eeTheme)
      localStorage.setItem('tc_c_language', cfg.language);
      localStorage.setItem('tc_c_filter', cfg.filter);
      localStorage.setItem('tc_c_projectDetection', JSON.stringify(cfg.detections));
      localStorage.setItem('tc_c_bookingPlatform', cfg.platform);
      localStorage.setItem('tc_c_profilePicture', profilePicture);
      lstorage_cProfilePicture = localStorage.getItem('tc_c_profilePicture');

      if(!localStorage.getItem('tc_firstStart') || localStorage.getItem('tc_firstStart') !== appFirstStartDoneValue) {
        localStorage.setItem('tc_firstStart', appFirstStartDoneValue)
      }
      
      appStorage(appGlobalArgs, appVersionData, moduleGlobalArgs);

      if (versionInfo.version >= '1.9') {
        moduleProfileImport(fileData,versionInfo.version);
      }

      sessionStorage.setItem('tc_c_messageImported', 'true');
      window.location.reload();
    } catch (e) {
      console.error(e);
      importErrorMessage = e.message;
    } finally {
      if (importErrorMessage) {
        toast(false, importErrorMessage);
      }
    }
  }

  function checkImportProfileVersion(fileData) {
    const version = fileData.tcprofile.version;
    return {
      validated: version === tcprofileVersion || supportedVersions.includes(version),
      version
    };
  }
  const button_exportConfigs = document.getElementById('button_exportConfigs');
  button_exportConfigs.addEventListener('click', () => exportProfile(appVersionData, appGlobalArgs));
}

export function exportProfile(appVersionData, appGlobalArgs) {

  if (window.configUserChanges) {
    sessionStorage.setItem('tc_c_exportProfile_afterChange', 'true');
    window.location.reload();
    return;
  }

  const detectionItems = JSON.parse(lstorage_cDetectionItems) || [];
  const fileName = `${appGlobalArgs.configprofilename.value}-TimeCopy${appVersionData.profileType}`;
  const theme = lstorage_cThemes ?? defaultTheme;
  const eeTheme = lstorage_eeTheme ?? 'false'
  const language = lstorage_cLanguage ?? defaultLanguage;
  const showAllMessages = lstorage_cShowAllMessages ?? defaultShowAllMessages;
  const filter = lstorage_cFilter ?? '';
  const platform = lstorage_cBookingPlatform ?? '';
  const profilePicture = lstorage_cProfilePicture ?? '';
  const bookingScore = lstorage_cBookingScore ?? 0;
  const moduleData = moduleProfileExport();

  const profileData = {
    tcprofile: {
      author: defaultProfileAuthor,
      version: appVersionData.profileVersion,
      appVersion: appVersionData.version,
      appVersionName: appVersionData.versionName,
      appBuild: appVersionData.buildVersion,
      cfg: {
        profileName: appGlobalArgs.configprofilename.value,
        bookingScore,
        theme,
        eeTheme,
        language,
        showAllMessages,
        filter,
        platform,
        detections: detectionItems,
        profilePicture
      },
    }
  };

  Object.assign(profileData.tcprofile, moduleData);

  let data
  if(localStorage.getItem('tc_exportProfileDecoded') === 'true') {
    data = JSON.stringify(profileData)
  } else {
    data = btoa(encodeURIComponent(JSON.stringify(profileData)))
  }
  const blob = new Blob([data], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function setUnsetProfilePicture(show, base64src, appGlobalArgs) {
  if (show && base64src !== '') {
    localStorage.setItem('tc_c_profilePicture', base64src);
    appGlobalArgs.elem_profilePictureUser.classList.remove('dNone');
    appGlobalArgs.elem_profilePictureUser.src = base64src;
    appGlobalArgs.elem_profileSVG.classList.add('dNone');
    appGlobalArgs.elem_profilePicture.classList.add('profileFrame--full');
    appGlobalArgs.elem_button_importProfilePicture.value = '';
  } else {
    localStorage.removeItem('tc_c_profilePicture');
    appGlobalArgs.elem_profilePictureUser.classList.add('dNone');
    appGlobalArgs.elem_profilePictureUser.src = '';
    appGlobalArgs.elem_profileSVG.classList.remove('dNone');
    appGlobalArgs.elem_profilePicture.classList.remove('profileFrame--full');
    appGlobalArgs.elem_button_importProfilePicture.value = '';
  }
}

function checkProfilePicture(appGlobalArgs) {
  if (!appGlobalArgs.elem_profilePictureUser.classList.contains('dNone')) {
    setUnsetProfilePicture(false, '', appGlobalArgs);
    window.configUserChanges = true;
  } else {
    appGlobalArgs.elem_button_importProfilePicture.click();
  }
}

function importProfilePicture(appGlobalArgs) {
  const imageFile = appGlobalArgs.elem_button_importProfilePicture.files[0];

  if (!imageFile || !imageFile.type.startsWith('image/')) {
    toast(false, "Datei Import fehlgeschlagen. Nur Bilddateien erlaubt.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {

    const base64 = e.target.result;
    const img = new Image();

    img.onload = function () {
      if (img.width > 1500 || img.height > 1500) {
        toast(false, "Das Bild darf maximal 1200x1200 Pixel groß sein.");
        return;
      }
      setUnsetProfilePicture(true, base64, appGlobalArgs);
      window.configUserChanges = true;
    };

    img.src = base64;
  };
  reader.readAsDataURL(imageFile);
}
