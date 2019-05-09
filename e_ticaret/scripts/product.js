function Create() {
  // navbar'da anasayfa, kullanıcı adı, sepet, çıkış
  CreateNavbar();
  CreateProducts();
}
function CreateNavbar() {
  var ButtonContainer, ButtonText, ButtonId, newButton;
  ButtonContainer = document.getElementsByClassName("navbar")[0];
  ButtonText = ["Anasayfa", "Sepet", "Çıkış"];
  ButtonId = ["Anasayfa", "Sepet", "Çıkış"];

  var InputContainer, InputId, newInput;
  InputContainer = document.getElementsByClassName("navbar")[0];
  InputId = "kullaniciad";

  for (var i = 0; i < ButtonId.length; i++) {
    if (i == 1) {
      newInput = document.createElement("input");
      newInput.id = InputId;
      InputContainer.appendChild(newInput);
    }
    newButton = document.createElement("button");
    newButton.id = ButtonId[i];
    newButton.innerHTML = ButtonText[i];
    ButtonContainer.appendChild(newButton);
  }
}

function CreateProducts() {
  // 1 table 3 tr 9 td
  var TableContainer, newTable;
  var TrContainer, TrClass, newTr;
  var TdContainer, newTd;
  TrClass = ["product-birinci", "product-ikinci", "product-ucuncu"];
  TdId = ["birincihucre", "ikincihucre", "ucuncuhucre"];
  //
  TableContainer = document.getElementsByClassName("products")[0];
  newTable = document.createElement("table");
  newTable.className = "product-table";
  TableContainer.appendChild(newTable);
  //
  TrContainer = document.getElementsByClassName("product-table")[0];
  for (var i = 0; i < 3; i++) {
    newTr = document.createElement("tr");
    newTr.className = TrClass[i];
    TrContainer.appendChild(newTr);
  }
  for (var i = 0; i < 3; i++) {
    TdContainer = document.getElementsByClassName(TrClass[i])[0];
    for (var j = 0; j < 3; j++) {
      newTd = document.createElement("td");
      newTd.id = TdId[j];
      TdContainer.appendChild(newTd);
    }
  }
}
