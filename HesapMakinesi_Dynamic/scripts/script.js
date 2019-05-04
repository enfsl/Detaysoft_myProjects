function create() {
  var inputContainer, newinput;
  inputContainer = document.getElementById("inputlar");
  newinput = document.createElement("input");
  newinput.id = "giris";
  newinput.value = " ";
  inputContainer.appendChild(newinput);
  buttonnumcreate();
  historycreate();
}
function buttonnumcreate() {
  var buttonsCreate, buttonsContainer, newButton;
  buttonsCreate = [
    "1",
    "2",
    "3",
    "+",
    "4",
    "5",
    "6",
    "-",
    "7",
    "8",
    "9",
    "*",
    "C",
    "0",
    "=",
    "/"
  ];
  buttonsContainer = document.getElementById("butonlar");
  for (var i = 0; i < buttonsCreate.length; i++) {
    if (i % 4 == 0) {
      mybr();
    }
    if (
      buttonsCreate[i] == "+" ||
      buttonsCreate[i] == "-" ||
      buttonsCreate[i] == "*" ||
      buttonsCreate[i] == "/"
    ) {
      newButton = document.createElement("button");
      newButton.type = "button";
      newButton.value = buttonsCreate[i];
      newButton.innerHTML = buttonsCreate[i];
      newButton.onclick = function() {
        aritmatik(this);
      };
      buttonsContainer.appendChild(newButton);
    } else if (buttonsCreate[i] == "C") {
      newButton = document.createElement("button");
      newButton.type = "button";
      newButton.innerHTML = "C";
      newButton.onclick = function() {
        temizle();
      };
      buttonsContainer.appendChild(newButton);
    } else if (buttonsCreate[i] == "=") {
      newButton = document.createElement("button");
      newButton.type = "button";
      newButton.innerHTML = "=";
      newButton.onclick = function() {
        sonuc();
      };
      buttonsContainer.appendChild(newButton);
    } else {
      newButton = document.createElement("button");
      newButton.type = "button";
      newButton.value = buttonsCreate[i];
      newButton.innerHTML = buttonsCreate[i];
      newButton.onclick = function() {
        doldur(this);
      };
      buttonsContainer.appendChild(newButton);
    }
  }
}
function mybr() {
  var br = document.createElement("br");
  var brcontainter = document.getElementById("butonlar");
  brcontainter.appendChild(br);
}
function historycreate() {
  var historyContainer, newHistory;
  historyContainer = document.getElementById("gecmis");
  newHistory = document.createElement("p");
  newHistory.id = "history";
  historyContainer.appendChild(newHistory);
}

function doldur(gelen) {
  document.getElementById("giris").value += gelen.value;
}
function aritmatik(gelen) {
  var indis;
  var ops = ["+", "-", "*", "/"];
  var checkthis = document.getElementById("giris").value;
  for (var i = 0; i < checkthis.length; i++) {
    for (var j = 0; j < ops.length; j++) {
      var durum = checkthis[i].indexOf(ops[j]);
      if (durum > -1) indis = i;
    }
  }
  if (indis == undefined) {
    document.getElementById("giris").value += gelen.value;
  } else {
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
  var ops = ["+", "-", "*", "/"];
  var operator = "";
  for (var i = 0; i < islemtext.length; i++) {
    if (islemtext[i].indexOf(ops[0]) > -1) {
      indis = i;
      operator = "+";
    } else if (islemtext[i].indexOf(ops[1]) > -1) {
      indis = i;
      operator = "-";
    } else if (islemtext[i].indexOf(ops[2]) > -1) {
      indis = i;
      operator = "*";
    } else if (islemtext[i].indexOf(ops[3]) > -1) {
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
  if (birinci != "" && ikinci != "") {
    {
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
  }
}
