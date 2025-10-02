import { hlween } from "./hlween.module";
import { dateMonth } from "../../utils/defaults/defaultModuleVariables";

export function hlweenModule() {
    // load haloween module in oktober
    if (dateMonth === 9) {
        hlween()
    }
}