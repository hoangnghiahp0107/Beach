var carousel = $(".carousel-game"),
items = $(".item"),
currdeg = 0,
intervalId = null,
rotationInProgress = false;


var mouseDownX = 0;
var mouseUpX = 0;

$(".carousel-game").on("mousedown", function (event) {
mouseDownX = event.pageX;
stopRotation();
});

$(".carousel-game").on("mousemove", function (event) {
if (mouseDownX !== 0) {
mouseUpX = event.pageX;
}
});

$(".carousel-game").on("mouseup", function (event) {
if (mouseDownX !== 0) {
handleSwipe();
}
mouseDownX = 0;
mouseUpX = 0;
startRotation();
});

function handleSwipe() {
var swipeThreshold = 50;

if (mouseUpX - mouseDownX > swipeThreshold) {
rotate({ data: { d: "p" } });
} else if (mouseDownX - mouseUpX > swipeThreshold) {
rotate({ data: { d: "n" } });
}
}

function rotate(e) {
if (rotationInProgress) {
return;
}

rotationInProgress = true;

if (e.data.d == "n") {
currdeg = currdeg - 120;
}
if (e.data.d == "p") {
currdeg = currdeg + 120;
}
carousel.css({
"-webkit-transform": "rotateY(" + currdeg + "deg)",
"-moz-transform": "rotateY(" + currdeg + "deg)",
"-o-transform": "rotateY(" + currdeg + "deg)",
"transform": "rotateY(" + currdeg + "deg)"
});
items.css({
"-webkit-transform": "rotateY(" + (-currdeg) + "deg)",
"-moz-transform": "rotateY(" + (-currdeg) + "deg)",
"-o-transform": "rotateY(" + (-currdeg) + "deg)",
"transform": "rotateY(" + (-currdeg) + "deg)",

});

setTimeout(function() {
rotationInProgress = false;
}, 1000);
}

function startRotation() {
if (intervalId === null) {
intervalId = setInterval(function() {
  rotate({ data: { d: "n" } });
}, 10000);
}
}

function stopRotation() {
if (intervalId !== null) {
clearInterval(intervalId);
intervalId = null;
}
}

startRotation();

document.addEventListener("visibilitychange", function() {
if (document.visibilityState === "hidden") {
stopRotation();
} else if (document.visibilityState === "visible") {
startRotation();
}
});