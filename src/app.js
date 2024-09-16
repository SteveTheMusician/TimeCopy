import { filters } from "./components/dlc/filters/filters.dlc.js";
import { filtersContent } from "./components/dlc/filters/filters.dlc.js";
import { filter_timesheetFilterPreValue } from "./components/dlc/filters/filters.import.js";
import data_version from "../static/version.json" with { type: "json" };
import { notification } from "./components/ui/notification/notification.js";
import { platforms } from "./components/dlc/platforms/platforms.dlc.js";
import { projectDetection } from "./components/content/configuration/projectDetection/projectDetection.js";
import { developer } from "./developer/developer.js";
import { platformsContent } from "./components/dlc/platforms/platforms.dlc.js";
import { platform_functionName_automatic } from "./components/dlc/platforms/platforms.import.js";
import { platform_bookingPlatformPreValue } from "./components/dlc/platforms/platforms.import.js";


document.addEventListener('DOMContentLoaded', async function () {
  let dlc_platformContent = await platformsContent()
  try{
    if(!dlc_platformContent){
      throw new Error('❌ platform contents not loaded')
    }
  }catch(error){
    console.log(error)
    clearDlcLocalStorages()
    return
  }
  let dlc_filterContent = await filtersContent()
  try{
    if(!dlc_filterContent){
      throw new Error('❌ filter contents not loaded')
    }
  }catch(error){
    console.log(error)
    clearDlcLocalStorages()
    return
  }
  const link_cssTheme = document.querySelector('link#link-theme');
  const main = document.querySelector('main');
  const header = document.querySelector('header');
  const configurations = document.querySelector('div.configurations');
  const overview = document.querySelector('div.overview');
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
  const button_dev_pttest = document.querySelector('button#button_test_pasteTicketData');
  const fillButton = document.querySelector('button#fillButton');
  const configButton = document.querySelector('button#configButton');

  // Configuration Buttons
  const themeSelect = document.querySelector('select#select-themes');
  const languageSelect = document.querySelector('select#select-language');
  const button_clearConfigs = document.getElementById('button_clearConfigs')
  const radios_filter = document.getElementsByName('timesheet-filter');
  const button_openHelp = document.getElementById('button_openHelp')
  const button_openHelpTimesheetTobias = document.getElementById('tobiasFilterInfo')
  const radio_timesheetFilters = document.getElementsByName('timesheet-filter')
  
  // Platform-DLC Elements and Listener
  const radio_bookingPlatforms = document.getElementsByName('booking-platform')
  const dlc_platform_element = document.getElementsByClassName('dlcItem-platform')
  const dlc_filter_element = document.getElementsByClassName('dlcItem-filter')
  const config_check_showProTimeTestButton = document.getElementById('check_showProTimetestButton')
  config_check_showProTimeTestButton.addEventListener('change', dlcShowProTimeTestButton);
  const button_pasteTicketData = document.getElementById('button_test_pasteTicketData')

  // local storages
  let lstorage_cThemes = localStorage.getItem('tc_c_theme')
  let lstorage_cLanguage = localStorage.getItem('tc_c_language')
  let lstorage_cFilter = localStorage.getItem('tc_c_filter')
  let lstorage_cDetectionItems = localStorage.getItem('tc_c_projectDetection')
  let lstorage_cProfileName = localStorage.getItem('tc_c_profileName')
  let lstorage_cBookingPlatform = localStorage.getItem('tc_c_bookingPlatform')

  // Some vars
  let configOpen = false
  let dev_pttest = false
  // this variable activates tc reloading after pressing the back button when its set to true
  let configUserChanges = false
  const dlc_details_classHidden = 'dlc-details--hidden'

  let helpUrl = "https://github.com/EmptySoulOfficial/TimeCopy/blob/main/accesories/documentation/Help.md"
  let helpUrl_timesheet_tobias = helpUrl + "#timesheet-tobias"
  let helpUrl_timesheet_steve = helpUrl + "#timesheet-steve-google-excel"
  const extensionVersion = data_version.extension_version
  const extensionBuild = data_version.extension_build
  const extensionAuthor = data_version.extension_author
  const extensionCoAuthor = data_version.extension_co_author
  let tcprofileVersion = data_version.profile_version

  // some sessionstorages for temp-messages and data
  function loadSessionStorages() {
    let sMessageImported = sessionStorage.getItem('tc_c_messageImported')
    let sMessageProfileRemoved = sessionStorage.getItem('tc_c_messageProfileRemoved')
    let sExportFile_afterChange = sessionStorage.getItem('tc_c_exportFile_afterChange')
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
    
  }
  // Load localstorage
  function loadStorage() {
    // Default variables
    const defaultProfileName = "Default"
    const defaultTheme = "oceanswave"
    const defaultLanguage = 'de'
    let language = ''
    let defaultBookingPlatform = platform_functionName_automatic

    if (lstorage_cThemes && lstorage_cThemes !== 'null' && lstorage_cThemes !== ' ') {
      themeSelect.value = lstorage_cThemes
      link_cssTheme.setAttribute('href', './assets/style/themes/' + lstorage_cThemes + '/' + lstorage_cThemes + '.css')
    } else {
      themeSelect.value = defaultTheme
      link_cssTheme.setAttribute('href', './assets/style/themes/' + defaultTheme + '/' + defaultTheme + '.css')
    }
    // if (lstorage_cLanguage) {
    // languageSelect.value = lstorage_cLanguage
    // language = lstorage_cLanguage
    // } else {
    // languageSelect.value = defaultLanguage
    // language = defaultLanguage
    // }

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
    console.log('✅ [Time Copy] extension loaded')
  }

  // Clear local storage
  function clearLocalStorage() {
    localStorage.removeItem('tc_c_theme')
    localStorage.removeItem('tc_c_language')
    localStorage.removeItem('tc_c_filter')
    localStorage.removeItem('tc_c_projectDetection')
    localStorage.removeItem('tc_c_profileName')
    localStorage.removeItem('tc_c_bookingPlatform')
    clearDlcLocalStorages()
  }

  function clearDlcLocalStorages(){
    // DLC Storages
    localStorage.removeItem('tc_s_dlcplatforminformations')
    localStorage.removeItem('tc_s_dlcfilterinformations')
  }

  function clearSessionStorage() {
    sessionStorage.removeItem('tc_c_messageImported')
    sessionStorage.removeItem('tc_c_messageProfileRemoved')
    sessionStorage.removeItem('tc_c_changeLanguage')
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

  function dlcPlatformOpenDropdown(e){
    let dlc_platformElement = e.target.closest(".dlcItem-platform")
    let dlc_platformDropDownButton = e.target.closest("button")
    let dlc_platformInformationContainer = dlc_platformElement.getElementsByClassName('dlcItem-details-container')[0]
    if(dlc_platformInformationContainer.classList.contains(dlc_details_classHidden)){
      dlc_platformInformationContainer.classList.remove(dlc_details_classHidden)
      dlc_platformDropDownButton.classList.add('button-dropdown--active')
    }else {
      dlc_platformInformationContainer.classList.add(dlc_details_classHidden)
      dlc_platformDropDownButton.classList.remove('button-dropdown--active')
    }
  }

  function dlcFilterOpenDropdown(e){
    let dlc_filterElement = e.target.closest(".dlcItem-filter")
    let dlc_filterDropDownButton = e.target.closest("button")
    let dlc_filterInformationContainer = dlc_filterElement.getElementsByClassName('dlcItem-details-container')[0]
    if(dlc_filterInformationContainer.classList.contains(dlc_details_classHidden)){
      dlc_filterInformationContainer.classList.remove(dlc_details_classHidden)
      dlc_filterDropDownButton.classList.add('button-dropdown--active')
    }else {
      dlc_filterInformationContainer.classList.add(dlc_details_classHidden)
      dlc_filterDropDownButton.classList.remove('button-dropdown--active')
    }
  }

  function configSetProfileName() {
    localStorage.setItem('tc_c_profileName', configProfileName.value)
    configUserChanges = true
  }

  function switchTheme() {
    let currentThemeValue = themeSelect.value
    link_cssTheme.setAttribute('href', './assets/style/themes/' + currentThemeValue + '/' + currentThemeValue + '.css')
    localStorage.setItem('tc_c_theme', currentThemeValue)
    configUserChanges = true
  }

  function switchLanguage() {
    let currentLanguageValue = languageSelect.value
    localStorage.setItem('tc_c_language', currentLanguageValue)
    configUserChanges = true
    sessionStorage.setItem('tc_c_changeLanguage', true)
    loadStorage()
    window.location.reload()
  }

  function switchFilter(e) {
    localStorage.setItem('tc_c_filter', e.target.value)
    configUserChanges = true
  }

  function openHelp() {
    window.open(helpUrl)
  }

  function dlcShowProTimeTestButton() {
    if (config_check_showProTimeTestButton.checked) {
      button_pasteTicketData.classList.remove('dNone')
      localStorage.setItem('tc_c_dev_pttest', 'true')
    } else {
      button_pasteTicketData.classList.add('dNone')
      localStorage.setItem('tc_c_dev_pttest', 'false')
    }
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
      console.log(validateFileVersion)
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
        // notification(true, true, 'Profil wurde gerfolgreich geladen. Starte neu...')
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

  // Main Functions
  async function readClipboardText() {

    let clipboarsString = await navigator.clipboard.readText();
    let filter = lstorage_cFilter
    let bookingPlatform = lstorage_cBookingPlatform
    // check whitch filter to use
    try {
      if (filter === '' || filter === null) {
        throw new Error("Bitte wähle einen Filter!")
      }
      if (bookingPlatform === '' || bookingPlatform === null) {
        throw new Error("Bitte wähle eine Buchungsplatform!")
      }
      if (lstorage_cDetectionItems === '' || lstorage_cDetectionItems === null) {
        throw new Error("Bitte erstelle mindestens ein Erkennungs-Item !")
      }
      processData(filter, clipboarsString, bookingPlatform, dev_pttest)

    } catch (error) {
      notification(true, false, error)
      return
    }
  }

  async function processData(filter, clipboarsString, bookingPlatform, dev_pttest) {

    let timesheetData = []
    // get all boocking relevant data as array
    try {
      timesheetData = await filters(filter, clipboarsString)
      console.log("Timesheet Data: ", timesheetData)
    } catch (error) {
      console.error("Unable to call bookingData: ", error);
      notification(true, false, 'Fehler: Buchungsdaten konnten nicht aufgerufen werden')
      return
    }
    console.log("App Booking Platform "+bookingPlatform)
    let bookEntries = await platforms(bookingPlatform, timesheetData, lstorage_cDetectionItems, dev_pttest)
    try{
      if (bookEntries) {
      // notification(true, true, bookEntries) --> Buchungsbestätigung erst rein machen ,wenn alle anderen Notifications stehen
      console.log("✅ Booking process return okey | ", bookEntries)
      }else {
        throw new Error('❌ Bookingprocess failed')
      }
    }catch(error){
      console.log(error)
      return
    }

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

  projectDetection()
  // Extension load up
  window.addEventListener("load", (event) => {
    // Display version
    label_version.insertAdjacentHTML('beforeend', extensionVersion);
    label_build_version.insertAdjacentHTML('beforeend', extensionBuild);
    label_extensionDevelop.insertAdjacentHTML('beforeend', extensionAuthor);
    label_extensionCoDevelop.insertAdjacentHTML('beforeend', extensionCoAuthor);
    // Main Buttons Listener
    fillButton.addEventListener('click', execReadClipboardText);
    button_dev_pttest.addEventListener('click', testProTime);
    configButton.addEventListener('click', openConfigs);
    buttonBackToMain.addEventListener('click', openConfigs);
    // Configuration tabs listener
    buttonTab_General.addEventListener('click', configTabOpenGeneral);
    buttonTab_Projects.addEventListener('click', configTabOpenProjects);
    buttonTab_Timesheets.addEventListener('click', configTabOpenTimesheets);
    buttonTab_Bookingsheets.addEventListener('click', configTabOpenBookingsheets);
    configProfileName.addEventListener('change', configSetProfileName)
    // Configs Listener
    button_clearConfigs.addEventListener('click', removeProfile);
    button_openHelp.addEventListener('click', openHelp)
    themeSelect.addEventListener('change', switchTheme);
    // languageSelect.addEventListener('change', switchLanguage);
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
    // devtool
    developer()
  });
})


