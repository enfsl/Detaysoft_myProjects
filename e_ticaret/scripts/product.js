function Create() {
  // navbar'da anasayfa, kullanıcı adı, sepet, çıkış
  CreateNavbar();
  CreateProducts();
}
function CreateNavbar() {
  var ButtonContainer, ButtonText, ButtonId, newButton;
  ButtonContainer = document.getElementsByClassName("navbar")[0];
  ButtonText = ["Anasayfa", "Sepet", "Çıkış"];
  ButtonId = ["Anasayfa", "Sepet", "Cıkıs"];
  var InputContainer, InputId, newInput, InputValue;
  InputContainer = document.getElementsByClassName("navbar")[0];
  InputId = "kullaniciad";
  InputValue = document.cookie; // Input'un value'sine cookie'den username'i çekip atacak.
  for (var i = 0; i < ButtonId.length; i++) {
    newButton = document.createElement("button");
    newButton.id = ButtonId[i];
    newButton.innerHTML = ButtonText[i];
    if (i == 0)
      newButton.onclick = function() {
        window.location = "product.html";
      };
    if (i == 1)
      newButton.onclick = function() {
        window.location = "basket.html";
      };
    if (i == 2)
      newButton.onclick = function() {
        window.location = "../index.html";
      };
    ButtonContainer.appendChild(newButton);
  }
  newInput = document.createElement("input");
  newInput.id = InputId;
  newInput.value = InputValue;
  newInput.readOnly = "readonly";
  InputContainer.appendChild(newInput);
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
console.log(document.cookie);
