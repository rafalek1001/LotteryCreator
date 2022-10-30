import { getRndInteger } from "../utilities/getRndInteger.js";
import users from "../data/users.json" assert {type: 'json'};
import congratulations from "../data/congratulations.json" assert {type: 'json'}

const lotteryBtn = document.getElementsByClassName('lottery-btn');
const lotteryContainer = document.getElementsByClassName('lottery-container');
const lotteryBackground = document.getElementsByClassName('lottery-background');
const lotteryWinner = document.getElementsByClassName('lottery-winner');
const lotterySpeedModeBtns = document.getElementsByClassName('lottery-speed-btn');
const lotteryOddsModeBtns = document.getElementsByClassName('lottery-odds-btn');

const lotterySoundSlow = new Audio('../sounds/lotterySlow.mp3');
const lotterySoundMedium = new Audio('../sounds/lotteryMedium.mp3');
const lotterySoundFast = new Audio('../sounds/lotteryFast.mp3');

let nextLottery = false;

export class Lottery {
  constructor(speed, odds) {
    this.speed = speed;
    this.odds = odds;
    this.winner = {};

    this.users = users;

    this.winnerCongratulations = congratulations;

    this.choosens = [];
  }

  runLottery() {
    lotteryBtn[0].setAttribute('disabled', 'true');

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

    for (const lotterySpeedModeBtn of lotterySpeedModeBtns) {
      lotterySpeedModeBtn.setAttribute('disabled', 'true');
    }
  
    lotteryWinner[0].textContent = '';
    lotteryWinner[0].classList.remove('lottery-winner-fadein');

    if (lotteryBackground.length > 0) {
      lotteryContainer[0].removeChild(lotteryBackground[0]);
    }
  
    if (nextLottery) {
      let lotteryItems = document.getElementsByClassName('lottery-item');
      lotteryItems = Array.from(lotteryItems);
  
      for (const lotteryItem of lotteryItems) {
      lotteryContainer[0].removeChild(lotteryItem);
      }
    }

    for (let i = 0; i < 80; i++) {
      const item = document.createElement('div');
      item.classList.add('lottery-item');

      const itemImg = document.createElement('img');

      const number = getRndInteger(1, this.getOdds() + this.users.length);

      if ((number - 1) < this.users.length) {
        itemImg.setAttribute('src', `${this.users[number - 1].image}`);
        item.setAttribute('name', `${this.users[number - 1].name}`);
        this.choosens.push(this.users[number - 1]);
      } else {
        itemImg.setAttribute('src', `${this.users[0].image}`);
        item.setAttribute('name', `${this.users[0].name}`);
        this.choosens.push(this.users[0]);
      }

      itemImg.setAttribute('width', '76');

      lotteryContainer[0].appendChild(item);
      item.appendChild(itemImg);
    }

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

  getOdds() {
    return this.odds;
  }

  setOdds(odds) {
    if (odds === 1) {
      lotteryOddsModeBtns[0].classList.add('lottery-odds-btn-on');
      lotteryOddsModeBtns[1].classList.remove('lottery-odds-btn-on');
      lotteryOddsModeBtns[2].classList.remove('lottery-odds-btn-on');
    } else if (odds === 10) {
      lotteryOddsModeBtns[1].classList.add('lottery-odds-btn-on');
      lotteryOddsModeBtns[0].classList.remove('lottery-odds-btn-on');
      lotteryOddsModeBtns[2].classList.remove('lottery-odds-btn-on');
    } else if (odds === 100) {
      lotteryOddsModeBtns[2].classList.add('lottery-odds-btn-on');
      lotteryOddsModeBtns[0].classList.remove('lottery-odds-btn-on');
      lotteryOddsModeBtns[1].classList.remove('lottery-odds-btn-on');
    }

    this.odds = odds;
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