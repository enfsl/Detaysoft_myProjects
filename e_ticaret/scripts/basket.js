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
            newButton.onclick = function() {
              window.location = "../views/product.html";
            };
          }
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
        window.location = "basket.html";
      };
    ButtonContainer.appendChild(newButton);
  }
  newInput = document.createElement("input");
  newInput.id = "Tutar";
  newInput.readOnly = "readonly";
  InputContainer.appendChild(newInput);
}
