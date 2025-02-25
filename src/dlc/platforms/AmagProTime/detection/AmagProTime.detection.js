function detection() {
    
    let amagProTimeDetectionHtml = `<!-- AmagProTime Detection -->
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
              <input type="text" class="input-size--large `+ (detectionItem.bookingsheet ? '' : 'dNone') + `" name="input_additionalPrefix" id="input_additionalPrefix` + detectionItem.id + `" placeholder="String Match (Optional)" value="` + detectionItem.addprefix + `" title="Einzigartige Ticket-Titel oder Beschreibungen, können über dieses Feld erkannt und als Kriterium verwendet werden."/>
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
                  <option value="select_proTime_service_ITDST" `+ ("select_proTime_service_ITDST" === detectionItem.protimeservice ? "selected" : "") + `>IT Dienstleistungen ST</option>
                  <option value="select_proTime_service_CSITEST" `+ ("select_proTime_service_CSITEST" === detectionItem.protimeservice ? "selected" : "") + `>Corporate Service IT Ext ST</option>
                  <option value="select_proTime_service_CSITENT" `+ ("select_proTime_service_CSITENT" === detectionItem.protimeservice ? "selected" : "") + `>Corporate Service IT Ext NT</option>
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
                  <option>AP01 - Front-end</option>
                  <option>Customer Success Management</option>
                </datalist>
              </div>
            </div>
          </div>`
    // detection item content releated to amagch dlc here
}