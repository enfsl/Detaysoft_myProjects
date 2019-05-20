function setCookieUsername(username) {
  document.cookie = "Username=" + username;
}

function getCookie(cname) {
  // cookiden değer çekmek için.
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getId(ButtonId) {
  var Id = ButtonId.split("button");
  document.cookie = "buttonclicked=" + Id[1];

  var Unum = document.getElementById("SelectNum" + Id[1]);
  var Ucount = document.getElementById("InputCount" + Id[1]);
  document.cookie = "ANum=" + Unum.value;
  document.cookie = "UCount=" + Ucount.value;

  console.log(document.cookie);
}

function SetBasketCookie() {
  let urun_id = getCookie("buttonclicked");
  urun_id = parseInt(urun_id) + 1;
  var kullanici_adi = getCookie("Username");
  var adet = getCookie("UCount");
  var ayakkabı_num = getCookie("ANum");
  if (ayakkabı_num == "Numara Seç") alert("Ayakkabı numarası seçiniz!");
  else {
    CheckBasket(urun_id, kullanici_adi, ayakkabı_num, adet);
  }
}
function InsertBasketCookie() {
  let urun_id = getCookie("buttonclicked");
  urun_id = parseInt(urun_id) + 1;
  var kullanici_adi = getCookie("Username");
  var adet = getCookie("UCount");
  var ayakkabı_num = getCookie("ANum");
  return (dondur = [kullanici_adi, urun_id, ayakkabı_num, adet]);
}
