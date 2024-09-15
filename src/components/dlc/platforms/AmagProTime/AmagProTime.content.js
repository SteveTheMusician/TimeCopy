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
    <div class="dlc-platform_custom-content-row dFlex">
        <div class="row-cell-left">
            <p class="subtext">Verzugs-Timer </p>
        </div>
        <div class="row-cell-right">
            <select name="dlc_select_proTimeDelayTimer" id="dlc-select-protimedelaytimer">
                <option value="150" >150 ms</option> 
                <option value="250" selected>250 ms</option>
                <option value="350" >350 ms</option>
                <option value="500" >500 ms</option>
                <option value="500" >750 ms</option>
                <option value="500" >1000 ms</option>     
            </select>
        </div>
    </div>
</div>`

export function CustomFunction(){
    console.log('protime custom function')

        let x = document.getElementById('xx')
        x.addEventListener('click', test)
        function test(){
            console.log('hallo')
        }

}