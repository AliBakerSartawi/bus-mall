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
// function noExt(name){
//   names.push(name.split('.').slice(0, -1).join('.'));
// }

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
  this.path = `./img/${name}.${ext}`;
  this.votes = 0;
  this.views = 0;
  RandomImage.all.push(this);
}

RandomImage.all = [];

for (let i = 0; i < names.length; i++) {
  new RandomImage(names[i], ext[i]);
}

console.table(RandomImage.all);


//image randomizor
let leftPrevious = -1;
let midPrevious = -2;
let rightPrevious = -3;
function render () {
  let leftIndex = randomNumber(0, names.length -1);
  while (leftIndex === leftPrevious || leftIndex === midPrevious || leftIndex === rightPrevious) {
    leftIndex = randomNumber(0, names.length -1);
    if(leftIndex !== leftPrevious && leftIndex !== midPrevious && leftIndex !== rightPrevious){
      break;
    }
  }
  // console.log(leftIndex);
  leftImage.src = RandomImage.all[leftIndex].path;
  leftImage.title = RandomImage.all[leftIndex].name;
  leftImage.alt = RandomImage.all[leftIndex].name;
  RandomImage.all[leftIndex].views++;

  let midIndex = randomNumber(0, names.length -1);
  while (midIndex === leftPrevious || midIndex === midPrevious || midIndex === rightPrevious || midIndex === leftIndex) {
    midIndex = randomNumber(0, names.length -1);
    if(midIndex !== leftPrevious && midIndex !== midPrevious && midIndex !== rightPrevious && midIndex !== leftIndex) {
      break;
    }
  }
  midImage.src = RandomImage.all[midIndex].path;
  midImage.title = RandomImage.all[midIndex].name;
  midImage.alt = RandomImage.all[midIndex].name;
  RandomImage.all[midIndex].views++;

  let rightIndex = randomNumber(0, names.length -1);
  while (rightIndex === leftPrevious || rightIndex === midPrevious || rightIndex === rightPrevious || rightIndex === leftIndex || rightIndex === midIndex) {
    rightIndex = randomNumber(0, names.length -1);
    if(rightIndex !== leftPrevious && rightIndex !== midPrevious && rightIndex !== rightPrevious && rightIndex !== leftIndex && rightIndex !== midIndex){
      break;
    }
  }
  rightImage.src = RandomImage.all[rightIndex].path;
  rightImage.title = RandomImage.all[rightIndex].name;
  rightImage.alt = RandomImage.all[rightIndex].name;
  RandomImage.all[rightIndex].views++;

  leftPrevious = leftIndex;
  midPrevious = midIndex;
  rightPrevious = rightIndex;
  // console.table(RandomImage.all);
  console.log('current', leftIndex, midIndex, rightIndex);
  // console.log('mid', midIndex);
  // console.log('right', rightIndex);
}
render();


//image click event
imagesSection.addEventListener('click', handleClick);

function handleClick(event) {
  // console.log('target', event.target.id);

  if(event.target.id !== 'images-section'){
    for (let i = 0; i < RandomImage.all.length; i++) {
      if (RandomImage.all[i].name === event.target.title) {
        RandomImage.all[i].votes++;
      }
    }
    render();
    counter = counter + 1;
    // console.log(counter);
    if(counter === rounds){
      imagesSection.removeEventListener('click', handleClick);
      
      const buttonEl = document.createElement('button');
      buttonSection.appendChild(buttonEl);
      buttonEl.textContent = 'SHOW RESULTS!';

      buttonSection.addEventListener('click', handleButton);
    }
  }
}


//button function
function handleButton(event) {
  // console.log(event.target.id);
  buttonSection.removeEventListener('click', handleButton);
  
  const listSection = document.getElementById('results-list');
  const ulSection = document.createElement('ul');
  listSection.appendChild(ulSection);
  
  createChart();
  for (let i = 0; i < RandomImage.all.length; i++) {
    const liEl = document.createElement('li');
    ulSection.appendChild(liEl);
    // liEl.textContent = `${RandomImage.all[i].name.toUpperCase()} had ${RandomImage.all[i].votes} votes and was seen ${RandomImage.all[i].views} times.`;
    liEl.textContent = `${RandomImage.all[i].name.toUpperCase()} had ${imageVotes[i]} votes and was seen ${imageViews[i]} times.`;

  }
  localStorage.removeItem('votes');
  localStorage.removeItem('views');
  localStorage.setItem('votes', JSON.stringify(imageVotes));
  localStorage.setItem('views', JSON.stringify(imageViews));
}


// the chart function
const imageVotes = [];
const imageViews = [];
if(imageViews.length < 1) {
  for (let i = 0; i < RandomImage.all.length; i++) {
    imageVotes.push(0);
    imageViews.push(0);
  }
}

function createChart() {
  const ctx = document.getElementById('resultChart').getContext('2d');
  
  for (let i = 0; i < RandomImage.all.length; i++) {
    // imageVotes.push(RandomImage.all[i].votes);
    // imageViews.push(RandomImage.all[i].views);
    imageVotes[i] += RandomImage.all[i].votes;
    imageViews[i] += RandomImage.all[i].views;
  }

  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: names,
      datasets: [{
        label: '# of votes',
        backgroundColor: 'aquamarine',
        borderColor: 'aquamarine',
        // barPercentage: 0.5,
        // barThickness: 2,
        data: imageVotes,
      },
      {
        label: '# of views',
        backgroundColor: 'salmon',
        borderColor: 'salmon',
        // barPercentage: 0.5,
        // barThickness: 2,
        data: imageViews,
      }]
    },

    // Configuration options go here
    options: {
      responsive: false
    }
  });
}

//localStorage retrieve 
function retrieve(){
  localStorage.removeItem('randid');
  console.log(localStorage);
  
  if(localStorage.length > 0) {
    const oldVotes = JSON.parse(localStorage.getItem('votes'));
    const oldViews = JSON.parse(localStorage.getItem('views'));
    
    for (let i = 0; i < imageVotes.length; i++) {
      imageVotes[i] += oldVotes[i];
      imageViews[i] += oldViews[i];
    }
    // imageVotes.push(oldVotes);
    // imageViews.push(oldViews);
    console.log('old votes', oldVotes);
    console.log('old views', oldViews);
  }
  console.log('total votes', imageVotes);
  console.log('total views', imageViews);
}
retrieve();
