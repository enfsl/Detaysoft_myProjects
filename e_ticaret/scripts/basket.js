var getUsername = getCookie("Username");
function Create() {
  CreateNavbar();
  ShowBasket(getUsername);
}
var gelen = [];
var adet = [];
var toplam = 0;
function ShowBasket(username) {
  var resultBasket = [];
  var resultProduct = [];
  var sayac = 0;
  var sepetid = [];
  var sepetsayac = 0;
  createDb();
  db.transaction(function(tx) {
    tx.executeSql(
      "SELECT * FROM Sepet where Kullanici_adi=?",
      [username],
      function(tx, rs) {
        for (var i = 0; i < rs.rows.length; i++) {
          var row = rs.rows.item(i);
          resultBasket.push(row);
          adet.push(resultBasket[i]["Adet"]);
          sepetid.push(resultBasket[i]["Sepet_id"]);
        }
      }
    );
  });
  TrContainer = document.getElementsByClassName("Showbasket")[0];
  db.transaction(function(tx) {
    for (var x = 0; x < resultBasket.length; x++) {
      tx.executeSql(
        "SELECT Urun_adi, Urun_fiyat, Urun_src FROM Urunler WHERE Urun_id=?",
        [resultBasket[x]["Urun_id"]],
        function(tx, rs) {
          for (var j = 0; j < rs.rows.length; j++) {
            var row = rs.rows.item(j);
            resultProduct.push(row);
          }
          gelen[sayac] = resultProduct[sayac]["Urun_fiyat"];

          toplam += parseInt(gelen[sayac]) * parseInt(adet[sayac]);
          sayac++;

          for (var i = 0; i < resultProduct.length; i++) {
            var newTr = document.createElement("tr");
            var newTd = document.createElement("td");

            var newImg = document.createElement("img");
            newImg.src = "../img/" + resultProduct[i]["Urun_src"];

            var newFiyat = document.createElement("input");
            newFiyat.value = "Fiyatı " + resultProduct[i]["Urun_fiyat"] + " TL";
            newFiyat.readOnly = "readonly";

            var newAd = document.createElement("h2");
            newAd.innerHTML = resultProduct[i]["Urun_adi"];
            newAd.readOnly = "readonly";

            newAdet = document.createElement("input");
            newAdet.value = resultBasket[i]["Adet"] + " Adet";
            newAdet.readOnly = "readonly";

            newANumara = document.createElement("input");
            newANumara.value = resultBasket[i]["Ayakkabı_num"] + " Numara";
            newANumara.readOnly = "readonly";

            newButton = document.createElement("button");
            newButton.innerHTML = "Sepetten kaldır";
            newButton.className = "Sepettenkaldir";
            function Sil(id) {
              newButton.onclick = function() {
                DialogBox();
                bttn = document.getElementsByClassName("Sepettenkaldir").length;
                for (var i = 0; i < bttn; i++) {
                  document.getElementsByClassName("Sepettenkaldir")[
                    i
                  ].disabled = true;
                }
                var buttonifclick = document.getElementById("Kaldir");
                buttonifclick.onclick = function() {
                  // eğer sepetteki adet gelen adetten küçük ise alert ver
                  // değilse silme işlemini yap
                  // eper ürün 0 adet kalırsa sepetten delete et.
                  var dialoginputcount = document.getElementById("dialogadet")
                    .value;
                  CheckBasketAdet(id, dialoginputcount);
                };
              };
            }
          }
          Sil(sepetid[sepetsayac]);
          sepetsayac++;
          newTd.appendChild(newAd);
          newTd.appendChild(newImg);
          newTd.appendChild(newFiyat);
          newTd.appendChild(newANumara);
          newTd.appendChild(newAdet);
          newTd.appendChild(newButton);
          newTr.appendChild(newTd);
          TrContainer.appendChild(newTr);
          tutarContainer = document.getElementById("Tutar");
          tutarContainer.value = "Toplam " + toplam + "TL";
        }
      );
    }
  });
}

function CreateNavbar() {
  var ButtonContainer, ButtonText, ButtonId, newButton;
  ButtonContainer = document.getElementsByClassName("Navbar")[0];
  ButtonText = ["Anasayfa", "Satın Al"];
  ButtonId = ["Alisveris", "Satinal"];

  var InputContainer, newInput, InputValue;
  InputContainer = document.getElementsByClassName("Navbar")[0];
  InputValue = getCookie("Username");

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
        window.location = "../views/buy.html";
      };
    ButtonContainer.appendChild(newButton);
  }
  newInput = document.createElement("input");
  newInput.id = "Tutar";
  newInput.readOnly = "readonly";
  InputContainer.appendChild(newInput);
}

function DialogControl() {
  bttn = document.getElementsByClassName("Sepettenkaldir").length;
  for (var i = 0; i < bttn; i++) {
    document.getElementsByClassName("Sepettenkaldir")[i].disabled = false;
  }
}

function DialogBox() {
  var Dialog = document.createElement("dialog");
  Dialog.className = "deleteAdetDialog";
  document.body.appendChild(Dialog);
  var Container;
  var ButtonId, ButtonText, newButton;
  Container = document.getElementsByClassName("deleteAdetDialog")[0];
  ButtonId = ["Kaldir", "DialogVazgec"];
  ButtonText = ["Kaldır", "Vazgeç"];

  var paragraph = document.createElement("p");
  paragraph.textContent = "Sepetten kaç adet ürün kaldırılacak?";
  Container.appendChild(paragraph);

  var newInput = document.createElement("input");
  newInput.id = "dialogadet";
  newInput.type = "number";
  newInput.value = 1;
  newInput.max = 10;
  newInput.min = 1;
  Container.appendChild(newInput);

  for (var i = 0; i < ButtonId.length; i++) {
    newButton = document.createElement("button");
    newButton.id = ButtonId[i];
    newButton.innerHTML = ButtonText[i];
    if (i == 1) {
      newButton.onclick = function() {
        Dialog.close();
        var dialog = document.getElementsByClassName("deleteAdetDialog")[0];
        dialog.remove();
        DialogControl();
      };
    }
    Container.appendChild(newButton);
  }
  Dialog.show();
}
