export function generateDateId() {
    let newId = new Date().getTime().toString()
    return newId
}