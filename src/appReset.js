// const tcResetButton = document.getElementById('resetTimeCopy')
// tcResetButton.addEventListener('click',appReset)
// <button hidden id="resetTimeCopy">Reset</button>
document.addEventListener("DOMContentLoaded", function () {
  // create allways reset button
  const resetButton = document.createElement('button');
  const waitForBody = setInterval(() => {
    if (document.body) {
      clearInterval(waitForBody);
      resetButton.id = 'resetTimeCopy';
      resetButton.innerHTML = "Reset";
      resetButton.hidden = true;
      document.body.appendChild(resetButton);
    }
  }, 10);
  setTimeout(function(){
    // set reset button if before is there for too long
    resetButton.addEventListener('click',appReset)
    const bodyBefore = getComputedStyle(document.body, '::before');
    if (bodyBefore.content && bodyBefore.content !== 'none' && bodyBefore.content !== '""') {
      resetButton.hidden = false
      // tcResetButton.removeAttribute('hidden')
    }
  },2000)
});

function appReset(){
  console.log('🔄 RESET APP')
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload();
}