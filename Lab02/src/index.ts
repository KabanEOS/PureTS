let isPlaying: boolean = false;
let tiles: any = [];
let tempoGlobal: number = 120;
let tempoGlobalSec: number;
let tempoColumn: number = 0;
let keyLines: any = [];
let accessKeys: any = [];

class Tile {
  pos: string; // eg. "q0"  "k15" coordinate of position - while qwertyuiasdfghjk states for each sounds - horizontal pos (in line) and 1-15 states for vertical position (in column) (column)
  state: boolean; // if clicked supposed to toggle on
  accessKeys: number; // each tile has reference to one of the sounds it's supposed to play

  constructor(pos: string, state: boolean, accessKeys: number) {
    this.state = state;
    this.pos = pos;
    this.accessKeys = accessKeys;
  }

  getLinePos(): string {
    let line: string;

    if (this.pos != "") {
      line = this.pos.charAt(0);
    }
    return line;
  }
  getColPos(): string {
    let col: string;

    if (this.pos != "") {
      if (this.pos.charAt(2) != "") {
        col = this.pos.charAt(1).concat(this.pos.charAt(2));
      } else {
        col = this.pos.charAt(1);
      }
    }
    return col;
  }

  getPos(): string {
    return this.pos;
  }
  getState(): boolean {
    return this.state;
  }
  getAccessKey(): number {
    return this.accessKeys;
  }
}

appStart();

function appStart(): void {
  gridIdGenerator();
  setTempo();
  playDemo();
  playSoundAuto();
}

function gridIdGenerator(): void {
  keyLines = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
  ];

  accessKeys = [
    "81",
    "87",
    "69",
    "82",
    "84",
    "89",
    "85",
    "73",
    "65",
    "83",
    "68",
    "70",
    "71",
    "72",
    "74",
    "75",
  ];

  let gridContainer = document.querySelector(".gridContainer");
  for (let j = 0; j < keyLines.length; j++) {
    let currentAccessKey = accessKeys[j];
    for (let i = 0; i < 16; i++) {
      var result = keyLines[j] + i; // take all possible 250+ combination of v - h pos
      tiles.push(new Tile(result, false, currentAccessKey)); // push all to array of objects
    }
  }

  for (let k = 0; k < tiles.length; k++) {
    // read array of obj and create div tiles with their own properties
    let pos = tiles[k].getPos();
    let accessKey = tiles[k].getAccessKey();
    let state = tiles[k].getState();
    gridContainer.innerHTML +=
      '<div id="' +
      tiles[k].pos +
      '" accessKey="' +
      accessKey +
      '" isActive= "' +
      state +
      '" pos="' +
      pos +
      '" onclick = "handleClick(event)"></div>';
  }
}

function handleClick(e) {
  // handle click internally in ts structures and change attributes in HTML by functions setColor, setState
  let response = e.target.id; // currently clicked tile, click event handle and transfer
  for (let k = 0; k < tiles.length; k++) {
    let pos = tiles[k].getPos();
    if (pos == response) {
      if (tiles[k].state != true) {
        tiles[k].state = true;
        setColor(response, true);
        setState(response, true);
      } else {
        tiles[k].state = false;
        setColor(response, false);
        setState(response, false);
      }
    }
  }
}

function setColor(pos, isRed) {
  // TODO priority low - toggling color by this function make hover inactive after each use on each clicked tile
  let tile = document.getElementById(`${pos}`);
  if (isRed) {
    tile.style.background = "rgba(207, 50, 50, 0.906)";
  } else {
    tile.style.background = "rgba(129, 89, 204, 0.87)";
  }
}

function setState(pos, isActive) {
  // changes internal attribute of state named isActive
  let tile = document.getElementById(`${pos}`);
  if (isActive) {
    tile.setAttribute("isActive", "true");
  } else {
    console.log("wtf");
    tile.setAttribute("isActive", "false");
  }
}

function playSoundByKey(audio, key) {
  // final function in action chain that actually trigger - play the sound
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
}

