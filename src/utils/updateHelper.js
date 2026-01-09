import { removeLocalStoragesByKey } from "./functionHandlers";
export function updateHelper(useHelper) {
    // this function is specific for each versions (mostly) and helps to cleanup old storages or others
    // usehelper will setted by version js and passed by appStorage
    if(useHelper){
        //on Update to V.1.3.22
        removeLocalStoragesByKey('tc_c_proTimeAutoSelectDay')
        removeLocalStoragesByKey('tc_c_proTimeMatchBookingDay')
    }
}