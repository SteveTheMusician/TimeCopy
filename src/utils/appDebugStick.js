export function debugStick(object,info) {
    if(localStorage.getItem('tc_debugStick') === 'true'){
        let infoText = info+' : ' ?? ''
        console.warn('🪲 -- Debugger --')
        console.log(infoText+' ',object)
    }
}