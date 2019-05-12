function Create() {
  // navbar'da anasayfa, kullanıcı adı, sepet, çıkış
  CreateNavbar();
  CreateProducts();
}
function CreateNavbar() {
  var ButtonContainer, ButtonText, ButtonId, newButton;
  ButtonContainer = document.getElementsByClassName("navbar")[0];
  ButtonText = ["Anasayfa", "Sepet", "Ürün Ekle", "Ürün Düzenle", "Çıkış"];
  ButtonId = ["Anasayfa", "Sepet", "Urunekle", "Urunduzenle", "Cıkıs"];
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
        window.location = "../views/addproduct.html";
      };
    if (i == 3) {
      newButton.onclick = function() {
        window.location = "../views/editproduct.html";
      };
    }
    if (i == 4) {
      newButton.onclick = function() {
        window.location = "../index.html";
      };
    }
    ButtonContainer.appendChild(newButton);
  }
  newInput = document.createElement("input");
  newInput.id = InputId;
  newInput.value = "Merhaba " + InputValue;
  newInput.readOnly = "readonly";
  InputContainer.appendChild(newInput);
}

function CreateProducts() {
  // 1 table 3 tr 9 td
  var TableContainer, newTable;
  var TrContainer, TrClass, newTr;
  var TdContainer, newTd, TdId;
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
      // newTd.tagName = TdId[j];
      TdContainer.appendChild(newTd);
    }
  }
}

// function ShowProducts() {
//   var ImgSource = [("superstar.jpg", "superstar80s.jpg", "ultraboost19.jpg")];
//   for (var i = 0; i < 3; i++) {
//     for (var j = 0; j < 3; j++) {
//       if (i == 0)
//         var ImgContainer = document
//           .getElementsByClassName("product-birinci")[0]
//           .getElementsByTagName("td")[j];
//       if (i == 1)
//         var ImgContainer = document
//           .getElementsByClassName("product-ikinci")[0]
//           .getElementsByTagName("td")[j];
//       if (i == 2)
//         var ImgContainer = document
//           .getElementsByClassName("product-ucuncu")[0]
//           .getElementsByTagName("td")[j];
//       var newImg = document.createElement("img");
//       newImg.src = "../img/" + ImgSource[j];
//       ImgContainer.appendChild(newImg);
//     }
//   }
// }
// console.log(document.cookie);
