import { anyProjectNomber } from "../variables/Any.variables";

export async function checkForTrigger(string, detectionItemsAny) {
    let matches = [];
    detectionItemsAny.forEach((detectionItemAny) => {
        if (detectionItemAny.anytrigger.length > 0 && string.includes(detectionItemAny.anytrigger)
            || detectionItemAny.anytrigger.length === 0 && string.length === 0 
            || detectionItemAny.anytrigger === anyProjectNomber
            ) {
            matches.push(detectionItemAny)
        }
    })
    return matches ? matches : null
}