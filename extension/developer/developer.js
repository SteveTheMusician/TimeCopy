const configWindow_General_WindowContent = document.getElementById('config-win-general--content');
const label_version = document.getElementById('label_version');
const button_pasteTicketData = document.getElementById('button_test_pasteTicketData')

let config_bar_dev = `
<div class="config-item dFlex">
<div class="config-item-main-container">
  <div class="config-item-title-row flex">
    <div class="config-item-icon-container flex">
      <p class="text-label label-emoji">👩🏼‍💻</p>
    </div> 
    <div class="config-item-main flex"> 
      <p class="text-label">Developer Tools</p>
    </div> 
  </div>
  <div class="config-item-content-row flex">
  <p class="text-label padding-right-10">Show ProTime Test-Button</p>
    <label class="switch">
      <input type="checkbox" class="" id="check_showProTimetestButton" />
      <span class="switch_slider"></span>
    </label>

  </div> 
</div>
</div>`;

let label_version_devmode = "🧪 "

label_version.insertAdjacentHTML('afterbegin', label_version_devmode);
configWindow_General_WindowContent.insertAdjacentHTML('beforeend', config_bar_dev);

const config_check_showProTimeTestButton = document.getElementById('check_showProTimetestButton')

config_check_showProTimeTestButton.addEventListener('change', showProTimeTestButton);


function showProTimeTestButton(){

  if(config_check_showProTimeTestButton.checked ) {
    button_pasteTicketData.classList.remove('dNone')
    localStorage.setItem('tc_c_dev_pttest', 'true')
  }else {
    button_pasteTicketData.classList.add('dNone')
    localStorage.setItem('tc_c_dev_pttest', 'false')
  }

}

window.addEventListener("load", () => {
  loadStorage_dev()
});

function loadStorage_dev(){
  let tccdevpttest = localStorage.getItem('tc_c_dev_pttest')
  if(tccdevpttest == "true") {
    config_check_showProTimeTestButton.checked = true
    showProTimeTestButton()
  }

}