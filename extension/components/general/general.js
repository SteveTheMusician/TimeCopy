// configurations listener
themeSelect.addEventListener('change', switchTheme);
// filter radios listener
for (var i=0, iLen=radios_filter.length; i<iLen; i++) {
  radios_filter[i].addEventListener('click', switchFilter);
}
button_clearConfigs.addEventListener('click', clearLocalStorage);

// configuration functions
function switchTheme() {
    let currentThemeValue = themeSelect.value
    link_cssTheme.setAttribute('href', 'style/themes/'+currentThemeValue+'/'+currentThemeValue+'.css' )
    localStorage.setItem('tc_c_theme', currentThemeValue)
   }
  
   function switchFilter(e) {
    localStorage.setItem('tc_c_filter', e.target.value)
   }
  
  // import time copy profile
  let button_importConfigs = document.getElementById('button_importConfigs');
  button_importConfigs.addEventListener("change", importFile, false);
  
  function importFile(event){
    var files = event.target.files,
    reader = new FileReader();
    reader.addEventListener("load", function() {
    let fileData = this.result;
    fileData = JSON.parse(fileData)
    // set data
    localStorage.setItem('tc_c_theme', fileData.cfg.theme)
    localStorage.setItem('tc_c_projectDetection',JSON.stringify(fileData.cfg.detection_filter))
  });
    reader.readAsText(files[0])
    alert('To apply the changes, please reopen the extension.')
  }
  
  // Export Configs as Json
  let button_exportConfigs = document.getElementById('button_exportConfigs');
  button_exportConfigs.addEventListener('click', (event) => {
    let detectionItems = localStorage.getItem('tc_c_projectDetection')
    detectionItems = JSON.parse(detectionItems)
    let lstorage_cThemes = localStorage.getItem('tc_c_theme')
    let lstorage_cFilter = localStorage.getItem('tc_c_filter')
  
    let saveObj = {"tcprofile":{"author":"steve","version":"1.0"}}
  
    // apply values
    saveObj = {...saveObj, "cfg":{"theme": lstorage_cThemes, "detection_filter": detectionItems}}
    // file setting
    const data = JSON.stringify(saveObj);
    const name = "TimeCopy-Profile.tcprofile";
    const type = "text/plain";
    // create file
    const a = document.createElement("a");
    const file = new Blob([data], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
   });