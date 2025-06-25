import { importPlatforms } from "../../../dlc/platforms/platforms.import.js"

export function detectionItem(detectionItems) {
  let platformSelectItems = []
  let platformInfoData = localStorage.getItem('tc_s_dlcPlatformInformations')
  platformInfoData = JSON.parse(platformInfoData)
  let plDataObject = ''
  for (let plKey of importPlatforms){
    plDataObject = platformInfoData.find(item => item[plKey])[plKey]
    if(plKey !== 'Automatic'){
      let platformSelectOption = `<option value="select_bookingPlatform_`+(plKey)+`" >`+ (plDataObject.platform_name) +`</option>`
      platformSelectItems.push(platformSelectOption)
    }
  }
  if (detectionItems) {
    document.getElementById('window_detection').innerHTML = detectionItems.map(detectionItem =>
      `<div class="configItem detectionItem flex" name="item_detection" id="` + detectionItem.id + `">
        <div class="detectionItem-main">
          <div class="configItem-title-row flex">
            <p class="subtext subtext-top">Erkennung</p>
          </div>
          <div class="configItem-content-row dFlex">
            <div class="detectionItem-content-smaller">
              <select id="select_bookingPlatform_`+ detectionItem.id + `" title="Weise der Erkennung eine Buchungsplatform zu.">
                <option value="" selected disabled hidden>Keine</option>`+ (platformSelectItems) +`
              </select>
            </div>
            <div class="detectionItem-content-larger">
              <input type="text" class="input-size--large `+ (detectionItem.bookingsheet ? '' : 'dNone') + `" name="input_ticketPrefix" id="input_ticketPrefix` + detectionItem.id + `" placeholder="Ticket Prefix" value="` + detectionItem.ticketprefix + `" title="Gebe hier einen Teil der Ticketnummer, Prefixes oder Namen ein, der immer konstant bleibt."/>
            </div>
          </div>
          <div class="configItem-content-row dFlex">
            <div class="configItem-content-fullWidth">
              <input type="text" class="input-size--large `+ (detectionItem.bookingsheet ? '' : 'dNone') + `" name="input_additionalPrefix" id="input_additionalPrefix` + detectionItem.id + `" placeholder="Mehrfache; Parameter; möglich" value="` + detectionItem.addprefix + `" title="Einzigartige Ticket-Titel oder Beschreibungen, können über dieses Feld erkannt und als Erkennungs-Kriterium verwendet werden. Mehrfache Parameter kannst du mit einem ; trennen"/>
            </div>
          </div>
          <div class="configItem-title-row flex `+ (detectionItem.bookingsheet === "AmagProTime" ? null : "dNone") + `">
            <p class="subtext subtext-top">Buchung</p>
           </div>
          <div class="project-detectionItem--amagprotime `+ (detectionItem.bookingsheet === "AmagProTime" ? null : "dNone") + `">
            <div class="configItem-content-row dFlex">
              <div class="detectionItem-content-larger">
                <select name="select_proTimeService" id="select_proTimeService_`+ detectionItem.id + `" title="Wähle den Service aus, unter welchen du buchen willst.">
                  <option value="select_proTime_service_ITD" `+ ("select_proTime_service_ITD" === detectionItem.protimeservice ? "selected" : "") + `>IT Dienstleistungen</option>
                  <option value="select_proTime_service_ITDPC" `+ ("select_proTime_service_ITDPC" === detectionItem.protimeservice ? "selected" : "") + `>IT Dienstleistungen Projekte & Change</option>
                  <option value="select_proTime_service_CSITEST" `+ ("select_proTime_service_CSITEST" === detectionItem.protimeservice ? "selected" : "") + `>Corporate Service IT Ext ST</option>
                </select>
              </div>
              <div class="detectionItem-content-smaller">
                <input type="text" class="input-size--large" name="input_projectNomber" id="input_projectNomber`+ detectionItem.id + `" placeholder="Projektnum." value="` + detectionItem.projectnomber + `" title="Die Projektnummer, mit der das Ticket hier gebucht werden soll."/>
              </div>
            </div>
            <div class="configItem-content-row dFlex">
              <div class="configItem-content-fullWidth">
                <input type="text" class="input-size--large" name="input_activity" id="input_activity`+ detectionItem.id + `" list="datalist_activity` + detectionItem.id + `" placeholder="Aktivität (Wenn vorhanden)" title="Bei zusätzlichen Aktivitäts-Felder, kannst du hier eine Auswahl oder Eingabe treffen."/>
                <datalist id="datalist_activity`+ detectionItem.id + `">
                  <option>- WP2 - AEM Dashboard</option>
                  <option>Projekte & Change</option>
                  <option>Customer Success Management</option>
                </datalist>
              </div>
            </div>
          </div>
        </div>
      <div class="configItem-action-container">
        <button class="button-primary button-reset button_deleteDetection" title="Löschen">
          <?xml version="1.0" encoding="utf-8"?>
          <!-- Designed by Empty Soul  -->
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 1000 1000" style="enable-background:new 0 0 1000 1000;" xml:space="preserve">
          <g>
            <path d="M200.3,269.8v602.4c0,71.7,58.3,130,130,130h333.6c71.7,0,130-58.3,130-130V269.8H200.3z M733.9,872.2
              c0,38.6-31.4,70-70,70H330.3c-38.6,0-70-31.4-70-70V329.8h473.6V872.2z"/>
          </g>
          <g>
            <rect x="326" y="400.4" width="60" height="480.3"/>
          </g>
          <g>
            <path d="M670,143.8c-4.6-33-16.7-63.6-35.2-88.2c-26-34.4-61.3-53.4-99.4-53.4H459c-38.2,0-73.5,19-99.4,53.4
              c-18.5,24.6-30.7,55.2-35.2,88.2h-126v60h597.7v-60H670z M385,143.8c3.8-19.7,11.5-37.6,22.4-52.1c14.3-19,32.6-29.5,51.5-29.5
              h76.4c18.9,0,37.2,10.5,51.5,29.5c10.9,14.5,18.5,32.4,22.4,52.1H385z"/>
          </g>
          <g>
            <rect x="612" y="400.4" width="60" height="480.3"/>
          </g>
          <g>
            <rect x="467.2" y="400.4" width="60" height="480.3"/>
          </g>
          </svg>                  
        </button>
      </div>
    </div>` ).join('')
  }
}