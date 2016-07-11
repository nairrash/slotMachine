var reels = [
  ['tea-pot','coffee-maker','espresso-machine'],
  ['tea-strainer','coffee-filter','espresso-tamper'],
  ['loose-tea','coffee-grounds','espresso-beans']
];

var reel = document.getElementsByClassName('reel');

var height =0;
var starter,
  tMax = 3000;
    speeds=[],
r =[];
var messenger = document.getElementById('msg');


var calculateReelHeight =function(){
  var boundingDivHeight =document.getElementsByClassName('reel')[0].offsetHeight;
  return boundingDivHeight;
};



function start(){
  r=[];

  height = calculateReelHeight();
  for(var i = 0; i < 3; i++){

    reel[i].innerHTML = assignReelValue(i);
    //console.log(reel[i].innerHTML);
    // for(var j=0; j< 3; j++){
    //   reel[i].children[j].style.height =height;
    //
    // }


  }

  //console.log(height);
  var trigger = document.getElementById('trigger');
  trigger.addEventListener('click',startReelRotation);
}

function assignReelValue(value){
  //console.log(value);
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
    r[i] = (Math.random() * 3 | 0) * (height);
  }

  messenger.innerHTML = 'Spinning...';
  // console.log(r[0]);
  // console.log(r[1] );
  // console.log(r[2]);
  // console.log(height*3);
  animate();

}

function animate(now){
  //height =200;
  //r=[0,60,250];
  if (!starter) starter = now;
  var t = now - starter || 0;



  for (var i = 0; i < 3; ++i){
    //console.log(speeds[i] / tMax * (tMax - t) * (tMax - t));

    reel[i].scrollTop = (speeds[i] / tMax * (tMax - t) * (tMax - t) + r[i]) % (height*3) | 0;
    //reel[i].scrolltop =(speeds[i] / tMax / 2 * (tMax - t) * (tMax - t) + r[i]) % height | 0;
    //console.log(reel[i].scrollTop );

  }


  if (t < tMax)
    requestAnimationFrame(animate);
  else {
    starter = undefined;
    check();
  }
}

function check(){
  console.log(r);
for(var i=0; i < 3; i++){
  console.log(reel[i].scrollTop);
}

  messenger.innerHTML =
    r[0] === r[1] && r[1] === r[2] ?
    'You won! Enjoy your ' + reels[1][ (r[0] / height) | 0 ].split('-')[0]
      :
      'Try again'
  ;
}






start();