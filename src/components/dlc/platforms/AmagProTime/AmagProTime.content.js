export const customContent = `<button id="xx">Custom Content</button>`
export function CustomFunction(){
    console.log('protime custom function')

        let x = document.getElementById('xx')
        x.addEventListener('click', test)
        function test(){
            console.log('hallo')
        }

}