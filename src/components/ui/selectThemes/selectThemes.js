import { lstorage_eeTheme } from "../../../utils/appStorage";

export function generateThemes() {

    const selectThemes = document.getElementById('select-themes');
    const themesArray = [{
      "Original": {
        "midnightglow": "Midnight Glow",
        "nostalgica": "Nostalgica",
        "oceansground": "Oceans Ground",
        "oceansgroundtechnical": "Oceans Ground Technical",
        "oceanswave": "Oceans Wave"
      },
      "Gefühle": {
        "battlefield": "Battlefield",
        "blueflame": "Blue Flame",
        "mint": "Mint",
        "mrwhite": "Mr. White",
        "neonretrored": "Neon Retro Red",
        "japansflare": "Japans Flare"
      },
      "Charactäre": {
        "danielsnfsoutfit": "Daniels NFS Outfit",
        "jaimesrot": "jaimes Rot",
        "johannesallespink": "Johannes alles Pink",
        "stevesblack": "Steves Black",
        "tobiaswillesschoen": "Tobias will es schön",
        "yoshascoffeemug": "Yoshas Coffe-Mug"
      },
      "Firmen": {
        "chromeblack": "Chrome Black",
        "chromewhite": "Chrome White",
        "trueinnovation": "Trueinnovation"
      }
    }];
  
    const themeEEArray = [{
      "Exotisch": {
        "e_exoticgold": "Exotic Gold",
        "e_silverliquid": "Silver Liquid"
      }
    }];
    const themeETimeGoldArray = [{
      "XXXX": {
        "e_timegod": "Time God"
      }
    }];
    const themeECreatorArray = [{
      "Creator Themes": {
        "e_thecreator": "Der Erschaffer"
      }
    }];
  
    let allThemes = [...themesArray]
    if(lstorage_eeTheme === 'true'){
      allThemes = [...allThemes, ...themeEEArray];
    }
    // special themes to unlock -> currently not used
    // if(localStorage.getItem('tc_creator') === 'true'){
      // allThemes = [...allThemes, ...themeECreatorArray];
    // }
    // if(localStorage.getItem('tc_c_bookingScore') > "1000"){
      // allThemes = [...allThemes, ...themeETimeGoldArray];
    // }
      
    const optionsHTML = allThemes.map(themeGroup =>
        Object.entries(themeGroup).map(([category, themes]) =>
          `<optgroup label="${category}">
            ${Object.entries(themes).map(([value, label]) =>
              `<option value="${value}">${label}</option>`).join('\n')}
           </optgroup>`
        ).join('\n')
      ).join('\n');
      selectThemes.innerHTML = optionsHTML;
  }
  