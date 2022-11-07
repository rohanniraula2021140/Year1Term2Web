// this object is made to store the interval for the bomb
let checkingplayerandbomb = {
  bomb1: null,
  bomb2: null,
  bomb3: null,
  bomb4: null,
  bomb5: null,
  bomb6: null,
  bomb7: null,
  bomb8: null,
  bomb9: null,
  bomb10: null,
};
// this will store the score of the player
let Scoreofplayercounter = 0;
var upPressed = false;
// it will score the high score
let highscore = 0;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
// it will score the life remaining
let lifecounter = 3;
// it will store the state of the player has hitten or not
let playerhashitten = false;
// it will store the number of the bomb dropped in each level
let bombcounter = 0;
// it will store the time interval where in between the interval need to be started
let checkingtime = 1;
// it will store whethere the bomb has been stored or not
let bombexploded = false;
// it will store the current level in the game
let level = 1;
// it will store the id of record of the player
let countername = 0;
// it will store the score of the player
let Score = 0;
// it will store the timeout
let timeout = null;
// animation time for the bomb
let animationtime;
// it stores the bomb list
const noofbomb = [
  "bomb1",
  "bomb2",
  "bomb3",
  "bomb4",
  "bomb5",
  "bomb6",
  "bomb7",
  "bomb8",
  "bomb9",
  "bomb10",
];
// it will store whether the given bomb has been exploded or not
const groundexplode = {
  bomb1: null,
  bomb2: null,
  bomb3: null,
  bomb4: null,
  bomb5: null,
  bomb6: null,
  bomb7: null,
  bomb8: null,
  bomb9: null,
  bomb10: null,
};
// it will store the previous position of the bomb so that explosion can be done at
// that position
const bombvtopposition = {
  bomb1: null,
  bomb2: null,
  bomb3: null,
  bomb4: null,
  bomb5: null,
  bomb6: null,
  bomb7: null,
  bomb8: null,
  bomb9: null,
  bomb10: null,
};
// it store whether the bomb is visible or not
const bombvisibility = {
  bomb1: true,
  bomb2: false,
  bomb3: false,
  bomb4: false,
  bomb5: false,
  bomb6: false,
  bomb7: false,
  bomb8: false,
  bomb9: false,
  bomb10: false,
};
// it will store the condition where the start is clicked or not
let startisclicked = false;
let arrowcheck;
// it will store how many space button has been clicked
let spacecounting = 0;
// it will store the stat whether the space has been pressed or not
let spacehaspressed = false;
let spacehasreleased = true;
// it will store the stat whether the space has been released or not
let arrowcanshootout = true;
// it will store the abitity that arrow can shoot out or not

function clearallinterval() {
  // specially created function to clear the interval
  for (var i = 0; i < noofbomb.length; i++) {
    // It will clear the interval of the bomb present in the array noofbobm
    clearInterval(checkingplayerandbomb[noofbomb[i]]);
  }
}

function onthefunction() {
  // it will store the player name and the score
  var inputFname = document.getElementById("playername");
  if (inputFname.value == "") {
    // console.log('null value not running');
  } else {
    localStorage.setItem(countername, inputFname.value + " " + Score);
    // it will score the name and score of the player in the local storage
    countername++;
    // created to give the id to the player detail
    // console.log(' notnull value  running',countername);
  }
  var scorecardcontainer = document.getElementById("form");
  outthefunction();
  restartthegame2();
  // restartthegame2 will create the button to restart the game.
  scorecardcontainer.classList.add("hide");
}

function audiocontroller(audioid) {
  //specially created function to control the audio in the game
  var audios = document.getElementById(audioid);
  audios.play();
}

function outthefunction() {
  // it will get the record of the player name from local storage and add it to the score table
  var textare = document.getElementById("playersscorecardid");
  textare.innerHTML = "";
  // it will get the record of the player name form the local storage
  for (var j = 0; j < countername; j++) {
    var createp = document.createElement("p");
    var toprint = localStorage.getItem(j);

    createp.innerHTML = toprint;
    textare.appendChild(createp);
  }
}

