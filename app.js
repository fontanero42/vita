const storageType = localStorage;
const consentPropertyName = 'zapatero_consent';
const coolDown = 24 * 60 * 60 * 1000;

let zapatero_mode = {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'personalization_storage': 'denied',
  'functionality_storage': 'denied',
  'security_storage': 'denied',
};

const shouldShowModal = () => {
  const compare = new Date().getTime() - coolDown;
  if (storageType.getItem(consentPropertyName) < compare)
    return true;
  else
    return false;

}

const saveToStorage = () => storageType.setItem(consentPropertyName, new Date().getTime());

window.onload = () => {
  const acceptBtn = document.querySelector("[data-modal-accept]");
  const denyBtn = document.querySelector("[data-modal-deny]");

  const modal = document.querySelector("[data-modal]");

  modal.showModal();

  acceptBtn.addEventListener("click", () => {
    saveToStorage(storageType);
    modal.close();
    zapatero_mode['analytics_storage'] = 'granted';
    zapatero_mode['ad_storage'] = 'granted';
    gtag('consent', 'update', zapatero_mode);
    localStorage.setItem('consent', JSON.stringify(zapatero_mode));
  });
  /* acceptButton.classList.toggle("focus");*/


  denyBtn.addEventListener('click', (event) => {
    saveToStorage(storageType);
    //  consentPopup.classList.add('hide');
    modal.close();
    zapatero_mode['analytics_storage'] = 'denied';
    zapatero_mode['ad_storage'] = 'denied';
    gtag('consent', 'update', zapatero_mode);
    localStorage.setItem('consent', JSON.stringify(zapatero_mode));
  });
}