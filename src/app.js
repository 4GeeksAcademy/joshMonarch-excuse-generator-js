import "bootstrap";
import "./style.css";

const randNum = (min, max) => Math.floor(Math.random() * (max-min)) + min;
const randBool = () => Math.random() > 0.5;

  function moveDiv(div) {
    let pos = 0;
    let speed = parseInt(div.style.fontSize) / 15;
    let id;
    cancelAnimationFrame(id);

    function move() {
      if (div.style.rotate != ""){
        if(div.classList.contains("top-to-bottom")) {
          div.style.top = `${pos+=speed}px`;
        } else if(div.classList.contains("bottom-to-top")) {
          div.style.bottom = `${pos+=speed}px`;
        } 
      } else {
        if(div.classList.contains("left-to-right")) {
          div.style.left = `${pos+=speed}px`;
        } else if(div.classList.contains("right-to-left")) {
          div.style.right = `${pos+=speed}px`;
        }
      }     
      id = requestAnimationFrame(move);
    }
    move();
  }

function createDivs(text, length = 10) {

  for(let i = 0; i < length; i++) {
    let div = document.createElement("div");
    div.classList.add("position-absolute");
    div.innerHTML = text;

    Object.assign(div.style, 
      {
        opacity:  `${Math.random()*(0.6-0.2)+0.2}`,
        fontSize: `${randNum(6, 40)}px`,
        zIndex:   "-1",
        textWrap: "nowrap",
        cursor: "none",
      }
    ) 

    if(randBool()) {
      div.style.rotate = "0.25turn";
      div.style.left = `${randNum(-500, window.innerWidth)}px`;
      if(randBool()) {
        div.classList.add("bottom-to-top");
        div.style.bottom = "0px";
        div.style.transform = "translateX(60%)";
      } else {
        div.classList.add("top-to-bottom");
        div.style.top = "0px";
        div.style.transform = "translateX(-60%)";
      }
    } else {
      div.style.top = `${randNum(0, window.innerHeight)}px`;
      if(randBool()) {
        div.classList.add("left-to-right");
        div.style.left = "0px";
        div.style.transform = "translateX(-100%)";
      } else {
        div.classList.add("right-to-left");
        div.style.right = "0px";
        div.style.transform = "translateX(100%)";
      }
    }
    document.body.insertAdjacentElement('afterbegin', div);
  }
}

function deleteDivs(parent) {
  const children = parent.children;
  for(let i = children.length-1; i >= 0; i--) {
    if(children[i].classList.contains("position-absolute")) {
      children[i].remove();
    }
  }
}

window.onload = function() {
  const btn  = document.querySelector(".btn");
  const p    = document.querySelector("p");
  
  const who    = ['The dog', 'My grandma', 'The mailman', 'My bird', 'Superman', 'A punky pterodactil'];
  const action = ['ate', 'peed', 'crushed', 'broke', 'required', 'burned'];
  const what   = ['my homework', 'my phone', 'the car', 'my heart', 'my nails', 'my coffee'];
  const when   = ['before the class', 'when I was sleeping', 'while I was exercising', 'during my lunch', 'while I was praying', 'last time we blinked', 'last century'];
  
  let interval = null;
  
  btn.addEventListener('click', () => {
    let opacity = 0;
    
    p.style.opacity = 0;
    p.innerHTML = `
    ${who[randNum(0, who.length)]}
    ${action[randNum(0, action.length)]}
    ${what[randNum(0, what.length)]}
    ${when[randNum(0, when.length)]}`;

    deleteDivs(document.body);
    createDivs(p.innerHTML, 20);
    const divs = [...document.querySelectorAll("body>.position-absolute")];

    clearInterval(interval);
    interval = setInterval(() => {
      opacity += 0.1;
      p.style.opacity = opacity;
      if(opacity == 1.0) { clearInterval(interval) }
    }, 50);
    
    setTimeout(() => {
      divs.forEach(div => moveDiv(div));    
    }, 1000)
  });
};
