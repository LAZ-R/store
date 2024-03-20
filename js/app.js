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
          <div class="dot ${
            pwa.category == 'recommended' 
            || pwa.category == 'tools' 
            || pwa.category == 'games' 
              ? 'available' 
              : pwa.category == 'beta'
                ? 'limited'
                : 'unavailable'}"></div>
          <span>${
            pwa.category == 'recommended' 
            || pwa.category == 'tools' 
            || pwa.category == 'games' 
              ? 'fonctionnel' 
              : pwa.category == 'beta'
                ? 'limité'
                : 'non-fonctionnel'}</span>
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
  <img style="margin-top: 2svh; height: 7svh;" src="./medias/images/logo.png" />
  <h1>PWA Store</h1>
  ${getCategoriesContainers()}
`;