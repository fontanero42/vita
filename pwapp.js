window.onload = () => {
  const generateBtn = document.querySelector("[generate]");
  const select = document.getElementById("length-select");
  const _major = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const special = "!§$?@%&+*#€";
  const digits = "1234567890";
  let no = getSubTreeSize();
  const options = select.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].value == no) {
      options[i].selected = true;
      break;
    }
  }

  generateBtn.addEventListener("click", () => {
    console.log("hello Passwort");
    let secret = [];
    do {
      secret = pwgen(no)
    } while (toBeDiscarded(secret));
    let i = 0
    for (const element of secret) {
      cellFactory(element, i + 1);
      i++;
    }
  });

  select.addEventListener("change", (event) => {
    no = event.target.value;
    const clkEvent = new Event("click");
    // Dispatch the event.
    generateBtn.dispatchEvent(clkEvent);
  });

function initController(model) {
  let cntr = Object.create(null);
  
  function init(model) {
    this.model =model;

  }
  cntr.init)
  return cntr;
}

  function pwgen(no) {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const flagMajor = true;
    let major = flagMajor ? _major : [];
    const reservoir = digits.concat(letters, special, major);
    let secret = String();
    removeSubTree();
    while (secret.length < no) {
      secret = secret.concat(reservoir.at(Math.floor(Math.random() * reservoir.length)));

    }
    return secret;


  }

  function cellFactory(val, seq) {
    let pwcell = document.createElement('div');
    pwcell.classList.add("pwcell");
    let pwchar = document.createElement('div');
    pwchar.classList.add("pwchar");
    pwchar.innerHTML = val;
    if (special.includes(val))
      pwchar.classList.add("is-special");
    if (digits.includes(val))
      pwchar.classList.add("is-number");
    if (_major.includes(val))
      pwchar.classList.add("is-major");

    pwcell.appendChild(pwchar);
    let pwseq = document.createElement('div');
    pwseq.classList.add("pwseq");
    pwseq.innerHTML = String(seq).concat(".");
    pwcell.appendChild(pwseq);
    let canvas = document.querySelector(".pwcanvas");
    canvas.appendChild(pwcell);
  }

  function removeSubTree() {
    let canvas = document.querySelector(".pwcanvas");
    canvas.innerHTML = "";
  }

  function getSubTreeSize() {
    let canvas = document.querySelector(".pwcanvas");
    return canvas.children.length;
  }
  
  function toBeDiscarded(secret) {
    let cntSpecial = 0;
    let cntNumber = 0;
    let cntMajor = 0;
    for (const element of secret) {
      if (special.includes(element))
        cntSpecial++;
      if (digits.includes(element))
        cntNumber++;
      if (_major.includes(element))
        cntMajor++;
    }
    if (cntSpecial < 1 || cntNumber < 1 || cntMajor < 1) {
      console.warn('RuleZZZZ! #', secret);
      return true;
    }
    else
      return false;
  }
}