function keyup(event) {
  var player = document.getElementById("player");
  if (event.keyCode == 37) {
    // console.log('left key relesed');
    leftPressed = false;
    lastPressed = "left";
  }
  if (event.keyCode == 39) {
    rightPressed = false;
    // console.log('right key relesed');
    lastPressed = "right";
  }
  if (event.keyCode == 38) {
    upPressed = false;
    lastPressed = "up";
    // console.log('up key relesed');
  }
  if (event.keyCode == 40) {
    downPressed = false;
    lastPressed = "down";
    // console.log('down key relesed');
  }
  if (event.keyCode == 32) {
    spacePressed = false;
    lastPressed = "up fire";
  }
  if (event.keyCode == 32) {
    spacehaspressed = false;
    // console.log('space has released');
    setTimeout(() => {
      spacecounting = 0; //it will count the space pressed
      spacehasreleased = true; //  it will give the state whether space has pressed or not
    }, 500);
    setTimeout(() => {
      arrowdisappear();
      removearrowani();
      arrowreachedtop = true; //it will give the state whethere the arrow has reached the top or not
      arrowcanshootout = true; //it will give the ability the arrow can shootout or not
      // console.log('arrow can shoot ', arrowcanshootout);
    }, 600);
  }

  player.className = "character stand " + lastPressed;
}

function move() {
  // var arrow = document.getElementById('arrow');
  // console.log(arrow.style.top);
  var player = document.getElementById("player");
  var positionLeft = player.offsetLeft;
  var positionTop = player.offsetTop;
  if (downPressed) {
    var newTop = positionTop + 1;
    arrownearplayer();
    var element = document.elementFromPoint(player.offsetLeft, newTop + 32);
    if (element.classList.contains("sky") == false) {
      player.style.top = newTop + "px";
    }

    if (leftPressed == false) {
      if (rightPressed == false) {
        player.className = "character walk down";
      }
    }
  }
  if (upPressed) {
    var newTop = positionTop - 1;
    arrowdisappear();
    arrownearplayer();
    var element = document.elementFromPoint(player.offsetLeft, newTop);
    if (element.classList.contains("sky") == false) {
      player.style.top = newTop + "px";
    }

    if (leftPressed == false) {
      if (rightPressed == false) {
        player.className = "character walk up";
      }
    }
  }
  if (leftPressed) {
    var newLeft = positionLeft - 1;
    arrownearplayer();
    var element = document.elementFromPoint(newLeft, player.offsetTop);
    if (element.classList.contains("sky") == false) {
      player.style.left = newLeft + "px";
    }

    player.className = "character walk left";
  }
  if (rightPressed) {
    var newLeft = positionLeft + 1;
    arrownearplayer();
    var element = document.elementFromPoint(newLeft + 32, player.offsetTop);
    if (element.classList.contains("sky") == false) {
      player.style.left = newLeft + "px";
    }

    player.className = "character walk right";
  }
}

