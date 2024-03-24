import { setHTMLTitle } from "./utils/utils.js";
import { APP_NAME, APP_VERSION } from "../properties.js";
import { CATEGORIES, PWAs } from "./data.js";

/* ############################################################################
--------------------------------- CONSTANTES ---------------------------------
############################################################################ */


/* ############################################################################
---------------------------------- FONCTIONS ----------------------------------
############################################################################ */

// INTERACTIONS UTILISATEUR -------------------------------
const goTo = (link) => {
  window.location = link;
}
window.goTo = goTo;

// GÉNÉRATION DOM -----------------------------------------

const getPwaBloc = (pwa) => {
  return `
    <button class="pwa-bloc" onclick="goTo('${pwa.link}')">
      <div class="pwa-img">
        <img src="./medias/images/pwas/${pwa.icon}.png" />
      </div>
      <div class="pwa-infos">
        <h2>${pwa.name}</h2>
        <span>${pwa.desc}</span>
        <div>
          <div class="dot ${ pwa.state == 'available' ? 'available' : pwa.state == 'limited' ? 'limited' : 'unavailable' }"></div>
          <span>${
            pwa.state == 'available' ? 'Utilisable' : pwa.state == 'limited' ? 'En développement - Version BETA' : 'Aperçu préliminaire'}</span>
        </div>
      </div>
    </button>
  `;
}

const getPwasBlocs = (pwas) => {
  let txt = '';
  pwas.forEach(pwa => {
    txt += getPwaBloc(pwa);
  });
  return txt;
}

const getCategoryContainer = (category) => {
  const groupPwas = PWAs.filter((element) => element.category == category.id);
  return `
    <div class="category-container">
      <h1>${category.label}</h1>

      ${getPwasBlocs(groupPwas)}

    </div>
  `;
}

const getCategoriesContainers = () => {
  let txt = '';
  CATEGORIES.forEach(category => {
    txt += getCategoryContainer(category);
  });
  return txt;
}

/* ############################################################################
---------------------------------- EXECUTION ----------------------------------
############################################################################ */

// Auto ---------------------------------------------------
//await requestWakeLock();

// Manuelle -----------------------------------------------
setHTMLTitle(APP_NAME);
document.getElementById('main').innerHTML = `
  <div class="top-container">
    <img src="./medias/images/store-icon.png" />
    <h1>PWA Store</h1>
  </div>
  ${getCategoriesContainers()}
`;