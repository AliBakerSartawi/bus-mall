'use strict';

//helper function
function randomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//extension extractor
function getExt(filename) {
  var idx = filename.lastIndexOf('.');
  // handle cases like, .htaccess, filename
  return (idx < 1) ? '' : filename.substr(idx + 1);
}

//name extractor
function noExt(name){
  names.push(name.split('.').slice(0, -1).join('.'));
}

const namesFull = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg',
];

const names = [];
const ext = [];
let counter = 0;
const rounds = 25;

//filling names array without extensions
for (let i = 0; i < namesFull.length; i++) {
  names.push(namesFull[i].split('.').slice(0, -1).join('.'));
}
console.log(names);

//filling ext array without names
for (let i = 0; i < namesFull.length; i++) {
  ext.push(getExt(namesFull[i]));
}
console.log(ext);

//getting nodes
const leftImage = document.getElementById('left-image');
const midImage = document.getElementById('mid-image');
const rightImage = document.getElementById('right-image');
const imagesSection = document.getElementById('images-section');
const buttonSection = document.getElementById('results-button');

function RandomImage(name, ext) {
  this.name = name;
  this.path = `../img/${name}.${ext}`;
  this.votes = 0;
  this.views = 0;
  RandomImage.all.push(this);
}

RandomImage.all = [];

for (let i = 0; i < names.length; i++) {
  new RandomImage(names[i], ext[i]);
}

console.table(RandomImage.all);

function render () {
  let leftIndex = randomNumber(0, names.length -1);
  leftImage.src = RandomImage.all[leftIndex].path;
  leftImage.title = RandomImage.all[leftIndex].name;
  leftImage.alt = RandomImage.all[leftIndex].name;
  RandomImage.all[leftIndex].views++;

  let midIndex = leftIndex;
  while (midIndex === leftIndex) {
    midIndex = randomNumber(0, names.length -1);
    if(midIndex !== leftIndex) {
      break;
    }
  }
  midImage.src = RandomImage.all[midIndex].path;
  midImage.title = RandomImage.all[midIndex].name;
  midImage.alt = RandomImage.all[midIndex].name;
  RandomImage.all[midIndex].views++;

  let rightIndex;
  while (midIndex !== leftIndex) {
    rightIndex = randomNumber(0, names.length -1);
    if(rightIndex === leftIndex || rightIndex === midIndex){
      rightIndex = randomNumber(0, names.length -1);
    } else {
      break;
    }
  }
  rightImage.src = RandomImage.all[rightIndex].path;
  rightImage.title = RandomImage.all[rightIndex].name;
  rightImage.alt = RandomImage.all[rightIndex].name;
  RandomImage.all[rightIndex].views++;

  console.table(RandomImage.all);
}

render();

imagesSection.addEventListener('click', handleClick);

function handleClick(event) {
  console.log('target', event.target.id);

  if(event.target.id !== 'images-section'){
    for (let i = 0; i < RandomImage.all.length; i++) {
      if (RandomImage.all[i].name === event.target.title) {
        RandomImage.all[i].votes++;
      }
    }
    render();
    counter = counter + 1;
    console.log(counter);
    if(counter === rounds){
      imagesSection.removeEventListener('click', handleClick);
      
      const buttonEl = document.createElement('button');
      buttonSection.appendChild(buttonEl);
      buttonEl.textContent = 'SHOW RESULTS!';

      buttonSection.addEventListener('click', handleButton);
    }
  }
}

function handleButton(event) {
  console.log(event.target.id);
  buttonSection.removeEventListener('click', handleButton);
  
  const listSection = document.getElementById('results-list');
  const ulSection = document.createElement('ul');
  listSection.appendChild(ulSection);

  for (let i = 0; i < RandomImage.all.length; i++) {
    const liEl = document.createElement('li');
    ulSection.appendChild(liEl);
    liEl.textContent = `${RandomImage.all[i].name.toUpperCase()} had ${RandomImage.all[i].votes} votes and was seen ${RandomImage.all[i].views} times.`;
  }
}
