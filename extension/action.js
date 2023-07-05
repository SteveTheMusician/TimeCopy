document.getElementById('fillForm').addEventListener('click', function(){
  //set current clipboard detection
  var currentBoard = "amag-protime";

  chrome.tabs.executeScript({
          file: 'libraries/'+currentBoard+'/'+currentBoard+'.js'
  });
});