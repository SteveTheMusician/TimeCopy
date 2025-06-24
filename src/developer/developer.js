
export function developer() {

  const label_version = document.getElementById('label_version');
  let label_version_devmode = "⭐️ "

  label_version.insertAdjacentHTML('afterbegin', label_version_devmode);

  window.addEventListener("load", () => {
    loadStorage_dev()
  });

  function loadStorage_dev() {
    let tccdevpttest = localStorage.getItem('tc_c_dev_pttest')
    if (tccdevpttest == "true") {
      config_check_showProTimeTestButton.checked = true
      showProTimeTestButton()
    }
  }
}