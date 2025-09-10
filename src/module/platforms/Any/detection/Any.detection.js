export const detectionHTML = (detectionObj) => {
    return (`<div class="configItem-title-row flex">
            <p class="subtext subtext-top">Auslöser</p>
        </div>
        <div class="configItem-content-row dFlex">
          <div class="configItem-content-fullWidth">
            <input type="text" class="input-size--large ${detectionObj.bookingsheet ? '' : 'dNone'}" name="input_anyTriggerWord" id="input_anyTriggerWord${detectionObj.id}" placeholder="Trigger Text" value="${detectionObj.triggerWord}" title="Gebe hier ein Stichword ein, der diesen Filter auslösen soll."/>
          </div>
        </div>
        <div class="configItem-title-row flex">
          <p class="subtext subtext-top">Text zum Anhängen</p>
        </div>
        <div class="configItem-content-row dFlex">
          <div class="configItem-content-fullWidth">
            <input type="text" class="input-size--large" name="input_anyAddWord" id="input_anyAddWord${detectionObj.id}" placeholder="Wort, dass beim Einfügen automatisch mit angehägt wird"/>
          </div>
        </div>
    `)
}