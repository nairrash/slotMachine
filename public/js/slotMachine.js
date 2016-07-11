var reels = [
  ['tea-pot','coffee-maker','espresso-machine'],
  ['tea-strainer','coffee-filter','espresso-tamper'],
  ['loose-tea','coffee-grounds','espresso-beans']
];

var reel = document.getElementsByClassName('reel'),
  messenger = document.getElementById('msg');


var height =0,
  starter,
  tMax = 3000,
  speeds=[],
  rounds =[];


var calculateReelHeight =function(){
  var boundingDivHeight =document.getElementsByClassName('reel')[0].offsetHeight;
  return boundingDivHeight;
};



function start(){

  height = calculateReelHeight();
  for(var i = 0; i < 3; i++){

    reel[i].innerHTML = assignReelValue(i);

  }

  //console.log(height);
  var trigger = document.getElementById('trigger');
  trigger.addEventListener('click',startReelRotation);
}

function assignReelValue(value){
  assignedValue ='';
  for(var i = 0; i < reels[value].length;i++){
    assignedValue += '<div><p>'+ reels[value][i] + '</p></div>';
  }
  return assignedValue;
}

function startReelRotation(){
  if (starter !== undefined) return;

  for (var i = 0; i < 3; ++i) {
    speeds[i] = Math.random() + .5;
    rounds[i] = (Math.random() * 3 | 0) * (height);
  }

  messenger.innerHTML = 'Reel is still spinning...';

  startReel();

}

function startReel(now){
  //height =200;
  //r=[0,60,250];
  if (!starter) starter = now;
  var t = now - starter || 0;

  for (var i = 0; i < 3; ++i){

    reel[i].scrollTop = (speeds[i] / tMax * (tMax - t) * (tMax - t) + rounds[i]) % (height*3) | 0;
    //console.log(reel[i].scrollTop );

  }


  if (t < tMax)
    requestAnimationFrame(startReel);
  else {
    starter = undefined;
    resultChecker();
  }
}

function resultChecker(){
  // for(var i=0; i < 3; i++){
  //   console.log(reel[i].scrollTop);
  // }

  messenger.innerHTML =
    rounds[0] === rounds[1] && rounds[1] === rounds[2] ?
    'You won! Enjoy your ' + reels[1][ (rounds[0] / height) | 0 ].split('-')[0]
      :
      'Try again'
  ;
}

start();