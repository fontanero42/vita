let zapatero_mode = {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'personalization_storage': 'denied',
  'functionality_storage': 'denied',
  'security_storage': 'denied',
};


window.onload = () => {
const acceptButton = document.querySelector("[data-modal-accept]");
const modal = document.querySelector("[data-modal]");

modal.showModal();

acceptButton.addEventListener("click",()=>{
  modal.close();
});

}