function keydown(event) {
  if (event.keyCode == 37) {
    if (spacehasreleased == true && spacehaspressed == false) {
      // console.log('left has pressed');
      leftPressed = true;
    }
  }
  if (event.keyCode == 39 && spacehaspressed == false) {
    if (spacehasreleased == true && spacehaspressed == false) {
      // console.log('right has pressed');
      rightPressed = true;
    }
  }
  if (event.keyCode == 38 && spacehaspressed == false) {
    if (spacehasreleased == true && spacehaspressed == false) {
      // console.log('up has pressed');
      upPressed = true;
    }
  }
  if (event.keyCode == 40 && spacehaspressed == false) {
    if (spacehasreleased == true && spacehaspressed == false) {
      // console.log('down has pressed');
      downPressed = true;
    }
  }
  if (event.keyCode == 32) {
    spacecounting++;
    spacehasreleased = false;
    if (spacecounting == 1 && spacehasreleased == false) {
      // console.log(spacecounting);
      if (arrowcanshootout) {
        arrowcanshootout = false;
        arrowreachedtop = false;
        // console.log('arrow cannot shoot ', arrowcanshootout);
        arrownearplayer();

        addarrowani();
        arrowappear();
      }
      spacehaspressed = true;
      rightPressed = false;
      leftPressed = false;
      upPressed = false;
      downPressed = false;
      // console.log('space is pressed');
    }
  }
}
function arrownearplayer() {
  // it main task is to keep the arrow near the player
  var arrow = document.getElementById("arrow");
  var player = document.getElementById("player");
  arrow.style.top = player.offsetTop + 25 + "px";
  arrow.style.left = player.offsetLeft + 22 + "px";
}
function addarrowani() {
  // it main task is to add the animation
  // 	console.log('arrow shooted');
  var arrow = document.getElementById("arrow");
  // console.log('arrow up');
  arrowshooted = true;
  //   it will add the audio to the state
  audiocontroller("arrowstartaudio");
  arrow.classList.add("arrow-ani");
}
function removearrowani() {
  // it will remove the animation of the arrow
  var arrow = document.getElementById("arrow");
  arrow.classList.remove("arrow-ani");
}
function arrowdisappear() {
  // the arrow will be dissapear
  var arrow = document.getElementById("arrow");
  arrow.style.visibility = "hidden";
}
function arrowappear() {
  // the arrrow will appear here
  var arrow = document.getElementById("arrow");
  arrowcheck = setInterval(arrowchecker, 1);
  //   it will check whether the arrow can be visible or not
  function arrowchecker() {
    // console.log('arrowchecking');
    var arrowposi = arrowposgiver();
    var playerpos = playerposgiver() + 25;
    // console.log('arrowpos', arrowposi, 'player pos', playerpos);
    var gap = arrowposi - playerpos;
    if (gap < 10 && gap > 0) {
      var arrow = document.getElementById("arrow");
      arrow.style.visibility = "visible";
      // console.log('arrow pos matched');
      clearInterval(arrowcheck);
    }
  }
}
function arrowposgiver() {
  // it gives the current position of the arrow
  var arrow = document.getElementById("arrow");
  var arrowpos = arrow.offsetTop;
  return arrowpos;
}
function playerposgiver() {
  // it gives the current position of the player
  var player = document.getElementById("player");
  var playerpos = player.offsetTop;
  return playerpos;
}

function myLoadFunction() {
  // this function loads first when the document loads
  //   arrow goes near to the player
  arrownearplayer();
  //   arrow gets dissappear
  arrowdisappear();

  var start = document.getElementById("start");
  start.style.height = "7vh";
  // 	var form = document.getElementById('nameform');
  // 	form.classList.add('remove-start');
  start.addEventListener("click", function () {
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
    start.classList.add("remove-start");
    audiocontroller("backgroundaudio");
    timeout = setInterval(move, 10);
    startisclicked = true;
    var player = document.getElementById("player");
    player.style.left = "50%";
    player.style.top = "90%";
    player.classList.remove("hide");
    // console.log(startisclicked);
    // 		bombdropping();
    // justtrying to remove the bomb which exists
    try {
      removeallbomb();
    } catch (e) {
      //         	console.log('do nothing');
    }
    bombincreaseinlevel();
  });
}

