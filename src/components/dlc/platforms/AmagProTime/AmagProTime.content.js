export const customContent = `<div class="dlc-platform_custom-content">
    <p class="text-label">Funktionen</p>
    <div class="dlc-platform_custom-content-row dFlex">
        <div class="row-cell-left">
            <p class="subtext">ProTime Test </p>
        </div>
        <div class="row-cell-right">
            <label class="switch">
                <input type="checkbox" class="" id="check_showProTimetestButton" />
                <span class="switch_slider"></span>
            </label>
        </div>
    </div>
</div>`

export function CustomFunction() {
    
    console.log('protime custom function')
    let x = document.getElementById('xx')
    x.addEventListener('click', test)
    function test() {
        console.log('hallo')
    }

}