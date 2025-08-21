export function filter_None(clipboardString) {

    let bookingData = []
    let itemObject = createFilterObject('',
      '','',clipboardString,
      '','','',''
    )
    bookingData.push(itemObject)

    return bookingData
}