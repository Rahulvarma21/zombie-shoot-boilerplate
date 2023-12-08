let gameBodyDiv = document.getElementById('game-body');
let TimerSpan = 60;
let arr = [
  './assets/zombie-1.png',
  './assets/zombie-2.png',
  './assets/zombie-3.png',
  './assets/zombie-4.png',
  './assets/zombie-5.png',
  './assets/zombie-6.png',
];
// len - 6
// lastIndex  - 5
let bgmSound = new Audio('./assets/bgm.mp3');
bgmSound.play();
bgmSound.loop = true;
//backgroundSound -> BGM
//Shotgun Sound -> shotgun.wav

gameBodyDiv.addEventListener('click', function () {
  let ShotGunSound = new Audio('./assets/shotgun.wav');
  ShotGunSound.play();
  ShotGunSound.volume = 3;
});

let LivesRemaingCount = 0;
let ZombieId = 0;

function CreateZombie() {
  let randDomImagePicker = arr[Math.floor(Math.random() * 6)];
  console.log(randDomImagePicker);

  gameBodyDiv.innerHTML += `<img src=${randDomImagePicker} alt='${randDomImagePicker}' class='zombie-image'  id='zombie-${ZombieId}'/>`;

  let getZombie = document.getElementById('zombie-' + ZombieId);

  let TranlateXRandomNumber = Math.floor(Math.random() * (80 - 20)) + 20;

  getZombie.style.transform = `translateX(${TranlateXRandomNumber}vw)`;

  let randomSecondsNumber = Math.floor(Math.random() * (7 - 2)) + 2;
  getZombie.style.animationDuration = `${randomSecondsNumber}s`;

  //shott
  getZombie.addEventListener('click', function () {
    RmoveZombie(getZombie);
  });
}

function RmoveZombie(zombieDiv) {
  zombieDiv.style.display = 'none';
  ZombieId++;
  CreateZombie();
}

setInterval(function () {
  TimerSpan = TimerSpan - 1;
  document.getElementById('timer').innerHTML = TimerSpan;

  let missedZombie = document.getElementById('zombie-' + ZombieId);

  let topDimensionZombie = missedZombie.getBoundingClientRect().top;

  if (topDimensionZombie <= 0) {
    LivesRemaingCount++;

    if (LivesRemaingCount == 4) {
      window.location.href = './game-over.html';
      console.log('Game - Over');
    }
    RmoveZombie(missedZombie);
  }
  if (TimerSpan == 0) {
    window.location.href = './win.html';
    console.log('Winner');
  }
}, 1000);

CreateZombie();