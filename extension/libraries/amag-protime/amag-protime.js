document.getElementById('WD0172').value = "21053";
document.getElementById("WD0172").dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
document.getElementById("WD0172").dispatchEvent(new KeyboardEvent('keyup', {'key': 'Enter'}));
var test = document.getElementById('WD0172').value;
document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
document.dispatchEvent(new KeyboardEvent('keyup', {'key': 'Enter'}));