function removeallbomb() {
  // its main task to remove the all the bomb
  for (var i = 0; i < noofbomb.length; i++) {
    var bombnum = noofbomb[i];
    var bomb = document.getElementById(bombnum);
    bomb.parentNode.removeChild(bomb);
  }
}
function bombincreaseinlevel() {
  // the level will increase by creating the new bomb
  var previouslevel = level - 1;
  var div = document.createElement("div");
  div.classList.add("c_bomb");
  div.setAttribute("id", noofbomb[previouslevel]);
  document.body.appendChild(div);
  bombdropping(noofbomb[previouslevel]);
}
function increasescore(ratio) {
  // score will increase on the following things
  var scorewrite = document.getElementById("id_score");
  if (ratio == 2) {
    Score += level * 2;
  } else if (ratio == 1) {
    Score += level;
  } else if (ratio == 0) {
    Score = 0;
  }
  if (Score > highscore) {
    highscore = Score;
    var high_score = document.getElementById("id_high");
    high_score.innerHTML = "HighScore : " + highscore;
  }
  scorewrite.innerHTML = "Score : " + Score;
}
function increaselevel() {
  // level will increase when the bomb dropped = 10
  var levelwrite = document.getElementById("id_level");
  bombcounter++;
  if (bombcounter == 10) {
    level++;
    bombincreaseinlevel();
    bombcounter = 0;
    levelwrite.innerHTML = "Level : " + level;
  }
}
function makelevel0() {
  // level = 1 on colling this function
  var levelwrite = document.getElementById("id_level");
  bombcounter = 0;
  level = 1;
  levelwrite.innerHTML = "Level : " + level;
}
function bombdropping(bombparam) {
  // this function takes the parameter bomb param which has the name of the bomb and
  // its main task is to drop the bomb
  checkingplayerandbomb[bombparam] = setInterval(function () {
    audiocontroller("bombdroppingaudio");
    gamerefree(bombparam);
  }, checkingtime);
  //     console.log('interval started for ',bombparam)
  var bomb = document.getElementById(bombparam);
  // 	console.log(bomb);
  // 	bomb.classList.remove('hide-bomb');
  groundexplode[bombparam] = 80 + randomnumber(20);
  // console.log('ground exploding random number is :', groundexplode);
  var playerneararea = level * (window.innerWidth / 10);
  var doubleneararea = 2 * playerneararea;
  if (
    bombparam == "bomb2" ||
    bombparam == "bomb4" ||
    bombparam == "bomb6" ||
    bombparam == "bomb8" ||
    bombparam == "bomb10"
  ) {
    var initbombvalue = randomnumber(window.innerWidth);
    // 		console.log(initbombvalue);
    // 		console.log('even running');
    var finalbombvalue = playerleftposition();
    var r = document.querySelector(":root");
    r.style.setProperty("--initleftvalue", initbombvalue + "px");
    r.style.setProperty("--finalleftvalue", finalbombvalue + "px");
    var rs = getComputedStyle(r);
    var leftgaps = initbombvalue - playerleftposition();
    var topgaps = playertopposition() - bombtopposition(bombparam);
    var aninrad = Math.atan(leftgaps / topgaps); //angle in radian
    var andegree = (aninrad * 180) / Math.PI;
    if (leftgaps < 0) {
      var finaldegree = Math.abs(andegree);
      console.log(leftgaps, "bomb left tira farkina ");
    } else {
      var finaldegree = Math.floor(andegree + 90);
      console.log(leftgaps, "bomb right tira farkine");
    }
    console.log("final degree is", finaldegree);
    r.style.setProperty("--translat", finaldegree + "deg");
    // 	      console.log("The value of translate value is: " + rs.getPropertyValue('--translat'));
    bomb.className = "bomb translateforeven";
    bomb.style.left = finalbombvalue + "px";
  } else {
    console.log("not even runnign");
    if (doubleneararea < window.innerWidth) {
      var playerleftpos =
        playerleftposition() - playerneararea + randomnumber(doubleneararea);
      bomb.className = "bomb bomb-move";
    } else {
      var playerleftpos = randomnumber(window.innerwidth);
      bomb.className = "bomb bomb-move";
    }
  }
  bomb.style.left = playerleftpos + "px";
  // console.log('bombdropping enabled from main functions');
  animationtime =
    parseFloat(
      window.getComputedStyle(bomb, null).getPropertyValue("animation-duration")
    ) * 1000;
  console.log("animation time", animationtime);
  if (animationtime != 1000) {
    bomb.style.animationDuration = animationtime - 100 + "ms";
  }
}
function bombhide() {
  // it will hide all the bomb
  for (var i = 0; i < noofbomb.length; i++) {
    var bombno = noofbomb[i];
    var bomb = document.getElementById(bombno);
    console.log("not supported hidding bomb for", bombno);
    bomb.classList.add("hide-bomb");
  }
}

function gamerefree(bombparam) {
  // this is the gamerefree which will detects what to do when what happens
  if (lifecounter == 0) {
    clearallinterval();
  }
  // 	console.log('running interval for the :',bombparam);
  var bomb = document.getElementById(bombparam);
  bombvtopposition[bombparam] = bomb.offsetTop;
  if (bombhashittheplayerinair(bombparam)) {
    removethelife();
    audiocontroller("hitaudio");
    clearInterval(checkingplayerandbomb[bombparam]);
    bombexplodes(bombparam);
    if (lifecounter == 0) {
      showthegameover();
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("keyup", keyup);
      setTimeout(function () {
        hideplayer();
      }, 6000);
      clearInterval(timeout);
      audiocontroller("deadaudio");
      restartthegame();
    }
  } else if (bombhashitthearrowinair(bombparam)) {
    clearInterval(checkingplayerandbomb[bombparam]);
    bombexplodes(bombparam);
    audiocontroller("arrowshootedaudio");
    increasescore(2);
    arrowdisappear();
  } else if (bombhashittheground(bombparam)) {
    clearInterval(checkingplayerandbomb[bombparam]);
    bombexplodes(bombparam);
    audiocontroller("bombexplodeaudio");
    increasescore(1);
  }
}
function hideplayer() {
  // player will hide on calling this function
  var player = document.getElementById("player");
  player.className = "hide";
}

function bombhashittheground(bombparam) {
  // it will check bomb has hit the ground or not
  var posiofbomb = bombtopposition(bombparam);
  var valueinvh = Math.ceil(100 * (posiofbomb / window.innerHeight));
  // console.log('value in vh is :',valueinvh);

  var explodearea = groundexplode[bombparam];

  var explodeminarea = explodearea - 1;
  var explodemaxarea = explodearea + 1;
  if (
    explodearea == valueinvh ||
    explodemaxarea == valueinvh ||
    explodeminarea == valueinvh
  ) {
    // 		console.log('bomb reached ground');
    return true;
  } else {
    return false;
  }
}

function bombhashitthearrowinair(bombparam) {
  // it will check whether the bomb has hit the arrow or not
  // 	console.log(bombparam);
  var arrow = document.getElementById("arrow");
  var bomb = document.getElementById(bombparam);

  var arrowleftpos = arrow.offsetLeft;
  var arrowtoppos = arrow.offsetTop;
  var bombleftpos = bomb.offsetLeft;
  var bombtoppos = bomb.offsetTop;
  var leftgap = bombleftpos - arrowleftpos;
  var topgap = arrowtoppos - bombtoppos;
  // console.log(topgap,"top gap ");
  // console.log(leftgap,"left gap ");
  if (topgap > -35 && topgap < 35) {
    if (leftgap > -30 && leftgap < 30) {
      return true;
    } else {
      return false;
    }
    // console.log('player has been hitten by the bomb');
  } else {
    return false;
  }
}

function bombhashittheplayerinair(bombparam) {
  // it will check whether the bomb has hit the player ornot
  // console.log("Checking the bomb has hit the player or not")
  var playertoppos = playertopposition();
  var bombleftpos = bombleftposition(bombparam);
  var bombtoppos = bombtopposition(bombparam);
  var playerleftpos = playerleftposition();

  var topgap = playertoppos - bombtoppos;

  var leftgap = playerleftpos - bombleftpos;

  if (topgap > -78 && topgap < 32) {
    if (leftgap > -70 && leftgap < 70) {
      return true;
    } else {
      return false;
    }
    // console.log('player has been hitten by the bomb');
  } else {
    return false;
  }
}

function removethelife() {
  // its main task is to remove the life only
  lifecounter--;
  playerhashitten = true;
  // 	console.log('life counter is ' + lifecounter);
  var player = document.getElementById("player");
  if (lifecounter == 2) {
    var threelifedown = document.getElementById("threelifedown");
    threelifedown.classList.add("remove-onelife");
    player.className = "character hit";
  }
  if (lifecounter == 1) {
    var twolifedown = document.getElementById("twolifedown");
    twolifedown.classList.add("remove-onelife");
    player.className = "character hit";
  }
  if (lifecounter == 0) {
    var onelifedown = document.getElementById("onelifedown");
    onelifedown.classList.add("remove-onelife");
    player.className = "character dead";
  }
}

function onelifeisdown() {
  // its main task is to apply hit animation
  var player = document.getElementById("player");
  player.classList.add("hit");
  player.classList.add("left");
  setTimeout(() => {
    player.classList.remove("hit");
    player.classList.remove("left");
  }, 5000);
}

function restartthegame() {
  //   its main task is to remove the player card
  clearallinterval();

  var start = document.getElementById("start");
  var start_form = document.getElementById("form");
  form.classList.remove("hide");
  var playercard = document.getElementById("playersscorecardid");
  playercard.classList.remove("hide");
}
function restartthegame2() {
  // its main task is to inject the restart button in the page
  setTimeout(() => {
    start.innerHTML = "Restart Game"; //start lai restart banako
    start.classList.remove("remove-start"); //show start

    //show the lives harako lives haru firta layako tintai dekhek

    //startclick bhaxaina banako
    startisclicked = false;
    //start button click bhaepaxi k garne bhaenra lekheko..
    start.addEventListener("click", function () {
      lifecounter = 3;
      increasescore(0);
      player.style.left = "50%";
      player.style.top = "90%";
      makelevel0();
      var threelifedown = document.getElementById("threelifedown");
      var twolifedown = document.getElementById("twolifedown");
      var onelifedown = document.getElementById("onelifedown");
      threelifedown.classList.remove("remove-onelife");
      twolifedown.classList.remove("remove-onelife");
      onelifedown.classList.remove("remove-onelife");
      startisclicked = true;

      //bomb lai drop garekov
      var playercard = document.getElementById("playersscorecardid");
      playercard.classList.add("hide");

      // 			console.log('bombdropping called from the restartgame');

      //bomb ra playerko checking start gareko
      // checkingplayerandbomb = setInterval(rohanbhai, checkingtime);
    });
  }, 5000);
}

function showthegameover() {
  // its main task is to show the gameover
  var gameover = document.getElementById("gameover");

  gameover.classList.remove("remove-gameover");
  var player = document.getElementById("player");
  player.className = "character dead";
  setTimeout(() => {
    gameover.classList.add("remove-gameover");
    // 		player.classList.remove('dead');
    // 		player.classList.add('hide');

    try {
      bombhide();
    } catch (e) {
      //         	console.log('don nothing')
    }
  }, 3000);
}

function randomnumber(num) {
  // its main task to generate the random number by taking the parameter num
  var number = Math.ceil(Math.random() * num);
  return number;
}

function playerleftposition() {
  // its main task is to give the current player left position
  var player = document.getElementById("player");
  return player.offsetLeft;
}

function playertopposition() {
  // its main task is to give the current player top osition
  var player = document.getElementById("player");
  return player.offsetTop;
}

function bombleftposition(bombparam) {
  // its main task si to give the bomb left position
  //     console.log(bombparam);
  var bomb = document.getElementById(bombparam);
  return bomb.offsetLeft;
}

function bombtopposition(bombparam) {
  // its main task is to give the bomb top position
  var bomb = document.getElementById(bombparam);
  return bomb.offsetTop;
}

function bombexplodes(bombparam) {
  // its main task is to explode the bomb
  clearInterval(checkingplayerandbomb[bombparam]);
  // 	console.log('the interval has been cleared', checkingplayerandbomb[bombparam]);
  // console.log(checkingplayerandbomb);
  increaselevel();

  bombexploded = true;
  var bomb = document.getElementById(bombparam);
  bomb.style.top = bombvtopposition[bombparam] + "px";

  bomb.className = "explosion";
  setTimeout(() => {
    bomb.classList.remove("explosion");
    if (bomb.classList.contains("translateforeven")) {
      bomb.classList.remove("translateforeven");
    }
    if (lifecounter == 3 || lifecounter == 2 || lifecounter == 1) {
      bombdropping(bombparam);
      //             loadfunctionpart2();
      //             bombhide();
      // 			console.log('form bombexplodes bomgdropping');

      bombexploded = false;
      playehashitten = false;
    }
  }, 5000);
}

document.addEventListener("DOMContentLoaded", myLoadFunction);
