import { xmas } from "./xmas.dlc";

export function xmasDlc() {
    const dateNow = new Date();
    const dateMonth = dateNow.getMonth();
    // load xmas dlc between dezember (11) and march (2)
    if (dateMonth === 11 || dateMonth === 0 || dateMonth === 1 || dateMonth === 2) {
        xmas()
    }
}