/*Urun_id, Urun_adi , Urun_fiyat , 
Urun_stok, Urun_tanim, Urun_src*/
function Create() {
  InputCreate();
  ButtonCreate();
}

function InputCreate() {
  var InputContainer, InputPhloder, InputId, newInput;
  InputContainer = document.getElementsByClassName("inputs")[0];
  InputPholder = [
    "Ürün Adı",
    "Ürün Fiyatı",
    "Ürün Stok Adeti",
    "Ürün Tanımı",
    "Ürün Image name"
  ];
  InputId = ["Urunad", "Urunfiyat", "Urunstok", "Uruntanim", "Urunimgsrc"];

  for (var i = 0; i < InputId.length; i++) {
    newInput = document.createElement("input");
    newInput.placeholder = InputPholder[i];
    newInput.id = InputId[i];
    InputContainer.appendChild(newInput);
  }
}

function ButtonCreate() {
  var ButtonContainer, ButtonText, ButtonId, newButton;
  ButtonContainer = document.getElementsByClassName("buttons")[0];
  ButtonId = ["Onayla", "Vazgec"];
  ButtonText = ["ONAYLA", "VAZGEÇ"];
  for (var i = 0; i < ButtonId.length; i++) {
    newButton = document.createElement("button");
    newButton.innerHTML = ButtonText[i];
    newButton.id = ButtonId[i];
    if (i == 0) {
      newButton.onclick = function() {
        TovalueDb();
      };
    } else
      newButton.onclick = function() {
        window.location = "../views/product.html";
      };
    ButtonContainer.appendChild(newButton);
  }
}
// onclickte bu fonksiyon tetiklendi, bu fonksiyonda databasede'ki insert işlemini tetikleyecek.
function TovalueDb() {
  var urun_ad = document.getElementById("Urunad").value;
  var urun_fiyat = document.getElementById("Urunfiyat").value;
  var urun_stok = document.getElementById("Urunstok").value;
  var urun_tanim = document.getElementById("Uruntanim").value;
  var urun_imgsrc = document.getElementById("Urunimgsrc").value;
  if (
    // girilen inputlardaki değerler doğru girilmiş mi onu kontrol ettim doğruysa database'e ekleyecek
    urun_ad.length > 1 &&
    urun_fiyat.length >= 2 &&
    urun_stok.length >= 1 &&
    urun_tanim.length > 1 &&
    urun_imgsrc.length > 1
  ) {
    // urun_id'yi bu fonksiyon her çağırıldığında bir artacak şekilde yap
    InsertProduct(urun_ad, urun_fiyat, urun_stok, urun_tanim, urun_imgsrc);
  } else alert("Lütfen değerleri boş girmeyiniz");
}
