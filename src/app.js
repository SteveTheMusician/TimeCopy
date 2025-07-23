

import data_version from "../public/version.json" with { type: "json" };
import { useLanguage } from "./utils/language.js";
import { message } from "./components/ui/message/message.js";
import { projectDetection } from "./components/content/configuration/projectDetection/projectDetection.js";
import {xmasDlc, 
          platformsContent, platforms, filters, filtersContent, platform_bookingPlatformPreValue, filter_timesheetFilterPreValue} from "./dlc/dlc.js";
import { appStorage, removeProfile,lstorage_cDetectionItems, lstorage_cFilter, lstorage_cBookingPlatform, lstorage_cBookingScore} from "./utils/appStorage.js";
import { clearDlcLocalStorages, reloadDLCCache,setDLCAmagProTimeTestStyle } from "./utils/dlcStorage.js";
import { consoleWarnMessage_showMessageTurnedOff, dlc_details_classHidden,default_e} from "./utils/defaults/defaultVariables.js";
import { profileManager } from "./utils/profileManager.js";
import { generateThemes } from "./components/ui/selectThemes/selectThemes.js";
import { setScoreValues } from "./utils/setScorevalues.js";
import { debugStick } from "./utils/appDebugStick.js";
<<<<<<< HEAD
=======
import { showHideStatusBar } from "./utils/switchFunctionHandlers.js";
import { setStatusBarText } from "./utils/setStatusBarText.js";
// ‼️ remove developer on prod
import { developer } from "./developer/developer.js";
>>>>>>> develop

