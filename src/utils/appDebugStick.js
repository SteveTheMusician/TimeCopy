export function debugStick(object,info) {
    if(localStorage.getItem('tc_debugStick') === 'true'){
        let infoText = info+' : ' ?? ''
        console.log('%c 🪲 '+infoText, 'background: #1d2930; color:#00ffa7',object);
    }
}