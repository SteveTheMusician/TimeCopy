
document.getElementById('WD0172').value = "21053";
orderinput.dispatchEvent(enterevent);

document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
document.dispatchEvent(new KeyboardEvent('keyup', {'key': 'Enter'}));