var getUsername = getCookie("Username");
function Create() {
  CreateCard();
  CreateButton(getUsername);
}
function CreateCard() {
  // table, 4 input, 2 button
  var DivContainer = document.getElementsByClassName("Card")[0];
  var newTable = document.createElement("table");
  newTable.className = "Card-table";
  DivContainer.appendChild(newTable);

  var newInput, InputId, InputPh;

  InputId = ["kartnum", "kartsahip", "ayyil", "cvc"];
  InputPh = ["Kart Numarası", "Kart Sahibi", "AY/YIL", "CVC"];

  for (var i = 0; i < InputId.length; i++) {
    newInput = document.createElement("input");
    if (i == 0) {
      newInput.maxLength = 16;
      newInput.id = InputId[i];
      newInput.placeholder = InputPh[i];
    }
    if (i == 2) {
      newInput.maxLength = 5;
      newInput.id = InputId[i];
      newInput.placeholder = InputPh[i];
    }
    if (i == 3) {
      newInput.maxLength = 3;
      newInput.id = InputId[i];
      newInput.placeholder = InputPh[i];
    }
    newInput.id = InputId[i];
    newInput.placeholder = InputPh[i];
    newTable.appendChild(newInput);
  }
}

function CreateButton(username) {
  var newTable = document.getElementsByClassName("Card-table")[0];

  var newButton, ButtonText, ButtonId;
  ButtonText = ["Satın Al", "Vazgeç"];
  ButtonId = ["satinal", "vazgec"];

  for (var i = 0; i < ButtonId.length; i++) {
    newButton = document.createElement("button");
    newButton.id = ButtonId[i];
    newButton.innerHTML = ButtonText[i];
    if (i == 0) {
      newButton.onclick = function() {
        BuyDelete(username);
      };
    }
    if (i == 1) {
      newButton.onclick = function() {
        window.location = "../views/basket.html";
      };
    }
    newTable.appendChild(newButton);
  }
}
