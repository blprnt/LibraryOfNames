var names;
var totals;

var displayNum = 40;
var displayYear = 1775;
var displayNames = [];

var displayFont;

function preload() {
  my_p5 = this;
  onP5PreLoad();
  
  displayFont = loadFont("https://cdn.glitch.com/0a4c19ef-4253-4ea8-95a1-80dfea72881b%2FPlayfairDisplay-Regular.otf?1508788595539");
  //Load the names JSON file
  names = loadJSON("https://cdn.glitch.com/0a4c19ef-4253-4ea8-95a1-80dfea72881b%2Fnames.json?1508861185697");
  //Load the yearly totals (for normalization)
  totals = loadJSON("https://cdn.glitch.com/0a4c19ef-4253-4ea8-95a1-80dfea72881b%2Ftotals.json?1508861178449");
  
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
      //if (i == 10) console.log((1550 + (j * 5)) + " -- " + n.years[j] + ":" + totals[j] + " - " + n.freqs[j]);
    }
  }
}

function setup() {
  createCanvas(10, 10);
  processNames();
  makeNameSet();
}

function makeNameSet() {
  removeElements();
  displayNames = [];
  var nameDict = {};
  for (var i = 0; i < displayNum; i++) {
    var n = getNameFromYear(displayYear);
    var start = (i == displayNum - 1) ? "and ":"";
    
    
    if (nameDict[n]) {
      var words = ["","another " ,"a third ", "a fourth ", "a fifth ", "a sixth ", "a seventh ", "an eighth "];
      start = start + words[nameDict[n]];
      nameDict[n] ++;
    } else {
    
      nameDict[n] = 1;
    }
    var end = (i == displayNum - 1) ? ".":","
    var s = createDiv(start + n + end);
    displayNames.push(s);
    s.addClass('name');
    s.id('name' + i);
    $("#name" + i).css("opacity", 0);
    $("#name" + i).delay(i * 100).animate({opacity:1},1000, function() {
      
    });
  }
  positionNames();
  
  var yy = floor((displayYear - 1550) / 5);
  $("#num").text(nfc(totals[yy]));
  positionDropDown();
   
   
}

function positionNames() {
  var border = 24;
  var stack = border;
  var y = $(".topPage").position().top + $(".topPage").height() + 115;
  var maxWidth = min(900, $(window).width() - 200);
  for (var i = 0; i < displayNames.length; i++) {
    var n = displayNames[i];
    var space = n.size().width + 10;
    
    if (stack + space + 30> maxWidth) {
      stack = border;
      y += 36;
    }
    
    
    n.position(stack, y);
    stack += n.size().width + 10;
    
  }
  
  $(".bottomPage").css("top", (y + 45) + "px");
}

function getNameFromYear(y) {
  var yy = floor((y - 1550) / 5);
  var r = random(0.75);
  var t = 0;
  var c = 0;
  
  while(r > t && c < 3999) {
    c++;
    if (names[c][1].freqs[yy]) t+= names[c][1].freqs[yy];
  }
  
  return(names[c][1].name);
  
}

function draw() {
  background(255);
  
  /*
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
  */
}

