function Create() {
  Arrow();
  ArrowEventListener();
}

function Arrow() {
  var Container = document.getElementsByClassName("Box")[0];
  var Arrow = document.createElement("img");
  Arrow.src = "arrow.svg";
  Arrow.id = "arrowsvg";
  Container.appendChild(Arrow);
}

function ArrowEvent(event) {
  var Arrow = document.getElementById("arrowsvg");
  var offsetL = Arrow.offsetLeft; // ok'un sol konumunu aldım
  var offsetT = Arrow.offsetTop; // üst konumu
  var svgwidth = 200 / 2; // ok'un genişliğinin yarısını aldım
  var svgheight = 100 / 2;
  centerX = offsetL + svgwidth; // X eksenine göre ortasını buldum
  centerY = offsetT + svgheight;
  var arrowx = event.pageX;
  var arrowy = event.pageY;
  var radians = Math.atan2(arrowy - centerY, arrowx - centerX); // atan2 fonksiyonu radyan dönderiyor.

  var degrees = (radians * 180) / Math.PI; // 1 rad = 180/pi
  degrees = degrees + 180; // 180 derece eklediğim zaman okun alt kısmından değil üst kısmından dönüyor.
  Arrow.style.transform = "rotate(" + degrees + "deg)";
}

function ArrowEventListener() {
  var Box = document.getElementsByClassName("Box")[0];
  Box.addEventListener("mousemove", ArrowEvent);
}
