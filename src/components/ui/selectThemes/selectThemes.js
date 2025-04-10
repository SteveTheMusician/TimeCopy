import { lstorage_eeTheme } from "../../../utils/appStorage";

export function generateThemes() {

    const selectThemes = document.getElementById('select-themes');
    const themesArray = [{
      "Original": {
        "midnightglow": "Midnight Glow",
        "nostalgica": "Nostalgica",
        "oceansground": "Oceans Ground",
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
        "darkterrorbyseb": "Sebastians Dark",
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
  
    let allThemes
    if(lstorage_eeTheme === 'true'){
      allThemes = [...themesArray, ...themeEEArray];
    } else {
      allThemes = [...themesArray];
    }
      
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
  