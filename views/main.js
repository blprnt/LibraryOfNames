//Create a global var for the p5 object (set in sketch.js)
var my_p5;

function onP5PreLoad() {

}

//Populate year dropdown
for (var i = 1500; i < 1800; i+= 50) {
  $("#yearDropList").prepend("<li>" + i +  "</li>");
}
for (var i = 1800; i < 1900; i+= 10) {
  $("#yearDropList").prepend("<li>" + i +  "</li>");
}
for (var i = 1900; i < 2020; i+= 5) {
  $("#yearDropList").prepend("<li>" + i +  "</li>");
}

$("li").click(function() {
  var y = $(this).text();
  $("#yearDrop").text(y);
  my_p5.displayYear = y;
  my_p5.makeNameSet();
});
