
const tcResetButton = document.getElementById('resetTimeCopy')
tcResetButton.addEventListener('click',appReset)

document.addEventListener("DOMContentLoaded", function () {
  const bodyBefore = getComputedStyle(document.body, '::before');
  if (bodyBefore.content && before.content !== 'none' && bodyBefore.content !== '""') {
    tcResetButton.removeAttribute('hidden')
  }
});

function appReset(){
  console.log('🔄 RESET APP')
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }