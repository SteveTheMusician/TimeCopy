import { filters } from "./components/dlc/filters/filters.dlc.js";
import { filtersContent } from "./components/dlc/filters/filters.dlc.js";
import { filter_timesheetFilterPreValue } from "./components/dlc/filters/filters.import.js";
import data_version from "../public/version.json" with { type: "json" };
import { notification } from "./components/ui/notification/notification.js";
import { message } from "./components/ui/message/message.js";
import { platforms } from "./components/dlc/platforms/platforms.dlc.js";
import { projectDetection } from "./components/content/configuration/projectDetection/projectDetection.js";
import { developer } from "./developer/developer.js";
import { platformsContent } from "./components/dlc/platforms/platforms.dlc.js";
import { platform_functionName_automatic } from "./components/dlc/platforms/platforms.import.js";
import { platform_bookingPlatformPreValue } from "./components/dlc/platforms/platforms.import.js";
import { xmas } from "./components/dlc/xmas/xmas.dlc.js";

document.addEventListener('DOMContentLoaded', async function () {
  // import DLC's
  try {
    let dlc_platformContent = await platformsContent()
    if (!dlc_platformContent) {
      throw new Error('❌ DLC Platform contents not loaded')
    }else {
      console.log(dlc_platformContent)
    }
  } catch (error) {
    console.log(error)
    clearDlcLocalStorages()
    return
  }
  try {
    let dlc_filterContent = await filtersContent()
    if (!dlc_filterContent) {
      throw new Error('❌ DLC Filter contents not loaded')
    }else {
      console.log(dlc_filterContent)
    }
  } catch (error) {
    console.log(error)
    clearDlcLocalStorages()
    return
  }
  // date variables
  const dateNow = new Date();
  const dateMonth = dateNow.getMonth();
  // vars
  const link_cssTheme = document.querySelector('link#link-theme');
  const main = document.querySelector('main');
  const header = document.querySelector('header');
  const configurations = document.querySelector('div.configurations');
  const overview = document.querySelector('div.overview');
  const messagesHeadline = document.getElementById('messages-headline')
  const messageSection = document.getElementById('messages-section')
  const configurationsContainer = document.getElementById('config-container')
  const configWindow_getAll = document.getElementsByClassName('configuration-window');
  const configWindow_General = document.getElementById('config-win-general');
  const configWindow_Timesheets = document.getElementById('config-win-timesheets');
  const configWindow_Bookingsheets = document.getElementById('config-win-bookingsheet');
  const configWindow_Projects = document.getElementById('config-win-projects');
  const configProfileName = document.getElementById('configProfileName')
  // tab buttons
  const buttonsTab_getAll = document.getElementsByClassName('button-config-tab');
  const buttonTab_General = document.querySelector('button#button-tab-general');
  const buttonTab_Timesheets = document.querySelector('button#button-tab-timesheets');
  const buttonTab_Bookingsheets = document.querySelector('button#button-tab-bookingsheets');
  const buttonTab_Projects = document.querySelector('button#button-tab-projects');
  const buttonBackToMain = document.querySelector('button#buttonBackToMain');

  // WAS SCHAUST DU IN MEIN CODE REIN?? DER WIRD NOCH AUFGERÄUMT!!

  // Main Buttons
  const fillButton = document.querySelector('button#fillButton');
  const fillCancelButton = document.querySelector('button#fillCancelButton');
  const configButton = document.querySelector('button#configButton');
  const button_clearAllMessages = document.getElementById('button_clearAllMessages')

  // Configuration Buttons
  const themeSelect = document.querySelector('select#select-themes')
  const languageSelect = document.querySelector('select#select-language')
  const button_clearConfigs = document.getElementById('button_clearConfigs')
  const button_reloadDLCCache = document.getElementById('button_reloadDLCCache')
  const switch_showAllMessages = document.getElementById('check_showAllNotifications')
  const radios_filter = document.getElementsByName('timesheet-filter')
  const button_docuHelp = document.getElementById('button_openHelp')
  const button_docuReadme = document.getElementById('button_openReadme')
  const button_docuChangelog = document.getElementById('button_openChangelog')
  const button_docuDatenschutz = document.getElementById('button_openDatenschutz')
  const button_openStore = document.getElementById('button_openStore')
  const button_openLicense = document.getElementById('button_openLicense')
  const radio_timesheetFilters = document.getElementsByName('timesheet-filter')

  // Platform-DLC Elements and Listener
  const radio_bookingPlatforms = document.getElementsByName('booking-platform')
  const dlc_platform_element = document.getElementsByClassName('dlcItem-platform')
  const dlc_filter_element = document.getElementsByClassName('dlcItem-filter')
  const config_check_showProTimeTestButton = document.getElementById('check_showProTimetestButton')
  const config_check_forceLatencyModeproTime = document.getElementById('check_forceLatencyModeproTime')
  const config_check_useLatencyModeproTime = document.getElementById('check_useLatencyModeproTime')
  config_check_showProTimeTestButton.addEventListener('change', dlcShowProTimeTestButton)
  config_check_forceLatencyModeproTime.addEventListener('change', dlcProTimeForceLatencyMode)
  config_check_useLatencyModeproTime.addEventListener('change', dlcProTimeUseLatencyMode)
  const button_dev_pttest = document.querySelector('button#button_test_pasteTicketData')

  // local storages
  let lstorage_cThemes = localStorage.getItem('tc_c_theme')
  let lstorage_cLanguage = localStorage.getItem('tc_c_language')
  let lstorage_cFilter = localStorage.getItem('tc_c_filter')
  let lstorage_cDetectionItems = localStorage.getItem('tc_c_projectDetection')
  let lstorage_cProfileName = localStorage.getItem('tc_c_profileName')
  let lstorage_cBookingPlatform = localStorage.getItem('tc_c_bookingPlatform')
  let lstorage_c_dlcProTimeTest = localStorage.getItem('tc_c_dlc_protimetest')
  let lstorage_c_dlcProTimeForceLatencyMode = localStorage.getItem('tc_c_dlc_protimeforcelatencymode')
  let lstorage_c_dlcProTimeUseLatencyMode = localStorage.getItem('tc_c_dlc_protimeuselatencymode')
  let lstorage_appVersion = localStorage.getItem('tc_appVersion')
  let lstorage_eeTheme = localStorage.getItem('tc_ee_exoticTheme')
  let lstorage_cShowAllMessages = localStorage.getItem('tc_c_showAllMessages')

  // Some vars
  let configOpen = false
  let dev_pttest = false
  let showAllMessages = true
  const consoleWarnMessage_showMessageTurnedOff = "⚠ Time Copy Messages are turned off!"

  // this variable activates tc reloading after pressing the back button when its set to true
  let configUserChanges = false
  const dlc_details_classHidden = 'dlc-details--hidden'

  const dokuUrl = data_version.extension_documentation
  const changelogUrl = data_version.extension_changelog
  const privacyUrl = data_version.extension_privacy
  const readmeUrl = data_version.extension_readme
  const chromeStoreUrl = data_version.extension_chromestore
  const licenseUrl = data_version.extension_license

  const extensionVersion = data_version.extension_version
  const extensionBuild = data_version.extension_build
  const extensionAuthor = data_version.extension_author
  const extensionTesting = data_version.extension_testing
  const extensionUpdateTextOverview = data_version.extension_update_text_overview
  const extensionUpdateTextDetails = data_version.extension_update_text_details
  let tcprofileVersion = data_version.profile_version

  // sessionstorages for temp-messages and data
  function loadSessionStorages() {
    let sMessageImported = sessionStorage.getItem('tc_c_messageImported')
    let sMessageProfileRemoved = sessionStorage.getItem('tc_c_messageProfileRemoved')
    let sExportFile_afterChange = sessionStorage.getItem('tc_c_exportFile_afterChange')
    let sDLCCacheReloaded = sessionStorage.getItem('tc_c_messageDLCCacheReloaded')
    let sChangeLanguage = sessionStorage.getItem('tc_c_changeLanguage')
    if (sMessageImported === 'true') {
      notification(true, true, 'Profil wurde erfolgreich importiert!')
      sessionStorage.removeItem('tc_c_messageImported')
      configButton.click()
    }
    if (sMessageProfileRemoved === 'true') {
      notification(true, true, 'Profil wurde zurückgesetzt.')
      sessionStorage.removeItem('tc_c_messageProfileRemoved')
      configButton.click()
    }
    if (sExportFile_afterChange === 'true') {
      sessionStorage.removeItem('tc_c_exportFile_afterChange')
      configButton.click()
      exportFile()
    }
    if (sChangeLanguage === 'true') {
      sessionStorage.removeItem('tc_c_changeLanguage')
      configButton.click()
    }
    if (sDLCCacheReloaded === 'true') {
      notification(true, true, 'DLC-Cache wurde neu geladen.')
      sessionStorage.removeItem('tc_c_messageDLCCacheReloaded')
      configButton.click()
    }

  }
  // Load localstorage
  function loadStorage() {
    // Default variables
    const defaultProfileName = "Default"
    const defaultTheme = "oceanswave"
    let defaultBookingPlatform = platform_functionName_automatic
    //language settings may released in a later version
    const defaultLanguage = 'de'
    let language = ''

    if (lstorage_appVersion) {
      if (lstorage_appVersion !== extensionVersion) {
        localStorage.setItem('tc_appVersion', extensionVersion)
        // reset dlc information cache
        clearDlcLocalStorages()
        // show update message
        message(true, 'information', extensionUpdateTextOverview + extensionVersion, extensionUpdateTextDetails)
      }
    } else {
      localStorage.setItem('tc_appVersion', extensionVersion)
      message(true, 'information', extensionUpdateTextOverview + extensionVersion, extensionUpdateTextDetails)
    }

    if (lstorage_eeTheme === 'true') {
      document.getElementById('select-theme-exotic-categ').classList.remove('dNone');
      document.getElementById('select-theme-exotic').classList.remove('dNone');
    }

    if (lstorage_cThemes && lstorage_cThemes !== 'null' && lstorage_cThemes !== ' ') {
      themeSelect.value = lstorage_cThemes
      if (lstorage_cThemes === 'exotic' && lstorage_eeTheme === 'true') {
        link_cssTheme.setAttribute('href', './static/Style/themes/ee/exotisch/' + lstorage_cThemes + '.css')
      } else if (lstorage_cThemes === 'exotic' && lstorage_eeTheme !== 'true') {
        themeSelect.value = defaultTheme
        lstorage_cThemes = defaultTheme
      } else {
        link_cssTheme.setAttribute('href', './static/Style/themes/' + lstorage_cThemes + '/' + lstorage_cThemes + '.css')
      }
    } else {
      themeSelect.value = defaultTheme
      link_cssTheme.setAttribute('href', './static/Style/themes/' + defaultTheme + '/' + defaultTheme + '.css')
    }
    if (lstorage_cFilter) {
      document.querySelector('input[value="' + filter_timesheetFilterPreValue + lstorage_cFilter + '"]').checked = true
    }
    if (lstorage_cProfileName) {
      configProfileName.value = lstorage_cProfileName
    } else {
      configProfileName.value = defaultProfileName
    }
    if (lstorage_cBookingPlatform) {
      document.querySelector('input[value="' + platform_bookingPlatformPreValue + lstorage_cBookingPlatform + '"]').checked = true
    } else {
      document.querySelector('input[value="' + platform_bookingPlatformPreValue + defaultBookingPlatform + '"]').checked = true
      localStorage.setItem('tc_c_bookingPlatform', defaultBookingPlatform)
    }
    if(lstorage_cShowAllMessages === 'true') {
      switch_showAllMessages.checked = true
      showAllMessages = true
      messageSection.classList.remove('dNone')
      messagesHeadline.classList.remove('dNone')
    } else if (lstorage_cShowAllMessages === 'false') {
      switch_showAllMessages.checked = false
      showAllMessages = false
      messageSection.classList.add('dNone')
      messagesHeadline.classList.add('dNone')
    }else {
      switch_showAllMessages.checked = true
      showAllMessages = true
      messageSection.classList.remove('dNone')
      messagesHeadline.classList.remove('dNone')
    }
    loadDLCStorage()
    console.log('✅ [Time Copy] extension loaded')
  }

  // local storage for dlcs
  function loadDLCStorage() {
    if (lstorage_c_dlcProTimeTest === 'true') {
      config_check_showProTimeTestButton.checked = true
      dlcShowProTimeTestButtonDisplay()
    }
    if(lstorage_c_dlcProTimeForceLatencyMode === 'true') {
      config_check_forceLatencyModeproTime.checked = true
    }
    if(lstorage_c_dlcProTimeUseLatencyMode === 'false') {
      config_check_useLatencyModeproTime.checked = false
    }else {
      config_check_useLatencyModeproTime.checked = true
    }
  }

  // Clear local storage
  function clearLocalStorage() {
    localStorage.removeItem('tc_c_theme')
    localStorage.removeItem('tc_c_language')
    localStorage.removeItem('tc_c_filter')
    localStorage.removeItem('tc_c_projectDetection')
    localStorage.removeItem('tc_c_profileName')
    localStorage.removeItem('tc_c_bookingPlatform')
    localStorage.removeItem('tc_appVersion')
    localStorage.removeItem('tc_ee_exoticTheme')
    localStorage.removeItem('tc_c_showAllMessages')
    clearDlcLocalStorages()
  }

  function clearDlcLocalStorages() {
    // DLC Storages
    localStorage.removeItem('tc_s_dlcplatforminformations')
    localStorage.removeItem('tc_s_dlcfilterinformations')
    localStorage.removeItem('tc_c_dlc_protimetest')
    localStorage.removeItem('tc_c_dlc_snowflakes')
    localStorage.removeItem('tc_c_dlc_protimeforcelatencymode')
    localStorage.removeItem('tc_c_dlc_protimeuselatencymode')
  }

  function clearSessionStorage() {
    sessionStorage.removeItem('tc_c_messageImported')
    sessionStorage.removeItem('tc_c_messageProfileRemoved')
    sessionStorage.removeItem('tc_c_changeLanguage')
    sessionStorage.removeItem('tc_c_messageDLCCacheReloaded')
  }

  function openConfigs() {
    if (configOpen) {
      // main.classList.remove('main-extended')
      configButton.classList.remove('button--active')
      fillButton.classList.remove('object--hidden')
      configurations.classList.add('dNone')
      overview.classList.remove('dNone')
      header.classList.add('dNone')
      configOpen = false
      if (configUserChanges === true) {
        window.location.reload()
      }
    } else {
      // main.classList.add('main-extended')
      configButton.classList.add('button--active')
      fillButton.classList.add('object--hidden')
      configurations.classList.remove('dNone')
      overview.classList.add('dNone')
      header.classList.remove('dNone')
      configOpen = true
    }
  }

  // config tabs functions
  function removeTabActiveClass() {
    [].forEach.call(buttonsTab_getAll, function (buttonsTab_getAll) {
      buttonsTab_getAll.classList.remove('button-tab--active');
    });
    [].forEach.call(configWindow_getAll, function (configWindow_getAll) {
      configWindow_getAll.classList.add('dNone');
    });
  }

  function configTabOpenGeneral() {
    // buttonsTab_getAll configWindow_getAll
    removeTabActiveClass()
    buttonTab_General.classList.add('button-tab--active')
    configWindow_General.classList.remove('dNone')
    configurationsContainer.classList.add('configuration-container-first-tab-selected')
  }

  function configTabOpenProjects() {
    removeTabActiveClass()
    buttonTab_Projects.classList.add('button-tab--active')
    configWindow_Projects.classList.remove('dNone')
    configurationsContainer.classList.remove('configuration-container-first-tab-selected')
    // set user changes to tro to make shure any changes are saved
    configUserChanges = true
  }

  function configTabOpenTimesheets() {
    removeTabActiveClass()
    buttonTab_Timesheets.classList.add('button-tab--active')
    configWindow_Timesheets.classList.remove('dNone')
    configurationsContainer.classList.remove('configuration-container-first-tab-selected')
  }

  function configTabOpenBookingsheets() {
    removeTabActiveClass()
    buttonTab_Bookingsheets.classList.add('button-tab--active')
    configWindow_Bookingsheets.classList.remove('dNone')
    configurationsContainer.classList.remove('configuration-container-first-tab-selected')
  }

  // configuration functions
  function timesheetFilterChange(e) {
    let timesheetFilterValue = e.target.value.split(filter_timesheetFilterPreValue)[1]
    localStorage.setItem('tc_c_filter', timesheetFilterValue)
    configUserChanges = true
  }

  function bookingPlatformsChange(e) {
    let bookingPlatformValue = e.target.value.split(platform_bookingPlatformPreValue)[1]
    localStorage.setItem('tc_c_bookingPlatform', bookingPlatformValue)
    configUserChanges = true
  }

  function dlcPlatformOpenDropdown(e) {
    let dlc_platformElement = e.target.closest(".dlcItem-platform")
    let dlc_platformDropDownButton = e.target.closest("button")
    let dlc_platformInformationContainer = dlc_platformElement.getElementsByClassName('dlcItem-details-container')[0]
    if (dlc_platformInformationContainer.classList.contains(dlc_details_classHidden)) {
      dlc_platformInformationContainer.classList.remove(dlc_details_classHidden)
      dlc_platformDropDownButton.classList.add('button-dropdown--active')
    } else {
      dlc_platformInformationContainer.classList.add(dlc_details_classHidden)
      dlc_platformDropDownButton.classList.remove('button-dropdown--active')
    }
  }

  function dlcFilterOpenDropdown(e) {
    let dlc_filterElement = e.target.closest(".dlcItem-filter")
    let dlc_filterDropDownButton = e.target.closest("button")
    let dlc_filterInformationContainer = dlc_filterElement.getElementsByClassName('dlcItem-details-container')[0]
    if (dlc_filterInformationContainer.classList.contains(dlc_details_classHidden)) {
      dlc_filterInformationContainer.classList.remove(dlc_details_classHidden)
      dlc_filterDropDownButton.classList.add('button-dropdown--active')
    } else {
      dlc_filterInformationContainer.classList.add(dlc_details_classHidden)
      dlc_filterDropDownButton.classList.remove('button-dropdown--active')
    }
  }

  function configSetProfileName() {
    localStorage.setItem('tc_c_profileName', configProfileName.value)
    configUserChanges = true
    if (configProfileName.value === 'LOVE') {
      localStorage.setItem('tc_ee_exoticTheme', 'true')
    }
  }

  function switchTheme() {
    let currentThemeValue = themeSelect.value
    if (currentThemeValue === 'exotic') {
      link_cssTheme.setAttribute('href', './static/Style/themes/ee/exotisch/' + currentThemeValue + '.css')
    } else {
      link_cssTheme.setAttribute('href', './static/Style/themes/' + currentThemeValue + '/' + currentThemeValue + '.css')
    }
    localStorage.setItem('tc_c_theme', currentThemeValue)
    configUserChanges = true
  }

  function showAllMessagesChange() {
    let showAllMessagesSwitchCurrentStatus = switch_showAllMessages.checked
    console.log(showAllMessagesSwitchCurrentStatus)
    localStorage.setItem('tc_c_showAllMessages', showAllMessagesSwitchCurrentStatus )
    configUserChanges = true
  }

  function switchFilter(e) {
    localStorage.setItem('tc_c_filter', e.target.value)
    configUserChanges = true
  }

  // import time copy profile
  let button_importConfigs = document.getElementById('button_importConfigs');
  button_importConfigs.addEventListener("change", importFile, false);

  function importFile(event) {
    let fileData
    var files = event.target.files,
      reader = new FileReader();
    reader.addEventListener("load", function (validateFileVersion) {
      fileData = this.result;
      fileData = JSON.parse(fileData)
      validateFileVersion = checkImportFileVersion(fileData)
      if (validateFileVersion) {
        // set data
        localStorage.setItem('tc_c_theme', fileData.tcprofile.cfg.theme)
        localStorage.setItem('tc_c_language', fileData.tcprofile.cfg.language)
        localStorage.setItem('tc_c_filter', fileData.tcprofile.cfg.filter)
        localStorage.setItem('tc_c_projectDetection', JSON.stringify(fileData.tcprofile.cfg.detections))
        localStorage.setItem('tc_c_profileName', fileData.tcprofile.profile_name)
        localStorage.setItem('tc_c_bookingPlatform', fileData.tcprofile.cfg.platform)
        loadStorage()
        sessionStorage.setItem('tc_c_messageImported', 'true')
        window.location.reload()
        setTimeout(function () {
        }, 2000)
      } else {
        notification(true, false, 'Import fehlgeschlagen: Version stimmt nicht überein.')
        return
      }
    });
    reader.readAsText(files[0])
  }

  function checkImportFileVersion(fileData) {
    let versionValidated
    if (fileData.tcprofile.version === tcprofileVersion) {
      versionValidated = true
    } else {
      versionValidated = false
    }
    return versionValidated
  }

  // Export Configs as Json
  let button_exportConfigs = document.getElementById('button_exportConfigs');
  button_exportConfigs.addEventListener('click', exportFile)

  function exportFile() {

    if (configUserChanges === true) {
      sessionStorage.setItem('tc_c_exportFile_afterChange', 'true')
      window.location.reload()
      return
    } else {
      let detectionItems = lstorage_cDetectionItems
      detectionItems = JSON.parse(detectionItems)
      const fileNameFixed = "-TimeCopy.tcprofile"
      if (detectionItems === null) {
        detectionItems = []
      }
      let saveObj = { "tcprofile": { "author": "steve", "version": tcprofileVersion, "extension_version": extensionVersion, "extension_build": extensionBuild, "profile_name": configProfileName.value } }
      // apply values
      Object.assign(saveObj.tcprofile, { "cfg": { "theme": lstorage_cThemes, "language": lstorage_cLanguage, "filter": lstorage_cFilter, "platform": lstorage_cBookingPlatform, "detections": detectionItems } })
      // file setting
      const data = JSON.stringify(saveObj);
      const name = configProfileName.value + fileNameFixed;
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
  // delete configs
  function removeProfile() {
    clearLocalStorage()
    clearSessionStorage()
    sessionStorage.setItem('tc_c_messageProfileRemoved', 'true')
    window.location.reload()
  }
  function reloadDLCCache() {
    clearDlcLocalStorages()
    sessionStorage.setItem('tc_c_messageDLCCacheReloaded', 'true')
    window.location.reload()
  }
  // Main Functions
  async function readClipboardText() {

    lockActionButtons('true',fillButton)
    let clipboarsString = await navigator.clipboard.readText();
    let filter = lstorage_cFilter
    let bookingPlatform = lstorage_cBookingPlatform
    // check whitch filter to use
    try {
      if (filter === '' || filter === null) {
        throw new Error("Bitte wähle zuerst einen Filter!")
      }
      if (bookingPlatform === '' || bookingPlatform === null) {
        throw new Error("Bitte wähle eine Buchungsplatform!")
      }
      if (lstorage_cDetectionItems === '' || lstorage_cDetectionItems === null) {
        throw new Error("Bitte erstelle mindestens eine Projekt-Erkennung !")
      }
      processData(filter, clipboarsString, bookingPlatform, dev_pttest)

    } catch (error) {
      lockActionButtons('false',fillButton)
      if(showAllMessages) {
        message(true, 'warning', error, '')
      } else {
        console.log(consoleWarnMessage_showMessageTurnedOff+' | '+error)
      }
      return
    }
  }

  async function processData(filter, clipboarsString, bookingPlatform, dev_pttest) {

    let timesheetData = []
    // get all boocking relevant data as array
    try {
      timesheetData = await filters(filter, clipboarsString)
      console.log("💽 Selected Filter-DLC: " + filter + " | Filtered data: ", timesheetData)
    } catch (error) {
      console.error("❌ Unable to call bookingData: ", error);
      // notification(true, false, '')
      lockActionButtons('false',fillButton)
      if(showAllMessages) {
        message(true, 'error', 'ERROR: Keine Buchungsdaten', 'Der ausgewählte Filter kann die Daten nicht zuordnen / wiedergeben. Ein Grund dafür kann sein, dass du nicht gültige Daten kopiert hast oder einer deiner Einträge einen Fehler aufweist.')
      } else {
        console.log()
      }
      return
    }
    try {
      console.log("🔘 Selected Platform-DLC: " + bookingPlatform)
      let bookEntries = await platforms(bookingPlatform, timesheetData, lstorage_cDetectionItems, dev_pttest)
      if (bookEntries) {
        console.log("✅ Booking process return okey | ", bookEntries)
        lockActionButtons('false',fillButton)
        if(showAllMessages) {
          message(true, 'information', 'Buchungsprozess beendet', bookingPlatform)
        } else {
          console.log(consoleWarnMessage_showMessageTurnedOff)
        }
      } else {
        console.log("❌ Problem with booking entries: ", bookEntries)
      }
    } catch (error) {
      lockActionButtons('false',fillButton)
      if(showAllMessages) {
        message(true, error.errorstatus, 'Fehler: ' + error.errorheadline, error.errortext || bookingPlatform)
      } else {
        console.log(consoleWarnMessage_showMessageTurnedOff)
      }
      console.error('❌ Bookingprocess failed | ', error.errorheadline + ' ' + error.errortext)
      return
    }
  }

  // Main Action Buttons disable / enable functions
  function lockActionButtons(lockStatus, actionButtonSpinner){
    if(lockStatus === 'true') {
      actionButtonSpinner.classList.add('button-mainAction--waiting')
      fillButton.setAttribute('disabled', 'disabled')
      fillCancelButton.classList.remove('dNone')
      configButton.setAttribute('disabled', 'disabled')
    }else if(lockStatus === 'false'){
      actionButtonSpinner.classList.remove('button-mainAction--waiting')
      fillButton.removeAttribute('disabled', 'disabled')
      fillCancelButton.classList.add('dNone')
      configButton.removeAttribute('disabled', 'disabled')
    }
  }

  // Cancel Functions
  function cancelPasteData(){
    chrome.tabs.reload(function(){});
    window.location.reload()
  }

  // DLC Functions
  function dlcShowProTimeTestButton() {
    if (config_check_showProTimeTestButton.checked) {
      localStorage.setItem('tc_c_dlc_protimetest', 'true')
    } else {
      localStorage.setItem('tc_c_dlc_protimetest', 'false')
    }
    dlcShowProTimeTestButtonDisplay()
    configUserChanges = true
  }

  function dlcShowProTimeTestButtonDisplay() {
    if (config_check_showProTimeTestButton.checked) {
      button_dev_pttest.classList.remove('dNone')
    } else {
      button_dev_pttest.classList.add('dNone')
    }
  }

  function dlcProTimeForceLatencyMode(){
    if(config_check_forceLatencyModeproTime.checked){
      localStorage.setItem('tc_c_dlc_protimeforcelatencymode', 'true')
    }else {
      localStorage.setItem('tc_c_dlc_protimeforcelatencymode', 'false')
    }
    configUserChanges = true
  }

  function dlcProTimeUseLatencyMode(){
    if(config_check_useLatencyModeproTime.checked){
      localStorage.setItem('tc_c_dlc_protimeuselatencymode', 'true')
    }else {
      localStorage.setItem('tc_c_dlc_protimeuselatencymode', 'false')
    }
    configUserChanges = true
  }

  // Test protime function
  async function testProTime() {
    dev_pttest = true
    readClipboardText()
  }
  
  // Regular Paste Function
  async function execReadClipboardText() {
    dev_pttest = false
    readClipboardText()
  }

  function clearAllMessages() {
    let messageSectionMessages = document.getElementsByClassName('message')
    for (var index = 0, indexLen = messageSectionMessages.length; index < indexLen; index++) {
      messageSectionMessages[index].classList.add('message--hiddenremove');
    }
    setTimeout(function () {
      messageSection.innerHTML = ''
    }, 400)
  }

  projectDetection()
  // Extension load up
  window.addEventListener("load", (event) => {
    // Display version
    label_version.insertAdjacentHTML('beforeend', extensionVersion)
    label_build_version.insertAdjacentHTML('beforeend', extensionBuild)
    label_extensionDevelop.insertAdjacentHTML('beforeend', extensionAuthor)
    label_extensionCoDevelop.insertAdjacentHTML('beforeend', extensionTesting)
    // Main Buttons Listener
    fillButton.addEventListener('click', execReadClipboardText)
    fillCancelButton.addEventListener('click', cancelPasteData)
    button_dev_pttest.addEventListener('click', testProTime)
    configButton.addEventListener('click', openConfigs)
    button_clearAllMessages.addEventListener('click', clearAllMessages)
    buttonBackToMain.addEventListener('click', openConfigs)
    // Configuration tabs listener
    buttonTab_General.addEventListener('click', configTabOpenGeneral)
    buttonTab_Projects.addEventListener('click', configTabOpenProjects)
    buttonTab_Timesheets.addEventListener('click', configTabOpenTimesheets)
    buttonTab_Bookingsheets.addEventListener('click', configTabOpenBookingsheets)
    configProfileName.addEventListener('change', configSetProfileName)
    // Configs Listener
    button_clearConfigs.addEventListener('click', removeProfile)
    button_reloadDLCCache.addEventListener('click', reloadDLCCache)
    switch_showAllMessages.addEventListener('click', showAllMessagesChange)
    // Help Buttons
    button_docuHelp.addEventListener('click', () => window.open(dokuUrl))
    button_docuDatenschutz.addEventListener('click', () => window.open(privacyUrl))
    button_docuChangelog.addEventListener('click', () => window.open(changelogUrl))
    button_docuReadme.addEventListener('click', () => window.open(readmeUrl))
    button_openStore.addEventListener('click', () => window.open(chromeStoreUrl))
    button_openLicense.addEventListener('click', () => window.open(licenseUrl))
    //Theme Select
    themeSelect.addEventListener('change', switchTheme)

    // filter radios listener
    for (var i = 0, iLen = radios_filter.length; i < iLen; i++) {
      radios_filter[i].addEventListener('click', switchFilter);
    }
    for (var index = 0, indexLen = radio_timesheetFilters.length; index < indexLen; index++) {
      radio_timesheetFilters[index].addEventListener('click', timesheetFilterChange);
    }
    for (var index = 0, indexLen = radio_bookingPlatforms.length; index < indexLen; index++) {
      radio_bookingPlatforms[index].addEventListener('click', bookingPlatformsChange);
    }
    for (var index = 0, indexLen = dlc_platform_element.length; index < indexLen; index++) {
      let dropdownButton = dlc_platform_element[index].getElementsByClassName('button-dropdown')[0]
      dropdownButton.addEventListener('click', dlcPlatformOpenDropdown);
    }
    for (var index = 0, indexLen = dlc_filter_element.length; index < indexLen; index++) {
      let dropdownButton = dlc_filter_element[index].getElementsByClassName('button-dropdown')[0]
      dropdownButton.addEventListener('click', dlcFilterOpenDropdown);
    }
    // Load local storages
    loadStorage()
    loadSessionStorages()
    // load xmas dlc between dezember (11) and march (2)
    if (dateMonth === 11 || dateMonth === 0 || dateMonth === 1 || dateMonth === 2) {
      xmas()
    }
    // devtool
    developer()
  });
})