// savety function to prevent unwanted webpage content manipulation (triggered by window.onload)
function isTimeCopy() {
  try {
    // only true if sidebar content is loaded
    return location.href.startsWith(chrome.runtime.getURL(''));
  } catch (e) {
    return false;
  }
}
// catch reload loops
window.onload = function () {
  // load savety function
  if (!isTimeCopy()) {
    // console.log("[Time Copy] Window.onload skipped");
    return;
  }
  let restartCount = Number(sessionStorage.getItem('tc_s_restartCount')) || 0;
  restartCount++;
  sessionStorage.setItem('tc_s_restartCount', restartCount);
  if (restartCount >= 4) {
    // block ui
    document.body.innerHTML = `<p class="bodyErrorText">App was started too many times. (Time Copy)</p>`;
    try {
      throw new Error("App was started too many times. To block restart loops, the app hast stopped. | RestartCount: "+restartCount);
    } catch (e) {
      console.error(e);
    }
    return;
  }
};
// app main
document.addEventListener('DOMContentLoaded', async function () {
  // import platform and filter dlcs
  try {
    let dlc_platformContent = await platformsContent()
    if (!dlc_platformContent.success) {
      throw new Error('❌ DLC Platform contents not loaded')
    }
    debugStick(dlc_platformContent,dlc_platformContent.feedback)
  } catch (error) {
    console.log(error)
    clearDlcLocalStorages()
    return
  }
  try {
    let dlc_filterContent = await filtersContent()
    if (!dlc_filterContent.success) {
      throw new Error('❌ DLC Filter contents not loaded')
    }
    debugStick(dlc_filterContent,dlc_filterContent.feedback)
  } catch (error) {
    console.error(error+ " | app")
    clearDlcLocalStorages()
    return
  }
  
  const link_cssTheme = document.querySelector('link#link-theme')
  const header = document.querySelector('header')
  const configurations = document.querySelector('div.configurations')
  const overview = document.querySelector('div.overview')
  const messagesHeadline = document.getElementById('messages-headline')
  const elem_messageSection = document.getElementById('messages-section')
  const configurationsContainer = document.getElementById('config-container')
  const configWindow_getAll = document.getElementsByClassName('configuration-window')
  const configProfileName = document.getElementById('configProfileName')
  const profilePictureUser = document.getElementById('profile_picture_user')
  const profileSVG = document.getElementById('Profile')
  const configProfileScore_RangScore = document.getElementById('configProfileScore_RangScore')
  const configProfileScore_RangName = document.getElementById('configProfileScore_RangName')
  const statusBarProfileScore_RangScore = document.getElementById('statusBarProfileScore_RangScore')
  const statusBarProfileScore_RangName = document.getElementById('statusBarProfileScore_RangName')
  const statusBar = document.getElementById('statusBar')
  // tab buttons
  const buttonsTab_getAll = document.getElementsByClassName('button-config-tab')
  const buttonTab_General = document.querySelector('button#button-tab-general')
  const buttonTab_Timesheets = document.querySelector('button#button-tab-timesheets')
  const buttonTab_Bookingsheets = document.querySelector('button#button-tab-bookingsheets')
  const buttonTab_Projects = document.querySelector('button#button-tab-projects')
  const buttonBackToMain = document.querySelector('button#buttonBackToMain')
  // main buttons
  const fillButton = document.querySelector('button#fillButton')
  const fillCancelButton = document.querySelector('button#fillCancelButton')
  const configButton = document.querySelector('button#configButton')
  const button_clearAllMessages = document.getElementById('button_clearAllMessages')
  // configuration buttons
  const profileOptionsSelect = document.getElementById('selectProfileOptions')
  const profilePicture = document.getElementById('profile_picture')
  const button_importProfilePicture = document.getElementById('button_importProfilePicture')
  const themeSelect = document.querySelector('select#select-themes')
  const switch_showAllMessages = document.getElementById('check_showAllNotifications')
  const switch_showStatusBar = document.getElementById('check_showStatusBar')
  const radios_filter = document.getElementsByName('timesheet-filter')
  const button_docuHelp = document.getElementById('button_openHelp')
  const button_docuReadme = document.getElementById('button_openReadme')
  const button_docuChangelog = document.getElementById('button_openChangelog')
  const button_docuDatenschutz = document.getElementById('button_openDatenschutz')
  const button_openStore = document.getElementById('button_openStore')
  const button_openLicense = document.getElementById('button_openLicense')
  const radio_timesheetFilters = document.getElementsByName('timesheet-filter')

  // dlc-platform element listeners
  const radio_bookingPlatforms = document.getElementsByName('booking-platform')
  const dlc_platform_element = document.getElementsByClassName('dlcItem-platform')
  const dlc_filter_element = document.getElementsByClassName('dlcItem-filter')
  const dlcProTime_config_check_forceLatencyMode = document.getElementById('check_forceLatencyModeProTime')
  dlcProTime_config_check_forceLatencyMode.addEventListener('change', dlcProTimeForceLatencyMode)
  const dlcProTime_config_check_useLatencyMode = document.getElementById('check_useLatencyModeProTime')
  dlcProTime_config_check_useLatencyMode.addEventListener('change', dlcProTimeUseLatencyMode)
  const dlcProTime_config_check_usePTTest = document.getElementById('check_useProTimeTestMode')
  dlcProTime_config_check_usePTTest.addEventListener('change', dlcProTimeCheckUsePTTest)
  const dlcProTime_config_check_useTicketnomberInText = document.getElementById('check_useTicketnomberInTextProTime')
  dlcProTime_config_check_useTicketnomberInText.addEventListener('change', dlcProTimeUseTicketNomberInText)
  const dlcItem_platform_amagProTime = document.getElementById('dlcItemPlatform_amagprotime')
  const dlcProTime_config_check_useMatchBookingDay = document.getElementById('check_useMatchBookingDayProTime')
  dlcProTime_config_check_useMatchBookingDay.addEventListener('change', dlcProTimeUseMatchBookingDay)
  const dlcProTime_config_check_useAutoSelectDay = document.getElementById('check_useAutoSelectDayProTime')
  dlcProTime_config_check_useAutoSelectDay.addEventListener('change', dlcProTimeUseAutoSelectDay)
  let bookingScore = 0
  let configOpen = false
  try{
    window.language = await useLanguage()
  }catch(error){
    console.error(error + ' The problem occurs, when useLanguage gets an country-code, which does not exist as json file.'+ " | app")
    message(true, 'error', 'APP LANGUAGE ERROR' , error, true)
    return
  }
  // console.log('Language Object: ',window.language)
  // this variable activates tc reloading after pressing the back button when its set to true
  window.configUserChanges = false
  // version json vars
  const dokuUrl = data_version.extension_documentation
  const changelogUrl = data_version.extension_changelog
  const privacyUrl = data_version.extension_privacy
  const readmeUrl = data_version.extension_readme
  const chromeStoreUrl = data_version.extension_chromestore
  const licenseUrl = data_version.extension_license
  const version = data_version.extension_version
  const versionName = data_version.extension_version_name
  const buildVersion = data_version.extension_build
  const author = data_version.extension_author
  const tester = data_version.extension_testing
  const profileVersion = data_version.profile_version
  const profileType = data_version.profile_type
  const supportedProfileVersions = data_version.supported_profile_versions
  const supportedProfileTypes = data_version.supported_profile_types
  const updateTextOverview = data_version.extension_update_text_overview
  const updateTextDetails = data_version.extension_update_text_details

  function reloadChangeHandler(){
    if (window.configUserChanges === true) {
        window.location.reload()
    }
  }
  // main action buttons functions
  function openConfigs() {
    if (configOpen) {
      configButton.classList.remove('button--active')
      fillButton.classList.remove('object--hidden')
      configurations.classList.add('dNone')
      overview.classList.remove('dNone')
      header.classList.add('dNone')
      statusBar.classList.remove('dNone')
      configOpen = false
      reloadChangeHandler()
    } else {
      configButton.classList.add('button--active')
      fillButton.classList.add('object--hidden')
      configurations.classList.remove('dNone')
      overview.classList.add('dNone')
      header.classList.remove('dNone')
      statusBar.classList.add('dNone')
      configOpen = true
      let lstorage_cLastConfigTab = localStorage.getItem('tc_c_lastConfigTab')
      if(lstorage_cLastConfigTab !== '' && lstorage_cLastConfigTab !== null) {
        document.getElementById('button-tab-'+lstorage_cLastConfigTab).click()
      }
    }
  }
  // cancel
  function cancelPasteData(){
    chrome.tabs.reload(function(){});
    window.location.reload()
  }
  // paste
  async function pastePrepairData() {
    lockActionButtons('true',fillButton)
    let clipboarsString = await navigator.clipboard.readText();
    let filter = lstorage_cFilter
    let bookingPlatform = lstorage_cBookingPlatform
    // check whitch filter to use
    try {
      if (filter === '' || filter === null) {
        throw new Error(window.language.error_selectFilter)
      }
      if (bookingPlatform === '' || bookingPlatform === null) {
        throw new Error(window.language.error_selectPlatform)
      }
      // (i) Length 2 is equal to an empty array []
      if (lstorage_cDetectionItems === '' || lstorage_cDetectionItems === null) {
        throw new Error(window.language.error_addDetection)
      }
      pasteProcessData(clipboarsString,filter,bookingPlatform)

    } catch (error) {
      lockActionButtons('false',fillButton)
      if(switch_showAllMessages.checked) {
        message(true, 'warning', error, '')
      } else {
        console.warn(consoleWarnMessage_showMessageTurnedOff+' | '+error)
      }
      return
    }
  }
  // process clipboard string through filter and start booking process
  async function pasteProcessData(clipboarsString,filter,bookingPlatform) {
    debugStick(clipboarsString,'Clipboard String - APP')
    let filterData = []
    // get all boocking relevant data as array
    try {
      setStatusBarText('Filtere Daten...')
      filterData = await filters(filter, clipboarsString)
      debugStick(filterData,"💽 Selected Filter-DLC: " + filter)
    } catch (error) {
      console.error("❌ Unable to call bookingData: ", error + " | app");
      lockActionButtons('false',fillButton)
      if(switch_showAllMessages.checked) {
        message(true, 'error', window.language.error+': '+window.language.error_noBookingData, window.language.error_noBookingData_disc)
      } else {
        console.warn(consoleWarnMessage_showMessageTurnedOff+' | '+error)
      }
      return
    }
    try {
      debugStick(bookingPlatform,"🔘 Selected Platform-DLC: ")
      setStatusBarText('Übertrage Daten an Platform...')
      let bookEntries = await platforms(bookingPlatform, filterData, lstorage_cDetectionItems)
      let detailMessage = ''
      if (bookEntries.success) {
        debugStick(bookEntries,"✅ Booking process finished | ")
        lockActionButtons('false',fillButton)
        if(switch_showAllMessages.checked) {
          detailMessage = bookEntries.successMessage+' - '
          message(true, 'information', window.language.message_bookingProcessEnded,detailMessage+bookingPlatform)
        } else {
          console.warn(consoleWarnMessage_showMessageTurnedOff)
        }
        // score counter
        if(!bookEntries.testMode) {
          if(lstorage_cBookingScore > "0") {
          bookingScore = localStorage.getItem('tc_c_bookingScore')
          } 
          bookingScore ++
          localStorage.setItem('tc_c_bookingScore', bookingScore)
          try {
            setScoreValues(bookingScore,...window.appGlobalArgs)
          } catch (error) {
            console.error('Set Score Error: ',error)
          }
        }
      } else {
        console.log("❌ Problem with booking entries: ", bookEntries)
      }
    } catch (error) {
      debugStick(error,"Booking Error-Feedback: ")
      lockActionButtons('false',fillButton)
      if(switch_showAllMessages.checked) {
        message(true, error.errorstatus, window.language.error + ': ' + error.errorheadline, error.errortext || bookingPlatform)
      } else {
        console.warn(consoleWarnMessage_showMessageTurnedOff)
      }
      console.error('❌ Bookingprocess failed | ', error.errorheadline + ' ' + error.errortext + " | app ")
      return
    }
  }
  // main action buttons disable / enable functions
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
  // config tabs functions
  function removeTabActiveClass() {
    [].forEach.call(buttonsTab_getAll, function (buttonsTab_getAll) {
      buttonsTab_getAll.classList.remove('button-tab--active');
    });
    [].forEach.call(configWindow_getAll, function (configWindow_getAll) {
      configWindow_getAll.classList.add('dNone');
    });
  }

  function switchConfigTab(elemId,elem) {
    removeTabActiveClass()
    elem.classList.add('button-tab--active')
    let idName = elemId.split('-')[2]
    let configWindowToShow = document.getElementById('config-win-'+idName)
    configWindowToShow.classList.remove('dNone')
    if(idName === "general") {
      configurationsContainer.classList.add('configuration-container-first-tab-selected')
    } else {
       configurationsContainer.classList.remove('configuration-container-first-tab-selected')
    }
    localStorage.setItem('tc_c_lastConfigTab',idName)
  }

  // configuration functions
  function timesheetFilterChange(e) {
    let timesheetFilterValue = e.target.value.split(filter_timesheetFilterPreValue)[1]
    localStorage.setItem('tc_c_filter', timesheetFilterValue)
    window.configUserChanges = true
  }

  function bookingPlatformsChange(e) {
    let bookingPlatformValue = e.target.value.split(platform_bookingPlatformPreValue)[1]
    localStorage.setItem('tc_c_bookingPlatform', bookingPlatformValue)
    window.configUserChanges = true
  }

  function configSetProfileName() {
    localStorage.setItem('tc_c_profileName', configProfileName.value)
    window.configUserChanges = true
    if (configProfileName.value === 'LOVE') {
      localStorage.setItem('tc_ee_exoticTheme', 'true')
    }
  }

  function selectProfileOption() {
    let selectProfileOptionResetvalue = "selectProfileOptions_none"
    let currentProfileSelectValue = profileOptionsSelect.value
    if(currentProfileSelectValue === 'selectProfile_import') {
      button_importConfigs.click()
    }
    if(currentProfileSelectValue === 'selectProfile_export') {
      button_exportConfigs.click()
    }
    if(currentProfileSelectValue === 'selectAppData_delete'){
      removeProfile()
    }
    if(currentProfileSelectValue === 'selectAppData_deleteDLCCache'){
      reloadDLCCache()
    }
    // reset select
    profileOptionsSelect.value = selectProfileOptionResetvalue
  }

  function switchTheme() {
    let currentThemeValue = themeSelect.value
    if (currentThemeValue.includes(default_e)) {
      let newThemeValue = currentThemeValue.replace(default_e,'')
      link_cssTheme.setAttribute('href', './static/Style/themes/ee/exotic/' + newThemeValue + '.css')
    } else {
      link_cssTheme.setAttribute('href', './static/Style/themes/' + currentThemeValue + '/' + currentThemeValue + '.css')
    }
    localStorage.setItem('tc_c_theme', currentThemeValue)
    window.configUserChanges = true
  }

  function showAllMessagesChange() {
    let showAllMessagesSwitchCurrentStatus = switch_showAllMessages.checked
    localStorage.setItem('tc_c_showAllMessages', showAllMessagesSwitchCurrentStatus )
    window.configUserChanges = true
  }

  function showStatusBarChange() {
    let showStatusBarSwitchCurrentStatus = switch_showStatusBar.checked
    localStorage.setItem('tc_c_showStatusBar',showStatusBarSwitchCurrentStatus )
    showHideStatusBar(showStatusBarSwitchCurrentStatus,...window.appGlobalArgs)
    window.configUserChanges = true
  }

  function switchFilter(e) {
    localStorage.setItem('tc_c_filter', e.target.value)
    window.configUserChanges = true
  }

  function showBuildVersion(e){
    if(e.shiftKey){
      configItem_content_row_build_version.classList.remove('dNone')
    }
  }

  function setCreatorStorage(e){
    if(e.shiftKey){
      localStorage.setItem('tc_creator','')
      localStorage.setItem('tc_debugStick','')
    }
  }

  // dlc functions
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

  function dlcProTimeForceLatencyMode(e){
    localStorage.setItem('tc_c_dlc_proTimeForceLatencyMode', e.target.checked)
    window.configUserChanges = true
  }

  function dlcProTimeUseLatencyMode(e){
    localStorage.setItem('tc_c_dlc_proTimeUseLatencyMode', e.target.checked)
    window.configUserChanges = true
  }

  function dlcProTimeCheckUsePTTest(){
    localStorage.setItem('tc_c_dlc_proTimeTest', dlcProTime_config_check_usePTTest.checked)
    setDLCAmagProTimeTestStyle(dlcProTime_config_check_usePTTest.checked,...window.dlcGlobalArgs )
    window.configUserChanges = true
  }

  function dlcProTimeUseTicketNomberInText(e){
    localStorage.setItem('tc_c_dlc_proTimeTicketNomberInText', e.target.checked)
    window.configUserChanges = true
  }

  function dlcProTimeUseMatchBookingDay(e) {
    localStorage.setItem('tc_c_proTimeMatchBookingDay', e.target.checked)
    window.configUserChanges = true
  }

  function dlcProTimeUseAutoSelectDay(e) {
    localStorage.setItem('tc_c_proTimeAutoSelectDay', e.target.checked)
    window.configUserChanges = true
  }

  function clearAllMessages() {
    let elem_messageSectionMessages = document.getElementsByClassName('message')
    for (var index = 0, indexLen = elem_messageSectionMessages.length; index < indexLen; index++) {
      elem_messageSectionMessages[index].classList.add('message--hiddenremove');
    }
    setTimeout(function () {
      elem_messageSection.innerHTML = ''
    }, 400)
  }
  // load ui components
  projectDetection()
  generateThemes()
  // extension load up
  window.addEventListener("load", (event) => {
    // set global vars
    window.appVersionData = [{dokuUrl:dokuUrl,changelogUrl:changelogUrl,privacyUrl:privacyUrl,readmeUrl:readmeUrl,
      chromeStoreUrl:chromeStoreUrl,licenseUrl:licenseUrl,version:version, versionName: versionName, buildVersion:buildVersion,
      author:author,tester:tester,profileVersion:profileVersion,profileType: profileType,supportedProfileVersions:supportedProfileVersions,
      supportedProfileTypes: supportedProfileTypes,updateTextOverview:updateTextOverview,updateTextDetails:updateTextDetails
    }]
    window.appGlobalArgs = [{elem_themeselect: themeSelect,configprofilename: configProfileName,link_csstheme: link_cssTheme,switch_showallmessages: switch_showAllMessages,
      switch_showStatusBar: switch_showStatusBar,elem_messagesection: elem_messageSection,messagesheadline: messagesHeadline, elem_configButton: configButton,elem_profilePictureUser: profilePictureUser, 
      elem_profileSVG: profileSVG,elem_profilePicture: profilePicture, elem_button_importProfilePicture: button_importProfilePicture, elem_configProfileScore_RangScore: configProfileScore_RangScore,
      elem_configProfileScore_RangName: configProfileScore_RangName,elem_statusBarProfileScore_RangScore:statusBarProfileScore_RangScore,elem_statusBarProfileScore_RangName:statusBarProfileScore_RangName,elem_statusBar: statusBar
    }]
    window.dlcGlobalArgs = [{dlcProTime_config_check_useLatencyMode:dlcProTime_config_check_useLatencyMode,dlcProTime_config_check_forceLatencyMode:dlcProTime_config_check_forceLatencyMode,
      dlcProTime_config_check_usePTTest:dlcProTime_config_check_usePTTest,dlcItem_platform_amagProTime:dlcItem_platform_amagProTime, dlcProTime_config_check_useTicketnomberInText: dlcProTime_config_check_useTicketnomberInText,
      dlcProTime_config_check_useMatchBookingDay: dlcProTime_config_check_useMatchBookingDay,dlcProTime_config_check_useAutoSelectDay:dlcProTime_config_check_useAutoSelectDay
    }]
    debugStick([...window.appVersionData,...window.appGlobalArgs,...window.dlcGlobalArgs],'App Global Args')
    // return message if offline
    if (!navigator.onLine) {
      message(true, 'error', window.language.message_offline, window.language.message_offline_disc)
    }
    // display version
    label_version.insertAdjacentHTML('beforeend', version)
    label_version_name.insertAdjacentHTML('beforeend', versionName)
    label_build_version.insertAdjacentHTML('beforeend', buildVersion)
    label_extensionDevelop.insertAdjacentHTML('beforeend', author)
    label_extensionCoDevelop.insertAdjacentHTML('beforeend', tester)
    // add aceppted profile formats
    button_importConfigs.setAttribute('accept',profileType+", "+supportedProfileTypes.toString())
    // main action buttons listener
    fillButton.addEventListener('click', pastePrepairData)
    fillCancelButton.addEventListener('click', cancelPasteData)
    configButton.addEventListener('click', openConfigs)
    button_clearAllMessages.addEventListener('click', clearAllMessages)
    buttonBackToMain.addEventListener('click', openConfigs)
    // configuration tabs listener
    buttonTab_General.addEventListener('click', () => switchConfigTab(buttonTab_General.id,buttonTab_General))
    buttonTab_Projects.addEventListener('click', () => switchConfigTab(buttonTab_Projects.id,buttonTab_Projects))
    buttonTab_Timesheets.addEventListener('click', () => switchConfigTab(buttonTab_Timesheets.id,buttonTab_Timesheets))
    buttonTab_Bookingsheets.addEventListener('click', () => switchConfigTab(buttonTab_Bookingsheets.id,buttonTab_Bookingsheets))
    configProfileName.addEventListener('change', configSetProfileName)
    // configs listener
    switch_showAllMessages.addEventListener('click', showAllMessagesChange)
    switch_showStatusBar.addEventListener('click', showStatusBarChange)
    // config help buttons
    button_docuHelp.addEventListener('click', () => window.open(dokuUrl))
    button_docuDatenschutz.addEventListener('click', () => window.open(privacyUrl))
    button_docuChangelog.addEventListener('click', () => window.open(changelogUrl))
    button_docuReadme.addEventListener('click', () => window.open(readmeUrl))
    button_openStore.addEventListener('click', () => window.open(chromeStoreUrl))
    button_openLicense.addEventListener('click', () => window.open(licenseUrl))
    // other
    label_version_name.addEventListener('click', (e) => showBuildVersion(e))
    label_extensionDevelop.addEventListener('click', (e) => setCreatorStorage(e))
    profileOptionsSelect.addEventListener('change', selectProfileOption)
    //theme select
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
    try{
      // load needed app functions
      profileManager(...window.appGlobalArgs,...appVersionData,...window.dlcGlobalArgs)
      appStorage(...window.appGlobalArgs,...appVersionData,...window.dlcGlobalArgs)
      xmasDlc()
      // reset restart count
      setTimeout(function(){
        if(sessionStorage.getItem('tc_s_restartCount') < "4"){
          sessionStorage.removeItem('tc_s_restartCount')
        }
      },300)
      console.log('✅ [Time Copy] extension loaded')
      setStatusBarText('Extension loaded','timeout')
    }catch(e){
      message(true, 'error',window.language.error_appError,e,true)
      console.error(e+ " | app")
      return
    }
  },);
})


