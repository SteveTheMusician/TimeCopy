export const customContent = `<div class="dlc-platform_custom-content">
    <p class="text-label">Funktionen</p>
    <div class="dlc-platform_custom-content-row dFlex">
        <div class="row-cell-left">
            <p class="subtext">Latenz-Modus erzwingen</p>
        </div>
        <div class="row-cell-right">
            <label class="switch">
                <input type="checkbox" class="" id="check_forceLatencyModeproTime" />
                <span class="switch_slider" title="Erzwinkt den Latenz-Modus und bucht immer mit Verzögerung. (Standard: Deaktiviert)"></span>
            </label>
        </div>
    </div>
    <div class="dlc-platform_custom-content-row dFlex">
        <div class="row-cell-left">
            <p class="subtext">Latenz erkennen</p>
        </div>
        <div class="row-cell-right">
            <label class="switch">
                <input type="checkbox" class="" id="check_useLatencyModeproTime"  />
                <span class="switch_slider" title="Setzt den Latenz-Modus (Langsameres Buchen) ein, sobald auffällige Verzögerungen o.Ä. in ProTime erkannt werden. (Standard: Aktiv)"></span>
            </label>
        </div>
    </div>
    <div class="dlc-platform_custom-content-row dFlex">
        <div class="row-cell-left">
            <p class="subtext">Buchungstester</p>
        </div>
        <div class="row-cell-right">
            <label class="switch">
                <input type="checkbox" class="" id="check_showProTimetestButton" />
                <span class="switch_slider" title="Zeigt einen Test-Button an, welcher die Daten ohne zu Buchen überträgt."></span>
            </label>
        </div>
    </div>
</div>`

// custom function here