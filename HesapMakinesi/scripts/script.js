function doldur(gelen) {
  document.getElementById("giris").value += gelen.value;
}

function aritmatik(gelen) {
  var kontrol = document.getElementById("giris").value;
  var indis;
  for (var i = 0; i < kontrol.length; i++) {
    if (kontrol[i] == "+") {
      indis = i;
    } else if (kontrol[i] == "-") {
      indis = i;
    } else if (kontrol[i] == "*") {
      indis = i;
    } else if (kontrol[i] == "/") {
      indis = i;
    }
  }
  if (indis === undefined)
    document.getElementById("giris").value += gelen.value;
  else {
    var degisecek = document.getElementById("giris").value[indis];
    var push = document
      .getElementById("giris")
      .value.replace(degisecek, gelen.value);
    document.getElementById("giris").value = push;
  }
}
function temizle() {
  document.getElementById("giris").value = "";
}

function sonuc() {
  var islemtext = document.getElementById("giris").value;
  document.getElementById("history").textContent += islemtext + "=";
  var indis;
  var operator = "";
  for (var i = 0; i < islemtext.length; i++) {
    if (islemtext[i] == "+") {
      indis = i;
      operator = "+";
    } else if (islemtext[i] == "-") {
      indis = i;
      operator = "-";
    } else if (islemtext[i] == "*") {
      indis = i;
      operator = "*";
    } else if (islemtext[i] == "/") {
      indis = i;
      operator = "/";
    }
  }
  var birinci = "";
  var ikinci = "";
  for (var i = 0; i < indis; i++) {
    birinci += islemtext[i];
  }
  for (var i = indis + 1; i < islemtext.length; i++) {
    ikinci += islemtext[i];
  }
  if (operator == "+") {
    document.getElementById("giris").value =
      parseInt(birinci) + parseInt(ikinci);
    document.getElementById("history").textContent +=
      parseInt(birinci) + parseInt(ikinci) + ", ";
  }
  if (operator == "-") {
    document.getElementById("giris").value =
      parseInt(birinci) - parseInt(ikinci);
    document.getElementById("history").textContent +=
      parseInt(birinci) - parseInt(ikinci) + ", ";
  }
  if (operator == "*") {
    document.getElementById("giris").value =
      parseInt(birinci) * parseInt(ikinci);
    document.getElementById("history").textContent +=
      parseInt(birinci) * parseInt(ikinci) + ", ";
  }
  if (operator == "/") {
    document.getElementById("giris").value =
      parseInt(birinci) / parseInt(ikinci);
    document.getElementById("history").textContent +=
      parseInt(birinci) / parseInt(ikinci) + ", ";
  }
}
