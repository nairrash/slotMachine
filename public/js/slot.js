/*
/*
 Slot Machine
 */
var sm = (function(undefined){

  var tMax = 3000, // animation time, ms
    height = 210,
    speeds = [],
    r = [],
    reels = [
      ['coffee maker',   'teapot',       'espresso machine'],
      ['coffee filter',  'tea strainer', 'espresso tamper'],
      ['coffee grounds', 'loose tea',    'ground espresso beans']
    ],
    $reels, $msg,
    start;

  function init(){
    $reels = $('.reel').each(function(i, el){
      el.innerHTML = '<div><p>' + reels[i].join('</p><p>') + '</p></div><div><p>' + reels[i].join('</p><p>') + '</p></div>'
    });

    $msg = $('.msg');

    $('button').click(action);
  }

  function action(){
    if (start !== undefined) return;

    for (var i = 0; i < 3; ++i) {
      speeds[i] = Math.random() + .5;
      r[i] = (Math.random() * 3 | 0) * height / 3;
    }

    $msg.html('Spinning...');
    animate();
  }

  function animate(now){
    if (!start) start = now;
    var t = now - start || 0;

    for (var i = 0; i < 3; ++i)
      $reels[i].scrollTop = (speeds[i] / tMax / 2 * (tMax - t) * (tMax - t) + r[i]) % height | 0;

    if (t < tMax)
      requestAnimationFrame(animate);
    else {
      start = undefined;
      check();
    }
  }

  function check(){
    $msg.html(
      r[0] === r[1] && r[1] === r[2] ?
      'You won! Enjoy your ' + reels[1][ (r[0] / 70 + 1) % 3 | 0 ].split(' ')[0]
        :
        'Try again'
    );
  }

  return {init: init}

})();

$(sm.init);