addEventListener('load', function(e) {

  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new speechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 3;
  recognition.lang = "ru-RU";

  recognition.onstart = () => {
    console.log("Распознавание голоса запущено");
    // alert('listening...');
  };

  recognition.onend = () => {
    console.log("Распознавание голоса закончено");
  };

  recognition.onstart();

  let offsetX, offsetY, endX = 0, endListen = false;
 
  const box = document.querySelector('#box');
  const vowels = ['А', 'О', 'У', 'Я', 'И', 'Е'];
  const consonants = ['Л','М', 'Н', 'Р', 'Б', 'П', 'В', 'С', 'К'];

  const words = consonants.flatMap(con=> {
    return vowels.map(l=> {
      return `${con}${l}`
    })
  }).reduce((acc, l)=>{
     let random = Math.floor(Math.random()*acc.length);
     acc.splice(random, 0, l);
     return acc;
  },[]); 

   


   words.slice(0,24).forEach((w, i) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const content = document.createElement('div');
    content.classList.add('content');
    content.innerHTML = `${w}`;
    
 // ------transforming----------
    card.style.transform = `translateZ(${i*.1}px) rotateX(30deg) rotateZ(${Math.floor(Math.random()*24-12)}deg)`;
    card.style.zIndex = `${i*100}`;

    card.appendChild(content);

    box.appendChild(card);
  });


  const cards = document.querySelectorAll('.card');
  for (let c of cards) {
    c.addEventListener('touchstart', e => {
      e.preventDefault();
      offsetX = e.changedTouches[0].screenX;
      offsetY = e.changedTouches[0].screenY;
      c.style.transform = `rotateX(0deg) rotateZ(0deg) translateZ(150px)`;
      c.style.filter = 'blur(0px)';
    });
    c.addEventListener('touchmove', e => {
     e.preventDefault();
     c.style.transform = `rotateX(0deg) rotateZ(0deg) translateZ(150px) translateX(${e.changedTouches[0].screenX-offsetX}px) translateY(${e.changedTouches[0].screenY-offsetY}px)`;
 
    endX = e.changedTouches[0].screenX-offsetX;

    });
    c.addEventListener('touchend', e => {
     e.preventDefault();
     if(!endListen) {
      recognition.onend();
      endListen = true;
     }
     c.style.transform = `rotateX(0deg) rotateZ(0deg) translateZ(150px) translateX(${endX > 0 ? 500 : -500}px) translateY(${e.changedTouches[0].screenY-offsetY}px)`;
    endX = 0;

    });
  }
});