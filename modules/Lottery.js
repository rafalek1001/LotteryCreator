import { getRndInteger } from "../utilities/getRndInteger.js";
import { shuffleArray } from "../utilities/shuffleArray.js";
import users from "../data/users.json" assert {type: 'json'};
import congratulations from "../data/congratulations.json" assert {type: 'json'}

const lotteryBtn = document.getElementsByClassName('lottery-btn');
const lotteryContainer = document.getElementsByClassName('lottery-container');
const lotteryBackground = document.getElementsByClassName('lottery-background');
const lotteryWinner = document.getElementsByClassName('lottery-winner');
const lotterySpeedModeBtns = document.getElementsByClassName('lottery-speed-btn');

const lotterySoundSlow = new Audio('../sounds/lotterySlow.mp3');
const lotterySoundMedium = new Audio('../sounds/lotteryMedium.mp3');
const lotterySoundFast = new Audio('../sounds/lotteryFast.mp3');

// Switch for the next lottery
let nextLottery = false;

export class Lottery {
  constructor(speed) {
    this.speed = speed;
    this.winner = {};

    this.users = users;

    this.winnerCongratulations = congratulations;

    this.choosens = [];
  }

  runLottery() {
    // Check sum of probability - if sum (of users.odds) is not 100% stop the lottery and throw error
    let percentageSum = 0;
    
    for (let i = 0; i < this.users.length; i++) {
      percentageSum += this.users[i].odds;
    }

    if (percentageSum !== 100) {
      lotteryWinner[0].style.color = "red";
      lotteryWinner[0].textContent = `Suma prawdopodobieństwa nie jest równa 100%!`;
      return;
    };

    // Disabling the lottery button for the duration of the lottery
    lotteryBtn[0].setAttribute('disabled', 'true');

    // Check the speed mode and adjust the appropriate sound
    if (this.getSpeed() === 20) {
      lotterySoundSlow.pause();
      lotterySoundSlow.currentTime = 0;
      lotterySoundSlow.play();
    } else if (this.getSpeed() === 8) {
      lotterySoundMedium.pause();
      lotterySoundMedium.currentTime = 0;
      lotterySoundMedium.play();
    } else if (this.getSpeed() === 3) {
      lotterySoundFast.pause();
      lotterySoundFast.currentTime = 0;
      lotterySoundFast.play();
    }

    // Disabling the speed mode button for the duration of the lottery
    for (const lotterySpeedModeBtn of lotterySpeedModeBtns) {
      lotterySpeedModeBtn.setAttribute('disabled', 'true');
    }
  
    lotteryWinner[0].textContent = '';
    lotteryWinner[0].classList.remove('lottery-winner-fadein');

    // Removal of background image (question marks)
    if (lotteryBackground.length > 0) {
      lotteryContainer[0].removeChild(lotteryBackground[0]);
    }
  
    // Removal of images of the old lottery
    if (nextLottery) {
      let lotteryItems = document.getElementsByClassName('lottery-item');
      lotteryItems = Array.from(lotteryItems);
  
      for (const lotteryItem of lotteryItems) {
      lotteryContainer[0].removeChild(lotteryItem);
      }
    }

    // Creating lottery picks
    for (let i = 0; i < this.users.length; i++) {
      for (let j = 0; j < this.users[i].odds; j++) {
        this.choosens.push(this.users[i]);
      }
    }

    this.choosens = shuffleArray(this.choosens);

    for (let i = 0; i < this.choosens.length; i++) {
      const item = document.createElement('div');
      item.classList.add('lottery-item');
      const itemImg = document.createElement('img');

      itemImg.setAttribute('src', `${this.choosens[i].image}`);
      item.setAttribute('name', `${this.choosens[i].name}`);

      itemImg.setAttribute('width', '76');

      lotteryContainer[0].appendChild(item);
      item.appendChild(itemImg);
    }

    console.log(this.choosens);

    this.setWinner();

    const lotteryItems = document.getElementsByClassName('lottery-item');

    for (const lotteryItem of lotteryItems) {
      lotteryItem.classList.add('lottery-item-animation-fadein');
      setTimeout(() => {
        let root = document.documentElement;
        const number = getRndInteger(0, 11);
        root.style.setProperty('--animation-name', `scrollItems${number}`);
        lotteryItem.classList.add('lottery-item-animation-scroll');
      }, 1000);
    }

    setTimeout(() => {
      lotteryBtn[0].removeAttribute('disabled');

      for (const lotterySpeedModeBtn of lotterySpeedModeBtns) {
      lotterySpeedModeBtn.removeAttribute('disabled');
      }

      this.setCongratulations();

      lotteryWinner[0].classList.add('lottery-winner-fadein');

      const lotteryItemWinner = document.querySelector('.lottery-container div:nth-of-type(71)');
      lotteryItemWinner.classList.add('lottery-item-winner');

      this.choosens = [];
    }, this.getSpeed() * 1000 + 2000);

    nextLottery = true;
  }

  getSpeed() {
    return this.speed;
  }

  setSpeed(speed) {
    if (speed === 20) {
      lotterySpeedModeBtns[0].classList.add('lottery-speed-btn-on');
      lotterySpeedModeBtns[1].classList.remove('lottery-speed-btn-on');
      lotterySpeedModeBtns[2].classList.remove('lottery-speed-btn-on');
    } else if (speed === 8) {
      lotterySpeedModeBtns[1].classList.add('lottery-speed-btn-on');
      lotterySpeedModeBtns[0].classList.remove('lottery-speed-btn-on');
      lotterySpeedModeBtns[2].classList.remove('lottery-speed-btn-on');
    } else if (speed === 3) {
      lotterySpeedModeBtns[2].classList.add('lottery-speed-btn-on');
      lotterySpeedModeBtns[0].classList.remove('lottery-speed-btn-on');
      lotterySpeedModeBtns[1].classList.remove('lottery-speed-btn-on');
    }

    this.speed = speed;

    let root = document.documentElement;
    root.style.setProperty('--animation-duration', `${this.speed}s`);
  }

  getWinner() {
    return this.winner;
  }

  setWinner() {
    this.winner = this.choosens[70];
  }

  setCongratulations() {
    const number = getRndInteger(1, this.winnerCongratulations.length + 1);
    lotteryWinner[0].textContent = `${this.getWinner().name}${this.winnerCongratulations[number - 1].text}`;
  }
}