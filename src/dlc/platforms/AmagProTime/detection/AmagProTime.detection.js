export function AmagProTimeDetectionContent (detectionObj) {

    console.log('xxx amag detection: ',detectionObj)

    return( `
            <div class="configItem-title-row flex">
              <p class="subtext subtext-top">Auslöser</p>
            </div>
            <div class="configItem-content-row dFlex">
              <div class="detectionItem-content-smaller">
                <input type="text" class="input-size--large `+ (detectionObj.bookingsheet ? '' : 'dNone') + `" name="input_ticketPrefix" id="input_ticketPrefix` + detectionObj.id + `" placeholder="RELAUNCHAM" value="` + detectionObj.ticketprefix + `" title="Gebe hier einen Teil der Ticketnummer, Prefixes oder Namen ein, der immer konstant bleibt."/>
              </div>
              <div class="detectionItem-content-larger">
                <input type="text" class="input-size--large" 
                  name="input_additionalPrefix" id="input_additionalPrefix` + detectionObj.id + `" placeholder="Schadenmeldung; OTV" value="` + detectionObj.addprefix + 
                  `" title="Einzigartige Ticket-Titel oder Beschreibungen, können über dieses Feld erkannt und als Erkennungs-Kriterium verwendet werden. Mehrfache Parameter kannst du mit einem ; trennen"/>
              </div>
            </div>
            <div class="configItem-title-row flex">
              <p class="subtext subtext-top">Buchung</p>
            </div>
            <div class="project-detectionItem--amagprotime">
              <div class="configItem-content-row dFlex">
                <div class="detectionItem-content-larger">
                  <select name="select_proTimeService" id="select_proTimeService_`+ detectionObj.id + `" title="Wähle den Service aus, unter welchen du buchen willst.">
                    <option value="select_proTime_service_ITD" `+ ("select_proTime_service_ITD" === detectionObj.protimeservice ? "selected" : "") + `>IT Dienstleistungen</option>
                    <option value="select_proTime_service_ITDPC" `+ ("select_proTime_service_ITDPC" === detectionObj.protimeservice ? "selected" : "") + `>IT Dienstleistungen Projekte & Change</option>
                    <option value="select_proTime_service_CSITEST" `+ ("select_proTime_service_CSITEST" === detectionObj.protimeservice ? "selected" : "") + `>Corporate Service IT Ext ST</option>
                  </select>
                </div>
                <div class="detectionItem-content-smaller">
                  <input type="text" class="input-size--large" name="input_projectNomber" id="input_projectNomber`+ detectionObj.id + `" placeholder="Projektnum." value="` + detectionObj.projectnomber + `" title="Die Projektnummer, mit der das Ticket hier gebucht werden soll."/>
                </div>
              </div>
              <div class="configItem-content-row dFlex">
                <div class="configItem-content-fullWidth">
                  <input type="text" class="input-size--large" name="input_activity" id="input_activity`+ detectionObj.id + `" list="datalist_activity` + detectionObj.id + `" placeholder="Aktivität (Wenn vorhanden)" title="Bei zusätzlichen Aktivitäts-Felder, kannst du hier eine Auswahl oder Eingabe treffen."/>
                  <datalist id="datalist_activity`+ detectionObj.id + `">
                    <option>- WP2 - AEM Dashboard</option>
                    <option>Projekte & Change</option>
                    <option>Customer Success Management</option>
                  </datalist>
                </div>
              </div>
            </div>`
  )
}