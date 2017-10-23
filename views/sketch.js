var names;
var totals;

var displayNum = 40;
var displayYear = 1976;
var displayNames = [];

var displayFont;

function preload() {
  my_p5 = this;
  onP5PreLoad();
  
  displayFont = loadFont("https://cdn.glitch.com/0a4c19ef-4253-4ea8-95a1-80dfea72881b%2FPlayfairDisplay-Regular.otf?1508788595539");
  //Load the names JSON file
  names = loadJSON("https://cdn.glitch.com/0a4c19ef-4253-4ea8-95a1-80dfea72881b%2Fnames.json?1508777768358");
  //Load the yearly totals (for normalization)
  totals = loadJSON("https://cdn.glitch.com/0a4c19ef-4253-4ea8-95a1-80dfea72881b%2Ftotals.json?1508777907145");
  
}

function processNames() {
  
  /*
  This is what a name entry looks like
  [
    "John",
    {
      "name": "John",
      "total": 39253,
      "years": []
    }
  
  */
  console.log(Object.keys(names).length);
  //Set a var for first year, normalize to frequencies
  for (var i = 0; i < Object.keys(names).length; i++) {
    var n = names[i][1];
    n.firstYear = 0;
    var c = 0;
    
    while (n.years[c] == null && c < 100) {
      n.firstYear ++;
      c++;
    }
    n.freqs = [];
    for (var j = 0; j < n.years.length; j++) {
      n.freqs[j] = n.years[j] / totals[j];
      if (!n.freqs[j]) n.freqs[j] = 0;
      //if (i == 10) console.log(n.years[j] + ":" + totals[j] + " - " + n.freqs[j]);
    }
  }
}

function setup() {
  createCanvas(1280, 400);
  processNames();
  makeNameSet();
}

function makeNameSet() {
  displayNames = [];
  for (var i = 0; i < displayNum; i++) {
    var n = getNameFromYear(displayYear);
    displayNames.push(n);
  }
}

function getNameFromYear(y) {
  var yy = floor((y - 1550) / 5);
  var r = random(0.75);
  var t = 0;
  var c = 0;
  
  while(r > t && c < 3999) {
    c++;
    if (names[c][1].freqs[yy]) t+= names[c][1].freqs[yy];
    //console.log(names[c][1].freqs[yy]);
    //console.log(t);
  }
  
  return(names[c][1].name);
  
}

function draw() {
  background(255);
  var cols = 5;
  var rows = 8;
  fill(0);
  textFont(displayFont);
  textSize(36);
  for (var i = 0; i < displayNames.length; i++) {
    var xi = i % cols;
    var yi = floor(i / cols);
    var x = 50 + (xi * 200);
    var y = 50 + (yi * 40);
    text(displayNames[i], x, y);
  }
}

