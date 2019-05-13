function Create() {
  // navbar'da anasayfa, kullanıcı adı, sepet, çıkış
  CreateNavbar();
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

DisplayProduct();
