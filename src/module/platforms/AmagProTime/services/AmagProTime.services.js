import { anyProjectNomber,detectionItemAddPrefixSplit } from "../variables/AmagProTime.variables";

export async function TestPageLoadPerformance() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => performance.now()
    });
    return result[0].result;
}

export function filterPrefix(ticket, detectionItemsProTime) {
    let filterPrefix_prefixMatches = [];
    detectionItemsProTime.forEach((detectionItemProTime) => {
        if (detectionItemProTime.ticketprefix.length > 0 && ticket.item_ticketnumber.includes(detectionItemProTime.ticketprefix)
            || detectionItemProTime.ticketprefix.length === 0 && ticket.item_ticketnumber.length === 0 
            || detectionItemProTime.ticketprefix === anyProjectNomber
            ) {
            filterPrefix_prefixMatches.push(detectionItemProTime)
        }
    })
    return filterPrefix_prefixMatches ? filterPrefix_prefixMatches : null
}

export function filterAddPrefix(ticket, detectionItems_ticketPrefixMatches) {
    let filterAddPrefix_addPrefixMatches = []
    detectionItems_ticketPrefixMatches.forEach((detectionItemPrefixItem) => {
        let item_ticketdescWithHiddenTag = ticket.item_ticketdesc + " " + ticket.item_hiddentag
        item_ticketdescWithHiddenTag = item_ticketdescWithHiddenTag.trim()
        let detectionItemAddPrefixArray = []
        let detectionItemPrefixItemAddPrefix = detectionItemPrefixItem.addprefix
        detectionItemPrefixItemAddPrefix.trim()
        if(detectionItemPrefixItemAddPrefix.includes(detectionItemAddPrefixSplit)){
            detectionItemAddPrefixArray = detectionItemPrefixItemAddPrefix.split(detectionItemAddPrefixSplit).map(item => item.trim())
        }else {
            detectionItemAddPrefixArray.push(detectionItemPrefixItemAddPrefix)
        }
        detectionItemAddPrefixArray.forEach((addPrefixArrayItem) => {
            // push only if prefix is included in detection or prefix is 0 but has booking nomber / project nomber in detection
            if (addPrefixArrayItem.length > 0 && item_ticketdescWithHiddenTag.includes(addPrefixArrayItem) 
                || addPrefixArrayItem.length === 0 && ticket.item_bookingnumber 
                || addPrefixArrayItem.length === 0 && detectionItemPrefixItem.projectnomber ) {
                if(!filterAddPrefix_addPrefixMatches.length){
                    filterAddPrefix_addPrefixMatches.push(detectionItemPrefixItem)
                }
            }
        })
    });
    return filterAddPrefix_addPrefixMatches ? filterAddPrefix_addPrefixMatches : null
}

export function filterAllPrefixes(ticket, ticketAddPrefixMatches) {
    let refinePrefix_Matches = []
    if (ticketAddPrefixMatches.length > 1) {
        ticketAddPrefixMatches.forEach((detectionItemRefineMatch) => {
            let item_ticketdescWithHiddenTag = ticket.item_ticketdesc + " " + ticket.item_hiddentag
            if (detectionItemRefineMatch.addprefix.length > 0 && item_ticketdescWithHiddenTag.includes(detectionItemRefineMatch.addprefix) && ticket.item_ticketnumber.includes(detectionItemRefineMatch.ticketprefix)) {
                refinePrefix_Matches.push(detectionItemRefineMatch)
            }
        });
    } else {
        refinePrefix_Matches = ticketAddPrefixMatches
    }
    return refinePrefix_Matches
}

export function filterBookingNomber(ticket, ticketRefinePrefixesMatches) {
    let refineBookingNomber_Matches = []
    if (ticketRefinePrefixesMatches.length > 1) {
        ticketRefinePrefixesMatches.forEach((detectionItemRefineBookingNomber) => {
            if (ticket.item_bookingnumber.length && detectionItemRefineBookingNomber.projectnomber === ticket.item_bookingnumber 
                || ticket.item_bookingnumber && detectionItemRefineBookingNomber.projectnomber === anyProjectNomber) {
                refineBookingNomber_Matches.push(detectionItemRefineBookingNomber)
            } else if (!ticket.item_bookingnumber && detectionItemRefineBookingNomber.projectnomber.length && detectionItemRefineBookingNomber.projectnomber !== anyProjectNomber) {
                refineBookingNomber_Matches.push(detectionItemRefineBookingNomber)
            }
        })
    } else {
        refineBookingNomber_Matches = ticketRefinePrefixesMatches
    }
    return refineBookingNomber_Matches
}

