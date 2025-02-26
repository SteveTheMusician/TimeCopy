
import data_version from "../public/version.json" with { type: "json" };
import { useLanguage } from "./utils/language.js";
import { message } from "./components/ui/message/message.js";
import { projectDetection } from "./components/content/configuration/projectDetection/projectDetection.js";
import {xmasDlc, 
          platformsContent, platforms, filters, filtersContent, platform_bookingPlatformPreValue, filter_timesheetFilterPreValue} from "./dlc/dlc.js";
import { appStorage, removeProfile,lstorage_cDetectionItems, lstorage_cFilter, lstorage_cBookingPlatform} from "./utils/appStorage.js";
import { clearDlcLocalStorages, reloadDLCCache } from "./utils/dlcStorage.js";
import { consoleWarnMessage_showMessageTurnedOff, dlc_details_classHidden} from "./utils/defaults/defaultVariables.js";
import { profileManager } from "./utils/profileManager.js";
import { developer } from "./developer/developer.js";

document.addEventListener('DOMContentLoaded', async function () {
  // import platform and filter dlcs
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

  const link_cssTheme = document.querySelector('link#link-theme');
  const header = document.querySelector('header');
  const configurations = document.querySelector('div.configurations');
  const overview = document.querySelector('div.overview');
  const messagesHeadline = document.getElementById('messages-headline')
  const elem_messageSection = document.getElementById('messages-section')
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
  // main buttons
  const fillButton = document.querySelector('button#fillButton');
  const fillCancelButton = document.querySelector('button#fillCancelButton');
  const configButton = document.querySelector('button#configButton');
  const button_clearAllMessages = document.getElementById('button_clearAllMessages')
  const button_reloadDLCCache = document.getElementById('button_reloadDLCCache')
  // configuration buttons
  const themeSelect = document.querySelector('select#select-themes')
  const button_clearConfigs = document.getElementById('button_clearConfigs')
  const switch_showAllMessages = document.getElementById('check_showAllNotifications')
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
  dlcProTime_config_check_usePTTest.addEventListener('change', dlcCheckUsePTTest)
  const dlcItem_platform_amagProTime = document.getElementById('dlcItemPlatform_amagprotime')
  window.dlcProTime_usePTTest = false
  let configOpen = false
  window.language = await useLanguage()
  // console.log('Language Object: ',language)
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
  const buildVersion = data_version.extension_build
  const author = data_version.extension_author
  const tester = data_version.extension_testing
  const profileVersion = data_version.profile_version
  const supportedProfileVersions = data_version.supported_profile_versions
  const updateTextOverview = data_version.extension_update_text_overview
  const updateTextDetails = data_version.extension_update_text_details
  // set global vars
  window.appVersionData = [{dokuUrl:dokuUrl,changelogUrl:changelogUrl,privacyUrl:privacyUrl,readmeUrl:readmeUrl,
    chromeStoreUrl:chromeStoreUrl,licenseUrl:licenseUrl,version:version, buildVersion:buildVersion,
    author:author,tester:tester,profileVersion:profileVersion,supportedProfileVersions:supportedProfileVersions,
    updateTextOverview:updateTextOverview,updateTextDetails:updateTextDetails
  }]
  window.appGlobalArgs = [{elem_themeselect: themeSelect,configprofilename: configProfileName,link_csstheme: link_cssTheme,switch_showallmessages: switch_showAllMessages,
    elem_messagesection: elem_messageSection,messagesheadline: messagesHeadline
  }]
  window.dlcGlobalArgs = [{dlcProTime_config_check_useLatencyMode:dlcProTime_config_check_useLatencyMode,dlcProTime_config_check_forceLatencyMode:dlcProTime_config_check_forceLatencyMode,
    dlcProTime_config_check_usePTTest:dlcProTime_config_check_usePTTest,dlcItem_platform_amagProTime:dlcItem_platform_amagProTime
  }]
  // main action buttons functions
  function openConfigs() {
    if (configOpen) {
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
      configButton.classList.add('button--active')
      fillButton.classList.add('object--hidden')
      configurations.classList.remove('dNone')
      overview.classList.add('dNone')
      header.classList.remove('dNone')
      configOpen = true
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
  // process clipboardString through filter and start booking process
  async function pasteProcessData(clipboarsString,filter,bookingPlatform) {

    let filterData = []
    // get all boocking relevant data as array
    try {
      filterData = await filters(filter, clipboarsString)
      console.log("💽 Selected Filter-DLC: " + filter + " | Filtered data: ", filterData)
    } catch (error) {
      console.error("❌ Unable to call bookingData: ", error);
      lockActionButtons('false',fillButton)
      if(switch_showAllMessages.checked) {
        message(true, 'error', window.language.error+': '+window.language.error_noBookingData, window.language.error_noBookingData_disc)
      } else {
        console.warn(consoleWarnMessage_showMessageTurnedOff+' | '+error)
      }
      return
    }
    try {
      console.log("🔘 Selected Platform-DLC: " + bookingPlatform)
      let bookEntries = await platforms(bookingPlatform, filterData, lstorage_cDetectionItems)
      if (bookEntries) {
        console.log("✅ Booking process return okey | ", bookEntries)
        lockActionButtons('false',fillButton)
        if(switch_showAllMessages.checked) {
          message(true, 'information', window.language.message_bookingProcessEnded, bookingPlatform)
        } else {
          console.warn(consoleWarnMessage_showMessageTurnedOff)
        }
      } else {
        console.log("❌ Problem with booking entries: ", bookEntries)
      }
    } catch (error) {
      lockActionButtons('false',fillButton)
      if(switch_showAllMessages.checked) {
        message(true, error.errorstatus, window.language.error + ': ' + error.errorheadline, error.errortext || bookingPlatform)
      } else {
        console.warn(consoleWarnMessage_showMessageTurnedOff)
      }
      console.error('❌ Bookingprocess failed | ', error.errorheadline + ' ' + error.errortext)
      return
    }
  }
  // Main action buttons disable / enable functions
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
  function configTabOpenGeneral() {
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
    localStorage.setItem('tc_c_showAllMessages', showAllMessagesSwitchCurrentStatus )
    configUserChanges = true
  }

  function switchFilter(e) {
    localStorage.setItem('tc_c_filter', e.target.value)
    configUserChanges = true
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

  function dlcProTimeForceLatencyMode(){
    if(dlcProTime_config_check_forceLatencyMode.checked){
      localStorage.setItem('tc_c_dlc_protimeforcelatencymode', 'true')
    }else {
      localStorage.setItem('tc_c_dlc_protimeforcelatencymode', 'false')
    }
    configUserChanges = true
  }

  function dlcProTimeUseLatencyMode(){
    if(dlcProTime_config_check_useLatencyMode.checked){
      localStorage.setItem('tc_c_dlc_protimeuselatencymode', 'true')
    }else {
      localStorage.setItem('tc_c_dlc_protimeuselatencymode', 'false')
    }
    configUserChanges = true
  }

  function dlcCheckUsePTTest(){
    if(dlcProTime_config_check_usePTTest.checked){
      localStorage.setItem('tc_c_dlc_protimetest', 'true')
      dlcItem_platform_amagProTime.classList.add('dlcItem-amagProTime-TestMode')
    }else {
      localStorage.setItem('tc_c_dlc_protimetest', 'false')
      dlcItem_platform_amagProTime.classList.remove('dlcItem-amagProTime-TestMode')
    }
    configUserChanges = true
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

  projectDetection()
  // extension load up
  window.addEventListener("load", (event) => {
    // return message if offline
    if (!navigator.onLine) {
      message(true, 'error', window.language.message_offline, window.language.message_offline_disc)
    }
    // display version
    label_version.insertAdjacentHTML('beforeend', version)
    label_build_version.insertAdjacentHTML('beforeend', buildVersion)
    label_extensionDevelop.insertAdjacentHTML('beforeend', author)
    label_extensionCoDevelop.insertAdjacentHTML('beforeend', tester)
    // main action buttons listener
    fillButton.addEventListener('click', pastePrepairData)
    fillCancelButton.addEventListener('click', cancelPasteData)
    configButton.addEventListener('click', openConfigs)
    button_clearAllMessages.addEventListener('click', clearAllMessages)
    buttonBackToMain.addEventListener('click', openConfigs)
    // configuration tabs listener
    buttonTab_General.addEventListener('click', configTabOpenGeneral)
    buttonTab_Projects.addEventListener('click', configTabOpenProjects)
    buttonTab_Timesheets.addEventListener('click', configTabOpenTimesheets)
    buttonTab_Bookingsheets.addEventListener('click', configTabOpenBookingsheets)
    configProfileName.addEventListener('change', configSetProfileName)
    // configs listener
    button_clearConfigs.addEventListener('click', removeProfile)
    button_reloadDLCCache.addEventListener('click', reloadDLCCache)
    switch_showAllMessages.addEventListener('click', showAllMessagesChange)
    // config help buttons
    button_docuHelp.addEventListener('click', () => window.open(dokuUrl))
    button_docuDatenschutz.addEventListener('click', () => window.open(privacyUrl))
    button_docuChangelog.addEventListener('click', () => window.open(changelogUrl))
    button_docuReadme.addEventListener('click', () => window.open(readmeUrl))
    button_openStore.addEventListener('click', () => window.open(chromeStoreUrl))
    button_openLicense.addEventListener('click', () => window.open(licenseUrl))
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
      profileManager(...window.appGlobalArgs,...appVersionData,window.configUserChanges,...window.dlcGlobalArgs)
      appStorage(...window.appGlobalArgs,...appVersionData,...window.dlcGlobalArgs)
      xmasDlc()
      // devtool
      developer()
      console.log('✅ [Time Copy] extension loaded')
    }catch(e){
      message(true, 'error',window.language.error_appError,e,true)
      console.error(e)
      return
    }
  },);
})


