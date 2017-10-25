//Create a global var for the p5 object (set in sketch.js)
var my_p5;

function onP5PreLoad() {

}

//Populate year dropdown
for (var i = 1550; i < 1800; i+= 50) {
  $("#yearDropList").prepend("<li>" + i +  "</li>");
}
for (var i = 1800; i < 1900; i+= 10) {
  $("#yearDropList").prepend("<li>" + i +  "</li>");
}
for (var i = 1900; i < 2000; i+= 5) {
  $("#yearDropList").prepend("<li>" + i +  "</li>");
}

$("li").click(function() {
  var y = $(this).text();
  $("#yearDrop").text(y);
  my_p5.displayYear = y;
  my_p5.makeNameSet();
});

function positionDropDown() {
  var pos = getPos(document.getElementById("yearText"));
  $("#year").css("left", (pos.x - 25) + "px");
  $("#year").css("top", (pos.y - 133) + "px");
  console.log($("#year").position());
  $("#year").delay(400).animate({opacity:1}, 1000, function() {});
}

function getPos(el) {
    // yay readability
    for (var lx=0, ly=0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly};
}

$(window).resize(function() {
  positionDropDown();
  my_p5.positionNames();
});

$(window).ready(function() {
  positionDropDown();
});


