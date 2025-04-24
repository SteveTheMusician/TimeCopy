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
      appGlobalArgs.elem_configProfileScore_RangScore.classList.add('scoreTextSpecial-wizard')
      appGlobalArgs.elem_configProfileScore_RangName.classList.add('scoreTextSpecial-wizard')
      appGlobalArgs.elem_statusBarProfileScore_RangScore.classList.add('scoreTextSpecial-wizard')
      appGlobalArgs.elem_statusBarProfileScore_RangName.classList.add('scoreTextSpecial-wizard')
    }
    if(bookingScore > "200") {
      bookingScoreTitle = scoreTitles[4]
      appGlobalArgs.elem_configProfileScore_RangScore.classList.add('scoreTextSpecial-legend')
      appGlobalArgs.elem_configProfileScore_RangName.classList.add('scoreTextSpecial-legend')
      appGlobalArgs.elem_statusBarProfileScore_RangScore.classList.add('scoreTextSpecial-legend')
      appGlobalArgs.elem_statusBarProfileScore_RangName.classList.add('scoreTextSpecial-legend')
    }
    if(bookingScore > "1000") {
      bookingScoreTitle = scoreTitles[5]
      bookingScoreAsText = "XXXX"
      appGlobalArgs.elem_configProfileScore_RangScore.classList.add('scoreTextSpecial-god')
      appGlobalArgs.elem_configProfileScore_RangName.classList.add('scoreTextSpecial-god')
      appGlobalArgs.elem_statusBarProfileScore_RangScore.classList.add('scoreTextSpecial-god')
      appGlobalArgs.elem_statusBarProfileScore_RangName.classList.add('scoreTextSpecial-god')
    }
    if(bookingScore === 0) {
        bookingScoreAsText = "-"
    }
    if(localStorage.getItem('tc_creator') === 'true') {
        bookingScoreTitle = scoreTitles[6]
        appGlobalArgs.elem_configProfileScore_RangName.classList.add('textAnimation-creator')
        appGlobalArgs.elem_statusBarProfileScore_RangName.classList.add('textAnimation-creator')
    }
    appGlobalArgs.elem_configProfileScore_RangScore.innerHTML = bookingScoreAsText
    appGlobalArgs.elem_configProfileScore_RangName.innerHTML = bookingScoreTitle
    appGlobalArgs.elem_statusBarProfileScore_RangScore.innerHTML = bookingScoreAsText
    appGlobalArgs.elem_statusBarProfileScore_RangName.innerHTML = bookingScoreTitle
  }