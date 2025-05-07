
const tcResetButton = document.getElementById('resetTimeCopy')
tcResetButton.addEventListener('click',appReset)

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function(){
    const bodyBefore = getComputedStyle(document.body, '::before');
    if (bodyBefore.content && bodyBefore.content !== 'none' && bodyBefore.content !== '""') {
      tcResetButton.removeAttribute('hidden')
    }
  },2000)
});

function appReset(){
  console.log('🔄 RESET APP')
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }