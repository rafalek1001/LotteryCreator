import { Lottery } from "./modules/Lottery.js";

const lotteryBtn = document.getElementsByClassName('lottery-btn');
const lotterySpeedModeBtns = document.getElementsByClassName('lottery-speed-btn');
const lotteryOddsModeBtns = document.getElementsByClassName('lottery-odds-btn');

// SPEED:
// 20 - slowly
// 8 - normal
// 3 - fast

// ODDS:
// 1 - x1
// 10 - x10
// 100 - x100

let speed = 8; // Default startup speed parameter
let odds = 1; // Default startup odds parameter

const lottery = new Lottery(speed, odds);

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

lotteryOddsModeBtns[0].addEventListener('click', () => {
  lottery.setOdds(1);
});

lotteryOddsModeBtns[1].addEventListener('click', () => {
  lottery.setOdds(10);
});

lotteryOddsModeBtns[2].addEventListener('click', () => {
  lottery.setOdds(100);
});