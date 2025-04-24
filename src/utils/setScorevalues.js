import { scoreTitles } from "./defaults/defaultVariables"

export function setScoreValues(bookingScore,appGlobalArgs) {
    // vars
    let bookingScoreTitle = scoreTitles[0]
    let bookingScoreAsText = ''
    bookingScoreAsText = bookingScore
    // validate titles
    if(bookingScore > "8") {
        bookingScoreTitle = scoreTitles[1]
    }
    if(bookingScore > "24") {
      bookingScoreTitle = scoreTitles[2]
    }
    if(bookingScore > "100") {
      bookingScoreTitle = scoreTitles[3]
    }
    if(bookingScore > "200") {
      bookingScoreTitle = scoreTitles[4]
    }
    if(bookingScore > "1000") {
      bookingScoreTitle = scoreTitles[5]
      bookingScoreAsText = "XXXX"
    }
    if(localStorage.getItem('tc_creator') === 'true') {
        bookingScoreTitle = scoreTitles[6]
    }
    appGlobalArgs.elem_configProfileScore_RangScore.innerHTML = bookingScoreAsText
    appGlobalArgs.elem_configProfileScore_RangName.innerHTML = bookingScoreTitle
    // return {bookingScoreAsText,bookingScoreTitle}
  }