function playDemo(): void {
  // function that play the sound while named "demo" tile is being clicked
  let titleNodes = document.querySelector("#gridTitleContainer").children;
  var tileDemo:any

  for (let i = 0; i < titleNodes.length; i++) {
    let currentTitleNodeAccessKey = titleNodes[i].accessKey;
    let currentTitleNode = titleNodes[i];
    var key: any= "";
    currentTitleNode.addEventListener("click", playNode);
    function playNode() {
      const audio = document.querySelector(
        `audio[data-key="${currentTitleNodeAccessKey}"]`
      );
      key = document.querySelector(
        `.key[data-key="${currentTitleNodeAccessKey}"]`
      );
      playSoundByKey(audio, key);
      var tileDemo = currentTitleNode.firstElementChild;
      
      tileDemo.style.background= "rgb(247, 222, 6)"
      setTimeout(() => {
        tileDemo.style.background= "rgb(68, 196, 247)"
      }, 250);
    }
  }

  window.addEventListener("keydown", function (e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    playSoundByKey(audio, key);
    // add color to .keyName on keydown 
    
  });

  // logic to trigger sound even if clicked again faster than sound duration

  function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    setTimeout(() => {
      this.classList.remove("playing");
    }, 1700);
  }

  const keys = document.querySelectorAll(".key");
  keys.forEach((key) =>
    key.addEventListener("transitionend", removeTransition)
  );
}

// function colorTile():void {

//   let titleNodes = document.querySelector("#gridTitleContainer").children;


// }

// function colorTileOnDemo(color, key) {
//   // final function in action chain that actually trigger - play the sound
//   if (!color) return;
//   color.currentTime = 0;
//   // color.play();
//   key.style.background("rgb(247, 222, 6)");
// }

let box = document.querySelector(".playPause"); // part of play pause transition animation logic
box.addEventListener("click", (e) => {
  e.target.classList.toggle("pause");
});

function setTempo(): void {
  document.getElementById("tempoUp").addEventListener("click", tempoUp);
  document.getElementById("tempoDown").addEventListener("click", tempoDown);

  function tempoUp() {
    tempoGlobal += 10;
    setTempo(tempoGlobal);
    tempoGlobalSec = 60000 / tempoGlobal;
  }
  function tempoDown() {
    tempoGlobal -= 10;
    setTempo(tempoGlobal);
    tempoGlobalSec = 60000 / tempoGlobal;
  }
  function setTempo(tempoGlobal) {
    document.getElementById("tempoValue").innerHTML = tempoGlobal;
  }
}

function playPause() {
  if (!isPlaying) isPlaying = true;
  else isPlaying = false;
  playSoundAuto();
}

function playSoundAuto() {
  // TODO priority high
  // document.getElementById("stopBtn").addEventListener("click", playPause); // when clicked - reset color to basic (with active red) and clear ranTimes state to initial
  document.getElementById("playPause").addEventListener("click", playPause);

  var ranTimes = 16;
  if (isPlaying) {
    var interval = (60 / tempoGlobal) * 1000;
    var myTimeout = setInterval(function () {
      tempoColumn = Math.abs(ranTimes - 16);
      playInterval();
      ranTimes--;
      if (ranTimes == 0 && isPlaying) {
        ranTimes = 16;
      } else if (ranTimes == 0 || !isPlaying) {
        ranTimes = 0;
        clearInterval(myTimeout);
      }
    }, interval);
  }
}

function playInterval() {
  for (let k = 0; k < tiles.length; k++) {
    // loop over array of all tiles
    if (tiles[k].getColPos() == tempoColumn) {
      // if current tile column position is equal to global tempo
      let currentPos = tiles[k].getPos();
      let tile = document.getElementById(currentPos);
      let accessKey = tile.getAttribute("accessKey");
      let state = tile.getAttribute("isactive");
      if (state == "true") {
        let pos = tile.getAttribute("pos");
        const audio = document.querySelector(`audio[data-key="${accessKey}"]`);
        const key = document.querySelector(`.key[data-key="${accessKey}"]`);
        playSoundByKey(audio, key);
      }
      tile.style.background = "rgb(247, 222, 6)";
    }
    if (tiles[k].getColPos() == tempoColumn - 1) {
      let currentCol = tiles[k].getColPos();
      let currentPos = tiles[k].getPos();
      let tile = document.getElementById(currentPos);
      tile.style.background = "rgba(129, 89, 204, 0.87)";
      let state = tile.getAttribute("isactive");
      if (state == "true") {
        let pos = tile.getAttribute("pos");
        setColor(pos, true);
      }
    }
    if (tiles[k].getColPos() == 15 && tempoColumn == 0) {
      let currentCol = tiles[k].getColPos();
      let currentPos = tiles[k].getPos();
      let tile = document.getElementById(currentPos);
      tile.style.background = "rgba(129, 89, 204, 0.87)";
      let state = tile.getAttribute("isactive");
      if (state == "true") {
        let pos = tile.getAttribute("pos");
        setColor(pos, true);
      }
    }
  }
}
