import { Lottery } from "./modules/Lottery.js";

const lotteryBtn = document.getElementsByClassName('lottery-btn');
const lotterySpeedModeBtns = document.getElementsByClassName('lottery-speed-btn');

// SPEED:
// 20 - slowly
// 8 - normal
// 3 - fast

let speed = 8; // Default startup speed parameter

const lottery = new Lottery(speed);

lotteryBtn[0].addEventListener('click', () => {
  lottery.runLottery();
});

lotterySpeedModeBtns[0].addEventListener('click', () => {
  lottery.setSpeed(20);
});

lotterySpeedModeBtns[1].addEventListener('click', () => {
  lottery.setSpeed(8);
});

lotterySpeedModeBtns[2].addEventListener('click', () => {
  lottery.setSpeed(3);
});