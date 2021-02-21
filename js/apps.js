'use strict';

//helper function
function randomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const names = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
];

const leftImage = document.getElementById('left-image');
const midImage = document.getElementById('mid-image');
const rightImage = document.getElementById('right-image');
const imageSection = document.getElementById('images');

function RandomImage(name) {
  this.name = name;
  this.path = `../img/${name}.jpg`;
  this.votes = 0;
  this.views = 0;
  RandomImage.all.push(this);
}

RandomImage.all = [];

for (let i = 0; i < names.length; i++) {
  new RandomImage(names[i]);
}

console.table(RandomImage.all);

function render () {
  const leftIndex = randomNumber(0, names.length -1);
  leftImage.src = RandomImage.all[leftIndex].path;
  leftImage.title = RandomImage.all[leftIndex].name;
  leftImage.alt = RandomImage.all[leftIndex].name;

  const midIndex = randomNumber(0, names.length -1);
  midImage.src = RandomImage.all[midIndex].path;
  midImage.title = RandomImage.all[midIndex].name;
  midImage.alt = RandomImage.all[midIndex].name;

  const rightIndex = randomNumber(0, names.length -1);
  rightImage.src = RandomImage.all[rightIndex].path;
  rightImage.title = RandomImage.all[rightIndex].name;
  rightImage.alt = RandomImage.all[rightIndex].name;
}

render();

imageSection.addEventListener('click', handleClick);

function handleClick(event) {
  console.log('target', event.target.id);
}